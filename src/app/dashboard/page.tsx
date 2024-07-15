import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Dashboard from "@/components/Dashboard";

const Page = async () => {
  // check auth
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  // if not authenticated, redirect to login
  if (!isUserAuthenticated) redirect(`/api/auth/login`);

  return <Dashboard />;
};

export default Page;
