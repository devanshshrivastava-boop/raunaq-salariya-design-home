import kitchen from "@/assets/cat-kitchen.jpg";
import bathroom from "@/assets/cat-bathroom.jpg";
import pooja from "@/assets/cat-pooja.jpg";
import balcony from "@/assets/cat-balcony.jpg";
import dining from "@/assets/cat-dining.jpg";
import study from "@/assets/cat-study.jpg";
import wardrobe from "@/assets/cat-wardrobe.jpg";
import bedroom from "@/assets/work-bedroom.png";
import living from "@/assets/work-living.png";
import foyer from "@/assets/work-foyer.png";
import pool from "@/assets/work-pool.png";
import villa from "@/assets/work-villa-exterior.png";
import modernVilla from "@/assets/work-modern-villa.png";
import hotelLobby from "@/assets/work-hotel-lobby.png";
import hotelFacade from "@/assets/work-hotel-facade.png";

import sofa from "@/assets/store-sofa.jpg";
import chair from "@/assets/store-chair.jpg";
import table from "@/assets/store-table.jpg";
import chandelier from "@/assets/store-chandelier.jpg";
import wall from "@/assets/store-wall.jpg";
import rug from "@/assets/store-rug.jpg";

export type ImageItem = {
  id: string;
  title: string;
  image: string;
  hoverImage?: string; // alternate image revealed on hover (store only)
  price?: string;
  shape?: "tall" | "wide" | "square" | "portrait";
};
export type Category = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  description?: string;
  items: ImageItem[];
};

const interiorPool = [kitchen, bedroom, living, dining, bathroom, foyer, study, wardrobe, balcony, pooja, modernVilla, hotelLobby, pool, villa, hotelFacade];
const storePool = [sofa, chair, table, chandelier, wall, rug];

const shapeFor = (i: number): ImageItem["shape"] => {
  const m = i % 8;
  if (m === 0) return "wide";
  if (m === 3) return "tall";
  if (m === 6) return "portrait";
  return "square";
};

const formatPrice = (base: number, i: number) => {
  const v = base + (i * 1373) % (base * 1.8);
  return `₹ ${Math.round(v / 100) * 100}`.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
};

const STOP = new Set(["with","and","the","of","in","a","an","to","for","by","on","at","is","or","into","from","over","under","this","that","de","la","le","les","des","du","et","amp"]);
const SUFFIX = { interior: "interior design", store: "antique vintage" } as const;
function keywordsFor(title: string, scope: "interior" | "store"): string {
  const words = title.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/)
    .filter((w) => w && !STOP.has(w) && w.length > 2);
  const distinct = Array.from(new Set(words)).slice(0, 5).join(" ");
  return `${distinct} ${SUFFIX[scope]}`.trim();
}
function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = (h * 16777619) >>> 0; }
  return h % 99999;
}
/** Loremflickr returns a deterministic relevant photo for keywords (tag,tag).
 *  `lock` makes it deterministic per item so each card receives a unique image. */
function imageFor(title: string, scope: "interior" | "store", variant = 0): string {
  const tags = keywordsFor(title, scope).split(/\s+/).filter(Boolean).slice(0, 4).join(",");
  const lock = hashSeed(scope + "::" + title + "::" + variant);
  return `https://loremflickr.com/800/600/${encodeURIComponent(tags)}?lock=${lock}`;
}
/** Public helper so other modules can ask for a unique image given a label. */
export function imageForLabel(label: string, variant = 0): string {
  return imageFor(label, "store", variant);
}

const makeItems = (titles: string[], imgs: string[], basePrice?: number, scope: "interior" | "store" = "interior"): ImageItem[] =>
  titles.map((t, i) => ({
    id: `${i}`,
    title: t,
    image: imageFor(t, scope, 0),
    hoverImage: scope === "store" ? imageFor(t, scope, 1) : undefined,
    shape: shapeFor(i),
    price: basePrice ? formatPrice(basePrice, i) : undefined,
  }));


// ───────────────────────────────────────────────────────────
// INTERIOR MODULES (15 modules × 20 directions)
// ───────────────────────────────────────────────────────────

const r = (titles: string[], img: string) => makeItems(titles, [img, ...interiorPool]);

