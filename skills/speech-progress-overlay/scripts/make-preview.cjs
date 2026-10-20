#!/usr/bin/env node
/* Copyright (c) 2026 belalee-ai. MIT License; see bundle LICENSE. */
'use strict';
const fs=require('node:fs'),path=require('node:path');
const core=require('./progress-core.js');
function main() {
  const args=process.argv.slice(2), [input,output,...extra]=args;
  if(!input||!output||extra.length && (extra.length!==2||extra[0]!=='--image')) throw Error('Usage: node make-preview.cjs config.json output.html [--image own-character.png]');
  if(path.resolve(input)===path.resolve(output)||extra[1]&&path.resolve(extra[1])===path.resolve(output)) throw Error('output must differ from inputs');
  const c=JSON.parse(fs.readFileSync(input,'utf8'));
  if(extra.length) {
    if(c.character?.mode==='none') throw Error('--image needs fixed/follow mode');
    const ext=path.extname(extra[1]).toLowerCase();
    const mime={'.png':'png','.jpg':'jpeg','.jpeg':'jpeg','.webp':'webp'}[ext];
    if(!mime) throw Error('use PNG/JPEG/WebP');
    c.character.imageData=`data:image/${mime};base64,${fs.readFileSync(extra[1]).toString('base64')}`;
  }
  core.validate(c);
  const data=JSON.stringify(c).replace(/</g,'\\u003c');
  const source=fs.readFileSync(path.join(__dirname,'progress-core.js'),'utf8');
  const html=`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>语音进度条配置预览</title>
<style>body{margin:0;background:#e6e8eb;color:#20252b;font:15px system-ui}header{padding:14px;position:sticky;top:0;background:white;z-index:1}button,input{vertical-align:middle}input{width:35vw}#stage{margin:20px auto;width:min(90vw,420px);background:repeating-conic-gradient(#f8f8f8 0% 25%,#eee 0% 50%) 50%/20px 20px}#stage svg{display:block;width:100%;height:auto}#warnings{color:#9c2e12;padding:8px 14px}p{margin:6px 0}</style>
<header><strong>配置预览 · 不含真实音频</strong><p>棋盘格表示透明区域；这是浏览器预览，尚未导入剪辑器。示例时间仅作演示。</p><button id="play">播放</button> <input id="time" type="range" min="0" max="${c.durationSeconds}" step="${1/c.canvas.fps}" value="0"><output id="readout"></output><p id="note"></p></header><div id="warnings"></div><div id="stage"></div>
<script>${source}</script><script>
const config=${data}; SpeechProgress.validate(config);
const stage=document.getElementById('stage'),slider=document.getElementById('time'),button=document.getElementById('play');
let current=0,running=false,start=0,origin=0;
window.previewConfig=config;
window.seek=function(t){current=Math.max(0,Math.min(config.durationSeconds,t));stage.innerHTML=SpeechProgress.svgAt(config,current);slider.value=current;document.getElementById('readout').textContent=current.toFixed(2)+'s';return SpeechProgress.stateAt(config,current);};
function warnings(){const labels=[...stage.querySelectorAll('[data-label]')],sum=config.modules.reduce((n,m)=>n+m.width,0);const overflow=labels.filter((el,i)=>el.getBBox().width>config.layout.width*config.modules[i].width/sum-12);document.getElementById('warnings').textContent=overflow.length?'标签超出可用宽度：请改短标签、增宽模块或重新确认字号。':'';}
slider.oninput=()=>{running=false;button.textContent='播放';window.seek(Number(slider.value));};
button.onclick=()=>{running=!running;if(running){if(current>=config.durationSeconds)current=0;origin=current;start=performance.now();}button.textContent=running?'暂停':'播放';};
function tick(now){if(running){window.seek(origin+(now-start)/1000);if(current>=config.durationSeconds){running=false;button.textContent='播放';}}requestAnimationFrame(tick);}window.seek(0);document.fonts.ready.then(warnings);requestAnimationFrame(tick);
document.getElementById('note').textContent=config.character.mode==='none'?'无人物模式；不保留人物占位。':'图片仅提供固定/跟随位置，不会自动产生关节动作；需要肢体动作时另做分层绑定。';
</script></html>`;
  fs.writeFileSync(output,html); process.stdout.write(`Created ${output}\n`);
}
try{main();}catch(e){process.stderr.write(e.message+'\n');process.exitCode=1;}
