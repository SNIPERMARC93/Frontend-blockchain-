"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { OrangeGridBackground } from "@/components/OrangeGridBackground";
import { useAuth } from "@/lib/auth-context";

export default function JoinOrganisationPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const { updateOrganisation } = useAuth();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleJoin = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      updateOrganisation({ id: "org1", name: "Nexus Protocol" }, "Member");
    }, 1500);
  };

  return (
    <main className="relative min-h-screen bg-slate-950 text-white overflow-hidden flex items-center justify-center">
      <OrangeGridBackground />
      
      <div className="z-10 w-full max-w-lg p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" className="text-slate-400 hover:text-white mb-4 -ml-4" onClick={() => window.location.href = '/onboarding'}>
            ← Back to Onboarding
          </Button>
          <div className="flex items-center gap-4 mb-2">
            <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-emerald-500' : 'bg-slate-800'}`} />
            <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-emerald-500' : 'bg-slate-800'}`} />
            <div className={`h-2 flex-1 rounded-full ${step >= 3 ? 'bg-emerald-500' : 'bg-slate-800'}`} />
          </div>
          <p className="text-sm text-slate-400 text-right">Step {step} of 3</p>
        </motion.div>

        <Card className="bg-slate-900/60 backdrop-blur-xl border-white/10 shadow-2xl">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <CardHeader>
                <CardTitle className="text-2xl">Invitation Code</CardTitle>
                <CardDescription className="text-slate-400">
                  Enter the unique organisation code provided by your administrator.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Organisation Code</label>
                  <Input 
                    placeholder="NEX-XXXX-XXXX" 
                    className="bg-slate-950/50 border-slate-700 text-white uppercase font-mono tracking-widest text-center text-lg h-12" 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700" 
                  onClick={handleNext}
                  disabled={code.length < 5}
                >
                  Verify Code
                </Button>
              </CardFooter>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <CardHeader>
                <CardTitle className="text-2xl">Account Setup</CardTitle>
                <CardDescription className="text-slate-400">
                  Configure your profile for this organisation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-emerald-400">Code Verified</p>
                    <p className="text-xs text-slate-400">Joining "Nexus Protocol"</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Display Name</label>
                  <Input placeholder="John Doe" className="bg-slate-950/50 border-slate-700 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Role / Title</label>
                  <Input placeholder="Engineer" className="bg-slate-950/50 border-slate-700 text-white" />
                </div>
              </CardContent>
              <CardFooter className="gap-3">
                <Button variant="outline" className="w-1/3 border-slate-700 hover:bg-slate-800 text-white" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button className="w-2/3 bg-emerald-600 hover:bg-emerald-700" onClick={handleNext}>
                  Continue
                </Button>
              </CardFooter>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <CardHeader>
                <CardTitle className="text-2xl">Organisation Association</CardTitle>
                <CardDescription className="text-slate-400">
                  Finalise your connection to the organisation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800 space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400 text-sm">Organisation</span>
                    <span className="text-white text-sm font-medium">Nexus Protocol</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400 text-sm">Requested Role</span>
                    <span className="text-slate-300 text-sm font-medium">Member</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Status</span>
                    <span className="text-amber-400 text-sm font-medium">Ready to Join</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="gap-3">
                <Button variant="outline" className="w-1/3 border-slate-700 hover:bg-slate-800 text-white" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button 
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2" 
                  onClick={handleJoin}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    "Connect & Join"
                  )}
                </Button>
              </CardFooter>
            </motion.div>
          )}
        </Card>
      </div>
    </main>
  );
}