export const interiorCategories: Category[] = [
  {
    slug: "kitchen", name: "Kitchen", tagline: "Modular ateliers for the modern home", image: kitchen,
    description: "From a foldable breakfast nook to a marble galley with arched pantry — every kitchen we build is calibrated to the way you live, cook, and gather.",
    items: r([
      "Striking Kitchen With Foldable Breakfast Table","Modern Parallel Kitchen In Sage Green","Pastel Blue Kitchen With Classic Detailing",
      "Spacious Modular Kitchen With Island Counter","Walnut & Brass U-Shaped Family Kitchen","Marble Galley Kitchen With Arched Pantry",
      "Open Plan Kitchen With Indoor Herb Garden","Bistro Kitchen With Brass Pendants","Compact L-Shape Kitchen In Antique Ivory",
      "Heritage Kitchen With Hand-Painted Tile Backsplash","Two-Tone Kitchen In Cream And Charcoal","Show Kitchen With Glass Display Cabinetry",
      "Family Kitchen With Cushioned Banquette","Italian Trattoria Inspired Kitchen","Minimalist Stone Kitchen With Brass Inlay",
      "Vintage English Country Kitchen","Statement Kitchen With Verde Marble Hood","Smart Kitchen With Concealed Appliances",
      "Coastal Kitchen With Whitewashed Oak","Royal Kitchen With Carved Wood Cornice",
    ], kitchen),
  },
  {
    slug: "bedroom", name: "Bedroom", tagline: "Sanctuaries of rest and ritual", image: bedroom,
    description: "Curtained four-posters, velvet headboards, hand-painted ceilings — the bedroom is the most personal room in the house, and we treat it that way.",
    items: r([
      "Master Suite With Marble Feature Wall","Romantic Four-Poster Bedroom In Ivory","Velvet Headboard Bedroom With Brass Lamps",
      "Compact Guest Bedroom In Sage And Linen","Children's Bedroom With Carved Wood Bed","Penthouse Bedroom With Floor-To-Ceiling Drapes",
      "Hill-Side Bedroom With Wooden Beams","Art Deco Inspired Bedroom Suite","Bridal Suite With Gilded Mirror Wall",
      "Bohemian Bedroom With Layered Textiles","Library Bedroom With Built-In Shelves","Minimalist Japandi Bedroom",
      "Boudoir With Vintage Vanity And Tufted Bench","Grandparent's Bedroom With Heritage Trunks","Loft Bedroom With Skylight And Reading Nook",
      "Tropical Bedroom With Rattan Headboard","Hotel-Style Bedroom With Wardrobe Wall","Romantic Bedroom In Blush And Burgundy",
      "Mountain View Bedroom With Stone Wall","Royal Bedroom With Hand-Painted Ceiling",
    ], bedroom),
  },
  {
    slug: "living", name: "Living Room", tagline: "Rooms designed for slow conversation", image: living,
    description: "The living room sets the tonality of the whole house. We design rooms that invite slow conversation, deep reading, and the long unwinding evening.",
    items: r([
      "Formal Drawing Room With Marble Fireplace","Family Living Room With Modular Sectional","Conversation Pit With Velvet Banquette",
      "Library Living Room With Walnut Panels","Open Plan Living With Dining Integration","Living Room With Indoor Garden",
      "Heritage Living Room With Frescoed Ceiling","Compact Apartment Living With Built-Ins","Penthouse Lounge With Sculptural Sofa",
      "Coastal Living Room With Linen And Rattan","Living Room With Gilded Cornicing","Industrial Loft Living With Brick & Brass",
      "Mid-Century Modern Living Room","Living Room With Curated Art Wall","Living Room With Tea Service Nook",
      "Maximalist Living Room In Jewel Tones","Living Room With Carved Marble Pillars","Music Room With Grand Piano",
      "Living Room With Bay Window Reading Seat","Royal Living Room With Crystal Chandelier",
    ], living),
  },
  {
    slug: "bathroom", name: "Bathroom", tagline: "Marble, water, light", image: bathroom,
    description: "Onyx and brass, clawfoot tubs, garden showers — the bathroom is a private chapel. We design it as carefully as the most public room in the house.",
    items: r([
      "Master Bath With Freestanding Clawfoot Tub","Powder Room In Verde Marble","Bathroom With Brass Rain Shower",
      "His & Hers Vanity With Carrara Counter","Spa Bathroom With Teak Wood Floor","Compact Bathroom With Arched Mirror",
      "Bathroom With Hand-Painted Tile Floor","Bathroom With Skylight And Stone Tub","Vintage Bathroom With Pedestal Sink",
      "Onyx Bathroom With Backlit Walls","Garden Bathroom With Open Air Shower","Bathroom With Carved Wood Vanity",
      "Bathroom In Ivory And Antique Brass","Children's Bathroom With Soft Pastels","Guest Bathroom With Wallpapered Walls",
      "Bathroom With Mosaic Floor Medallion","Bathroom With Brass Heated Towel Rail","Bathroom With Stained Glass Window",
      "Bathroom With Sunken Soaking Tub","Royal Hammam-Inspired Bathroom",
    ], bathroom),
  },
  {
    slug: "pooja", name: "Pooja Room", tagline: "Sacred geometry, gentle light", image: pooja,
    description: "Sandalwood, marble, brass bells, and jaali screens — the pooja room is the spiritual centre of the home. Every detail is sourced and crafted with reverence.",
    items: r([
      "Carved Teak Mandir With Marble Inlay","Compact Pooja Niche With Brass Doors","Pooja Room With Hand-Painted Murals",
      "Sandalwood Mandir With Jaali Screen","Marble Pooja Room With Backlit Idols","Modern Pooja With Walnut & Brass Detail",
      "Pooja Room With Curved Stone Arch","Pooja Corner Within Living Room","Traditional South Indian Pooja Room",
      "Pooja Room With Floral Stone Carving","Compact Apartment Pooja Cabinet","Pooja Room With Glass Doors And Mirror",
      "Sacred Space With Hanging Brass Bells","Pooja Room With Mango Wood Pillars","Heritage Style Pooja Room",
      "Pooja Room With Carved Ceiling","Minimal Marble Mandir","Pooja Room With Hand-Embroidered Drape",
      "Granite Pooja With Antique Doors","Royal Pooja Hall With Crystal Diyas",
    ], pooja),
  },
  {
    slug: "dining", name: "Dining Room", tagline: "Tables that hold stories", image: dining,
    description: "The dining table is where memory is made. We design rooms around the food, the light, and the people who will sit there for the next thirty years.",
    items: r([
      "Formal Dining With 12-Seater Walnut Table","Cozy Dining Nook With Banquette","Dining Room With Marble Pedestal Table",
      "Garden Dining Room With Glass Walls","Dining With Antique Brass Chandelier","Heritage Dining With Carved Sideboard",
      "Family Dining With Round Marble Top","Penthouse Dining With City View","Dining Room In Forest Green And Brass",
      "Coastal Dining With Rattan Chairs","Compact Apartment Dining Wall Booth","Dining Room With Built-In China Cabinet",
      "Dining Room With Mirrored Walls","Italian-Style Dining With Frescoed Ceiling","Modern Glass Dining With Velvet Chairs",
      "Dining With Hand-Painted Wallpaper","Royal Dining Hall With Crystal Lighting","Bistro Dining Corner With Bar Cabinet",
      "Outdoor Pergola Dining With Lantern Light","Tea Room With Wing Chairs And Side Table",
    ], dining),
  },
  {
    slug: "balcony", name: "Balcony & Verandah", tagline: "Where the day softens", image: balcony,
    description: "Jasmine pergolas, terracotta floors, brass lanterns, and a single carved chair. Balconies are the most underrated room in the Indian home.",
    items: r([
      "Jasmine Pergola Balcony With Rattan Chairs","Compact Balcony Garden With Brass Lanterns","Sit-Out Balcony With Pebble Floor",
      "Balcony With Hanging Lounge Chair","Heritage Verandah With Stone Columns","Balcony Library With Wooden Shelving",
      "Romantic Balcony With Bistro Set","Long Balcony With Day Bed","Apartment Balcony With Vertical Garden",
      "Balcony With Terracotta Tiled Floor","Wraparound Balcony With Café Table","Balcony With Hammock And Drapery",
      "Penthouse Balcony With Plunge Pool","Balcony With Trellis And Bougainvillea","Reading Balcony With Marble Top Table",
      "Balcony With Outdoor Daybed Swing","Tea Balcony With Carved Brass Tray Table","Balcony With Statement Mosaic Tiles",
      "Compact Tropical Balcony Retreat","Royal Balcony Lounge With Drapes",
    ], balcony),
  },
  {
    slug: "study", name: "Study & Library", tagline: "Quiet rooms for work and wonder", image: study,
    description: "Walnut shelves, brass banker's lamps, leather chairs, and the smell of old books. The study is where the family's mind is kept.",
    items: r([
      "Walnut Library With Chesterfield Sofa","Compact Home Office With Built-In Desk","Founder's Study With Brass Lamp",
      "Library Wall With Rolling Ladder","Study With Inset Reading Nook","Modern Study With Curved Bookshelf",
      "Heritage Study With Globe Bar","Garden Study With Glass Roof","Children's Study With Custom Joinery",
      "Apartment Study With Hidden Bar","Library Lounge With Velvet Chairs","Study With Concealed Filing Cabinetry",
      "Study With Hand-Painted Map Wall","Library With Spiral Staircase","Study With Antique Drafting Table",
      "Study With Curated Object Wall","Reading Snug With Window Seat","Study With Brass Banker's Lamp Trio",
      "Library With Sliding Walnut Doors","Royal Study With Carved Mantel",
    ], study),
  },
  {
    slug: "wardrobe", name: "Wardrobe", tagline: "Atelier-grade walk-in dressing rooms", image: wardrobe,
    description: "Mirrored islands, tweed-lined drawers, backlit jewellery vitrines. Our wardrobes are designed like couture ateliers — for the way clothes deserve to be kept.",
    items: r([
      "Walk-In Wardrobe With Mirrored Island","Compact Sliding Wardrobe In Walnut","Boutique Wardrobe With Display Cabinets",
      "His & Hers Twin Wardrobe Suite","Wardrobe With Vanity And Velvet Bench","Tall Wardrobe With Brass Inlay",
      "Wardrobe With Glass Display For Handbags","Wardrobe With Backlit Jewelry Drawers","Heritage Wardrobe With Carved Doors",
      "Minimal Wardrobe With Hidden Handles","Wardrobe With Tweed-Lined Drawers","Wardrobe With Sliding Mirror Doors",
      "Wardrobe With Built-In Shoe Wall","Wardrobe With Centre Chandelier","Wardrobe With Reading Corner",
      "Wardrobe With Bar Cabinet Section","Wardrobe With Marble Top Island","Wardrobe With Custom Tie & Cufflink Tray",
      "Apartment Wardrobe With Folding Doors","Royal Walk-In With Frescoed Ceiling",
    ], wardrobe),
  },
  {
    slug: "restaurant", name: "Restaurant", tagline: "Dining rooms that perform", image: hotelLobby,
    description: "From a candlelit fine-dining room to a buzzing all-day café — restaurant interiors that are designed to be lived in by hundreds of guests a night.",
    items: r([
      "Candlelit Fine Dining With Banquette","French Bistro With Tiled Floor","Italian Trattoria With Pizza Oven",
      "Modern Indian Restaurant With Jaali Screens","Tropical Restaurant With Cane Chairs","Speakeasy Restaurant With Velvet Booths",
      "Heritage Restaurant With Frescoed Ceiling","Garden Restaurant Under Pergola","Mediterranean Tavern In Whitewash",
      "Asian Fusion Restaurant With Brass Lanterns","Sushi Counter With Hinoki Wood","Tapas Bar With Marble Counter",
      "Wine Bar With Walnut Shelving","Open Kitchen Restaurant With Show Pass","Family Restaurant With Round Tables",
      "Skyline Restaurant With Floor-To-Ceiling Glass","Courtyard Restaurant With Fountain","Rustic Farm-To-Table Dining",
      "Tea Lounge With Carved Wood Pillars","Royal Banquet Restaurant With Chandeliers",
    ], hotelLobby),
  },
  {
    slug: "cafe", name: "Café", tagline: "All-day rooms with great coffee", image: dining,
    description: "Reading rooms with espresso bars, plant-filled corners, and the kind of furniture you can sit in for four hours without noticing.",
    items: r([
      "Library Café With Walnut Shelving","Garden Café With Skylight","Compact Espresso Bar In Brass",
      "Bistro Café With Tiled Counter","Reading Café With Window Seats","Café With Marble Top Tables",
      "Industrial Café In Brick And Brass","Tropical Café With Rattan Chairs","Bookshop Café Lounge",
      "Pastry Café With Display Counter","Bakery Café With Open Kitchen","Apartment-Style Café With Sofas",
      "Heritage Tea Room","Compact Sidewalk Café","Rooftop Café With Pergola",
      "Café With Vintage Map Wall","Café With Hand-Painted Tiles","Coffee Tasting Bar With Stools",
      "Café With Curated Art Wall","Romantic Café In Blush And Brass",
    ], dining),
  },
  {
    slug: "hotel-lobby", name: "Hotel Lobby", tagline: "First room of the hospitality story", image: hotelLobby,
    description: "Lobbies that set the tone for the whole stay — chandeliers, carved reception desks, layered seating, and the right material at the right scale.",
    items: r([
      "Grand Hotel Lobby With Crystal Chandelier","Boutique Hotel Lobby With Velvet Lounges","Heritage Palace Lobby With Frescoed Ceiling",
      "Modern Hotel Lobby With Sculptural Lighting","Tropical Resort Lobby With Open Air","Mountain Lodge Lobby With Stone Fireplace",
      "Art Deco Hotel Lobby With Brass","Wellness Resort Lobby With Indoor Garden","Compact City Hotel Lobby",
      "Lobby With Carved Marble Reception","Lobby With Library Lounge","Lobby With Sunken Conversation Pit",
      "Lobby In Forest Green And Walnut","Heritage Lobby With Mosaic Floor","Lobby With Tea Service Counter",
      "Beach Resort Lobby With Linen And Rattan","Lobby With Hand-Painted Ceiling","Lobby With Brass Pendant Cluster",
      "Lobby With Indoor Fountain","Royal Lobby With Vintage Lifts",
    ], hotelLobby),
  },
  {
    slug: "party-hall", name: "Banquet & Party Hall", tagline: "Rooms designed for celebration", image: hotelFacade,
    description: "Wedding halls, banquets, and private celebration rooms — designed for the chandelier moment and the quiet afterparty alike.",
    items: r([
      "Crystal Chandelier Banquet Hall","Garden Wedding Pavilion","Heritage Haveli Wedding Hall",
      "Compact Engagement Suite","Sangeet Hall With Stage And Dance Floor","Reception Hall In Ivory And Gold",
      "Mehendi Hall With Floral Drapery","Cocktail Lounge Banquet","Boardroom Banquet With Long Table",
      "Banquet With Frescoed Ceiling","Family Celebration Hall","Banquet With Marble Pillars",
      "Indoor-Outdoor Banquet With Garden","Royal Darbar Hall","Banquet With Velvet Drapery",
      "Banquet With Carved Stage","Banquet With Sunken Seating","Banquet With Glass Walls",
      "Heritage Banquet In Oxblood","Royal Wedding Hall With Hand-Painted Ceiling",
    ], hotelFacade),
  },
  {
    slug: "boutique-retail", name: "Boutique & Retail", tagline: "Stores that feel like rooms", image: foyer,
    description: "Fashion ateliers, jewellery vitrines, perfumeries, and concept stores — retail interiors that hold the brand and the merchandise in the same breath.",
    items: r([
      "Fashion Atelier With Mirrored Fitting Rooms","Jewellery Boutique With Backlit Vitrines","Perfume Boutique With Brass Display",
      "Bridal Couture Salon","Menswear Boutique With Walnut Panels","Concept Store With Curated Object Wall",
      "Children's Boutique With Soft Pastels","Sari Showroom With Carved Pillars","Eyewear Boutique With Brass Trays",
      "Watch Boutique With Velvet Display","Shoe Boutique With Sliding Walnut Doors","Heritage Saree Showroom",
      "Modern Apparel Boutique","Boutique With Carved Stone Arches","Boutique With Hand-Painted Walls",
      "Boutique With Tea Lounge","Pop-Up Boutique With Wood Crate Display","Compact Apartment Boutique",
      "Lingerie Boutique With Blush Velvet","Royal Boutique With Crystal Chandelier",
    ], foyer),
  },
  {
    slug: "spa", name: "Spa & Wellness", tagline: "Rooms that breathe", image: pool,
    description: "Hammams, treatment suites, yoga halls, sound baths — wellness interiors that lower your blood pressure the moment you step in.",
    items: r([
      "Marble Hammam With Brass Fixtures","Compact Apartment Spa Room","Couple's Treatment Suite With Tub",
      "Yoga Hall With Wooden Floor","Sound Bath Room With Linen Drapes","Sauna With Hinoki Wood",
      "Outdoor Spa With Plunge Pool","Spa Reception With Indoor Garden","Foot Spa Lounge With Carved Chairs",
      "Salt Therapy Room","Massage Suite With Skylight","Heritage Ayurveda Treatment Room",
      "Modern Spa With Backlit Stone","Hot Stone Treatment Room","Facial Suite With Vanity",
      "Pool Side Cabana Spa","Spa With Hand-Painted Murals","Spa With Marble Steam Room",
      "Compact Day Spa With Curtained Booths","Royal Wellness Suite With Domed Ceiling",
    ], pool),
  },
];

