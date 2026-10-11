// fieldguide.js - Offline Nature, Foliage, Bird Call, and Frost Planting Knowledge Base
// 100% deterministic, instant execution, zero network required.

export const FOLIAGE_DATA = [
  {
    name: "Sugar Maple",
    scientific: "Acer saccharum",
    colors: ["Brilliant Orange", "Scarlet Red", "Golden Yellow"],
    pigment: "Anthocyanins (red/orange) produced when sugars get trapped in cooling autumn leaves.",
    leaves: "5-lobed with rounded 'U-shaped' notches between lobes (like a Canadian flag).",
    bark: "Gray-brown with vertical furrows that curl outward in mature trees.",
    trailClue: "Look for clusters of winged samara seeds ('helicopters') carpeting the forest floor.",
    status: "Native",
    safety: "Safe"
  },
  {
    name: "Northern Red Oak",
    scientific: "Quercus rubra",
    colors: ["Russet Brown", "Deep Crimson", "Burnt Bronze"],
    pigment: "Tannins give the persistent brownish-red hues that often cling to branches into winter.",
    leaves: "7-11 pointed lobes with bristle-tipped teeth and sharp 'V-shaped' sinuses.",
    bark: "Dark gray with flat, shiny vertical ridges often called 'ski trails'.",
    trailClue: "Check the ground for large, flat-capped acorns; blue jays cache thousands every fall.",
    status: "Native",
    safety: "Safe"
  },
  {
    name: "Paper Birch",
    scientific: "Betula papyrifera",
    colors: ["Bright Butter Yellow", "Pale Gold"],
    pigment: "Carotenoids (xanthophylls) revealed once green chlorophyll breaks down in dropping temperatures.",
    leaves: "Simple, ovate with double-toothed margins and a pointed tip.",
    bark: "Chalky white, peeling in thin papery horizontal strips with dark horizontal lenticels.",
    trailClue: "Lightly touch peeling bark on fallen wood; never strip bark from live trees as it weakens them.",
    status: "Native",
    safety: "Safe"
  },
  {
    name: "American Beech",
    scientific: "Fagus grandifolia",
    colors: ["Copper Gold", "Pale Parchment Tan"],
    pigment: "Leaves exhibit 'marcescence' — they turn papery tan and whisper in the autumn wind.",
    leaves: "Elliptical with straight parallel veins terminating in small sharp teeth.",
    bark: "Astonishingly smooth, elephant-gray skin that stays unbroken even into old age.",
    trailClue: "Listen for dry rustling leaves hanging on long after maples and birches are bare.",
    status: "Native",
    safety: "Safe"
  },
  {
    name: "Staghorn Sumac",
    scientific: "Rhus typhina",
    colors: ["Flaming Scarlet", "Electric Orange", "Crimson"],
    pigment: "Intense anthocyanin response to direct sunlight along sunny trail edges and meadows.",
    leaves: "Long pinnately compound fronds with 11-31 sharply toothed leaflets.",
    bark: "Young branches are densely covered with velvety brown hairs resembling deer antlers in velvet.",
    trailClue: "Look for dense, cone-shaped clusters of fuzzy red drupe berries at branch tips.",
    status: "Native",
    safety: "Safe (Not poison sumac; velvet red upright berries indicate harmless staghorn)"
  },
  {
    name: "Poison Ivy (CAUTION)",
    scientific: "Toxicodendron radicans",
    colors: ["Vivid Amber Orange", "Blood Red", "Warning Yellow"],
    pigment: "One of the earliest woodland plants to turn blazing crimson in late September/October.",
    leaves: "Clusters of THREE leaflets ('Leaves of three, let it be'). Center leaflet has a longer stem.",
    bark: "Often grows as a hairy, rope-like vine climbing tree trunks ('Hairy vine, no friend of mine').",
    trailClue: "May feature small grayish-white waxy berries in fall. Urushiol oil is potent even on bare stems!",
    status: "Native but hazardous",
    safety: "DANGER: Do not touch. Wash skin immediately with cold water and dish soap if contacted."
  },
  {
    name: "Eastern White Pine",
    scientific: "Pinus strobus",
    colors: ["Deep Evergreen", "Yellowing inner needle drop"],
    pigment: "Evergreen conifer; sheds 2-3 year old interior needles in October (normal seasonal needle drop).",
    leaves: "Soft, flexible needles in bundles (fascicles) of exactly 5 (spell W-H-I-T-E = 5 letters).",
    bark: "Deeply furrowed, dark gray-black with purplish cast in fissures.",
    trailClue: "Crush a fallen brown needle bundle for a crisp terpene aroma that boosts trail mindfulness.",
    status: "Native",
    safety: "Safe"
  },
  {
    name: "Ginkgo Biloba (Maidenhair Tree)",
    scientific: "Ginkgo biloba",
    colors: ["Uniform Saffron Yellow", "Pure Gold"],
    pigment: "Synchronous leaf drop: leaves turn brilliant canary yellow and often drop within 24-48 hours.",
    leaves: "Distinctive fan-shaped leaves with parallel veins radiating outward like mini Japanese fans.",
    bark: "Fissured, corky grayish-brown.",
    trailClue: "Urban run club favorite; park pathways carpeted in pure yellow petals of foliage.",
    status: "Cultivated / Living Fossil",
    safety: "Safe"
  }
];

