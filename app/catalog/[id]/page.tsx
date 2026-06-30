"use client";

import Link from "next/link";
import { ArrowLeft, Check, Star, ShieldCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  // Unwrap params using React.use() as required in Next.js 15
  const resolvedParams = use(params);
  
  const handleRent = () => {
    toast.success("Pesanan berhasil dibuat!");
    // Generate random booking code simulation
    const bookingCode = `CAMP-${Math.floor(10000 + Math.random() * 90000)}`;
    
    setTimeout(() => {
      router.push(`/booking/${bookingCode}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background p-6 pt-12 pb-24">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <Link href="/catalog">
            <Button variant="ghost" className="pl-0 hover:bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Katalog
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="w-full h-[400px] md:h-[500px] rounded-3xl bg-muted overflow-hidden relative border border-border/50 shadow-xl">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(https://picsum.photos/seed/tenda1/1200/800)` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 rounded-xl bg-muted border border-border/50 overflow-hidden cursor-pointer hover:ring-2 ring-emerald-500 transition-all">
                   <div 
                    className="w-full h-full bg-cover bg-center opacity-80 hover:opacity-100"
                    style={{ backgroundImage: `url(https://picsum.photos/seed/tenda${i}/500/500)` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2 flex items-center gap-2 text-emerald-600 font-medium">
              <span className="bg-emerald-500/10 px-3 py-1 rounded-full text-xs">Peralatan Tenda</span>
              <span className="flex items-center text-sm text-amber-500">
                <Star className="w-4 h-4 mr-1 fill-amber-500" /> 4.9 (120 Ulasan)
              </span>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">Tenda Dome 4 Orang (Premium Eiger)</h1>
            
            <div className="flex items-end gap-2 mb-6">
              <span className="text-4xl font-bold text-emerald-600">Rp 50.000</span>
              <span className="text-muted-foreground mb-1">/ hari</span>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Tenda dome kapasitas 4 orang dengan bahan waterproof ganda yang tahan hujan deras. Sudah termasuk frame fiber yang kuat dan alas terpal tebal. Cocok untuk pendakian gunung maupun camping ceria bersama keluarga.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Kondisi Sangat Baik</h4>
                  <p className="text-sm text-muted-foreground">Selalu dicuci dan dicek setelah disewa</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Tersedia di Toko Pusat</h4>
                  <p className="text-sm text-muted-foreground">Stok saat ini: 5 unit</p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-border/50">
              <Button 
                onClick={handleRent}
                size="lg" 
                className="w-full h-14 text-lg rounded-2xl bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-600/20"
              >
                Sewa Sekarang
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
                <Check className="w-3 h-3 text-emerald-500" /> Bebas biaya pembatalan H-2
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