// ───────────────────────────────────────────────────────────
// STORE — collections with 30 named varieties + prices
// ───────────────────────────────────────────────────────────

const sofaTitles = [
  "Emerald Velvet Camelback Sofa","Oxblood Chesterfield Three-Seater","Ivory Linen Curved Sofa",
  "Walnut & Cane Bench Sofa","Brass-Leg Tufted Settee","Sage Linen Loveseat",
  "Tuxedo Sofa In Bottle Green","Carved Mahogany Sofa Set","Boucle Cloud Sofa",
  "Persian Print Daybed","Floral Damask Couch","Modern Curve Sofa In Cream",
  "Wingback Heritage Sofa","Velvet Banquette In Ruby","Channel Tufted Brass Foot Sofa",
  "Art Deco Curved Sofa","Compact Apartment Settee","Carved Wood Bench With Bolsters",
  "Tropical Cane Sofa In Teak","Two-Tone Velvet Sofa","Florentine Carved Sofa",
  "Burgundy Tuxedo Loveseat","Linen Slipcover Family Sofa","Curved Boucle Banquette",
  "Brass Frame Cocktail Sofa","Velvet Pillback Settee","Carved Walnut Daybed",
  "Modular Plaster Sofa","Heritage Carved Throne Sofa","Royal Three-Piece Suite",
];

