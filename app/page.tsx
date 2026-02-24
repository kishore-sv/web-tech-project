import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, BookOpen, Users, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-20 pb-16 md:pt-32 md:pb-24 px-4 text-center">
        {/* Background Gradients */}
        <div className="absolute top-0 -z-10 h-full w-full bg-background">
          <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute top-0 left-0 -translate-x-1/2 -z-10 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-[80px]" />
        </div>

        <div className="max-w-4xl space-y-8 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold ring-1 ring-inset ring-primary/20 animate-in fade-in slide-in-from-top-4 duration-1000">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Modern Learning for Everyone</span>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 animate-in fade-in slide-in-from-bottom-8 duration-700">
            Learn faster. <br />
            Share better.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000">
            Access, download, and share high-quality educational materials. A centralized hub for students and educators to collaborate and grow together.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000">
            <Link href="/resources">
              <Button size="lg" className="h-12 px-8 rounded-full shadow-xl shadow-primary/25 group">
                Browse Library
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="h-12 px-8 rounded-full border-2 bg-transparent">
                Create Account
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Preview Labels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-24 md:mt-32 max-w-5xl mx-auto w-full px-4 animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-500">
          <div className="flex flex-col items-center gap-3 p-6 rounded-3xl border bg-card/50 backdrop-blur-sm transition-all hover:shadow-lg hover:border-primary/20">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg">Verified Library</h3>
            <p className="text-sm text-muted-foreground">Every resource is reviewed and approved by administrators.</p>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 rounded-3xl border bg-card/50 backdrop-blur-sm transition-all hover:shadow-lg hover:border-primary/20">
            <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-indigo-500" />
            </div>
            <h3 className="font-bold text-lg">Community Driven</h3>
            <p className="text-sm text-muted-foreground">Join thousands of students sharing their best study materials.</p>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 rounded-3xl border bg-card/50 backdrop-blur-sm transition-all hover:shadow-lg hover:border-primary/20">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="font-bold text-lg">Secure Access</h3>
            <p className="text-sm text-muted-foreground">Safe and secure platform for managing your educational assets.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
