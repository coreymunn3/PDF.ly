"use client";

import { trpc } from "../_trpc/client";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  console.log(searchParams);
  const origin = searchParams["origin"];

  const res = trpc.test.useQuery();
  console.log(res.data);

  return <div>Page</div>;
};

export default Page;
