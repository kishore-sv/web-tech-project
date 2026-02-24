import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 text-center">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
          Online Educational <span className="text-primary">Resources Platform</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Access, download, and share high-quality educational materials. A centralized hub for students and educators to collaborate.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/resources">
            <Button size="lg" className="px-8">View Resources</Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline" className="px-8">Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