export const BIRDCALL_DATA = [
  {
    name: "Black-capped Chickadee",
    scientific: "Poecile atricapillus",
    mnemonic: "chick-a-dee-dee-dee / fee-bee",
    description: "High clear 'fee-bee' spring song; husky, rapid 'chick-a-dee-dee-dee' alarm & contact call.",
    trailContext: "Curious and brave; follows hikers at head height through mixed deciduous woods. Add extra 'dees' when alerting to predators.",
    season: "Year-round resident; active caching seeds in bark crevices throughout October."
  },
  {
    name: "White-breasted Nuthatch",
    scientific: "Sitta carolinensis",
    mnemonic: "yank-yank / nasal ha-ha-ha",
    description: "Nasal, tinny horn-like honk repeated in quick rhythm.",
    trailContext: "The 'upside-down bird'; creeps head-first down tree trunks searching bark furrows for dormant insects and acorns.",
    season: "Active autumn forest forager; often flocks alongside chickadees and titmice."
  },
  {
    name: "Blue Jay",
    scientific: "Cyanocitta cristata",
    mnemonic: "JAY! JAY! / pump-handle squeak",
    description: "Piercing, brassy scream 'JAY! JAY!'; also mimics red-shouldered hawk calls with startling accuracy.",
    trailContext: "The forest alarm system. Shouts when owls or hikers appear. Vital oak regenerator: caches thousands of acorns every October.",
    season: "Highly active caching acorns in meadows and woodland edges."
  },
  {
    name: "Northern Cardinal",
    scientific: "Cardinalis cardinalis",
    mnemonic: "cheer-cheer-cheer / birdy-birdy-birdy / sharp 'tik'",
    description: "Clear, loud, slurred whistles ending in rapid trills; sharp metallic chip contact note.",
    trailContext: "Frequents dense trailside brambles, brush piles, and thickets. Male is brilliant cardinal red against golden foliage.",
    season: "Flocks in small family groups at dawn and dusk near trail borders."
  },
  {
    name: "Red-tailed Hawk",
    scientific: "Buteo jamaicensis",
    mnemonic: "kreeeeee-aaargh (raspy scream)",
    description: "Fierce, downward-slurring raspy whistle (the classic movie eagle sound effect).",
    trailContext: "Look above open ridgelines and highway meadows; soars in lazy thermal circles hunting trail rodents.",
    season: "Migrating south along thermal updrafts on cool, crisp October afternoons."
  },
  {
    name: "Barred Owl",
    scientific: "Strix varia",
    mnemonic: "Who cooks for you? Who cooks for you-all?",
    description: "Rhythmic 8-note hooting pattern punctuated with eerie cackles and yelps.",
    trailContext: "Deep, damp old-growth hemlock and oak ravines. Will sometimes answer a low human whistled hoot at twilight.",
    season: "Active callers at dusk and overcast autumn mornings."
  }
];

