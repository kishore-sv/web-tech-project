"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2, ExternalLink, ShieldAlert, FileText, Calendar } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function AdminDashboard() {
    const [pendingResources, setPendingResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<string | null>(null);

    useEffect(() => {
        fetchPending();
    }, []);

    const fetchPending = async () => {
        try {
            const res = await fetch("/api/resources"); // Admin gets all (including pending)
            if (res.ok) {
                const data = await res.json();
                setPendingResources(data.filter((r: any) => r.status === "PENDING"));
            }
        } catch (error) {
            toast.error("Failed to fetch pending resources");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string) => {
        setProcessingId(id);
        const promise = fetch("/api/admin/approve", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: "APPROVED" }),
        });

        toast.promise(promise, {
            loading: "Approving resource...",
            success: () => {
                setPendingResources((prev) => prev.filter((r: any) => r.id !== id));
                setProcessingId(null);
                return "Resource approved successfully!";
            },
            error: () => {
                setProcessingId(null);
                return "Failed to approve resource";
            }
        });
    };

    return (
        <div className="min-h-screen bg-muted/20">
            <div className="container mx-auto py-12 px-4 space-y-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-foreground text-background p-8 rounded-[2rem] shadow-xl">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
                            <ShieldAlert className="h-3.5 w-3.5" />
                            <span>Moderation Control</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight">Admin Dashboard</h1>
                        <p className="text-muted/70 text-lg"> Review and approve community-submitted educational materials.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-background/10 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/10 flex flex-col items-center justify-center">
                            <span className="text-2xl font-black">{pendingResources.length}</span>
                            <span className="text-[10px] uppercase font-bold text-muted/60">Pending Items</span>
                        </div>
                    </div>
                </div>

                {/* Content Table */}
                <div className="bg-card rounded-[2rem] border shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted/50 h-16">
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead className="px-8 font-bold text-foreground">Resource Details</TableHead>
                                <TableHead className="font-bold text-foreground">Subject</TableHead>
                                <TableHead className="font-bold text-foreground">Submitted At</TableHead>
                                <TableHead className="font-bold text-foreground">File Preview</TableHead>
                                <TableHead className="text-right px-8 font-bold text-foreground">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-20">
                                        <div className="flex flex-col items-center gap-4">
                                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                            <p className="text-sm text-muted-foreground font-medium">Loading moderation queue...</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : pendingResources.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-24">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                                <Check className="h-8 w-8 text-emerald-500" />
                                            </div>
                                            <h3 className="text-xl font-bold">Queue is empty!</h3>
                                            <p className="text-muted-foreground max-w-xs mx-auto text-sm">
                                                All clear. There are no pending resources waiting for approval at the moment.
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                pendingResources.map((resource: any) => (
                                    <TableRow key={resource.id} className="h-20 hover:bg-muted/20 transition-colors">
                                        <TableCell className="px-8">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-foreground">{resource.title}</span>
                                                <span className="text-xs text-muted-foreground max-w-[300px] truncate">{resource.description}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="px-3 py-1 rounded-lg font-bold bg-primary/5 text-primary border-primary/10">
                                                {resource.subject}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {format(new Date(resource.createdAt), "MMM d, HH:mm")}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <a
                                                href={resource.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline hover:opacity-80 transition-all px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10"
                                            >
                                                <FileText className="h-4 w-4" />
                                                PDF Preview
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </TableCell>
                                        <TableCell className="text-right px-8">
                                            <Button
                                                className="gap-2 h-10 px-6 rounded-xl font-bold shadow-lg shadow-emerald-500/20 bg-emerald-600 hover:bg-emerald-700"
                                                onClick={() => handleApprove(resource.id)}
                                                disabled={processingId === resource.id}
                                            >
                                                {processingId === resource.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Check className="h-4 w-4" />
                                                )}
                                                Approve
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
