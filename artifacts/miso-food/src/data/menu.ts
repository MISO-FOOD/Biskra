export type Category = "sandwiches" | "specials" | "drinks" | "extras";

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
  },
  {
    id: "s2",
    name: "مرقاز شاورما",
    price: 450,
    category: "sandwiches",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&q=80",
  },
  {
    id: "s3",
    name: "فريت فرماج",
    price: 250,
    category: "sandwiches",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&q=80",
  },
  {
    id: "s4",
    name: "مرقاز فيونداشي",
    price: 450,
    category: "sandwiches",
    image: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?w=400&q=80",
  },
  {
    id: "s5",
    name: "كبدة شاورما",
    price: 500,
    category: "sandwiches",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80",
  },
  {
    id: "s6",
    name: "شاورما فيونداشي",
    price: 450,
    category: "sandwiches",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=80",
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
    description: "3 سندويتشات + مشروبات",
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
  { id: "specials" as Category, label: "العروض", icon: "fire" },
  { id: "drinks" as Category, label: "المشروبات", icon: "drink" },
  { id: "extras" as Category, label: "الإضافات", icon: "plus" },
];

export const DELIVERY_FEE = 100;
