"use client";

import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-muted-foreground mb-8">Ini adalah simulasi dashboard. Anda berhasil masuk!</p>
      
      <Button 
        variant="destructive" 
        onClick={() => logout()}
      >
        Keluar (Logout)
      </Button>
    </div>
  );
}
