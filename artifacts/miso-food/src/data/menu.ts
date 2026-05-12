export type Category = "sandwiches" | "milonj" | "specials" | "drinks" | "extras" | "history";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description?: string;
}

export const MENU_ITEMS: MenuItem[] = [
  // Sandwiches
  {
    id: "s1",
    name: "كبدة فيونداشي",
    price: 450,
    category: "sandwiches",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80",
    description: "كبدة طازجة مع لحم مفروم وتتبيلة خاصة",
  },
  {
    id: "s2",
    name: "مرقاز شاورما",
    price: 450,
    category: "sandwiches",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&q=80",
    description: "مزيج رائع من المرقاز والشاورما اللذيذة",
  },
  {
    id: "s3",
    name: "فريت فرماج",
    price: 250,
    category: "sandwiches",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&q=80",
    description: "بطاطا مقلية مقرمشة مع جبن سائل",
  },
  {
    id: "s4",
    name: "مرقاز فيونداشي",
    price: 450,
    category: "sandwiches",
    image: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?w=400&q=80",
    description: "سجق المرقاز مع اللحم المفروم المتبل",
  },
  {
    id: "s5",
    name: "كبدة شاورما",
    price: 500,
    category: "sandwiches",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80",
    description: "شاورما دجاج مع كبدة متبلة ومقلية",
  },
  {
    id: "s6",
    name: "شاورما فيونداشي",
    price: 450,
    category: "sandwiches",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=80",
    description: "ميكس شاورما مع فيونداشي وصلصة الثوم",
  },
  // Milonj
  {
    id: "m1",
    name: "مرقاز فيونداشي ميلونج",
    price: 450,
    category: "milonj",
    image: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?w=400&q=80",
    description: "ميلونج خاص من المرقاز والفيونداشي",
  },
  {
    id: "m2",
    name: "كبدة شاورما ميلونج",
    price: 450,
    category: "milonj",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80",
    description: "ميلونج كبدة مقلية وشاورما",
  },
  {
    id: "m3",
    name: "مرقاز كبدة ميلونج",
    price: 500,
    category: "milonj",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&q=80",
    description: "مزيج غني من الكبدة والمرقاز",
  },
  {
    id: "m4",
    name: "شاورما فيونداشي ميلونج",
    price: 450,
    category: "milonj",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=80",
    description: "ميلونج الشاورما والفيونداشي المميز",
  },
  // Specials
  {
    id: "sp1",
    name: "عرض ميسو كومبو",
    price: 750,
    category: "specials",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
    description: "سندويتش + مشروب + إضافة",
  },
  {
    id: "sp2",
    name: "عرض العائلة",
    price: 1200,
    category: "specials",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80",
    description: "3 سندويتشات + 3 مشروبات",
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
