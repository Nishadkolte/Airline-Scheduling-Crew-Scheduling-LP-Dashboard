# ✈️ Crew Scheduling LP Dashboard

A production-grade React dashboard for the Airline Crew Scheduling Linear Programming (LP) model. Works for any airline — fully configurable via the Assumptions panel.

## 🚀 Deploy to Vercel (2 minutes)

### Option A — GitHub → Vercel (recommended)
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Vercel auto-detects Vite — click **Deploy**
4. Live in ~60 seconds ✅

### Option B — Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

## 💻 Local Development
```bash
npm install
npm run dev
# → http://localhost:5173
```

## 🏗️ Build for Production
```bash
npm run build
npm run preview
```

---

## 📐 LP Model

**Objective:** Minimize Z = RegCost·Cₜ + OTCost·Oₜ + ResCost·Rₜ + CancelPenalty·Kₜ

**Decision Variables (per month):**
| Variable | Description |
|----------|-------------|
| **Cₜ** | Regular crew-pairs on scheduled duty |
| **Oₜ** | Overtime crew-pairs activated |
| **Rₜ** | Reserve (standby) crew-pairs held on-call |
| **Kₜ** | Cancellations (highest-penalty variable) |

**Constraints:**
| ID | Formula | Description |
|----|---------|-------------|
| C1 | Cₜ + Oₜ + Kₜ = Fₜ | All demand must be covered or explicitly cancelled |
| C2 | Cₜ ≤ 3,500 | FAA Part 117 regular crew cap |
| C3 | Oₜ ≤ 700  | Union CBA overtime ceiling |
| C4 | Rₜ ≥ 5%×Fₜ | FAA minimum reserve mandate (lower bound) |
| C5 | Rₜ ≤ 300  | Reserve pool size cap (upper bound) |

---

## 📊 Dashboard Sections

| Section | Description |
|---------|-------------|
| **① Assumptions** | Sliders + number inputs for all 8 parameters. Changes recalculate everything instantly |
| **Live Impact** | Shows cost delta vs defaults in real-time |
| **Constraint Banner** | Green (all clear) or red (violations listed) — always visible |
| **② KPIs** | 6 key metrics: total cost, crew-pairs, OT, reserve, cancellations, peak month |
| **③ Monthly Schedule** | Full 12-month table — demand, Cₜ, Oₜ, Rₜ, Kₜ, and all costs |
| **③ Constraint Checker** | Per-month grid for all 5 constraints with pass/fail per cell |
| **③ Cost Breakdown** | Progress bars by category + stacked monthly bar chart |
| **③ Season Costs** | Section C — monthly crew costs that update live with assumptions |
| **③ Delay Forecast** | 2024 regression forecast tiles + line chart + stats panel |

---

## 🗂️ Project Structure

```
src/
├── App.jsx                   # Root — layout, state, tab routing
├── main.jsx                  # React entry point
├── index.css                 # Global styles + animations
├── data.js                   # All static data (base schedule, defaults, field defs)
├── utils.js                  # LP computation, formatters, constraint checkers
├── components/
│   ├── Header.jsx            # Gradient hero with animated planes
│   ├── AssumptionInputs.jsx  # Section A & B sliders
│   ├── ImpactRow.jsx         # Live delta vs defaults
│   ├── Banner.jsx            # Constraint pass/fail banner
│   └── KPIRow.jsx            # 6 KPI cards
└── tabs/
    ├── ScheduleTab.jsx       # Monthly schedule table
    ├── ConstraintTab.jsx     # Full 5-constraint checker grids
    ├── CostTab.jsx           # Cost bars + stacked chart
    ├── SeasonTab.jsx         # Section C seasonal costs
    └── ForecastTab.jsx       # Delay forecast + regression stats
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| **React 18** | UI framework |
| **Recharts** | Bar, area, and line charts |
| **Vite 5** | Build tool |
| **Vercel** | One-click deployment |

No CSS framework — pure inline styles for full portability and zero dependency conflicts.

---

## 🔧 Customising for Your Airline

All data lives in `src/data.js`. To adapt for your airline:

1. Update `BASE_DATA` with your actual monthly crew-pair demand and schedule
2. Adjust `DEFAULTS` to your cost rates and capacity limits
3. Update `FORECAST_2024` with your own regression output
4. Rename the header label in `src/components/Header.jsx`

---

## 📄 License

MIT — free to use, adapt, and deploy for any airline.
# Airline-Scheduling-Crew-Scheduling-LP-Dashboard
