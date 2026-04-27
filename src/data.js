// ─────────────────────────────────────────────────────────────────────────────
// data.js  —  All static data for the LP dashboard
// ─────────────────────────────────────────────────────────────────────────────

export const BASE_DATA = [
  { m: 'Jan', d: 2850, c: 2850, o: 0,   r: 143 },
  { m: 'Feb', d: 2640, c: 2640, o: 0,   r: 132 },
  { m: 'Mar', d: 2780, c: 2780, o: 0,   r: 139 },
  { m: 'Apr', d: 2920, c: 2920, o: 0,   r: 146 },
  { m: 'May', d: 3200, c: 3200, o: 0,   r: 160 },
  { m: 'Jun', d: 3540, c: 3500, o: 40,  r: 177 },
  { m: 'Jul', d: 3900, c: 3500, o: 400, r: 195 },
  { m: 'Aug', d: 3760, c: 3500, o: 260, r: 188 },
  { m: 'Sep', d: 3230, c: 3230, o: 0,   r: 162 },
  { m: 'Oct', d: 3060, c: 3060, o: 0,   r: 153 },
  { m: 'Nov', d: 2870, c: 2870, o: 0,   r: 144 },
  { m: 'Dec', d: 3410, c: 3410, o: 0,   r: 171 },
]

export const FORECAST_2024 = [21.9, 18.6, 17.9, 16.9, 18.4, 21.5, 24.2, 23.4, 19.9, 19.3, 20.9, 25.4]

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const SEASON_DATA = [
  { m: 'January',   s: 'Winter (High)',  dc: 20 },
  { m: 'February',  s: 'Winter (High)',  dc: 19 },
  { m: 'March',     s: 'Spring',         dc: 16 },
  { m: 'April',     s: 'Spring',         dc: 15 },
  { m: 'May',       s: 'Summer (Low)',   dc: 14 },
  { m: 'June',      s: 'Summer (Peak)',  dc: 17 },
  { m: 'July',      s: 'Summer (Peak)',  dc: 20 },
  { m: 'August',    s: 'Summer (Peak)',  dc: 19 },
  { m: 'September', s: 'Fall',           dc: 15 },
  { m: 'October',   s: 'Fall',           dc: 16 },
  { m: 'November',  s: 'Winter (High)',  dc: 18 },
  { m: 'December',  s: 'Winter (High)',  dc: 22 },
]

export const REGRESSION_STATS = [
  { k: 'Multiple R',    v: '0.7422', d: 'Correlation strength' },
  { k: 'R²',           v: '0.5509', d: '55% variance explained' },
  { k: 'Adj. R²',      v: '0.5495', d: 'Adjusted for 1 predictor' },
  { k: 'Std Error',    v: '2.171',  d: '±2.17 min/dep prediction error' },
  { k: 'Observations', v: '324',    d: '27 years of monthly data' },
  { k: 'Intercept',    v: '12.208', d: 'Base delay at period 0' },
  { k: 'Slope',        v: '0.02563',d: '+0.026 minutes per month trend' },
  { k: 'F-stat',       v: '394.98', d: 'Overall model significance' },
  { k: 'p-value',      v: '6.4e-58',d: 'Highly statistically significant' },
]

// Default assumption values
export const DEFAULTS = {
  rc:     85,      // Regular crew cost $/hr
  oc:     127.5,   // Overtime crew cost $/hr
  rsc:    42,      // Reserve standby cost $/hr
  cp:     8500,    // Cancellation penalty $/flight
  regCap: 3500,    // FAA regular cap (crew-pairs/month)
  otCap:  700,     // Union CBA OT cap (crew-pairs/month)
  resCap: 300,     // Max reserve pool (crew-pairs)
  minR:   5,       // FAA min reserve % of demand
}

// Assumption field definitions — Section A (costs)
export const FIELDS_A = [
  { k: 'rc',  lbl: 'Regular Crew Cost',    pre: '$', suf: '/crew-hr',  min: 20,  max: 300,   step: 1,   hint: 'Per crew-pair on regular scheduled duty' },
  { k: 'oc',  lbl: 'Overtime Cost',        pre: '$', suf: '/crew-hr',  min: 30,  max: 450,   step: 0.5, hint: 'OT rate — typically 1.5× regular (union CBA)' },
  { k: 'rsc', lbl: 'Reserve Standby Cost', pre: '$', suf: '/crew-hr',  min: 10,  max: 200,   step: 1,   hint: 'Standby pay per reserve crew-pair on call' },
  { k: 'cp',  lbl: 'Cancellation Penalty', pre: '$', suf: '/flight',   min: 500, max: 30000, step: 100, hint: 'DOT fines + rebooking + compensation per cancel' },
]

// Assumption field definitions — Section B (capacities)
export const FIELDS_B = [
  { k: 'regCap', lbl: 'Reg. Crew Cap',      pre: '', suf: ' pairs/mo', min: 2000, max: 5000, step: 50,  hint: 'Max regular crew-pairs/month — FAA Part 117' },
  { k: 'otCap',  lbl: 'Union CBA OT Cap',   pre: '', suf: ' pairs/mo', min: 50,   max: 2000, step: 10,  hint: 'Overtime ceiling per collective bargaining agreement' },
  { k: 'resCap', lbl: 'Max Reserve Pool',   pre: '', suf: ' pairs',    min: 50,   max: 800,  step: 5,   hint: 'Qualified reserve roster size limit' },
  { k: 'minR',   lbl: 'FAA Min Reserve %',  pre: '', suf: '% demand',  min: 1,    max: 15,   step: 0.5, hint: 'FAA-mandated minimum on-call reserve ratio' },
]
