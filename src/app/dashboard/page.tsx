import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import db from "@/db";

const Dashboard = async () => {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  // if the user is brand new, we need to sync them to the DB
  if (!kindeUser || !kindeUser.id) {
    redirect("/auth-callback?origin=dashboard");
  }
  // if user is not in our database, add them
  const dbUser = await db.user.findFirst({
    where: {
      id: kindeUser.id,
    },
  });
  if (!dbUser) {
    redirect("/auth-callback?origin=dashboard");
  }

  return <div>{dbUser?.email}</div>;
};

export default Dashboard;
