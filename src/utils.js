// ─────────────────────────────────────────────────────────────────────────────
// utils.js  —  LP computation helpers and formatters
// ─────────────────────────────────────────────────────────────────────────────

/** Apply assumptions to base data and compute all costs */
export function computeData(baseData, A) {
  return baseData.map(b => {
    const c   = Math.min(b.c, A.regCap)
    const o   = Math.min(b.o, A.otCap)
    const k   = Math.max(0, b.d - c - o)          // cancellations (Kₜ)
    const rc  = c * A.rc
    const oc  = o * A.oc
    const rsc = b.r * A.rsc
    const kc  = k * A.cp
    return { ...b, c, o, k, rc, oc, rsc, kc, tot: rc + oc + rsc + kc }
  })
}

/** Sum all cost/volume columns across 12 months */
export function sumTotals(D) {
  return ['tot', 'rc', 'oc', 'rsc', 'kc', 'k', 'd', 'c', 'o', 'r'].reduce(
    (acc, key) => ({ ...acc, [key]: D.reduce((s, r) => s + (r[key] || 0), 0) }),
    {}
  )
}

/** Check all 5 LP constraints — returns array of violation objects */
export function checkViolations(D, A) {
  const v = []
  D.forEach(r => {
    if (r.c + r.o + r.k !== r.d)
      v.push({ c: 'C1', msg: `${r.m}: coverage gap` })
    if (r.c > A.regCap)
      v.push({ c: 'C2', msg: `${r.m}: reg ${r.c} > ${A.regCap}` })
    if (r.o > A.otCap)
      v.push({ c: 'C3', msg: `${r.m}: OT ${r.o} > ${A.otCap}` })
    const minRes = Math.ceil(r.d * A.minR / 100)
    if (r.r < minRes)
      v.push({ c: 'C4', msg: `${r.m}: res ${r.r} < ${minRes}` })
    if (r.r > A.resCap)
      v.push({ c: 'C5', msg: `${r.m}: res ${r.r} > ${A.resCap}` })
  })
  return v
}

/** Build constraint check functions for each of the 5 constraints */
export function buildConstraintFns(A) {
  return {
    C1: r => ({ ok: r.c + r.o + r.k === r.d,        lhs: r.c + r.o + r.k, rhs: `= ${r.d}` }),
    C2: r => ({ ok: r.c <= A.regCap,                 lhs: r.c,             rhs: `≤ ${A.regCap}` }),
    C3: r => ({ ok: r.o <= A.otCap,                  lhs: r.o,             rhs: `≤ ${A.otCap}` }),
    C4: r => { const mn = Math.ceil(r.d * A.minR / 100); return { ok: r.r >= mn, lhs: r.r, rhs: `≥ ${mn}` } },
    C5: r => ({ ok: r.r <= A.resCap,                 lhs: r.r,             rhs: `≤ ${A.resCap}` }),
  }
}

// ── Formatters ────────────────────────────────────────────────────────────
export const fmt  = v  => '$' + Math.round(v).toLocaleString()
export const fmtK = v  => '$' + (v / 1000).toFixed(1) + 'K'
export const fmtM = v  => '$' + (v / 1e6).toFixed(3) + 'M'
export const isPeak = m => ['Jun', 'Jul', 'Aug'].includes(m)

/** Calculate slider fill percentage for CSS --pct variable */
export function sliderPct(val, min, max) {
  return Math.round(((val - min) / (max - min)) * 100)
}