const chairTitles = [
  "Oxblood Velvet Tub Chair","Carved Walnut Side Chair","Brass-Studded Wingback",
  "Sage Linen Slipper Chair","Cane & Teak Lounge","Cream Boucle Armchair",
  "Tufted Bergère Chair","Mid-Century Lounge In Tan","Folding Heritage Chair",
  "Carved Throne Chair","Curved Velvet Slipper","Antique Brass Bistro Chair",
  "Reading Chair With Footstool","Apartment Accent Chair","Persian Print Wing Chair",
  "Garden Cane Chair","Office Library Chair","Studded Leather Club Chair",
  "Black Velvet Cocktail Chair","Heritage Dining Side Chair","Louis XVI Bergère",
  "Bamboo Spindle Chair","Carved Peacock Chair","Tufted Hostess Chair",
  "Brass Frame Lounge Chair","Vintage Folding Director Chair","Curved Boucle Pod Chair",
  "Brass & Marble Vanity Chair","Carved Wedding Chair","Royal Carved Armchair",
];

const tableTitles = [
  "Walnut Marquetry Dining Table","Carved Pedestal Round Table","Brass-Trim Coffee Table",
  "Carrara Marble Side Table","Heritage Refectory Table","Compact Café Bistro Table",
  "Sculpted Plaster Console","Cane & Glass Console","Mid-Century Walnut Side Table",
  "Vintage Brass Tray Table","Stone Top Garden Table","Carved Teak Dining Table",
  "Round Marble Coffee Table","Drop-Leaf Country Table","Lacquered Game Table",
  "Burl Veneer Centre Table","Art Deco Console","Carved Console With Mirror",
  "Onyx Top Cocktail Table","Compact Apartment Dining Table","Heritage Writing Desk",
  "Carved Marble Side Table","Folding Picnic Table","Modern Plaster Console",
  "Brass Drum Side Table","Walnut Library Table","Glass Top Lattice Table",
  "Carved Wedding Table","Heritage Tea Table","Royal Inlaid Dining Table",
];

