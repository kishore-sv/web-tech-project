"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, ExternalLink, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
    resource: {
        id: string;
        title: string;
        description: string;
        subject: string;
        fileUrl: string;
        status: string;
        createdAt: Date | string;
    };
    isAdmin?: boolean;
}

export default function ResourceCard({ resource, isAdmin = false }: ResourceCardProps) {
    const formattedDate = format(new Date(resource.createdAt), "MMM d, yyyy");

    return (
        <Card className="group relative flex flex-col h-full bg-card/40 backdrop-blur-sm border-muted-foreground/10 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 overflow-hidden">
            {/* Subject Badge */}
            <div className="absolute top-4 left-4 z-10">
                <Badge
                    className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-2 py-0.5"
                >
                    {resource.subject}
                </Badge>
            </div>

            {/* Decorative background element */}
            <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:bg-primary/10 transition-colors" />

            <CardHeader className="pt-14 pb-4">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        {resource.title}
                    </CardTitle>
                    {resource.status === "PENDING" && (
                        <Badge variant="outline" className="text-amber-500 border-amber-500/30 bg-amber-500/5 animate-pulse shrink-0 ml-2">
                            Pending
                        </Badge>
                    )}
                </div>
                <CardDescription className="line-clamp-2 text-muted-foreground mt-2 min-h-[2.5rem]">
                    {resource.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="grow flex flex-col gap-4 pt-0">
                <div className="h-24 w-full rounded-2xl bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center group-hover:to-primary/5 transition-all">
                    <div className="relative group/icon">
                        <FileText className="h-10 w-10 text-muted-foreground/30 group-hover:text-primary/30 transition-colors" />
                        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-md bg-white shadow-sm flex items-center justify-center">
                            <span className="text-[8px] font-bold text-primary">PDF</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {formattedDate}
                    </div>
                    {isAdmin && (
                        <div className="flex items-center gap-1.5">
                            <User className="h-3 w-3" />
                            ID: {resource.id.slice(0, 5)}...
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter className="pt-2">
                <div className="flex gap-2 w-full">
                    <Button variant="outline" className="grow gap-2 h-10 rounded-xl" asChild>
                        <a href={resource.fileUrl} download target="_blank">
                            <Download className="h-4 w-4" />
                            Download
                        </a>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 shrink-0 rounded-xl bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10"
                        asChild
                    >
                        <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
