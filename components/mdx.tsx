import * as React from "react";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Collaborators } from "./Collaborators";
import MDXCarousel from "./mdx-carousel";

("use-client");
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function UIWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto mb-6 mt-2 flex w-full max-w-2xl items-center justify-center rounded-lg border border-zinc-400 bg-zinc-200 p-12">
      {children}
    </div>
  );
}

const components = {
  MDXCarousel,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Collaborators,
  UIWrapper,
  MiroMapLink: ({
    title,
    href,
    linkText,
  }: {
    title: string;
    href: string;
    linkText: string;
  }) => (
    <div
      className={cn(
        "z-1 relative mx-auto mt-2 flex w-full max-w-2xl rounded-md border bg-white p-3 align-baseline font-medium transition-all dark:bg-zinc-950",
        "shadow-none hover:shadow-[0px_0px_30px_-10px] hover:shadow-[var(--highlight)] ",
      )}
      style={{
        borderTopLeftRadius: "1.2rem 1rem",
        borderTopRightRadius: "1.2rem 1rem",
        borderBottomLeftRadius: "1.2rem 1em",
        borderBottomRightRadius: "1.2rem 1rem",
      }}
    >
      <p className="flex-grow p-2">{title}</p>
      <Link
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="flex items-center gap-2 bg-[var(--highlight)] p-2 px-4"
        style={{
          borderTopLeftRadius: ".4rem",
          borderTopRightRadius: ".4rem",
          borderBottomLeftRadius: ".4em",
          borderBottomRightRadius: ".4rem",
        }}
      >
        <div className="text-white hover:text-white">{linkText}</div>
        <div className="w-4">
          <svg
            viewBox="0 0 22 23"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M15.9425 0.501953H12.74L15.5831 4.9082L9.5725 0.501953H6.37L9.21313 6.2757L3.2025 0.501953H0L2.79625 7.9557L0 22.502H3.2025L9.21313 6.90508L6.37 22.502H9.5725L15.5831 5.5382L12.74 22.502H15.9425L22 3.86758L15.9425 0.501953Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </Link>
    </div>
  ),
  Img: ({
    alt,
    src,
    className,
    size,
    ImgClassName,
    ...otherProps
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    size: string;
    alt: string;
    ImgClassName: string;
    src: string;
  }) => (
    <div
      className={cn(
        "relative z-20 mx-auto my-6 flex aspect-[3/2] w-full items-center overflow-clip rounded-md border p-4 dark:bg-zinc-900 lg:p-24",
        className,
      )}
      {...otherProps} // Spread the rest of the props without className
    >
      <Image
        className={cn("", ImgClassName)}
        alt={alt}
        src={src}
        loading="eager"
        width={1}
        height={1}
        layout="responsive"
      />
    </div>
  ),
  img: ({
    className,
    alt,
    src,
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    src: string;
    alt: string;
    width: number;
    height: number;
  }) => {
    return (
      <Image
        className={cn("z-5 relative my-8", className)}
        src={src}
        alt={alt}
        width={1}
        height={1}
        layout="responsive"
      />
    );
  },
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "mx-auto  mb-2 mt-2 max-w-2xl scroll-m-20 text-3xl font-medium ",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mx-auto  mt-8 max-w-2xl scroll-m-20 pb-1 text-2xl font-medium first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "tracking  mx-auto mt-8 max-w-2xl scroll-m-20 text-xl font-medium",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        "mx-auto  mt-8 max-w-2xl scroll-m-20 text-xl font-medium",
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }) => (
    <h5
      className={cn(
        "mx-auto  mt-8 max-w-2xl scroll-m-20 text-lg font-medium",
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }) => (
    <h6
      className={cn(
        "mx-auto mt-8 max-w-2xl  scroll-m-20 text-base font-medium ",
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a className={cn("", className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn(
        "mx-auto mb-1 mt-1 max-w-2xl leading-7 [@is:not(first-child)]:mt-10",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <div className="mx-auto my-6 max-w-2xl ">
      <ul className={cn("ml-6 list-disc", className)} {...props} />
    </div>
  ),
  ol: ({ className, ...props }) => (
    <div className="mx-auto my-6 max-w-2xl ">
      <ol className={cn("ml-6 list-decimal", className)} {...props} />
    </div>
  ),
  li: ({ className, ...props }) => (
    <div className="">
      <li className={cn("my-1", className)} {...props} />
    </div>
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mx-auto mt-6  max-w-2xl border-l-2 pl-6 italic [&>*]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className=" mx-auto my-6 w-full max-w-2xl overflow-y-auto">
      <table
        style={{ tableLayout: "fixed" }}
        className={cn("w-full", className)}
        {...props}
      />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("m-0 p-0", className)} {...props} />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        " text-left  [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className="scrollbar-none mx-auto max-h-96 max-w-2xl overflow-x-auto rounded-xl p-6"
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code className={cn("text-sm", className)} {...props} />
  ),
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
}
