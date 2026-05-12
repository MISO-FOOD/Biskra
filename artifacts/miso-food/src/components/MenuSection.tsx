import { motion } from "framer-motion";
import { UtensilsCrossed, ChefHat, Sandwich, Beef, Coffee, Plus, Star } from "lucide-react";

const menuData = [
  {
    category: "السندويتش",
    icon: Sandwich,
    color: "bg-amber-100 text-amber-700",
    items: [
      { name: "Frite", half: 100, quarter: 150 },
      { name: "Frite Fromage", half: 150, quarter: 250 },
      { name: "مرقاز", half: 250, quarter: 350 },
      { name: "فيونداشي", half: 250, quarter: 350 },
      { name: "شاورما", half: 250, quarter: 350 },
      { name: "كبدة", half: 350, quarter: 450 },
    ]
  },
  {
    category: "سندويتش ميلونج",
    icon: ChefHat,
    color: "bg-red-100 text-red-700",
    items: [
      { name: "مرقاز فيونداشي", half: 350, quarter: 450 },
      { name: "مرقاز شاورما", half: 350, quarter: 450 },
      { name: "مرقاز كبدة", half: 400, quarter: 550 },
      { name: "كبدة شاورما", half: 400, quarter: 550 },
      { name: "كبدة فيونداشي", half: 400, quarter: 550 },
      { name: "شاورما فيونداشي", half: 350, quarter: 450 },
    ]
  },
  {
    category: "الفريت",
    icon: UtensilsCrossed,
    color: "bg-orange-100 text-orange-700",
    singlePrice: true,
    items: [
      { name: "فريت", price: 150 },
      { name: "فريت فرماج", price: 250 },
      { name: "فريت مرقاز", price: 350 },
      { name: "فريت فيونداشي", price: 350 },
      { name: "فريت كبدة", price: 450 },
    ]
  },
  {
    category: "أسعار الأطباق",
    icon: Beef,
    color: "bg-rose-100 text-rose-700",
    singlePrice: true,
    items: [
      { name: "مرقاز فيونداشي", price: 400 },
      { name: "مرقاز شاورما", price: 450 },
      { name: "مرقاز كبدة", price: 450 },
      { name: "كبدة شاورما", price: 500 },
      { name: "كبدة فيونداشي", price: 450 },
      { name: "شاورما فيونداشي", price: 450 },
    ]
  },
  {
    category: "مشروبات",
    icon: Coffee,
    color: "bg-blue-100 text-blue-700",
    singlePrice: true,
    items: [
      { name: "صغيرة", price: 70 },
      { name: "كبيرة", price: 120 },
    ]
  },
  {
    category: "إضافات",
    icon: Plus,
    color: "bg-green-100 text-green-700",
    singlePrice: true,
    items: [
      { name: "زيتون", price: 50 },
      { name: "طن", price: 100 },
      { name: "فرماج", price: 50 },
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } }
};

export default function MenuSection() {
  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">قائمة <span className="text-secondary">الطعام</span></h2>
          <p className="text-lg text-muted-foreground font-bold max-w-2xl mx-auto">
            أفضل المكونات، أشهى الوصفات، وبأسعار تناسب الجميع.
          </p>
          <div className="w-24 h-1.5 bg-primary mx-auto mt-6 rounded-full"></div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {menuData.map((category, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="bg-card rounded-2xl shadow-lg border border-card-border overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className={`px-6 py-4 flex items-center gap-3 border-b border-card-border ${category.color.replace('text-', 'bg-opacity-20 text-')}`}>
                <div className={`p-2 rounded-xl ${category.color}`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black">{category.category}</h3>
              </div>
              
              <div className="p-6">
                {!category.singlePrice && (
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-border/50 text-sm font-bold text-muted-foreground">
                    <span>الطلب</span>
                    <div className="flex gap-8">
                      <span>نصف</span>
                      <span>ربع</span>
                    </div>
                  </div>
                )}
                
                <ul className="space-y-4">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex justify-between items-center group">
                      <span className="font-bold text-lg group-hover:text-primary transition-colors">{item.name}</span>
                      
                      {category.singlePrice ? (
                        <div className="font-black text-secondary bg-secondary/10 px-3 py-1 rounded-lg">
                          {item.price} دج
                        </div>
                      ) : (
                        <div className="flex gap-4 font-black">
                          <span className="text-foreground bg-muted px-3 py-1 rounded-lg w-20 text-center">{item.half} دج</span>
                          <span className="text-secondary bg-secondary/10 px-3 py-1 rounded-lg w-20 text-center">{item.quarter} دج</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
           <a 
              href="tel:0793149538" 
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-10 py-5 rounded-2xl text-2xl font-black transition-transform hover:scale-105 active:scale-95 shadow-xl"
            >
              <Star className="fill-current w-6 h-6" />
              اطلب دليفري الآن
            </a>
        </div>

      </div>
    </section>
  );
}