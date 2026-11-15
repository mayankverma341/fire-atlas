// Guards for the scientific wording and its visible limitations.
// They check specific claims, not general keywords: the coverage number must carry its qualifier in the same
// element, overclaiming phrases must not come back, and the report fields the page reads must stay the same.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
// the Validation page is split over Validation.jsx and src/pages/validation/* (14 Nov)
const validation = [read('../src/pages/Validation.jsx'), read('../src/pages/validation/charts.jsx')].join('\n');
// The Method page is split over Method.jsx and src/pages/method/*
const method = [ '../src/pages/Method.jsx', ...readdirSync(new URL('../src/pages/method/', import.meta.url)).filter((f) => /\.jsx?$/.test(f)).sort().map((f) => `../src/pages/method/${f}`) ]
  .map((p) => readFileSync(new URL(p, import.meta.url), 'utf8')).join('\n');
const switch2012 = read('../src/pages/Switch2012.jsx');
const text = read('../src/content/text.js');
const compare = read('../src/components/Compare.jsx');

test('the overgeneralised claims are gone from the public pages', () => {
  for (const [name, src] of [['Validation', validation], ['Method', method], ['Switch2012', switch2012]]) {
    assert.doesNotMatch(src, /never saw/i, `${name}: "never saw"`);
    assert.doesNotMatch(src, /the real change/i, `${name}: "the real change"`);
    assert.doesNotMatch(src, /every choice was tested/i, `${name}: "every choice was tested"`);
  }
  assert.doesNotMatch(validation, /No jump at 2012/);
});

test('the coverage number carries its qualifier in the same element', () => {
  const block = validation.match(/<p className="coverage">[\s\S]*?<\/p>/);
  assert.ok(block, 'coverage fact block present');
  assert.match(block[0], /coverOf\('cells'\)/);
  assert.match(block[0], /coverOf\('frp'\)/);
  assert.match(block[0], /className="qualifier"/);
  assert.match(block[0], /Not a fully independent check/);
  assert.doesNotMatch(block[0], /held-out months/);
  // revision 1 and 4: names the cell choice and model choice, and says the checked ranges are not the published ones
  assert.match(block[0], /choose and weight the tested cells/);
  assert.match(block[0], /choosing the model/);
  assert.match(block[0], /built a little differently from the\s+published pre-2012 ranges/);
  // the numbers come from the report, never typed into the page
  assert.doesNotMatch(block[0], /9[34]\.\d/);
});

test('the page still reads the same report fields', () => {
  for (const f of ["'calibrated_coverage_pct'", "'gate_2012_step'", "'cells_gap_pct'", "'frp_gap_pct'", "'final_test_2026'",
    "'known_events'", "'tested_cells'"]) {
    assert.ok(validation.includes(f.slice(1, -1)), `field ${f}`);
  }
});

test('the Method page states what the 95% range does not cover', () => {
  const li = method.match(/<li(?: key="[^"]*")?>Before 2012 every value carries a calibrated 95% range[\s\S]*?<\/li>/);
  assert.ok(li, 'range bullet present');
  const flat = li[0].replace(/\s+/g, ' ');
  for (const w of ['cloud', 'before 2012', 'not fully independent', 'built a little differently', 'not as a guaranteed 95% bound']) {
    assert.ok(flat.includes(w), `range bullet mentions "${w}"`);
  }
});

test('validation notes state the important limits', () => {
  const notes = read('../../docs/audit/VALIDATION_NOTES.md');
  assert.match(notes, /not independent estimates of coverage/);
  assert.match(notes, /all 48 months of 2012–2015/);
  assert.match(notes, /17.6% for hotspots and 21.9% for fire power/);
  assert.match(notes, /sensitivity analysis, not independent validation/);
});
