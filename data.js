const years = [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026];

// Each year uses the cheapest current-lineup configuration as of the end of that year
// (or today, for the current year). 2013–2015 small uses the Retina 13" rather than the
// legacy non-Retina 13" Apple kept selling; 2018 small is the 2017 non-Touch Bar model,
// which remained the $1,299 entry point until July 2019.
// 2026: Apple raised all MacBook Pro prices by $300 on Jun 25 2026 (memory shortage);
// 14" M5 went $1,599 → $1,699 (Mar 2026, 1TB base storage) → $1,999; 16" M5 Pro $2,699 → $2,999.

// 13" (2009–2022) → 14" (2023–present)
const smallModel = [null,null,null,1199,1199,1199,1199,1299,1299,1299,1499,1299,1299,1299,1299,1299,1299,1599,1599,1599,1999];

// 15" (2006–2018) → 16" (2019–present)
const largeModel = [1999,1999,1999,1699,1799,1799,1799,1999,1999,1999,2399,2399,2399,2399,2399,2499,2499,2499,2499,2499,2999];

// Geekbench 6 scores.
//   2013–2026: Geekbench Mac Benchmarks chart (browser.geekbench.com/mac-benchmarks,
//              snapshot of Sep 24 2026), which lists MacBook Pros from Late 2013 onward.
//   2008–2012: EveryMac per-model GB6 averages (everymac.com/mac-benchmarks/), scaled by
//              0.961 (single) / 0.930 (multi) — the average Geekbench-chart ÷ EveryMac ratio
//              across the 2013–2015 base models both sources cover.
//   2006–2007: estimated — no GB6 results exist for Merom Core 2 Duo MacBook Pros; scaled from
//              the Early 2008 T8300 by clock speed and Penryn's ~5% IPC gain, then as above.
const benchmarks = {
  small: {
    //          06    07    08    09    10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26
    // CPU:                     P7550 P8600 2435M 3210M 4258U 4278U 5257U 6360U 7360U 7360U 8257U  M1    M1    M2    M3    M4    M5    M5
    single: [null, null, null,  265,  268,  465,  523,  756,  858,  912,  939, 1093, 1093, 1120, 2166, 2166, 2360, 2769, 3237, 3643, 3643],
    multi:  [null, null, null,  409,  414,  874, 1012, 1382, 1642, 1778, 1882, 2177, 2177, 3529, 8317, 8317, 9649,11559,15179,17952,17952],
  },
  large: {
    //          06    07    08    09    10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26
    // CPU:    T7400 T7500 P8600 P8700 i5-520 2675QM 3615QM 4750HQ 4770HQ 4770HQ 6700HQ 7700HQ 8750H 9750H 9750H M1P  M1P   M3P   M4P   M4P   M5P
    // source:  est   est
    single: [ 211,  216,  264,  272,  364,  517,  572,  870,  917,  956,  988, 1089, 1224, 1270, 1270, 2197, 2197, 2814, 3375, 3375, 3693],
    multi:  [ 349,  353,  428,  443,  698, 1586, 1905, 2835, 3163, 3373, 3563, 3685, 4858, 5380, 5380,13864,13864,16915,24889,24889,33605],
  },
};

// Base RAM (GB) included with the starting configuration each year
const ram = {
  // null for 2006–2008 (13" model didn't exist)
  small: [null, null, null,  2,  4,  4,  4,  4,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8, 16, 16, 16],
  large: [   1,    2,   2,   4,  4,  4,  4,  8, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 24, 24, 24],
};

// Base CPU core count in the starting configuration each year
// Sources: Apple Tech Specs pages, EveryMac.com, Apple newsroom M5 Pro announcement (Mar 3 2026)
// 13" notes: 2-core i5 through 2018 ($1,299 entry was the 2017 non-Touch Bar model);
//            4-core Coffee Lake in 2019; 8-core M1 in 2020;
//            M3 (2023) = 8-core; M4 (2024) = 10-core; M5 (2025) = 10-core.
// 15"/16" notes: 2-core through 2010; 4-core Sandy Bridge from 2011; 6-core Coffee Lake from 2018;
//               M1 Pro (2021) = 10-core; M3 Pro (2023) = 12-core; M4 Pro (2024) = 14-core;
//               M5 Pro (2026) = 18-core (6 super + 12 performance, per apple.com/macbook-pro/specs/).
const cores = {
  //           06    07    08   09   10   11   12   13   14   15   16   17   18   19   20   21   22   23   24   25   26
  small: [null, null, null,  2,   2,   2,   2,   2,   2,   2,   2,   2,   2,   4,   8,   8,   8,   8,  10,  10,  10],
  large: [   2,    2,   2,   2,   2,   4,   4,   4,   4,   4,   4,   4,   6,   6,   6,  10,  10,  12,  14,  14,  18],
};

// Approximate retail consumer DRAM price per GB (USD)
// DDR2 era (2006–2008), DDR3 era (2009–2016), DDR4 era (2017–2021), DDR4/DDR5 (2022+)
// Sources: DRAMeXchange/TrendForce historical pricing, Statista, Tom's Hardware price trackers,
//          capitalandcompute.net DDR5 tracker (2025–2026)
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
    3, // 2024 - retail stayed low (32GB DDR5 kits ~$90–110); AI/HBM tightening hit contract prices first
    4, // 2025 - ~$2.50/GB through Q3, then AI-driven shortage: ~$10/GB by December
   15, // 2026 - shortage ("hundred-year flood"): ~$12/GB in Jan → ~$17.50/GB by Sep
];

// Chip/generation name shown in tooltips
const chipLabels = {
  small: [null, null, null, 'Core 2 Duo', 'Core 2 Duo', 'Core i5', 'Core i5', 'Core i5', 'Core i5', 'Core i5', 'Core i5', 'Core i5', 'Core i5', 'Core i5', 'M1', 'M1', 'M2', 'M3', 'M4', 'M5', 'M5'],
  large: ['Core 2 Duo', 'Core 2 Duo', 'Core 2 Duo', 'Core 2 Duo', 'Core i5', 'Core i7', 'Core i7', 'Core i7', 'Core i7', 'Core i7', 'Core i7', 'Core i7', 'Core i7', 'Core i7', 'Core i7', 'M1 Pro', 'M1 Pro', 'M3 Pro', 'M4 Pro', 'M4 Pro', 'M5 Pro'],
};
