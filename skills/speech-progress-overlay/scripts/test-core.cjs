/* Copyright (c) 2026 belalee-ai. MIT License; see bundle LICENSE. */
'use strict';
const assert=require('node:assert/strict');
const core=require('./progress-core.js');
const sample=require('../assets/example-config.json');
const copy=()=>structuredClone(sample);
const image='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aH1sAAAAASUVORK5CYII=';
let cases=0;
for(const labels of ['none','chapters']) for(const mode of ['none','fixed','follow']) {
  const c=copy();c.labels=labels;
  c.character=mode==='none'?{mode}:{mode,sourceWidth:100,sourceHeight:160,bounds:{x:0,y:0,width:100,height:160},visibleHeight:120,y:360,fixedX:120,imageData:image};
  core.validate(c); let prev=-1;
  for(let frame=0;frame<=c.durationSeconds*c.canvas.fps;frame++) {
    const t=frame/c.canvas.fps,s=core.stateAt(c,t);
    assert(s.progress>=prev && s.progress>=0 && s.progress<=1); prev=s.progress;
    assert.equal(s.frontX,c.layout.x+s.fillWidth);
    if(s.character){assert(s.character.x>=c.safeArea.x);assert(s.character.x+s.character.width<=c.safeArea.x+c.safeArea.width);}
    if(mode==='fixed')assert.equal(s.character.x,120);
    const other=core.stateAt(c,t);core.stateAt(c,c.durationSeconds-t);assert.deepEqual(other,core.stateAt(c,t));
  }
  assert.equal(core.stateAt(c,0).progress,0);assert.equal(core.stateAt(c,6).progress,1);
  const svg=core.svgAt(c,2.1);
  assert.equal(svg.includes('<text'),labels==='chapters');assert.equal(svg.includes('<image'),mode!=='none');
  assert.equal(core.stateAt(c,0).lineY,c.layout.y+(labels==='none'?0:c.layout.labelHeight+c.layout.gap));
  cases++;
}
let c=copy();assert.equal(core.stateAt(c,0.8).progress,core.stateAt(c,1).progress); // actual word pause
assert.equal(core.stateAt(c,2.4).modules[0].mix,1); // completed label retains state
c=copy();c.canvas.fps=60;assert.equal(core.stateAt(c,2.1).progress,core.stateAt(sample,2.1).progress);
c=copy();c.font.family='My Font';c.font.size=36;c.colors.active='#123456';c.layout.x=110;c.layout.width=860;
core.validate(c);assert(core.svgAt(c,1).includes('My Font'));assert(core.svgAt(c,1).includes('rgb(18,52,86)'));assert.equal(core.stateAt(c,6).frontX,970);
c=copy();c.modules[0].timing='confirmed-map';delete c.modules[0].words;c.modules[0].points=[{time:0,fraction:0},{time:1,fraction:0.25},{time:2,fraction:1}];core.validate(c);assert(Math.abs(core.stateAt(c,1).progress-0.25/3.2)<1e-12);
const mutations=[c=>c.modules[1].start=1.9,c=>c.modules[0].words[1].start=0.5,c=>c.modules[0].words[0].end=3,c=>c.modules[0].words=[],c=>c.durationSeconds=7,c=>c.font.family='',c=>c.opacity.fill=2,c=>c.layout.x=0,c=>c.modules[0].width=0,c=>c.character={mode:'follow'}];
for(const mutate of mutations){const v=copy();mutate(v);assert.throws(()=>core.validate(v));}
c=copy();c.modules[0].label='</script><img src=x onerror=alert(1)>';const svg=core.svgAt(c,1);assert(!svg.includes('</script>'));assert(svg.includes('&lt;'));
process.stdout.write(JSON.stringify({modes:cases,framesPerMode:181,checks:'monotonic/sync/bounds/seek/pause/fps/customization/reject-invalid/escape',passed:true})+'\n');
