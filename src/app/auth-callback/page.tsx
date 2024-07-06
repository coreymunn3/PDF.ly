"use client";
import { useRouter } from "next/navigation";
import { trpc } from "../_trpc/client";
import { LoadingSpinner } from "@/components/ui/spinner";
import { Typography } from "@/components/ui/typography";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();
  const origin = searchParams["origin"];

  const { isSuccess, error, isError } = trpc.authCallback.useQuery(undefined, {
    retry: true,
    retryDelay: 500, // ms
  });

  if (isSuccess) {
    router.push(origin ? `/${origin}` : "/dashboard");
  }

  if (isError) {
    if (error.data?.code === "UNAUTHORIZED") {
      router.push("/sign-in");
    }
  }

  return (
    <div className="w-full mt-24 flex justify-center items-center flex-col">
      <LoadingSpinner size={48} />
      <br></br>
      <Typography variant={"h3"} className="text-primary">
        Setting Up Your Account...
      </Typography>
    </div>
  );
};

export default Page;
