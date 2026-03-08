const years = [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026];

// 13" (2009–2022) → 14" (2023–present)
const smallModel = [null,null,null,1199,1199,1199,1199,1299,1299,1299,1499,1299,1299,1299,1299,1299,1299,1599,1599,1599,1599];

// 15" (2006–2018) → 16" (2019–present)
const largeModel = [1999,1999,1999,1699,1799,1799,1799,1999,1999,1999,2399,2399,2399,2399,2399,2499,2499,2499,2499,2499,2699];

// Geekbench 6 scores.
// Sources:
//   "real"      = browser.geekbench.com/mac-benchmarks (aggregate averages)
//   "search"    = browser.geekbench.com/v6/cpu/search (individual submissions)
//   "est"       = estimated — GB6 cannot run on pre-2015 hardware (requires macOS 12+);
//                 scores extrapolated from the 2015 anchor using per-generation CPU trends.
//                 2016 Intel search results were anomalously low (Skylake < Haswell makes no
//                 sense), so those years are also estimated.
//                 M5 Pro 16" (2026) estimated from M4 Pro + typical Apple Silicon uplift.
const benchmarks = {
  small: {
    //          06    07    08   09   10    11    12    13    14    15     16    17    18    19    20    21    22    23    24    25    26
    // source:                  est  est  est   est   est   est  real  est  srch  srch  srch  real  real  real  real  real  real  real
    // Note: M5 14" is a 2025 model on Geekbench; 2026 small reuses same chip (no new 14" announced).
    single: [null, null, null,  410,  430,  740,  850,  920,  960, 1027,  890, 1126, 1237,  761, 2323, 2323, 2600, 3077, 3751, 3708, 3708],
    multi:  [null, null, null,  720,  870, 1570, 1760, 1830, 1960, 2093, 1750, 2489, 4326, 3345, 8186, 8186, 9644,11537,14894,17463,17463],
  },
  large: {
    //          06   07   08   09    10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26
    // source: est  est  est  est   est   est   est   est   est  real   est   est  srch  srch  srch  real  real  real  real  real   est
    // Note: M5 Pro 16" (2026) not yet on Geekbench as of March 2026 — score is estimated.
    single: [ 250,  340,  370,  400,  480,  744,  875,  938, 1042, 1042,  940, 1020, 1272, 1355, 1355, 2374, 2374, 3105, 3878, 3878, 4460],
    multi:  [ 450,  640,  680,  720, 1050, 2678, 3150, 3383, 3759, 3759, 3000, 3270, 4884, 5528, 5528,12254,12254,15249,22490,22490,27000],
  },
};

// Base RAM (GB) included with the starting configuration each year
const ram = {
  // null for 2006–2008 (13" model didn't exist)
  small: [null, null, null,  2,  4,  4,  4,  4,  4,  8,  8,  8,  8,  8,  8,  8,  8,  8, 16, 16, 16],
  large: [   1,    2,   2,   4,  4,  4,  8,  8, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 24, 24, 24],
};

// Base CPU core count in the starting configuration each year
// Sources: Apple Tech Specs pages, EveryMac.com, Apple newsroom M5 announcement (Mar 3 2026)
// 13" notes: 2-core i5 through 2017; jumped to 4-core Coffee Lake in 2018; 8-core M1 in 2020;
//            M3 (2023) = 8-core; M4 (2024) = 10-core; M5 (2025) = 10-core.
// 15"/16" notes: 2-core through 2010; 4-core Sandy Bridge from 2011; 6-core Coffee Lake from 2018;
//               M1 Pro (2021) = 10-core; M3 Pro (2023) = 12-core; M4 Pro (2024) = 14-core;
//               M5 Pro (2026) = 18-core (6 super + 12 performance, per apple.com/macbook-pro/specs/).
const cores = {
  //           06    07    08   09   10   11   12   13   14   15   16   17   18   19   20   21   22   23   24   25   26
  small: [null, null, null,  2,   2,   2,   2,   2,   2,   2,   2,   2,   4,   4,   8,   8,   8,   8,  10,  10,  10],
  large: [   2,    2,   2,   2,   2,   4,   4,   4,   4,   4,   4,   4,   6,   6,   6,  10,  10,  12,  14,  14,  18],
};

// Approximate retail consumer DRAM price per GB (USD)
// DDR2 era (2006–2008), DDR3 era (2009–2016), DDR4 era (2017–2021), DDR4/DDR5 (2022+)
// Sources: DRAMeXchange/TrendForce historical pricing, Statista, Tom's Hardware price trackers
// Note: Apple Silicon uses LPDDR5X unified memory; standard DDR is used here as a market reference.
const marketRamPricePerGB = [
  100, // 2006 - DDR2, elevated prices before the crash
   25, // 2007 - major oversupply crash (>70% price drop)
   12, // 2008 - continued decline, DDR2/DDR3 transition
    8, // 2009 - stabilized at new floor
    6, // 2010
    8, // 2011 - supply disruption (manufacturer consolidation)
    4, // 2012 - DDR3 oversupply, prices fell sharply
    9, // 2013 - supply tightening (Elpida bankruptcy, Samsung fire)
    9, // 2014 - remained elevated
    6, // 2015 - prices eased
    3, // 2016 - oversupply low point
    8, // 2017 - DDR4 shortage, prices spiked
   10, // 2018 - shortage peak
    5, // 2019 - correction, oversupply
    4, // 2020 - continued low
    6, // 2021 - recovery
    7, // 2022 - DDR5 launch year, mixed DDR4/DDR5 market
    3, // 2023 - massive crash (lowest in years, all major manufacturers cut production)
    6, // 2024 - recovery driven by AI/HBM demand tightening supply
    8, // 2025 - AI demand + supply constraints
    8, // 2026
];

// Chip/generation name shown in tooltips
const chipLabels = {
  small: [null, null, null, 'Core 2 Duo', 'Core 2 Duo', 'Core i5', 'Core i5', 'Core i5', 'Core i5', 'Core i5', 'Core i5', 'Core i5', 'Core i5', 'Core i5', 'M1', 'M1', 'M2', 'M3', 'M4', 'M5', 'M5'],
  large: ['Core Duo', 'Core 2 Duo', 'Core 2 Duo', 'Core 2 Duo', 'Core i5', 'Core i7', 'Core i7', 'Core i7', 'Core i7', 'Core i7', 'Core i7', 'Core i7', 'Core i7', 'Core i7', 'Core i7', 'M1 Pro', 'M1 Pro', 'M3 Pro', 'M4 Pro', 'M4 Pro', 'M5 Pro'],
};
