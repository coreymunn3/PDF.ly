"use client";
import React, { useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Typography } from "./ui/typography";
import { LoadingSpinner } from "./ui/spinner";
import UploadButton from "./UploadButton";
import { trpc } from "@/app/_trpc/client";
import { Ghost, MessageSquare, Plus, TrashIcon } from "lucide-react";
import { DateTime } from "luxon";
import Link from "next/link";
import { Button } from "./ui/button";

const Dashboard = () => {
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  // utils - to invalidate queryes
  const utils = trpc.useUtils();
  // queries
  const { data: files, isLoading } = trpc.getUserFiles.useQuery();
  const { mutate } = trpc.deleteUserFile.useMutation({
    // invalidate if successfully deleted
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
    onMutate: ({ id }) => {
      setCurrentFile(id);
    },
    onSettled: () => {
      setCurrentFile(null);
    },
  });

  const handleDeleteFile = (id: string) => {
    mutate({ id });
  };

  return (
    <MaxWidthWrapper>
      <main>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
          <Typography variant="h1">My Files</Typography>
          <UploadButton />
        </div>

        {isLoading ? (
          <div className="mt-16 flex flex-col items-center h-28">
            <LoadingSpinner />
          </div>
        ) : !files || !files.length ? (
          <div className="mt-16 flex flex-col items-center gap-2">
            <Ghost className="h-8 w-8 text-slate-800" />
            <Typography variant={"h3"}>Nothing, yet!</Typography>
          </div>
        ) : (
          <ul className="mt-8 grid grid-cols-1 gap-4 divide-slate-200 md:grid-cols-2 lg:grid-cols-3">
            {files &&
              files
                .sort(
                  (a, b) =>
                    new Date(b.createdAt!).getTime() -
                    new Date(a.createdAt!).getTime()
                )
                .map((file) => (
                  <li
                    key={file.id}
                    className="col-span-1 divide-y divide-slate-100 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow ease-in-out duration-300"
                  >
                    <Link
                      href={`/dashboard/${file.id}`}
                      className="flex flex-col gap-2"
                    >
                      <div className="p-6 flex w-full items-center justify-between space-x-6">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                        <div className="flex-1 truncate">
                          <div className="flex items-center space-x-3">
                            <Typography
                              variant={"p"}
                              className="text-slate-700"
                            >
                              {file.name}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="grid grid-cols-3 p-2 gap-6 place-items-center text-xs text-zinc-500">
                      <div className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        {DateTime.fromJSDate(
                          new Date(file.createdAt!)
                        ).toFormat("MMM yyyy")}
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        mocked
                      </div>
                      <Button
                        size={"sm"}
                        variant={"destructive"}
                        className="w-full"
                        onClick={() => handleDeleteFile(file.id)}
                      >
                        {currentFile === file.id ? (
                          <LoadingSpinner
                            size={20}
                            className="text-destructive-foreground"
                          />
                        ) : (
                          <TrashIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </li>
                ))}
          </ul>
        )}
      </main>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
