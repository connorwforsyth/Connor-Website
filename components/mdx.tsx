import Image from "next/image";
import Link from "next/link";
import type * as React from "react";
import type { JSX } from "react";
import { Tweet as TweetEmbed } from "react-tweet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Caption from "./Caption";
import { Collaborators, Person } from "./Collaborators";
import FigmaEmbed from "./FigmaEmbedPage";
import FigmaProtoFrame from "./FigmaProtoFrame";
import Comment from "./inlineComment";
import MDXCarousel from "./mdx-carousel";
import SmoothButton from "./Spinner/SmoothSpinner";
import { Spinner } from "./Spinner/Spinner";
import CompPlayer from "./VideoPlayer";

export function UIWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto mt-2 mb-6 flex w-full max-w-2xl items-center justify-center rounded-lg border border-border bg-muted p-12">
      {children}
    </div>
  );
}

export const mdxComponents = {
  a: ({ className, ...props }) => (
    <a
      className={cn(
        "box-shadow-small hover:box-shadow-full font-[450] text-foreground underline-offset-4",
        className
      )}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mx-auto my-6 max-w-2xl border-l-2 pl-6 font-rodney font-normal text-lg italic leading-10 lg:pr-32",
        className
      )}
      {...props}
    />
  ),
  Caption,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Collaborators,
  Comment,
  CompPlayer,
  code: ({ className, ...props }) => (
    <code className={cn("text-sm", className)} {...props} />
  ),
  FigmaEmbed,
  FigmaProtoFrame,
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "mx-auto mt-2 mb-2 max-w-2xl scroll-m-20 font-medium text-3xl",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mx-auto mt-8 max-w-2xl scroll-m-20 pb-1 font-medium text-xl first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "tracking mx-auto mt-8 max-w-2xl scroll-m-20 font-medium text-xl",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        "mx-auto mt-8 max-w-2xl scroll-m-20 font-medium text-xl",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }) => (
    <h5
      className={cn(
        "mx-auto mt-8 max-w-2xl scroll-m-20 font-medium text-lg",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }) => (
    <h6
      className={cn(
        "mx-auto mt-8 max-w-2xl scroll-m-20 font-medium text-base",
        className
      )}
      {...props}
    />
  ),
  hr: ({ ...props }) => (
    <hr
      className="mx-auto my-4 flex max-w-2xl items-center justify-center overflow-visible border-none text-center opacity-50 after:content-['*_*_*'] md:my-8"
      {...props}
    />
  ),
  Image,
  Img: ({
    alt,
    src,
    className,
    size,
    type,
    ImgClassName,
    ...otherProps
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    size: string;
    alt: string;
    ImgClassName: string;
    src: string;
    type: "slides" | "2/3" | "hero";
  }) => (
    <div className={alt ? "mt-4" : "my-4"}>
      <div
        className={cn(
          type
            ? type === "slides"
              ? "mx-auto flex aspect-auto w-full items-center overflow-clip rounded-md p-0 lg:p-0"
              : type === "hero"
                ? "relative mx-auto flex aspect-auto w-full items-center overflow-clip rounded-md border bg-gradient-to-tr from-blue-500 to-blue-600 p-4 sm:p-8 lg:p-24"
                : ""
            : "relative mx-auto flex aspect-[3/2] w-full items-center overflow-clip rounded-md border bg-background lg:p-24",
          className
        )}
        {...otherProps} // Spread the rest of the props without className
      >
        <Image
          alt={alt}
          className={cn(
            type === "hero" ? "mx-auto w-full max-w-2xl" : "",
            ImgClassName
          )}
          height={1}
          layout="responsive"
          loading="eager"
          src={src}
          width={1}
        />
      </div>
      {alt && (
        <em className="mx-auto mt-2 mb-4 block w-full max-w-2xl text-center text-foreground/80 text-sm">
          {alt}
        </em>
      )}
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
  }) => (
    <Image
      alt={alt}
      className={cn("my-8 rounded-lg", className)}
      height={1}
      layout="responsive"
      src={src}
      width={1}
    />
  ),
  li: ({ className, ...props }) => (
    <div className="">
      <li className={cn("my-1", className)} {...props} />
    </div>
  ),
  MDXCarousel,
  MiroMapLink: ({
    title,
    href,
    linkText,
    className,
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    title: string;
    href: string;
    linkText: string;
  }) => (
    <div
      className={cn(
        "relative z-1 mx-auto mb-4 flex w-full max-w-2xl flex-col rounded-md border border-border bg-card p-3 text-center align-baseline font-medium transition-all sm:flex-row sm:justify-center sm:text-left",
        "shadow-none hover:shadow-[0px_0px_30px_-10px] hover:shadow-[var(--highlight)]",
        className
      )}
      style={{
        borderBottomLeftRadius: "1.2rem 1em",
        borderBottomRightRadius: "1.2rem 1rem",
        borderTopLeftRadius: "1.2rem 1rem",
        borderTopRightRadius: "1.2rem 1rem",
      }}
    >
      <p className="flex-grow p-2">{title}</p>
      <Link
        className="flex items-center justify-center gap-2 bg-[var(--highlight)] p-4 px-4 sm:p-2"
        href={href}
        rel="noreferrer noopener"
        style={{
          borderBottomLeftRadius: ".4em",
          borderBottomRightRadius: ".4rem",
          borderTopLeftRadius: ".4rem",
          borderTopRightRadius: ".4rem",
        }}
        target="_blank"
      >
        <div className="text-white hover:text-white">{linkText}</div>
        <div className="w-4">
          <svg
            className="text-white"
            viewBox="0 0 22 23"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.9425 0.501953H12.74L15.5831 4.9082L9.5725 0.501953H6.37L9.21313 6.2757L3.2025 0.501953H0L2.79625 7.9557L0 22.502H3.2025L9.21313 6.90508L6.37 22.502H9.5725L15.5831 5.5382L12.74 22.502H15.9425L22 3.86758L15.9425 0.501953Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </Link>
    </div>
  ),
  ol: ({ className, ...props }) => (
    <div className="mx-auto max-w-2xl">
      <ol className={cn("ml-6 list-decimal", className)} {...props} />
    </div>
  ),
  Person,
  p: ({ className, ...props }) => (
    <p
      className={cn(
        "relative mx-auto mt-4 max-w-2xl leading-7 dark:text-foreground/90",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "scrollbar-none mx-auto my-8 max-h-[32rem] max-w-2xl overflow-x-auto rounded-lg border border-border bg-card px-0 py-4 font-mono text-[0.8125rem] leading-6 shadow-sm",
        "[&>code]:grid [&>code]:min-w-full [&>code]:whitespace-pre",
        "[&_[data-line]]:min-h-6 [&_[data-line]]:px-5",
        "[&_[data-highlighted-line]]:bg-accent",
        className
      )}
      {...props}
    />
  ),
  SmoothButton,
  Spinner,
  // react-tweet's Tweet component return type (string | number | boolean |
  // Element | Iterable<ReactNode>) doesn't structurally match MDXComponents'
  // expected (props: any) => Element signature — cast rather than widening
  // the shared mdxComponents type.
  Tweet: TweetEmbed as unknown as (
    props: Parameters<typeof TweetEmbed>[0]
  ) => JSX.Element,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="mx-auto my-6 w-full max-w-2xl overflow-y-auto">
      <table
        className={cn("w-full", className)}
        style={{ tableLayout: "fixed" }}
        {...props}
      />
    </div>
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "text-left align-top [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("m-0 p-0", className)} {...props} />
  ),
  UIWrapper,
  ul: ({ className, ...props }) => (
    <div className="mx-auto mb-6 max-w-2xl">
      <ul className={cn("ml-6 list-disc", className)} {...props} />
    </div>
  ),
};

export function Mdx({ children }: { children: React.ReactNode }) {
  return <div className="mdx">{children}</div>;
}