export const FROST_GARDEN_DATA = [
  {
    crop: "Garlic Cloves (Hardneck & Softneck)",
    timing: "3 to 6 weeks before ground freezes (Mid-October to Early November)",
    action: "Plant individual cloves pointy end up, 2-3 inches deep, 6 inches apart. Cover with 4 inches of shredded autumn leaves as mulch.",
    frostTolerance: "Extremely hardy; roots establish over winter for huge summer harvest.",
    category: "Edible Allium"
  },
  {
    crop: "Winter Rye / Hairy Vetch Cover Crop",
    timing: "Immediate October sowing before first hard frost (<28°F / -2°C)",
    action: "Broadcast seed over emptied raised beds. Suppresses winter weeds, prevents erosion, and fixes atmospheric nitrogen for spring.",
    frostTolerance: "Cold-tolerant down to sub-zero temperatures.",
    category: "Soil Health"
  },
  {
    crop: "Spring Flowering Bulbs (Tulips, Daffodils, Alliums)",
    timing: "When evening temperatures drop consistently into the 40s°F (4-9°C)",
    action: "Plant at depth equal to 3x bulb height (usually 6-8 inches deep). Daffodils are naturally deer and rodent resistant.",
    frostTolerance: "Requires winter chill hours (vernalization) to trigger spectacular spring blooms.",
    category: "Pollinator Bloom"
  },
  {
    crop: "Winter Spinach & Mache (Corn Salad)",
    timing: "Early to mid autumn under simple floating row cover or cold frame",
    action: "Direct seed into garden soil. Cold converts plant starches into sugars, making frost-kissed autumn spinach extraordinarily sweet.",
    frostTolerance: "Survives heavy frosts down to 20°F (-6°C) unprotected.",
    category: "Cold-Hardy Greens"
  },
  {
    crop: "Perennial Tree & Native Shrub Planting",
    timing: "Through October while soil remains workable",
    action: "Cool autumn air combined with still-warm soil encourages strong root growth without water stress. Water deeply before ground freeze.",
    frostTolerance: "Dormant roots continue subterranean growth long after top leaves drop.",
    category: "Woody Perennials"
  }
];

export const TRAIL_MISSIONS = {
  hike: [
    {
      title: "The Autumn Pigment Hunt",
      sense: "👀 Sight",
      task: "Spot three distinct tree species showing different colors: one golden (Birch/Ginkgo), one scarlet (Maple/Sumac), and one deep bronze (Oak). Inspect where the stem snaps off.",
      clue: "Leaves break at the 'abscission zone', a cellular cork layer that trees seal before frost."
    },
    {
      title: "Bark Texture Compass",
      sense: "🖐️ Touch",
      task: "Compare the bark of three different trees without looking at your screen. Notice how moss or lichen clusters on moisture-retaining shaded bark sides.",
      clue: "Lichen is a symbiotic partnership between fungus and algae—an indicator of ultra-clean trail air."
    },
    {
      title: "Woodland Soundscape Inventory",
      sense: "👂 Sound",
      task: "Stop walking for 90 seconds. Close your eyes. Count how many distinct bird contact calls or wind frequencies through different tree canopies you can hear.",
      clue: "Pine needles hiss at high pitch in wind; broad oak leaves rattle like stiff parchment paper."
    }
  ],
  run: [
    {
      title: "Canopy Elevation Interval",
      sense: "🏃 Stride & Elevation",
      task: "Notice how foliage coloration changes as your elevation rises or as you move near creek bottoms where cold air pools (frost pockets).",
      clue: "Cold air drainage causes trees in valley hollows to turn color days earlier than ridgeline trees."
    },
    {
      title: "Rhythm of Footstrike",
      sense: "🍂 Surface Awareness",
      task: "Shift your gaze 15 feet ahead. Transition from packed dirt to crunchy dry leaf litter. Feel how the leaf cushion alters your stride cadence.",
      clue: "Dry fallen leaves release rich petrichor and geomin scent as your shoe soles crush them."
    }
  ],
  garden: [
    {
      title: "Soil Temperature Finger Test",
      sense: "🌱 Soil & Root",
      task: "Dig two inches into garden soil with your bare finger. Note whether the subterranean earth feels significantly warmer than the brisk autumn air.",
      clue: "Soil acts as a thermal battery, retaining summer warmth weeks after air temperatures plunge."
    },
    {
      title: "Leaf Mulch Gold Collector",
      sense: "🍂 Garden Biomass",
      task: "Collect two buckets of fallen maple or oak leaves. Run over them or crumple them to make protective winter mulch for your perennial beds.",
      clue: "Leaf mulch prevents frost-heaving of shallow roots and shelters overwintering solitary native bees."
    }
  ],
  birding: [
    {
      title: "The Chickadee Flock Sentinel",
      sense: "🦜 Ornithology",
      task: "Locate a mixed winter foraging flock by listening for chickadee 'dee-dee-dee' notes. Watch for nuthatches or kinglets traveling with them.",
      clue: "Small songbirds travel in mixed-species flocks in autumn for safety in numbers against migrating raptors."
    },
    {
      title: "Mast Tree Feeding Watch",
      sense: "👀 Canopy Watch",
      task: "Find an oak or beech tree dropping heavy acorns or beech nuts. Scan the upper branches for blue jays, woodpeckers, or chipmunks caching food.",
      clue: "A single blue jay can transport up to 5 acorns at a time in its expandable gular pouch."
    }
  ],
  mindful: [
    {
      title: "Five-Sense Grounding Walk",
      sense: "🧘 Full Sensorium",
      task: "Take 10 steps focusing solely on smell (damp earth, pine sap, fallen leaves). 10 steps on sound. 10 steps on touch of breeze on your cheeks.",
      clue: "Forest aerosols (phytoncides) emitted by evergreen trees have been clinically proven to lower cortisol."
    },
    {
      title: "The 3-Minute Horizon Gaze",
      sense: "🌄 Visual Rest",
      task: "Find a clearing or break in trees. Lock your phone in your pocket. Soften your gaze and look as far toward the horizon as possible to reset screen-strained ciliary eye muscles.",
      clue: "Long-distance optical focal length instantly relaxes the optical nerve after hours of 14-inch screen focus."
    }
  ]
};

