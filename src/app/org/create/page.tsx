"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrangeGridBackground } from "@/components/OrangeGridBackground";
import { useAuth } from "@/lib/auth-context";

export default function CreateOrganisationPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orgName, setOrgName] = useState("");
  const { updateOrganisation } = useAuth();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleCreate = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      updateOrganisation({ id: "org1", name: orgName || "Nexus Protocol" }, "Organisation Administrator");
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
            <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-blue-500' : 'bg-slate-800'}`} />
            <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-blue-500' : 'bg-slate-800'}`} />
            <div className={`h-2 flex-1 rounded-full ${step >= 3 ? 'bg-blue-500' : 'bg-slate-800'}`} />
          </div>
          <p className="text-sm text-slate-400 text-right">Step {step} of 3</p>
        </motion.div>

        <Card className="bg-slate-900/60 backdrop-blur-xl border-white/10 shadow-2xl">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <CardHeader>
                <CardTitle className="text-2xl">Organisation Information</CardTitle>
                <CardDescription className="text-slate-400">
                  Provide the basic details for your new network node.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Organisation Name</label>
                  <Input 
                    placeholder="e.g. Nexus Protocol" 
                    className="bg-slate-950/50 border-slate-700 text-white" 
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Sector / Industry</label>
                  <Input placeholder="e.g. Technology" className="bg-slate-950/50 border-slate-700 text-white" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleNext}>
                  Continue
                </Button>
              </CardFooter>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <CardHeader>
                <CardTitle className="text-2xl">Administrator Account</CardTitle>
                <CardDescription className="text-slate-400">
                  Set up your initial administrative privileges.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Admin Display Name</label>
                  <Input placeholder="Commander Shepard" className="bg-slate-950/50 border-slate-700 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Contact Email (for alerts)</label>
                  <Input type="email" placeholder="admin@nexus.net" className="bg-slate-950/50 border-slate-700 text-white" />
                </div>
              </CardContent>
              <CardFooter className="gap-3">
                <Button variant="outline" className="w-1/3 border-slate-700 hover:bg-slate-800 text-white" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button className="w-2/3 bg-blue-600 hover:bg-blue-700" onClick={handleNext}>
                  Review & Finalise
                </Button>
              </CardFooter>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <CardHeader>
                <CardTitle className="text-2xl">Confirm & Create</CardTitle>
                <CardDescription className="text-slate-400">
                  Review your settings before establishing the organisation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800 space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400 text-sm">Role</span>
                    <span className="text-blue-400 text-sm font-medium">Organisation Administrator</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400 text-sm">Permissions</span>
                    <span className="text-emerald-400 text-sm font-medium">Full Access</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Status</span>
                    <span className="text-amber-400 text-sm font-medium">Pending Genesis</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="gap-3">
                <Button variant="outline" className="w-1/3 border-slate-700 hover:bg-slate-800 text-white" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button 
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2" 
                  onClick={handleCreate}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Establishing...
                    </>
                  ) : (
                    "Initialise Organisation"
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
