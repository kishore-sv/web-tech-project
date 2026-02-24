"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ResourceCard from "@/components/ResourceCard";
import { Search, Filter, BookOpen, Sparkles, Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SUBJECTS = ["all", "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "History", "Literature", "Other"];

export default function ResourcesPage() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [subject, setSubject] = useState("all");

    useEffect(() => {
        fetchResources();
    }, [subject]);

    const fetchResources = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/resources?subject=${subject}`);
            if (res.ok) {
                const data = await res.json();
                setResources(data);
            }
        } catch (error) {
            console.error("Failed to fetch resources");
        } finally {
            setLoading(false);
        }
    };

    const filteredResources = resources.filter((r: any) =>
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
            <div className="container mx-auto py-12 px-4 space-y-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                            <Sparkles className="h-3 w-3" />
                            <span>Verified Knowledge Base</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Educational Resources</h1>
                        <p className="text-lg text-muted-foreground">
                            Discover approved study materials, past papers, and research modules curated for your success.
                        </p>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="sticky top-[73px] z-40 bg-background/60 backdrop-blur-md p-4 rounded-3xl border shadow-sm flex flex-col lg:flex-row gap-4">
                    <div className="relative grow">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
                        <Input
                            placeholder="Search by title, topic or keyword..."
                            className="pl-12 h-12 bg-background/50 border-none ring-1 ring-border focus-visible:ring-2 focus-visible:ring-primary rounded-2xl transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <div className="hidden sm:flex items-center gap-2 px-4 h-12 rounded-2xl bg-muted/50 border border-border/50 text-muted-foreground text-sm font-medium">
                            <Filter className="h-4 w-4" />
                            <span>Browse Subjects:</span>
                        </div>
                        <Select value={subject} onValueChange={setSubject}>
                            <SelectTrigger className="w-full sm:w-56 h-12 rounded-2xl bg-background shadow-sm border-border focus:ring-2 focus:ring-primary transition-all">
                                <SelectValue placeholder="Select Subject" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl">
                                {SUBJECTS.map((s) => (
                                    <SelectItem key={s} value={s} className="rounded-xl">
                                        {s === "all" ? "All Subjects" : s}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Content Section */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-[380px] rounded-3xl bg-muted/30 animate-pulse border-2 border-dashed border-muted" />
                        ))}
                    </div>
                ) : filteredResources.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center bg-card/20 rounded-3xl border-2 border-dashed border-muted-foreground/10 px-4">
                        <div className="h-20 w-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                            <BookOpen className="h-10 w-10 text-muted-foreground/30" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">No resources found</h2>
                        <p className="text-muted-foreground max-w-sm mb-8">
                            We couldn't find any resources matching your current search or filter. Try a different subject or keywords.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-700">
                        {filteredResources.map((resource: any) => (
                            <ResourceCard key={resource.id} resource={resource} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
