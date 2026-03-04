# MacBooks Through Time

A static single-page website visualising MacBook Pro starting prices and performance from 2006 to 2026, built with Chart.js.

## Usage

Open `index.html` directly in a browser. No build step or server required.

## Views

Six chart modes, grouped into two sets:

**Raw**
- **Starting Price** — base model price in USD each year
- **Single-Core Score** — Geekbench 6 single-core score
- **Multi-Core Score** — Geekbench 6 multi-core score

**Per $1,000** (higher = better value)
- **Single-Core Value** — GB6 single-core points per $1,000 spent
- **Multi-Core Value** — GB6 multi-core points per $1,000 spent
- **RAM Value** — gigabytes of base RAM per $1,000 spent

Both the 13"/14" (small) and 15"/16" (large) model lines are shown. Tooltips include the chip generation (e.g. M1, M2, Core i7).

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page layout, styles, and Chart.js initialisation |
| `data.js` | All data: prices, Geekbench 6 scores, RAM, chip labels |

## Data sources

- **Pricing & specs** — [EveryMac](https://everymac.com/systems/apple/macbook_pro/)
- **GB6 scores (Apple Silicon)** — [Geekbench Mac Benchmarks](https://browser.geekbench.com/mac-benchmarks) (aggregate averages)
- **GB6 scores (Intel 2015–2019)** — [Geekbench Browser search](https://browser.geekbench.com/v6/cpu/search) (individual submissions)
- **Model history** — [Wikipedia: MacBook Pro](https://en.wikipedia.org/wiki/MacBook_Pro)

### Benchmark coverage

| Years | Source |
|-------|--------|
| 2020–2025 | Real GB6 averages from Geekbench |
| 2015–2019 Intel | Real GB6 individual submissions |
| 2009–2014 | Estimated — GB6 requires macOS 12+, which these machines can't run; scores extrapolated from the 2015 Broadwell baseline using per-generation CPU trends |
| 2006–2008 | Estimated |
| 2026 large (M5 Pro 16") | Estimated — not yet on Geekbench as of March 2026 |
