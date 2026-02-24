"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2, ExternalLink } from "lucide-react";

import { toast } from "sonner";

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
            console.error("Failed to fetch resources");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string) => {
        setProcessingId(id);
        try {
            const res = await fetch("/api/admin/approve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: "APPROVED" }),
            });

            if (res.ok) {
                setPendingResources((prev) => prev.filter((r: any) => r.id !== id));
                toast.success("Resource approved successfully!");
            }
        } catch (error) {
            toast.error("Failed to approve resource");
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="container mx-auto py-10 px-4 space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Approve or manage pending resource uploads</p>
            </div>

            <div className="border rounded-lg bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>File</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                                </TableCell>
                            </TableRow>
                        ) : pendingResources.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                    No pending resources to approve.
                                </TableCell>
                            </TableRow>
                        ) : (
                            pendingResources.map((resource: any) => (
                                <TableRow key={resource.id}>
                                    <TableCell className="font-medium">{resource.title}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{resource.subject}</Badge>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">{resource.description}</TableCell>
                                    <TableCell>
                                        <a
                                            href={resource.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline flex items-center gap-1"
                                        >
                                            View PDF <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            size="sm"
                                            className="gap-1"
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
    );
}
