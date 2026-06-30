"use client";

import { use } from "react";
import QRCode from "react-qr-code";
import { CheckCircle2, MapPin, Calendar, Clock, Download, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BookingReceiptPage({ params }: { params: Promise<{ bookingCode: string }> }) {
  const resolvedParams = use(params);
  const bookingCode = resolvedParams.bookingCode.toUpperCase();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
          
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            
            <h1 className="text-3xl font-bold tracking-tight mb-2">Pesanan Berhasil!</h1>
            <p className="text-muted-foreground mb-8">
              Tunjukkan QR Code ini ke petugas admin di toko untuk pengambilan alat.
            </p>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8 w-fit mx-auto">
              <QRCode 
                value={bookingCode} 
                size={200}
                level="H"
                className="mx-auto"
              />
              <p className="mt-4 text-center font-mono font-bold text-xl tracking-widest text-slate-800">
                {bookingCode}
              </p>
            </div>

            <div className="w-full bg-muted/50 rounded-2xl p-6 text-left mb-8 border border-border/50">
              <h3 className="font-semibold text-lg mb-4">Rincian Pengambilan</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Toko Pusat (Bandung)</p>
                    <p className="text-sm text-muted-foreground">Jl. Cihampelas No. 123, Kota Bandung</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Hari Ini</p>
                    <p className="text-sm text-muted-foreground">Silakan ambil sebelum toko tutup.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Jam Operasional</p>
                    <p className="text-sm text-muted-foreground">08:00 WIB - 20:00 WIB</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Button className="flex-1 h-14 text-base rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20" onClick={() => window.print()}>
                <Download className="w-5 h-5 mr-2" /> Simpan QR Code
              </Button>
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full h-14 text-base rounded-xl">
                  <Home className="w-5 h-5 mr-2" /> Kembali ke Beranda
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
