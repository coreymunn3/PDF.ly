"use client";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { LoadingSpinner } from "./ui/spinner";
import { useToast } from "./ui/use-toast";
import { useResizeDetector } from "react-resize-detector";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  SearchIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SimpleBar from "simplebar-react";

// pdf worker from react-pdf see https://github.com/wojtekmaj/react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfRendererProps {
  fileUrl: string;
}

const PdfRenderer = (props: PdfRendererProps) => {
  const { fileUrl } = props;
  const { toast } = useToast();
  const { width, ref: resizeRef } = useResizeDetector({
    handleHeight: false,
    refreshMode: "debounce",
    refreshRate: 100,
  });

  // field validation & typing
  const pageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPages!),
  });
  type TPageValidator = z.infer<typeof pageValidator>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<TPageValidator>({
    defaultValues: {
      page: "1",
    },
    mode: "onChange",
    resolver: zodResolver(pageValidator),
  });

  const [numPages, setNumPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(1);

  const handleNextPage = () => setCurrentPage((currPage) => currPage + 1);
  const handlePrevPage = () => setCurrentPage((currPage) => currPage - 1);
  const handlePageSubmit = (data: TPageValidator) => {
    setCurrentPage(Number(data.page));
  };
  const handleZoom = (zoomLevel: number) => {
    setZoom(zoomLevel);
  };

  return (
    <div className="w-full bg-white rounded-md flex flex-col items-center">
      {/* control bar */}
      <div className="h-14 w-full border-b border-slate-200 items-center justify-between px-2">
        <div className="flex h-full items-center gap-2">
          <TooltipProvider>
            {/* previous page */}
            <Tooltip>
              <TooltipTrigger>
                <Button
                  aria-label="previous-page"
                  variant={"ghost"}
                  disabled={currentPage === 1 || numPages === undefined}
                  onClick={handlePrevPage}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Previous Page</p>
              </TooltipContent>
            </Tooltip>
            {/* page input */}
            <div className="flex items-center gap-1.5">
              <Input
                {...register("page")}
                className={cn(
                  "w-12 h-8",
                  errors.page && "focus-visible:ring-red-500"
                )}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(handlePageSubmit)();
                  }
                }}
              />
              <p className="text-slate-600 text-sm">{`of ${
                numPages ?? "?"
              }`}</p>
            </div>
            {/* next page */}
            <Tooltip>
              <TooltipTrigger>
                <Button
                  aria-label="next-page"
                  variant={"ghost"}
                  disabled={currentPage === numPages || numPages === undefined}
                  onClick={handleNextPage}
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Next Page</p>
              </TooltipContent>
            </Tooltip>
            {/* zoom */}
            <div className="space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="gap-1" aria-label="zoom" variant={"ghost"}>
                    <SearchIcon className="h-4 w-4" />
                    <p>{zoom * 100}%</p>
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => handleZoom(0.5)}>
                    50%
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleZoom(1)}>
                    100%
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleZoom(1.5)}>
                    150%
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleZoom(2)}>
                    200%
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleZoom(2.5)}>
                    250%
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TooltipProvider>
        </div>
      </div>
      {/* PDF view */}
      <div className="flex-1 w-full max-h-screen">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
          <div ref={resizeRef}>
            <Document
              loading={
                <div className="flex justify-center">
                  <LoadingSpinner />
                </div>
              }
              onLoadError={(error) =>
                toast({
                  title: "There was an error loading the document",
                  description: error.message,
                  variant: "destructive",
                })
              }
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              file={fileUrl}
              className="max-h-full"
            >
              <Page
                width={width ? width : 1}
                pageNumber={currentPage}
                scale={zoom}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default PdfRenderer;
