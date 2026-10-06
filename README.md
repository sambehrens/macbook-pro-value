# MacBooks Through Time

A static single-page website visualising MacBook Pro starting prices and performance from 2006 to 2026, built with Chart.js.

**[sambehrens.github.io/macbook-pro-value](https://sambehrens.github.io/macbook-pro-value/)**

## Usage

Open `index.html` directly in a browser. No build step or server required.

## Views

Pick a metric, then choose **Raw** or **Per $1,000** (higher = better value):

| Metric | Raw | Per $1,000 |
|--------|-----|------------|
| **Price** | Base model starting price (USD) | — |
| **Single-Core** | Geekbench 6 single-core score | GB6 single-core points per $1,000 |
| **Multi-Core** | Geekbench 6 multi-core score | GB6 multi-core points per $1,000 |
| **RAM** | Base RAM (GB) | GB of base RAM per $1,000 |
| **CPU Cores** | Base CPU core count | Cores per $1,000 |
| **DRAM Market** | Consumer DRAM $/GB | Market cost of the base RAM as a % of the starting price |

Dollar-based views can be adjusted for inflation to 2026 dollars (CPI-U).

Both the 13"/14" (small) and 15"/16" (large) model lines are shown. Tooltips include the chip generation (e.g. M1, M2, Core i7).

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page layout, styles, and Chart.js initialisation |
| `data.js` | All data: prices, Geekbench 6 scores, RAM, chip labels |

## Data sources

- **Pricing & specs** — [EveryMac](https://everymac.com/systems/apple/macbook_pro/), [Apple Newsroom](https://www.apple.com/newsroom/2026/03/apple-introduces-macbook-pro-with-all-new-m5-pro-and-m5-max/)
- **GB6 scores** — [Geekbench Mac Benchmarks](https://browser.geekbench.com/mac-benchmarks) (Late 2013 onward) and [EveryMac Geekbench 6 averages](https://everymac.com/mac-benchmarks/) (2008–2012)
- **Model history** — [Wikipedia: MacBook Pro](https://en.wikipedia.org/wiki/MacBook_Pro)
- **Inflation** — [BLS CPI-U](https://www.bls.gov/news.release/cpi.nr0.htm) (annual averages; 2026 uses August 2026)

Each year uses the cheapest current-lineup configuration at the end of that year (or today, for 2026). 2026 prices reflect Apple's $300 increase on June 25, 2026 ($1,999 14" M5, $2,999 16" M5 Pro).

### Benchmark coverage

| Years | Source |
|-------|--------|
| 2013–2026 | Geekbench Mac Benchmarks chart averages for the exact base configuration (Sep 2026) |
| 2008–2012 | EveryMac GB6 averages, scaled ×0.961 single / ×0.930 multi to match the Geekbench chart (ratio measured on the 2013–2015 models both sources cover) |
| 2006–2007 | Estimated — no GB6 results exist for Merom Core 2 Duo MacBook Pros; scaled from the Early 2008 T8300 by clock speed and IPC |
