"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, FileUp, Info, CheckCircle2, ChevronRight, Loader2 } from "lucide-react";

const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "History", "Literature", "Other"];

export default function UploadForm() {
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const file = formData.get("file") as File;

        if (file && file.size > 5 * 1024 * 1024) {
            toast.error("File size exceeds 5MB limit");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                toast.success("Upload successful!", {
                    description: "Your resource is now pending admin approval.",
                });
                router.push("/dashboard");
            } else {
                const data = await res.json();
                toast.error(data.error || "Upload failed");
            }
        } catch (error) {
            toast.error("An error occurred during upload");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
                <Card className="rounded-3xl border-muted/50 shadow-xl shadow-primary/5 overflow-hidden">
                    <CardHeader className="bg-primary/5 pb-8 pt-8 px-8 border-b border-primary/10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                <FileUp className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <CardTitle className="text-2xl font-extrabold tracking-tight">Post a New Resource</CardTitle>
                        </div>
                        <CardDescription className="text-muted-foreground/80 text-base leading-relaxed">
                            Share your educational materials with the global student community. Your contribution makes a difference.
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit} className="divide-y divide-muted/30">
                        <CardContent className="space-y-6 p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2.5">
                                    <Label htmlFor="title" className="text-sm font-semibold flex items-center gap-2">
                                        Title
                                        <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                                    </Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="e.g. Intro to Quantum Mechanics"
                                        required
                                        className="h-12 rounded-xl focus:ring-primary/20"
                                    />
                                </div>
                                <div className="space-y-2.5">
                                    <Label htmlFor="subject" className="text-sm font-semibold">Subject</Label>
                                    <Select name="subject" required>
                                        <SelectTrigger className="h-12 rounded-xl focus:ring-primary/20">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            {SUBJECTS.map((s) => (
                                                <SelectItem key={s} value={s} className="rounded-lg">{s}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2.5">
                                <Label htmlFor="description" className="text-sm font-semibold">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Provide a brief overview of what's inside this resource..."
                                    required
                                    className="min-h-[120px] rounded-xl focus:ring-primary/20 p-4 leading-relaxed"
                                />
                            </div>

                            <div className="space-y-2.5">
                                <Label htmlFor="file" className="text-sm font-semibold">Source File (PDF)</Label>
                                <div className="relative">
                                    <label
                                        htmlFor="file"
                                        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-muted-foreground/20 rounded-2xl bg-muted/20 hover:bg-muted/30 hover:border-primary/50 transition-all cursor-pointer group"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                                <Upload className="h-6 w-6 text-primary" />
                                            </div>
                                            <p className="mb-1 text-sm font-bold text-foreground">
                                                {fileName ? "File selected" : "Click to select or drag & drop"}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {fileName ? fileName : "PDF document up to 5MB"}
                                            </p>
                                        </div>
                                        <input
                                            id="file"
                                            name="file"
                                            type="file"
                                            className="hidden"
                                            accept="application/pdf"
                                            onChange={handleFileChange}
                                            required
                                        />
                                    </label>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="p-8 bg-muted/10 flex justify-end">
                            <Button type="submit" size="lg" className="h-14 px-10 rounded-2xl shadow-xl shadow-primary/20 font-bold group" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        Submit for Approval
                                        <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>

            <div className="space-y-6">
                <Card className="rounded-3xl border-primary/10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
                    <CardHeader>
                        <CardTitle className="text-lg">Upload Guidelines</CardTitle>
                        <CardDescription>Follow these rules to ensure quick approval</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            "Title should be descriptive and clear.",
                            "Only high-quality PDF files are accepted.",
                            "File size must not exceed 5MB.",
                            "Categorize correctly under the right subject.",
                            "Ensure the content is your own or properly licensed."
                        ].map((rule, idx) => (
                            <div key={idx} className="flex gap-3 items-start">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                                <p className="text-sm leading-tight text-muted-foreground">{rule}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <div className="p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 space-y-3">
                    <h4 className="font-bold text-indigo-700 flex items-center gap-2 text-sm">
                        <Info className="h-4 w-4" />
                        Moderation Notice
                    </h4>
                    <p className="text-xs text-indigo-600/80 leading-relaxed font-medium">
                        Resources are typically reviewed within 24-48 hours. Once approved, it will be visible to everyone in the library.
                    </p>
                </div>
            </div>
        </div>
    );
}