const chandelierTitles = [
  "Murano Crystal Chandelier","Brass Cascading Chandelier","Hand-Blown Globe Chandelier",
  "Heritage Bohemian Crystal","Art Deco Tiered Chandelier","Compact Brass Pendant Cluster",
  "Carved Wood & Crystal Chandelier","Rock Crystal Chandelier","Iron & Glass Lantern Chandelier",
  "Mid-Century Sputnik Chandelier","Linen Drum Chandelier","Beaded Bone Chandelier",
  "Brass Sunburst Chandelier","Vintage Opaline Chandelier","Tropical Rattan Chandelier",
  "Carved Marble Pendant","Glass Bell Cluster","Italian Murano Cluster",
  "Antique Brass Lantern","Frosted Glass Tier","Royal Crystal Tiered Chandelier",
  "Hand-Forged Iron Chandelier","Mughal Carved Brass Lantern","Carved Wood Beaded Chandelier",
  "Heritage Banker's Glass","Compact Brass Pendant","Capiz Shell Chandelier",
  "Carved Stone Pendant","Smoked Glass Tier","Royal Darbar Chandelier",
];

const wallTitles = [
  "Gilded Sunburst Mirror","Carved Walnut Frame Mirror","Heritage Venetian Mirror",
  "Carved Wood Wall Sconce","Hand-Painted Wall Mural","Mosaic Tile Wall Panel",
  "Brass Wall Lantern Pair","Carved Stone Relief","Vintage Map Framed Print",
  "Persian Carpet Wall Hanging","Botanical Print Set","Carved Wood Console Mirror",
  "Embroidered Wall Tapestry","Heritage Brass Wall Plate","Hand-Painted Tile Panel",
  "Carved Marble Niche Sculpture","Brass Wall Bracket Pair","Carved Wood Coat Rack",
  "Vintage Travel Poster Set","Carved Window Frame","Gilded Picture Frame Set",
  "Bone Inlay Wall Mirror","Carved Stone Plaque","Hand-Painted Botanical Set",
  "Compact Apartment Gallery Wall","Carved Wood Wall Bracket","Heritage Carved Mirror",
  "Royal Carved Wall Panel","Brass Cherub Wall Plaque","Gilded Saint Sculpture",
];

const rugTitles = [
  "Persian Tabriz Wool Rug","Kashmir Silk Rug","Heritage Bidjar Carpet",
  "Antique Heriz Rug","Vintage Kilim Rug","Modern Geometric Rug",
  "Hand-Knotted Wool Rug","Compact Apartment Runner","Carpet With Floral Medallion",
  "Carved Wool Berber Rug","Vintage Turkish Oushak","Hand-Tufted Cotton Dhurrie",
  "Silk Hereke Rug","Modern Boucle Wool Rug","Compact Bistro Runner",
  "Tribal Baluch Rug","Heritage Mahal Rug","Cotton Striped Dhurrie",
  "Carved Wool Tiger Rug","Hand-Knotted Carpet With Hunting Scene","Royal Persian Carpet",
  "Compact Bedroom Runner","Carpet With Birds Of Paradise","Hand-Tufted Wool Shag",
  "Heritage Caucasian Rug","Carved Wool Floral Rug","Indo-Tibetan Wool Rug",
  "Carpet With Mughal Garden Pattern","Cotton Apartment Rug","Royal Silk Medallion",
];

