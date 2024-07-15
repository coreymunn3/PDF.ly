import React from "react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 backdrop-blur-md transition-all">
      <MaxWidthWrapper className="">
        <div className="flex justify-between items-center py-2">
          <Link href="/" className="font-semibold text-primary">
            PDF.ly
          </Link>
          <div className="items-center space-x-4 sm:flex">
            <Link
              href="/pricing"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              Pricing
            </Link>

            <LoginLink
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              Sign In
            </LoginLink>
            <RegisterLink
              className={buttonVariants({
                size: "sm",
              })}
            >
              Get Started
            </RegisterLink>
            <LogoutLink
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
              })}
            >
              Log Out
            </LogoutLink>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
