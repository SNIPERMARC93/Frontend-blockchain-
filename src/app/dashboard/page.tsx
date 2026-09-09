"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export default function DashboardPage() {
  const { session, logout } = useAuth();
  
  // If we don't have a session yet (or it's loading and we haven't redirected), just return empty or loader
  if (!session || !session.user || !session.organisation) {
    return null; 
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 font-bold uppercase">
            {session.organisation.name.substring(0, 2)}
          </div>
          <div>
            <h1 className="font-bold tracking-widest text-lg uppercase">{session.organisation.name}</h1>
            <p className="text-xs text-emerald-400">Node Active & Connected • {session.role || "Member"}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center mr-4">
            <span className="text-sm text-slate-400">Logged in as <strong className="text-white">{session.user.name}</strong></span>
          </div>
          <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white">
            Settings
          </Button>
          <Button 
            variant="ghost" 
            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
            onClick={logout}
          >
            Disconnect
          </Button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="bg-slate-900/60 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-xl">Network Status</CardTitle>
              <CardDescription className="text-slate-400">Current node connection metrics.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-emerald-400 mb-2">99.9%</div>
              <p className="text-sm text-slate-400">Uptime across all linked systems.</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-xl">Active Members</CardTitle>
              <CardDescription className="text-slate-400">Personnel currently connected.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-400 mb-2">142</div>
              <p className="text-sm text-slate-400">Across 3 different time zones.</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-xl">Recent Alerts</CardTitle>
              <CardDescription className="text-slate-400">System notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <div className="w-2 h-2 rounded-full bg-emerald-400" /> New member joined (2m ago)
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <div className="w-2 h-2 rounded-full bg-blue-400" /> Database sync complete (15m ago)
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <div className="w-2 h-2 rounded-full bg-amber-400" /> Minor latency spike detected (1h ago)
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-slate-900/60 backdrop-blur-xl border-white/10 h-96 flex items-center justify-center">
            <div className="text-center text-slate-500">
              <svg viewBox="0 0 24 24" className="w-16 h-16 mx-auto mb-4 fill-current opacity-50">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
              <p>Main Workspace Area</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
