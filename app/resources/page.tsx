"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ResourceCard from "@/components/ResourceCard";
import { Search } from "lucide-react";

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
        <div className="container mx-auto py-10 px-4 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Educational Resources</h1>
                    <p className="text-muted-foreground">Browse through approved educational materials</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search resources..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Select value={subject} onValueChange={setSubject}>
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="All Subjects" />
                        </SelectTrigger>
                        <SelectContent>
                            {SUBJECTS.map((s) => (
                                <SelectItem key={s} value={s}>{s === "all" ? "All Subjects" : s}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-48 rounded-lg bg-muted animate-pulse" />
                    ))}
                </div>
            ) : filteredResources.length === 0 ? (
                <div className="text-center py-20 bg-muted/30 rounded-lg border-2 border-dashed">
                    <p className="text-muted-foreground text-lg">No approved resources found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource: any) => (
                        <ResourceCard key={resource.id} resource={resource} />
                    ))}
                </div>
            )}
        </div>
    );
}