// New categories
const clockTitles = [
  "Carved Wood Long-Case Clock","Heritage Brass Mantel Clock","Vintage Anniversary Glass Clock",
  "Wall Carved Pendulum Clock","Compact Bedside Brass Clock","Marble Pillar Mantel Clock",
  "Art Deco Bakelite Clock","Hand-Painted Cuckoo Clock","Bracket Clock With Carved Crest",
  "Carriage Clock With Brass Handle","Vintage Train Station Clock","Heritage Tower Clock Replica",
  "Brass Globe Desk Clock","Carved Stone Sundial","Compact Travel Clock With Leather",
  "Carved Walnut Wall Clock","Skeleton Clock With Visible Gears","Vintage Railway Clock",
  "Brass Ship's Bell Clock","Carved Mantel With Cherub","Royal Carved Long-Case",
  "Hand-Painted Floral Wall Clock","Heritage Gilded Wall Clock","Compact Apartment Wall Clock",
  "Carved Marble Mantel","Vintage Pocket Watch Display","Brass Carriage Clock With Alarm",
  "Carved Wedding Clock","Heritage Pendulum Wall","Royal Frescoed Mantel Clock",
];

const marbleTitles = [
  "Carrara White Marble Slab","Calacatta Gold Marble","Statuario Marble Block",
  "Verde Marble Bookmatched Pair","Onyx Marble Backlit Slab","Travertine Honed Slab",
  "Black Marquina Marble","Emperador Brown Marble","Crema Marfil Cream Marble",
  "Portoro Black & Gold","Rosso Levanto Burgundy","Rain Forest Brown",
  "Rainforest Green Marble","Botticino Beige","Nero Marquina Honed",
  "Italian Bardiglio Grey","White Thassos Slab","Madrigal Pink Marble",
  "Indian Makrana White","Indian Rajnagar White","Banswara White Marble",
  "Indian Green Marble","Indian Black Marble","Italian Lasa White",
  "Calacatta Borghini","Verde Alpi","Breccia Aurora",
  "Compact Mosaic Marble Tile","Heritage Marble Inlay Panel","Royal Pietra Dura Inlay",
];

const mirrorTitles = [
  "Venetian Etched Mirror","Carved Walnut Frame Mirror","Gilded Sunburst Mirror",
  "Compact Vanity Mirror","Carved Bone Inlay Mirror","Heritage Brass Frame Mirror",
  "Bevelled Edge Floor Mirror","Carved Wood Console Mirror","Antique Pier Mirror",
  "Hand-Painted Frame Mirror","Carved Stone Wall Mirror","Compact Round Brass Mirror",
  "Carved Mango Wood Mirror","Vintage Theatre Backstage Mirror","Carved Coral Frame Mirror",
  "Heritage Mughal Mirror","Brass Filigree Mirror","Carved Floor Cheval Mirror",
  "Compact Apartment Mirror Pair","Carved Wedding Mirror","Royal Carved Mirror",
  "Carved Lotus Frame Mirror","Brass Octagonal Mirror","Carved Sunray Mirror",
  "Antique Convex Mirror","Vintage Barber's Mirror","Carved Mahogany Wall Mirror",
  "Compact Round Cane Mirror","Heritage Carved Trumeau","Royal Gilded Pier Mirror",
];

const vaseTitles = [
  "Hand-Thrown Stoneware Vase","Tall Hammered Brass Vase","Compact Apartment Bud Vase",
  "Carved Marble Urn","Heritage Cloisonné Vase","Hand-Painted Porcelain Vase",
  "Vintage Glass Apothecary Jar","Carved Soapstone Urn","Brass Trumpet Vase",
  "Tall Floor Vase In Linen","Carved Wood Tea Caddy","Heritage Persian Blue Vase",
  "Hand-Glazed Celadon Vase","Compact Bistro Bud Vase","Carved Bone Vase",
  "Brass Moroccan Vase","Carved Marble Sphere Vase","Heritage Carved Stone Urn",
  "Vintage Crystal Vase","Carved Mango Wood Vase","Royal Carved Brass Urn",
  "Carved Coral Vase","Hand-Thrown Earthenware","Carved Lotus Vase",
  "Compact Apartment Vase Pair","Carved Soapstone Tealight","Brass Carved Urn",
  "Heritage Hand-Painted Vase","Carved Wedding Vase","Royal Carved Floor Urn",
];

const lampTitles = [
  "Brass Banker's Desk Lamp","Carved Marble Table Lamp","Heritage Tiffany Stained Glass",
  "Vintage Camera Tripod Floor Lamp","Compact Apartment Reading Lamp","Carved Wood Tripod Lamp",
  "Linen Drum Floor Lamp","Brass Swing Arm Wall Lamp","Carved Stone Table Lamp",
  "Heritage Brass Lantern","Vintage Hurricane Lamp","Compact Brass Bedside Lamp",
  "Carved Wood Lotus Lamp","Hand-Painted Porcelain Lamp","Carved Coral Lamp",
  "Brass Library Floor Lamp","Vintage Theatre Stage Lamp","Carved Mango Wood Lamp",
  "Compact Apartment Pendant Lamp","Carved Marble Floor Lamp","Royal Carved Floor Lamp",
  "Brass Carved Wall Sconce","Carved Lotus Pendant","Heritage Banker's Floor Lamp",
  "Compact Bistro Table Lamp","Carved Stone Sphere Lamp","Brass Adjustable Floor Lamp",
  "Carved Wedding Lamp Pair","Heritage Carved Pendant","Royal Crystal Table Lamp",
];

