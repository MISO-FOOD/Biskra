export type Category = "sandwiches" | "milonj" | "specials" | "drinks" | "extras" | "history";

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
}

export const MENU_ITEMS: MenuItem[] = [
  // Sandwiches
  {
    id: "s1",
    name: "كبدة فيونداشي",
    price: 450,
    category: "sandwiches",
    image: "/food/kabda_fiandashi.png",
    description: "كبدة طازجة مع لحم مفروم وتتبيلة خاصة",
    isPopular: true,
    spicy: 2,
  },
  {
    id: "s2",
    name: "مرقاز شاورما",
    price: 450,
    category: "sandwiches",
    image: "/food/marqaz_chawarma.png",
    description: "مزيج رائع من المرقاز والشاورما اللذيذة",
    isPopular: true,
    spicy: 1,
  },
  {
    id: "s3",
    name: "مرقاز فرماج",
    price: 300,
    category: "sandwiches",
    image: "/food/marqaz_fromage.png",
    description: "مرقاز مقرمش مع جبن سائل وخبز طازج",
    spicy: 0,
  },
  {
    id: "s4",
    name: "مرقاز فيونداشي",
    price: 450,
    category: "sandwiches",
    image: "/food/marqaz_fiandashi.png",
    description: "سجق المرقاز مع اللحم المفروم المتبل",
    isPopular: true,
    spicy: 2,
  },
  {
    id: "s5",
    name: "كبدة شاورما",
    price: 500,
    category: "sandwiches",
    image: "/food/kabda_chawarma.png",
    description: "شاورما دجاج مع كبدة متبلة ومقلية",
    isNew: true,
    spicy: 1,
  },
  {
    id: "s6",
    name: "كبدة كبدة",
    price: 450,
    category: "sandwiches",
    image: "/food/kabda_kabda.png",
    description: "كبدة مزدوجة مع صلصة الثوم وتوابل خاصة",
    spicy: 1,
  },
  // Milonj
  {
    id: "m1",
    name: "مرقاز فيونداشي ميلونج",
    price: 450,
    category: "milonj",
    image: "/food/marqaz_fiandashi.png",
    description: "ميلونج خاص من المرقاز والفيونداشي",
    isPopular: true,
    spicy: 2,
  },
  {
    id: "m2",
    name: "كبدة شاورما ميلونج",
    price: 450,
    category: "milonj",
    image: "/food/kabda_chawarma.png",
    description: "ميلونج كبدة مقلية وشاورما",
    spicy: 1,
  },
  {
    id: "m3",
    name: "مرقاز كبدة ميلونج",
    price: 500,
    category: "milonj",
    image: "/food/kabda_fiandashi.png",
    description: "مزيج غني من الكبدة والمرقاز",
    isNew: true,
    spicy: 3,
  },
  {
    id: "m4",
    name: "شاورما فيونداشي ميلونج",
    price: 450,
    category: "milonj",
    image: "/food/marqaz_chawarma.png",
    description: "ميلونج الشاورما والفيونداشي المميز",
    spicy: 1,
  },
  // Specials
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
  // Drinks
  {
    id: "d1",
    name: "مشروب صغير",
    price: 70,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&q=80",
  },
  {
    id: "d2",
    name: "مشروب كبير",
    price: 120,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&q=80",
  },
  // Extras
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
  { id: "sandwiches" as Category, label: "السانويشات", icon: "burger" },
  { id: "milonj" as Category, label: "السانويش ميلونج", icon: "doubleBurger" },
  { id: "extras" as Category, label: "إضافات", icon: "plus" },
  { id: "drinks" as Category, label: "المشروبات", icon: "drink" },
  { id: "specials" as Category, label: "العروض", icon: "fire" },
  { id: "history" as Category, label: "الطلبات السابقة", icon: "clock" },
];

export const DELIVERY_FEE = 100;
export const FREE_DELIVERY_THRESHOLD = 1500;
