import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import LandingPageSection from "@/components/LandingPageSection";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowDroprightCircle } from "react-icons/io";

export default function Home() {
  return (
    <>
      <LandingPageSection>
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-gray-700">
            pdfly is now public 🎉
          </p>
        </div>
        <Typography className="">
          Chat with your <span className="text-primary">documents</span> in
          seconds
        </Typography>
        <Typography variant="p" className="text-slate-500">
          PDFly allows you to have conversations with any PDF document. Simply
          upload your file and start asking quesetions right away
        </Typography>
        <Link
          className={buttonVariants({
            variant: "default",
            size: "lg",
            className: "mt-4",
          })}
          href="/dashboard"
          target="_blank"
        >
          Get Started <IoIosArrowDroprightCircle className="ml-2 h-5 w-5" />
        </Link>
      </LandingPageSection>

      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            ></div>
          </div>

          <LandingPageSection>
            <Image
              src="/dashboard-preview.jpg"
              alt="product-preview"
              width={1360}
              height={866}
              className="rounded-md shadow-2xl"
            />
          </LandingPageSection>

          {/* features */}
          <LandingPageSection>
            <Typography variant={"h1"}>Get Going in Seconds</Typography>
            <Typography variant={"p"} className="text-slate-500">
              Asking questions to your PDF files has never been easier than with
              PDFly
            </Typography>

            {/* get started steps */}
            <ol className="my-8 text-left lg:flex lg:space-y-0 lg:space-x-12">
              <li className="max-w-xs md:max-w-md mx-auto">
                <div className="flex flex-col space-y-4 border-l-4 border-slate-300 pl-2 lg:border-l-0 lg:border-t-2 lg:pb-0 lg:pl-0 lg:pt-4">
                  <span className="text-sm font-medium text-primary">
                    Step 1
                  </span>
                  <span className="text-xl font-semibold">
                    Sign up for an Account
                  </span>
                  <span className=" text-slate-400">
                    Either starting out with a free plan or choose our{" "}
                    <Link href="/pricing" className="text-violet-800 underline">
                      {" "}
                      pro plan
                    </Link>
                  </span>
                </div>
              </li>

              <li className="my-4 max-w-xs md:max-w-md mx-auto">
                <div className="flex flex-col space-y-4 border-l-4 border-slate-300 pl-2 lg:border-l-0 lg:border-t-2 lg:pb-0 lg:pl-0 lg:pt-4">
                  <span className="text-sm font-medium text-primary">
                    Step 2
                  </span>
                  <span className="text-xl font-semibold">
                    Upload your PDF file
                  </span>
                  <span className=" text-slate-400">
                    We will process your file and make it ready for you to chat
                    with.
                  </span>
                </div>
              </li>

              <li className="my-4 max-w-xs md:max-w-md mx-auto">
                <div className="flex flex-col space-y-4 border-l-4 border-slate-300 pl-2 lg:border-l-0 lg:border-t-2 lg:pb-0 lg:pl-0 lg:pt-4">
                  <span className="text-sm font-medium text-primary">
                    Step 3
                  </span>
                  <span className="text-xl font-semibold">
                    Start Asking Questions
                  </span>
                  <span className=" text-slate-400">
                    It&apos;s that simple. Try out PDFly today - it takes less
                    than a minute.
                  </span>
                </div>
              </li>
            </ol>

            <Image
              src="/file-upload-preview.jpg"
              alt="upload-preview"
              width={1400}
              height={700}
              className="rounded-md shadow-2xl"
            />
          </LandingPageSection>
        </div>
      </div>
    </>
  );
}
