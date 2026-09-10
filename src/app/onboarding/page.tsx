"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { OrangeGridBackground } from "@/components/OrangeGridBackground";

export default function OnboardingPage() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-white overflow-hidden flex items-center justify-center">
      <OrangeGridBackground />
      
      <div className="z-10 w-full max-w-4xl p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Welcome to Nexus ID</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Your identity has been verified. To proceed, you must either establish a new organisation or join an existing network.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="h-full bg-slate-900/60 backdrop-blur-xl border-white/10 hover:border-blue-500/50 transition-colors duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <CardTitle className="text-2xl">Create Organisation</CardTitle>
                <CardDescription className="text-slate-400 mt-2 text-base">
                  Establish a new hub on the network. You will be designated as the initial administrator.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Full administrative control
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Manage team access
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Customise workspace settings
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => window.location.href = '/org/create'}
                >
                  Establish Node
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="h-full bg-slate-900/60 backdrop-blur-xl border-white/10 hover:border-emerald-500/50 transition-colors duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4 text-emerald-400">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl">Join Organisation</CardTitle>
                <CardDescription className="text-slate-400 mt-2 text-base">
                  Connect to an existing hub using an invitation code or link provided by an administrator.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Collaborate with your team
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Access shared resources
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Participate in network tasks
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Button 
                  variant="outline"
                  className="w-full border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-400 hover:text-emerald-300"
                  onClick={() => window.location.href = '/org/join'}
                >
                  Connect to Node
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
