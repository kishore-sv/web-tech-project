import UploadForm from "@/components/UploadForm";

export default function UploadPage() {
    return (
        <div className="container mx-auto py-10 px-4">
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">Upload Resource</h1>
                    <p className="text-muted-foreground">Share educational materials with the community</p>
                </div>
                <UploadForm />
            </div>
        </div>
    );
}