const artTitles = [
  "Vintage Botanical Print Set","Hand-Painted Rajasthani Miniature","Heritage Tanjore Painting",
  "Carved Wood Folk Mask","Compact Apartment Gallery Set","Hand-Painted Pichwai",
  "Antique Persian Calligraphy","Vintage Travel Poster Trio","Carved Stone Relief",
  "Hand-Painted Mughal Miniature","Compact Black & White Photograph","Vintage Atlas Print",
  "Heritage Madhubani Painting","Hand-Embroidered Wall Hanging","Carved Wood Folk Statue",
  "Vintage Architectural Print","Compact Apartment Single Frame","Heritage Phad Painting",
  "Modern Abstract On Linen","Carved Marble Sculpture","Royal Carved Bronze",
  "Vintage Map Of India","Hand-Painted Cherub","Compact Botanical Trio",
  "Heritage Warli Painting","Modern Cyanotype Print","Carved Folk Toy Display",
  "Compact Apartment Photograph","Heritage Carved Frame","Royal Hand-Painted Mural",
];

const textileTitles = [
  "Hand-Block Printed Cushion","Carved Wood Bedside Throw","Heritage Pashmina Throw",
  "Compact Apartment Cushion Set","Vintage Embroidered Cushion","Silk Banarasi Cushion",
  "Linen Curtain Pair","Hand-Loomed Cotton Throw","Heritage Kashmir Shawl",
  "Vintage Quilt In Indigo","Compact Bedside Runner","Velvet Pillow With Brass Trim",
  "Carved Wood Block Print Pair","Hand-Embroidered Bed Cover","Compact Apartment Throw",
  "Vintage Suzani Throw","Linen Banquet Tablecloth","Block Print Napkin Set",
  "Compact Bistro Table Runner","Carved Wedding Throw","Royal Embroidered Cover",
  "Compact Bedroom Throw","Vintage Kantha Quilt","Heritage Patola Throw",
  "Hand-Embroidered Cushion Set","Linen Bath Robe","Compact Apartment Bed Runner",
  "Carved Wedding Bedspread","Heritage Brocade Cushion","Royal Silk Bed Cover",
];

const bookTitles = [
  "American Modern — Thomas O'Brien","Interiors — Axel Vervoordt","Patina — Christiane Lemieux",
  "Casa Atelier — Pinto","Indian Interiors — Sunil Sethi","Heritage Indian Architecture",
  "Vogue Living — Hamish Bowles","Compact Apartment Library Vol. I","The English House — Ben Pentreath",
  "Made In India — Saloni Lodha","Aero — Thomas O'Brien","Out of the Woods — Hans Blomquist",
  "House As A Mirror Of Self","The Selby Is In Your Place","Compact Apartment Library Vol. II",
  "Maison & Jardin","Casa Brutus Vintage Set","Heritage Photography Of India",
  "Modern Indian Architecture","Royal Palaces Of India","Compact Library Set Of 5",
  "Architectural Digest Vintage Set","Vintage Travel Book Collection","Heritage Cookbook Set",
  "Compact Bedroom Reading Set","Vintage Penguin Classics Set","Heritage Folk Art Set",
  "Modern Photography Set","Royal Carved Book Slipcase","Royal Leather-Bound Set",
];

const storeBaseCount = 30;
const titlesFor = (arr: string[]) => arr.slice(0, storeBaseCount);

