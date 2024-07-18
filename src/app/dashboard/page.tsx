import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Dashboard from "@/components/Dashboard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const Page = async () => {
  // check auth
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  // if not authenticated, redirect to login
  if (!isUserAuthenticated) redirect(`/api/auth/login`);

  return (
    <MaxWidthWrapper>
      <Dashboard />
    </MaxWidthWrapper>
  );
};

export default Page;
