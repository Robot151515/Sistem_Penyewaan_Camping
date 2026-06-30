import Link from "next/link";
import { ArrowLeft, Search, SlidersHorizontal, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/db";

export default async function CatalogPage() {
  // Fetch real data dari Prisma
  let equipment: any[] = [];
  try {
    equipment = await prisma.equipment.findMany({
      include: {
        category: true,
      },
    });
  } catch (error) {
    console.error("Gagal mengambil data dari database:", error);
  }

  // Jika database kosong, gunakan data dummy (Simulasi yang terlihat asli)
  if (equipment.length === 0) {
    equipment = [
      {
        id: "1",
        name: "Tenda Dome 4 Orang (Eiger)",
        pricePerDay: 50000,
        stock: 5,
        location: "Toko Pusat (Bandung)",
        image: "https://picsum.photos/seed/tenda1/800/600",
        category: { name: "Tenda" }
      },
      {
        id: "2",
        name: "Sleeping Bag Polar",
        pricePerDay: 15000,
        stock: 12,
        location: "Cabang Lembang",
        image: "https://picsum.photos/seed/tenda2/800/600",
        category: { name: "Tidur" }
      },
      {
        id: "3",
        name: "Kompor Portable Mini",
        pricePerDay: 20000,
        stock: 8,
        location: "Toko Pusat (Bandung)",
        image: "https://picsum.photos/seed/tenda3/800/600",
        category: { name: "Memasak" }
      },
      {
        id: "4",
        name: "Matras Foil Single",
        pricePerDay: 5000,
        stock: 20,
        location: "Cabang Lembang",
        image: "https://picsum.photos/seed/tenda4/800/600",
        category: { name: "Tidur" }
      },
      {
        id: "5",
        name: "Headlamp LED Premium",
        pricePerDay: 15000,
        stock: 10,
        location: "Toko Pusat (Bandung)",
        image: "https://picsum.photos/seed/tenda5/800/600",
        category: { name: "Penerangan" }
      },
      {
        id: "6",
        name: "Tas Carrier 60L Consina",
        pricePerDay: 40000,
        stock: 4,
        location: "Toko Pusat (Bandung)",
        image: "https://picsum.photos/seed/tenda6/800/600",
        category: { name: "Tas" }
      }
    ];
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header / Search Area */}
      <div className="bg-emerald-950 text-white pt-12 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto relative z-10">
          <Link href="/">
            <Button variant="ghost" className="pl-0 hover:bg-transparent text-emerald-200 hover:text-white mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Katalog Peralatan</h1>
          <p className="text-emerald-200/80 mb-8 max-w-2xl text-lg">
            Temukan semua kebutuhan mendaki dan camping Anda di sini. Dari tenda hingga peralatan masak, kami menyediakannya dengan kualitas terbaik.
          </p>
          
          <div className="flex items-center max-w-3xl gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Cari tenda, carrier, atau sleeping bag..." 
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-emerald-500 text-lg"
              />
            </div>
            <Button size="lg" className="h-14 rounded-2xl bg-white text-emerald-950 hover:bg-emerald-50 hidden sm:flex font-semibold">
              <SlidersHorizontal className="mr-2 h-5 w-5" /> Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="container mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {equipment.map((item) => (
            <div key={item.id} className="group flex flex-col bg-card border border-border/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-emerald-500/10 transition-all hover:-translate-y-1">
              <div className="relative h-56 overflow-hidden bg-muted">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-emerald-950 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {item.category?.name || 'Kategori'}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">{item.name}</h3>
                
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1 text-emerald-500" />
                  {item.location || 'Cabang Utama'}
                </div>
                
                <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">Harga / hari</span>
                    <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                      Rp {item.pricePerDay.toLocaleString('id-ID')}
                    </p>
                  </div>
                  
                  <Link href={`/catalog/${item.id}`}>
                    <Button className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20">
                      Sewa
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
