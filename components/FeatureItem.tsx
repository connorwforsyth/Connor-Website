import { cn } from "@/lib/utils";
import FigmaProtoFrame from "./FigmaProtoFrame";
import Image from "next/image";

export type FeatureItemProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  imageWrapperClassName?: string;
  position?: "left" | "right" | "center";
  figmaproto?: boolean;
  figmaProtoProps?: { className?: string };
  content?: React.ReactNode;
};

export default function FeatureItem({
  title,
  description,
  icon,
  image,
  position,
  content,
  figmaproto,
  figmaProtoProps,
  imageWrapperClassName,
}: FeatureItemProps) {
  return (
    <div className="grid grid-cols-12">
      <div
        className={cn("col-span-12 sm:col-span-7", {
          "sm:col-start-1": position === "left",
          "sm:col-start-2": position === "center",
          "sm:col-end-13": position === "right",
        })}
      >
        <div
          className={cn(
            `aspect-3/2 flex w-full items-center justify-center overflow-hidden rounded-lg *:h-full *:w-full xl:min-h-[550px]`,
            imageWrapperClassName,
          )}
        >
          {figmaproto ? (
            <FigmaProtoFrame
              src={image as string}
              image={true}
              {...figmaProtoProps}
            />
          ) : (
            <Image
              className=""
              src={image}
              alt={title}
              width={1000}
              height={1000}
            />
          )}
        </div>
        <div className="flex flex-col gap-4 pt-4">
          <div className="flex flex-row gap-2 align-middle">
            <div className="h-6 w-6 rounded-md *:h-full *:w-full dark:bg-white">
              {icon}
            </div>
            <h3>{title}</h3>
          </div>
          <div className="grid w-full gap-6 sm:grid-cols-3">
            <p className="dark:text-neutral-300 sm:col-span-1">{description}</p>
            <div className="flex flex-col gap-2 sm:col-span-2">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
