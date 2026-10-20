/* Copyright (c) 2026 belalee-ai. MIT License; see bundle LICENSE. */
(function (root) {
  'use strict';
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const fail = m => { throw new Error(m); };
  const number = (x, name, min = 0) => {
    if (!Number.isFinite(x) || x < min) fail(`${name}: expected finite number >= ${min}`);
  };
  const color = (v, name) => {
    if (!/^#[0-9a-f]{6}$/i.test(v || '')) fail(`${name}: use #RRGGBB`);
  };
  function validate(c) {
    if (!c || c.version !== 1) fail('version must be 1');
    number(c.canvas?.width, 'canvas.width', 1); number(c.canvas?.height, 'canvas.height', 1);
    number(c.canvas?.fps, 'canvas.fps', 1); number(c.durationSeconds, 'durationSeconds', 0.001);
    if (!['none', 'chapters'].includes(c.labels)) fail('labels: none | chapters');
    if (typeof c.font?.family !== 'string' || !c.font.family.trim()) fail('font.family required');
    number(c.font.size, 'font.size', 1); number(c.font.weight, 'font.weight', 1);
    number(c.transitionSeconds, 'transitionSeconds');
    for (const k of ['future', 'active', 'base', 'fill', 'line', 'cursor']) color(c.colors?.[k], `colors.${k}`);
    for (const k of ['base', 'fill']) {
      number(c.opacity?.[k], `opacity.${k}`); if (c.opacity[k] > 1) fail(`opacity.${k} > 1`);
    }
    const s = c.safeArea, l = c.layout;
    for (const k of ['x', 'y', 'width', 'height']) number(s?.[k], `safeArea.${k}`);
    if (!s.width || !s.height || s.x+s.width > c.canvas.width || s.y+s.height > c.canvas.height) fail('safeArea outside canvas');
    for (const k of ['x', 'y', 'width', 'labelHeight', 'gap', 'lineHeight', 'radius', 'cursorRadius']) number(l?.[k], `layout.${k}`);
    if (!l.width || !l.lineHeight) fail('layout width and lineHeight must be positive');
    const lineY = l.y + (c.labels === 'chapters' ? l.labelHeight + l.gap : 0);
    if (l.x-l.cursorRadius < s.x || l.x+l.width+l.cursorRadius > s.x+s.width ||
        l.y-l.cursorRadius < s.y || lineY+Math.max(l.lineHeight,l.lineHeight/2+l.cursorRadius) > s.y+s.height) fail('overlay outside safeArea');
    if (c.labels === 'chapters' && l.labelHeight < c.font.size*1.2) fail('labelHeight too small for font');
    if (typeof c.dividers !== 'boolean') fail('dividers must be boolean');
    if (!Array.isArray(c.modules) || !c.modules.length) fail('modules required even when labels are hidden');
    let edge = 0;
    for (const [i, m] of c.modules.entries()) {
      if (typeof m.label !== 'string' || (c.labels === 'chapters' && !m.label.trim())) fail(`module ${i}: label required`);
      number(m.start, `module ${i}.start`); number(m.end, `module ${i}.end`); number(m.width, `module ${i}.width`, 0.000001);
      if (Math.abs(m.start-edge) > 1e-6 || m.end <= m.start) fail(`module ${i}: contiguous increasing start/end required`);
      edge = m.end;
      if (m.timing === 'words') {
        if (!m.words?.length) fail(`module ${i}: real words required; use confirmed-map for silent sections`);
        let last = m.start;
        for (const w of m.words) {
          if (typeof w.text !== 'string' || !w.text) fail(`module ${i}: word text required`);
          number(w.start, 'word.start'); number(w.end, 'word.end');
          if (w.start < last || w.end <= w.start || w.end > m.end) fail(`module ${i}: words overlap/outside module`);
          last = w.end;
        }
      } else if (m.timing === 'confirmed-map') {
        if (!m.points || m.points.length < 2) fail(`module ${i}: confirmed points required`);
        let prevTime = -1, prevP = -1;
        for (const p of m.points) {
          number(p.time, 'point.time'); number(p.fraction, 'point.fraction');
          if (p.time <= prevTime || p.fraction < prevP || p.fraction > 1 || p.time < m.start || p.time > m.end) fail('invalid time map');
          prevTime = p.time; prevP = p.fraction;
        }
        const a=m.points[0], b=m.points.at(-1);
        if (a.time !== m.start || a.fraction !== 0 || b.time !== m.end || b.fraction !== 1) fail('time map endpoints must match module and 0..1');
      } else fail(`module ${i}: timing must be words | confirmed-map`);
    }
    if (Math.abs(edge-c.durationSeconds) > 1e-6) fail('last module end must match durationSeconds');
    const ch = c.character;
    if (!['none', 'fixed', 'follow'].includes(ch?.mode)) fail('character.mode: none | fixed | follow');
    if (ch.mode !== 'none') {
      for (const k of ['sourceWidth','sourceHeight','visibleHeight']) number(ch[k], `character.${k}`, 1);
      for (const k of ['x','y','width','height']) number(ch.bounds?.[k], `character.bounds.${k}`);
      const b=ch.bounds;
      if (!b.width || !b.height || b.x+b.width>ch.sourceWidth || b.y+b.height>ch.sourceHeight) fail('character visible bounds outside image');
      number(ch.y, 'character.y');
      if (ch.mode === 'fixed') number(ch.fixedX, 'character.fixedX');
      const vw=b.width/b.height*ch.visibleHeight;
      if (vw>s.width || ch.y<s.y || ch.y+ch.visibleHeight>s.y+s.height) fail('character cannot fit safeArea');
      if (ch.mode === 'fixed' && (ch.fixedX<s.x || ch.fixedX+vw>s.x+s.width)) fail('fixed character outside safeArea');
      if (!/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(ch.imageData || '')) fail('embed own PNG/JPEG/WebP using make-preview.cjs --image');
    }
    return c;
  }
  function fractionAt(m,t) {
    if (t <= m.start) return 0;
    if (t >= m.end) return 1;
    if (m.timing === 'words') {
      return m.words.reduce((n,w)=>n+clamp((t-w.start)/(w.end-w.start),0,1),0)/m.words.length;
    }
    for (let i=1;i<m.points.length;i++) {
      const a=m.points[i-1], b=m.points[i];
      if (t<=b.time) return a.fraction+(b.fraction-a.fraction)*(t-a.time)/(b.time-a.time);
    }
    return 1;
  }
  function stateAt(c, seconds) {
    if (!Number.isFinite(seconds)) fail('time must be finite');
    const t=clamp(seconds,0,c.durationSeconds), total=c.modules.reduce((n,m)=>n+m.width,0);
    let offset=0, progress=0, active=c.modules.length-1;
    const modules=c.modules.map((m,i)=>{
      const width=m.width/total, fraction=fractionAt(m,t);
      const mix=t<m.start ? 0 : c.transitionSeconds===0 ? 1 : clamp((t-m.start)/c.transitionSeconds,0,1);
      if(t>=m.start) { progress=offset+width*fraction; active=i; }
      const out={offset,width,fraction,mix}; offset+=width; return out;
    });
    if(t===c.durationSeconds) progress=1;
    const lineY=c.layout.y+(c.labels==='chapters'?c.layout.labelHeight+c.layout.gap:0);
    const frontX=c.layout.x+c.layout.width*progress;
    let character=null;
    if(c.character.mode!=='none') {
      const ch=c.character, w=ch.bounds.width/ch.bounds.height*ch.visibleHeight;
      character={x:ch.mode==='fixed'?ch.fixedX:clamp(frontX-w/2,c.safeArea.x,c.safeArea.x+c.safeArea.width-w),y:ch.y,width:w,height:ch.visibleHeight};
    }
    return {time:t, progress, active, lineY, frontX, fillWidth:c.layout.width*progress, modules, character};
  }
  const escape = s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[ch]));
  function mixColor(a,b,t) {
    const rgb=[1,3,5].map(i=>Math.round(parseInt(a.slice(i,i+2),16)*(1-t)+parseInt(b.slice(i,i+2),16)*t));
    return `rgb(${rgb.join(',')})`;
  }
  function svgAt(c,t) {
    const s=stateAt(c,t), l=c.layout;
    const parts=[`<svg xmlns="http://www.w3.org/2000/svg" width="${c.canvas.width}" height="${c.canvas.height}" viewBox="0 0 ${c.canvas.width} ${c.canvas.height}" role="img" aria-label="语音进度预览">`];
    if(c.labels==='chapters') {
      for(const [i,m] of c.modules.entries()) {
        const u=s.modules[i], x=l.x+l.width*u.offset, w=l.width*u.width;
        parts.push(`<rect x="${x}" y="${l.y}" width="${w}" height="${l.labelHeight}" rx="${l.radius}" fill="${c.colors.base}" opacity="${c.opacity.base}"/>`);
        parts.push(`<rect x="${x}" y="${l.y}" width="${w*u.fraction}" height="${l.labelHeight}" rx="${l.radius}" fill="${c.colors.fill}" opacity="${c.opacity.fill}"/>`);
        parts.push(`<text data-label="${i}" x="${x+w/2}" y="${l.y+l.labelHeight/2}" text-anchor="middle" dominant-baseline="central" font-family="${escape(c.font.family)}" font-weight="${c.font.weight}" font-size="${c.font.size}" fill="${mixColor(c.colors.future,c.colors.active,u.mix)}">${escape(m.label)}</text>`);
        if(c.dividers && i) parts.push(`<path d="M${x} ${l.y}v${l.labelHeight}" stroke="${c.colors.future}" stroke-width="1"/>`);
      }
    }
    parts.push(`<rect x="${l.x}" y="${s.lineY}" width="${l.width}" height="${l.lineHeight}" rx="${l.radius}" fill="${c.colors.base}" opacity="${c.opacity.base}"/>`);
    parts.push(`<rect x="${l.x}" y="${s.lineY}" width="${s.fillWidth}" height="${l.lineHeight}" rx="${l.radius}" fill="${c.colors.line}"/>`);
    if(l.cursorRadius) parts.push(`<circle cx="${s.frontX}" cy="${s.lineY+l.lineHeight/2}" r="${l.cursorRadius}" fill="${c.colors.cursor}"/>`);
    if(s.character) {
      const ch=c.character,b=ch.bounds,r=s.character;
      parts.push(`<svg x="${r.x}" y="${r.y}" width="${r.width}" height="${r.height}" viewBox="${b.x} ${b.y} ${b.width} ${b.height}"><image width="${ch.sourceWidth}" height="${ch.sourceHeight}" href="${ch.imageData}"/></svg>`);
    }
    parts.push('</svg>'); return parts.join('');
  }
  const api={validate,stateAt,svgAt};
  if(typeof module!=='undefined'&&module.exports) module.exports=api;
  else root.SpeechProgress=api;
})(typeof globalThis!=='undefined'?globalThis:this);
