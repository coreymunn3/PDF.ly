import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";
import db from "@/db";

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

  console.log(file);

  // render the file
  return <div>page</div>;
};

export default Page;
