import React, { ReactNode } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { cn } from "@/lib/utils";

const LandingPageSection = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto px-4 md:px-10 my-16 md:my-24 lg:my-40 text-center",
        className
      )}
    >
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </div>
  );
};

export default LandingPageSection;
