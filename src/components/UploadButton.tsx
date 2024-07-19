"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import Dropzone from "react-dropzone";
import { Label } from "./ui/label";
import { Cloud, File, Loader2 } from "lucide-react";
import { Progress } from "./ui/progress";
import { useToast } from "./ui/use-toast";
import { useUploadThing } from "@/lib/uploadThing";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

const UploadDropzone = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { startUpload } = useUploadThing("pdfUploader");
  const { mutate: startPollingForFile } = trpc.getFile.useMutation({
    onSuccess: ({ id }) => {
      // redirect the user
      router.push(`/dashboard/${id}`);
    },
    retry: true, // retry until successful (until we have a file)
    retryDelay: 500,
  });

  // determinant progress simulation
  const startSimulateProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        // don't go past 95
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        } else {
          return prev + 5;
        }
      });
    }, 300);
    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        setIsUploading(true);
        const progressInterval = startSimulateProgress();
        // start the upload
        const res = await startUpload(acceptedFile);
        if (!res) {
          clearInterval(progressInterval);
          setUploadProgress(0);
          return toast({
            title: "Something went wrong",
            description: "Please try again",
            variant: "destructive",
          });
        }
        const [fileResponse] = res;
        const key = fileResponse?.key;
        if (!key) {
          return toast({
            title: "Something went wrong",
            description: "Please try again",
            variant: "destructive",
          });
        }
        // begin polling to see if the uploaded file has made it to our database yet
        // eventually it will be added, and upon doing so, we will re-route the user
        startPollingForFile({ key });
        // clean up the loader
        clearInterval(progressInterval);
        setUploadProgress(100);
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="border h-64 m-4 border-dashed border-slate-200 rounded-lg"
        >
          <div className="flex items-center justify-center h-full w-full bg-gray-100 rounded-lg">
            <Label htmlFor="dropzone-file" className="font-normal">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Cloud className="h-6 w-6 text-slate-500 mb-2" />
                <p className="mb-2 text-slate-700 font-normal">
                  <span className="font-semibold">Click to Upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-slate-500">PDF (Up to 4MB)</p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="flex max-w-xs bg-white items-center rounded-md overflow-hidden outline outline-[1px] outline-slate-200 divide-x divide-slate-200">
                  {/* file preview */}
                  <div className="p-2 h-full grid place-items-center">
                    <File className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="p-2 h-full text-sm truncate">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="w-full mt-4 max-w-xs mx-auto">
                  <Progress
                    fillColor={uploadProgress === 100 ? "bg-green-400" : ""}
                    value={uploadProgress}
                    className="w-full h-1 bg-slate-300"
                  />
                  {uploadProgress === 100 && (
                    <div className="flex gap-1 items-center justify-center text-sm text-slate-500 text-center pt-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Redirecting...
                    </div>
                  )}
                </div>
              ) : null}

              <input
                {...getInputProps()}
                type="file"
                id="dropzone-file"
                className="hidden"
              />
            </Label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        !open ? setIsOpen(open) : null;
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button color="primary">Upload PDF</Button>
      </DialogTrigger>
      <DialogContent>
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
