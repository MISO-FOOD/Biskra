export type Category = "sandwiches" | "milonj" | "specials" | "drinks" | "extras" | "history";
export type SizeKey = "quarter" | "half" | "full";

export interface SizeOptions {
  quarter?: number;
  half?: number;
  full?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description?: string;
  isPopular?: boolean;
  isNew?: boolean;
  spicy?: 0 | 1 | 2 | 3;
  sizes?: SizeOptions;
}

export const SIZE_LABELS: Record<SizeKey, string> = {
  quarter: "نص",
  half: "غير ربع",
  full: "طبق كامل",
};

export const MENU_ITEMS: MenuItem[] = [
  // ── الساندويتشات ──────────────────────────────────────────────
  {
    id: "s_marqaz",
    name: "مرقاز",
    price: 350,
    category: "sandwiches",
    image: "/food/marqaz_fiandashi.png",
    description: "سجق المرقاز المتبل",
    isPopular: true,
    spicy: 2,
    sizes: { quarter: 250, half: 350 },
  },
  {
    id: "s_fiandashi",
    name: "فيونداشي",
    price: 350,
    category: "sandwiches",
    image: "/food/kabda_fiandashi.png",
    description: "لحم مفروم بتتبيلة خاصة",
    isPopular: true,
    spicy: 2,
    sizes: { quarter: 250, half: 350 },
  },
  {
    id: "s_chawarma",
    name: "شاورما",
    price: 350,
    category: "sandwiches",
    image: "/food/marqaz_chawarma.png",
    description: "شاورما دجاج متبلة",
    spicy: 1,
    sizes: { quarter: 250, half: 350 },
  },
  {
    id: "s_kabda",
    name: "كبدة",
    price: 450,
    category: "sandwiches",
    image: "/food/kabda_kabda.png",
    description: "كبدة مقلية بتوابل خاصة",
    isNew: true,
    spicy: 1,
    sizes: { quarter: 350, half: 450 },
  },
  // ── ساندويتش ميلونج ────────────────────────────────────────────
  {
    id: "m_marqaz_fiandashi",
    name: "مرقاز فيونداشي ميلونج",
    price: 450,
    category: "milonj",
    image: "/food/marqaz_fiandashi.png",
    description: "مزيج مرقاز وفيونداشي",
    isPopular: true,
    spicy: 2,
    sizes: { quarter: 350, half: 450, full: 400 },
  },
  {
    id: "m_marqaz_chawarma",
    name: "مرقاز شاورما ميلونج",
    price: 450,
    category: "milonj",
    image: "/food/marqaz_chawarma.png",
    description: "مزيج مرقاز وشاورما",
    spicy: 1,
    sizes: { quarter: 350, half: 450, full: 450 },
  },
  {
    id: "m_marqaz_kabda",
    name: "مرقاز كبدة ميلونج",
    price: 550,
    category: "milonj",
    image: "/food/kabda_chawarma.png",
    description: "مزيج مرقاز وكبدة",
    isNew: true,
    spicy: 3,
    sizes: { quarter: 400, half: 550, full: 450 },
  },
  {
    id: "m_kabda_chawarma",
    name: "كبدة شاورما ميلونج",
    price: 550,
    category: "milonj",
    image: "/food/kabda_chawarma.png",
    description: "مزيج كبدة وشاورما",
    spicy: 1,
    sizes: { quarter: 400, half: 550, full: 500 },
  },
  {
    id: "m_kabda_fiandashi",
    name: "كبدة فيونداشي ميلونج",
    price: 550,
    category: "milonj",
    image: "/food/kabda_fiandashi.png",
    description: "مزيج كبدة وفيونداشي",
    spicy: 2,
    sizes: { quarter: 400, half: 550, full: 450 },
  },
  {
    id: "m_chawarma_fiandashi",
    name: "شاورما فيونداشي ميلونج",
    price: 450,
    category: "milonj",
    image: "/food/marqaz_chawarma.png",
    description: "مزيج شاورما وفيونداشي",
    spicy: 1,
    sizes: { quarter: 350, half: 450, full: 450 },
  },
  // ── عروض ─────────────────────────────────────────────────────
  {
    id: "sp1",
    name: "عرض ميسو كومبو",
    price: 750,
    category: "specials",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
    description: "سندويتش + مشروب + إضافة",
    isPopular: true,
    spicy: 0,
  },
  {
    id: "sp2",
    name: "عرض العائلة",
    price: 1200,
    category: "specials",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80",
    description: "3 سندويتشات + 3 مشروبات",
    spicy: 0,
  },
  // ── مشروبات ──────────────────────────────────────────────────
  {
    id: "d_farha_33",
    name: "Farha فرحة 33cl",
    price: 50,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&q=80",
    description: "Farha | فرحة — 33cl",
  },
  {
    id: "d_farha_1l",
    name: "Farha فرحة 1L",
    price: 100,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&q=80",
    description: "Farha | فرحة — 1L",
  },
  {
    id: "d_hamoud_33",
    name: "Hamoud حمود 33cl",
    price: 60,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&q=80",
    description: "Hamoud | حمود — 33cl",
  },
  {
    id: "d_hamoud_1l",
    name: "Hamoud حمود 1L",
    price: 120,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&q=80",
    description: "Hamoud | حمود — 1L",
  },
  {
    id: "d_jus_33",
    name: "Jus عصير 33cl",
    price: 70,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80",
    description: "Jus | عصير — 33cl",
  },
  {
    id: "d_coca",
    name: "Coca-Cola كوكا كولا",
    price: 150,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80",
    description: "Coca-Cola | كوكا كولا",
  },
  // ── إضافات ───────────────────────────────────────────────────
  {
    id: "s_freet",
    name: "فريت",
    price: 150,
    category: "extras",
    image: "/item_fries.png",
    description: "بطاطا مقلية مقرمشة",
    spicy: 0,
    sizes: { quarter: 100, half: 150 },
  },
  {
    id: "s_freet_fromage",
    name: "فريت فرماج",
    price: 250,
    category: "extras",
    image: "/item_fries.png",
    description: "فريت مع جبن سائل",
    spicy: 0,
    sizes: { quarter: 150, half: 250 },
  },
  {
    id: "e1",
    name: "زيتون",
    price: 50,
    category: "extras",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80",
  },
  {
    id: "e2",
    name: "فرماج",
    price: 50,
    category: "extras",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80",
  },
  {
    id: "e3",
    name: "طن",
    price: 100,
    category: "extras",
    image: "https://images.unsplash.com/photo-1585325701956-60dd9c8399b6?w=400&q=80",
  },
];

export const CATEGORIES = [
  { id: "sandwiches" as Category, label: "الساندويتشات", icon: "burger" },
  { id: "milonj" as Category, label: "الساندويتش ميلونج", icon: "doubleBurger" },
  { id: "extras" as Category, label: "إضافات", icon: "plus" },
  { id: "drinks" as Category, label: "Boissons مشروبات", icon: "drink" },
  { id: "specials" as Category, label: "العروض", icon: "fire" },
  { id: "history" as Category, label: "الطلبات السابقة", icon: "clock" },
];

export const DELIVERY_FEE = 100;
export const FREE_DELIVERY_THRESHOLD = 1500;