export const storeCategories: Category[] = [
  { slug: "sofas", name: "Sofas", tagline: "Heritage seating, modern comfort", image: sofa,
    description: "Camelback velvets, oxblood Chesterfields, walnut and cane benches — sofas built by hand by craftsmen we've worked with for years.",
    items: makeItems(titlesFor(sofaTitles), [sofa, chair], 85000, "store") },
  { slug: "chairs", name: "Chairs", tagline: "Accent chairs & lounges", image: chair,
    description: "From a velvet tub chair to a carved peacock throne — every chair in the collection is a piece of architecture you can move.",
    items: makeItems(titlesFor(chairTitles), [chair, sofa], 22000, "store") },
  { slug: "tables", name: "Tables", tagline: "Dining, side, console — every kind", image: table,
    description: "Walnut marquetry, carved marble, brass-trim — tables in every scale, sourced from heritage workshops across India and Europe.",
    items: makeItems(titlesFor(tableTitles), [table], 38000, "store") },
  { slug: "chandeliers", name: "Chandeliers", tagline: "Light as architecture", image: chandelier,
    description: "Murano crystal, hand-forged iron, rock crystal, and Mughal brass — chandeliers chosen one room at a time.",
    items: makeItems(titlesFor(chandelierTitles), [chandelier], 145000, "store") },
  { slug: "wall", name: "Wall Hangings", tagline: "Gilded mirrors & framed art", image: wall,
    description: "Venetian mirrors, carved wood brackets, hand-painted tile panels — the wall is the most underused canvas in the home.",
    items: makeItems(titlesFor(wallTitles), [wall], 18000, "store") },
  { slug: "rugs", name: "Rugs", tagline: "Hand-knotted floor stories", image: rug,
    description: "Persian Tabriz, Kashmir silk, Tibetan wool, cotton dhurries — every rug is hand-knotted by master weavers.",
    items: makeItems(titlesFor(rugTitles), [rug], 65000, "store") },
  { slug: "clocks", name: "Clocks", tagline: "Time, well kept", image: chandelier,
    description: "Long-case clocks, brass mantel clocks, vintage carriage clocks — instruments that mark time with grace.",
    items: makeItems(titlesFor(clockTitles), [chandelier, wall], 24000, "store") },
  { slug: "marbles", name: "Marbles", tagline: "The bones of the heritage home", image: bathroom,
    description: "Italian Carrara, Indian Makrana, Verde, Onyx, Calacatta — marble slabs sourced direct from quarries and our trusted yards.",
    items: makeItems(titlesFor(marbleTitles), [bathroom, wall], 9500, "store") },
  { slug: "mirrors", name: "Mirrors", tagline: "Reflection, framed", image: wall,
    description: "Venetian, Mughal, Carved wood and gilded — mirrors that frame a room, not just a face.",
    items: makeItems(titlesFor(mirrorTitles), [wall, chair], 28000, "store") },
  { slug: "vases", name: "Vases & Urns", tagline: "Vessels for flowers and quiet", image: chandelier,
    description: "Hand-thrown stoneware, hammered brass, carved marble, Persian blue porcelain.",
    items: makeItems(titlesFor(vaseTitles), [chandelier, wall], 7500, "store") },
  { slug: "lamps", name: "Lamps", tagline: "Table, floor, wall", image: chandelier,
    description: "Banker's lamps, tripod floor lamps, carved marble bases — every lamp earns the surface it sits on.",
    items: makeItems(titlesFor(lampTitles), [chandelier], 18500, "store") },
  { slug: "art", name: "Art", tagline: "Botanicals, miniatures, photography", image: wall,
    description: "Rajasthani miniatures, Tanjore paintings, vintage botanicals, contemporary cyanotypes.",
    items: makeItems(titlesFor(artTitles), [wall, foyer], 32000, "store") },
  { slug: "textiles", name: "Textiles", tagline: "Cushions, throws, curtains", image: rug,
    description: "Hand-block printed cottons, Kashmir pashmina, Banarasi silks, vintage kantha — the soft language of the room.",
    items: makeItems(titlesFor(textileTitles), [rug, wall], 6800, "store") },
  { slug: "books", name: "Books", tagline: "The library, edited", image: study,
    description: "Curated rare editions and modern monographs — interiors, architecture, photography, food, and the long Indian shelf.",
    items: makeItems(titlesFor(bookTitles), [study, wall], 3800, "store") },
];

// ───────────────────────────────────────────────────────────
// HOME
// ───────────────────────────────────────────────────────────

export const featuredProjects = [
  { name: "Kohli Residence", type: "Private Villa", year: "2024", image: modernVilla, location: "New Delhi" },
  { name: "Sharma Residence", type: "Family Home", year: "2023", image: villa, location: "Chandigarh" },
  { name: "Expansion Villa Interior", type: "Interior", year: "2024", image: living, location: "Gurugram" },
  { name: "Exterior Elevation Series", type: "Architecture", year: "2023", image: villa, location: "Punjab" },
  { name: "Aurelia Hotel Lobby", type: "Hospitality", year: "2024", image: hotelLobby, location: "Mumbai" },
  { name: "Maison Curve Façade", type: "Hospitality", year: "2024", image: hotelFacade, location: "Bengaluru" },
  { name: "Grand Foyer Commission", type: "Residence", year: "2022", image: foyer, location: "Lucknow" },
  { name: "Lagoon Pool House", type: "Resort", year: "2024", image: pool, location: "Goa" },
  { name: "Heritage Dining Hall", type: "Restaurant", year: "2024", image: dining, location: "Jaipur" },
  { name: "Walnut Library Apartment", type: "Residence", year: "2023", image: study, location: "Pune" },
  { name: "Carved Bedroom Suite", type: "Residence", year: "2024", image: bedroom, location: "Hyderabad" },
  { name: "Marble Bath Commission", type: "Residence", year: "2023", image: bathroom, location: "Kolkata" },
  { name: "Pooja Hall Restoration", type: "Heritage", year: "2024", image: pooja, location: "Varanasi" },
  { name: "Jasmine Verandah", type: "Heritage", year: "2023", image: balcony, location: "Mysuru" },
];

export const testimonials = [
  { quote: "Raunaq brought our home to life with patience and a designer's poetry. Every corner has intention.", author: "Mrs. R. Kohli", role: "Homeowner, Delhi" },
  { quote: "We've worked with many studios. RSD is the only one that listens before it speaks.", author: "Mr. A. Sharma", role: "Founder, Sharma Group" },
  { quote: "An atelier in the truest sense — heritage craft meets contemporary clarity.", author: "Aurelia Hotels", role: "Hospitality Partner" },
];

export const processSteps = [
  { n: "I", title: "Discovery", body: "An unhurried conversation. We understand life, ritual, and the spirit of place before sketching a single line." },
  { n: "II", title: "Concept", body: "Hand sketches, mood boards, and material palettes — the soul of the project is committed to paper." },
  { n: "III", title: "Design Development", body: "Drawings sharpen into 3D models, joinery details, and lighting plans. Every millimetre is considered." },
  { n: "IV", title: "Material & Sourcing", body: "Curated marble, walnut, brass, hand-loomed textiles — sourced from artisans across India and beyond." },
  { n: "V", title: "Execution", body: "Our trusted craftsmen translate drawings into space. Daily site walks. Nothing leaves the floor without our mark." },
  { n: "VI", title: "Styling", body: "Books, ceramics, art, and light — the layers that turn a finished house into a lived-in home." },
  { n: "VII", title: "Handover & Legacy", body: "Walk-throughs, care manuals, and a relationship that outlasts the project. Your home is now part of our archive." },
];
