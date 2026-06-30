"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tent, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { register } from "@/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  async function onSubmit(formData: FormData) {
    setLoading(true);
    const result = await register(formData);
    
    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
    } else if (result?.success) {
      toast.success("Berhasil mendaftar! Silakan cek email Anda atau langsung masuk.");
      router.push("/catalog"); // Redirect ke katalog
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background p-4">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="p-8 rounded-3xl bg-card/50 backdrop-blur-xl border border-border/50 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <Link href="/">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-emerald-300 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 mb-4 cursor-pointer hover:scale-105 transition-transform">
                <Tent size={28} />
              </div>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">Buat Akun</h1>
            <p className="text-sm text-muted-foreground mt-2">Mulai petualangan Anda sekarang</p>
          </div>

          <form action={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullname">Nama Lengkap</Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="John Doe"
                required
                className="bg-background/50 h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nama@email.com"
                required
                className="bg-background/50 h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="bg-background/50 h-12 rounded-xl"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-600/20 mt-4"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Daftar"}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-emerald-600 font-medium hover:underline">
              Masuk di sini
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
