"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tent, Compass, Map, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-500/20 blur-[100px]" />
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-[100px]" />
      </div>

      {/* Navbar Placeholder */}
      <header className="relative z-10 container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-emerald-300 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
            <Tent size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">CampRent.</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="font-semibold">Masuk</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full px-6 shadow-lg shadow-emerald-600/20">
              Daftar
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 pt-20 pb-32 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium text-sm mb-8 border border-emerald-500/20 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Sistem Penyewaan Alat Camping No.1
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl"
        >
          Jelajahi Alam Bebas dengan <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
            Peralatan Terbaik
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed"
        >
          Sewa tenda, sleeping bag, kompor, dan perlengkapan lainnya dengan mudah. Kualitas terjamin, harga terjangkau, untuk pengalaman camping yang tak terlupakan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/catalog">
            <Button size="lg" className="h-14 px-8 text-base bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl shadow-emerald-600/20 w-full sm:w-auto group">
              Mulai Petualangan
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/catalog">
            <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full w-full sm:w-auto backdrop-blur-md bg-background/50 border-border/50 hover:bg-muted/50">
              Lihat Katalog
            </Button>
          </Link>
        </motion.div>

        {/* Floating Cards / Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl w-full"
        >
          {[
            { icon: Tent, title: "Kualitas Premium", desc: "Peralatan selalu dirawat dan dicuci setelah digunakan." },
            { icon: Compass, title: "Booking Mudah", desc: "Pesan tanggal dan barang secara real-time kapan saja." },
            { icon: Map, title: "Lokasi Strategis", desc: "Ambil barang di toko kami yang dekat dengan jalur pendakian." },
          ].map((feature, idx) => (
            <div key={idx} className="group relative p-8 rounded-3xl bg-card/50 backdrop-blur-xl border border-border/50 shadow-2xl hover:shadow-emerald-500/10 transition-all hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
