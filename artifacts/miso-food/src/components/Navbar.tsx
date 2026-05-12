import mascotImg from "@assets/image_1778558012694.png";

export default function Navbar() {
  return (
    <header className="sticky top-10 md:top-10 z-40 w-full bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={mascotImg} alt="Miso Food Mascot" className="h-10 md:h-14 w-auto drop-shadow-md" />
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground" dir="ltr">
            MISO <span className="text-secondary">FOOD</span>
          </h1>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-bold text-lg">
          <a href="#menu" className="hover:text-primary transition-colors">القائمة</a>
          <a href="#contact" className="hover:text-primary transition-colors">اتصل بنا</a>
        </nav>
        <a href="tel:0793149538" className="md:hidden bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-bold shadow-md active:scale-95 transition-transform">
          اطلب
        </a>
      </div>
    </header>
  );
}