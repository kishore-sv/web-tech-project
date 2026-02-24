import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";

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
}

export default function ResourceCard({ resource }: ResourceCardProps) {
    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{resource.subject}</Badge>
                    {resource.status === "PENDING" && (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                            Pending
                        </Badge>
                    )}
                </div>
                <CardTitle className="line-clamp-1">{resource.title}</CardTitle>
                <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
            </CardHeader>
            <CardContent className="grow flex items-center justify-center py-6">
                <FileText className="h-12 w-12 text-muted-foreground opacity-20" />
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full gap-2" asChild>
                    <a href={resource.fileUrl} download target="_blank">
                        <Download className="h-4 w-4" />
                        Download PDF
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
}