// Quick deterministic keyword scanner for field queries
export function searchFieldGuide(query) {
  const q = (query || "").toLowerCase().trim();
  if (!q) return null;

  const foliageHits = FOLIAGE_DATA.filter(f => 
    f.name.toLowerCase().includes(q) ||
    f.scientific.toLowerCase().includes(q) ||
    f.colors.some(c => c.toLowerCase().includes(q)) ||
    f.leaves.toLowerCase().includes(q) ||
    f.bark.toLowerCase().includes(q)
  );

  const birdHits = BIRDCALL_DATA.filter(b =>
    b.name.toLowerCase().includes(q) ||
    b.scientific.toLowerCase().includes(q) ||
    b.mnemonic.toLowerCase().includes(q) ||
    b.description.toLowerCase().includes(q)
  );

  const gardenHits = FROST_GARDEN_DATA.filter(g =>
    g.crop.toLowerCase().includes(q) ||
    g.timing.toLowerCase().includes(q) ||
    g.action.toLowerCase().includes(q)
  );

  return {
    foliage: foliageHits,
    birds: birdHits,
    garden: gardenHits,
    total: foliageHits.length + birdHits.length + gardenHits.length
  };
}

// Calculate weeks until first frost estimation based on rough latitude or hemisphere
export function estimateFrostStatus(zoneInput) {
  // Common frost zones (Zone 3 through 9)
  const zone = parseInt(zoneInput, 10) || 6;
  const currentMonth = new Date().getMonth(); // 9 = October (0-indexed)
  const currentDay = new Date().getDate();

  // Approximate first frost dates by USDA zone
  const frostDates = {
    3: { month: 8, day: 15, name: "Mid-September" },
    4: { month: 8, day: 30, name: "Late September" },
    5: { month: 9, day: 15, name: "Mid-October" },
    6: { month: 9, day: 25, name: "Late October" },
    7: { month: 10, day: 10, name: "Early to Mid November" },
    8: { month: 10, day: 25, name: "Late November" },
    9: { month: 11, day: 15, name: "Mid-December" }
  };

  const target = frostDates[zone] || frostDates[6];
  const targetDate = new Date(new Date().getFullYear(), target.month, target.day);
  const now = new Date();
  const diffDays = Math.round((targetDate - now) / (1000 * 60 * 60 * 24));

  let advice = "";
  if (diffDays < 0) {
    advice = `First frost likely occurred ${Math.abs(diffDays)} days ago (${target.name}). Focus on planting garlic cloves, harvesting sweetened kale, mulching root crops, and checking cold frames.`;
  } else if (diffDays <= 7) {
    advice = `First frost expected in approximately ${diffDays} days (${target.name}). Urgent: Harvest remaining green tomatoes/peppers, disconnect outdoor garden hoses, and plant hardneck garlic!`;
  } else if (diffDays <= 21) {
    advice = `First frost in about ${Math.ceil(diffDays / 7)} weeks (${target.name}). Prime time for planting garlic cloves, perennial native shrubs, and spring flowering bulbs.`;
  } else {
    advice = `First frost is roughly ${Math.ceil(diffDays / 7)} weeks away (${target.name}). Warm soil window is open: establish cover crops (winter rye) and cold-hardy greens like spinach.`;
  }

  return {
    zone,
    diffDays,
    expectedDateName: target.name,
    advice
  };
}
