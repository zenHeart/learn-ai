import fs from 'node:fs';
import path from 'node:path';

const side = fs.readFileSync('docs/.vitepress/sidebars/tech.mjs', 'utf8');
const zh = side.slice(side.indexOf('zhTechSidebar'));
const links = [...zh.matchAll(/link: '([^']+)'/g)].map(m => m[1]);
const sidebarSet = new Set(links.map(l => l.replace('/zh/tech', '').replace(/\/zh/, '').replace(/\/$/, '')));

function walk(d) {
  let r = [];
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) r = r.concat(walk(p));
    else if (f.endsWith('.md')) r.push(p);
  }
  return r;
}

const files = walk('docs/zh/tech');
const full = [];
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  if (/status:\s*redirect/.test(t)) continue;
  const norm = f.split(path.sep).join('/');
  let rel = norm.replace('docs/zh/tech', '').replace(/index\.md$/, '').replace(/\.md$/, '');
  if (rel.endsWith('/')) rel = rel.slice(0, -1);
  if (rel === '') rel = '/';
  const inSidebar = [...sidebarSet].some(s => s === rel);
  full.push({ rel, inSidebar });
}
const orphans = full.filter(x => !x.inSidebar);
console.log('sidebar zh links:', links.length, '| full (non-redirect) pages:', full.length, '| orphans:', orphans.length);
orphans.forEach(o => console.log('ORPHAN:', o.rel === '/' ? '(tech index)' : o.rel));

// density stats per page: mermaid blocks, tables, code fences, line count
console.log('\n--- density (mermaid / table-rows / codefences / lines) ---');
const stats = [];
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  if (/status:\s*redirect/.test(t)) continue;
  const norm = f.split(path.sep).join('/');
  const rel = norm.replace('docs/zh/tech', '');
  const mermaid = (t.match(/```mermaid/g) || []).length;
  const fences = (t.match(/```(?!\w*mermaid)/g) || []).length;
  const tableRows = (t.match(/^\|/gm) || []).length;
  const lines = t.split('\n').length;
  stats.push({ rel, mermaid, fences, tableRows, lines });
}
stats.sort((a, b) => b.lines - a.lines);
console.log('TOP 12 longest:');
stats.slice(0, 12).forEach(s => console.log(`${s.lines}L m:${s.mermaid} code:${s.fences} tbl:${s.tableRows}  ${s.rel}`));
console.log('\nNo-mermaid content pages (>150 lines):');
stats.filter(s => s.mermaid === 0 && s.lines > 150).forEach(s => console.log(`${s.lines}L tbl:${s.tableRows} code:${s.fences}  ${s.rel}`));
console.log('\nMermaid-heavy (>=4):');
stats.filter(s => s.mermaid >= 4).forEach(s => console.log(`${s.mermaid} diagrams ${s.lines}L  ${s.rel}`));
