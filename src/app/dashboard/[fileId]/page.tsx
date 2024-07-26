import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";
import db from "@/db";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PdfRenderer from "@/components/PdfRenderer";
import ChatWrapper from "@/components/ChatWrapper";

interface PageProps {
  params: {
    fileId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { fileId } = params;
  // check auth
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  // if not authenticated, redirect to login
  if (!isUserAuthenticated) redirect(`/api/auth/login`);
  // get the file the user is trying to view
  const file = await db.file.findFirst({
    where: {
      id: fileId,
      // userId: user.id,
    },
  });
  if (!file) notFound();

  // render the file
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col flex-1 justify-between h-[calc(100vh - 3.5rem)]">
        <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
          {/* PDF Left side */}
          <div className="flex-1 xl:flex">
            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1">
              <PdfRenderer fileUrl={file.url} />
            </div>
          </div>

          {/* Chat Right Side */}
          <div className="shrink-0 flex-[0.75] border-t border-slate-200 lg:w-96 lg:border-l lg:border-t-0">
            <ChatWrapper />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
