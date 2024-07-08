"use client";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Typography } from "./ui/typography";
import { LoadingSpinner } from "./ui/spinner";
import UploadButton from "./UploadButton";
import { trpc } from "@/app/_trpc/client";
import { Ghost } from "lucide-react";

const FilesList = ({
  files,
  isLoading,
}: {
  files: Object[] | undefined;
  isLoading: Boolean;
}) => {
  if (isLoading) {
    return (
      <div className="mt-16 flex flex-col items-center h-28">
        <LoadingSpinner />
      </div>
    );
  }
  if (!files || !files.length) {
    // say: no files! or something
  }
  return (
    <div className="mt-16 flex flex-col items-center gap-2">
      <Ghost className="h-8 w-8 text-slate-800" />
      <Typography variant={"h3"}>Nothing, yet!</Typography>
    </div>
  );
};

const Dashboard = () => {
  const { data, isLoading } = trpc.getUserFiles.useQuery();

  return (
    <MaxWidthWrapper>
      <main>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
          <Typography variant="h1">My Files</Typography>
          <UploadButton />
        </div>

        {/* display all the files a user has uploaded */}
        <FilesList files={data} isLoading={isLoading} />
      </main>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
