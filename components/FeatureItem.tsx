import { cn } from "@/lib/utils";
import FigmaProtoFrame from "./FigmaProtoFrame";
import Image from "next/image";

export type FeatureItemMedia =
  // A plain photo/screenshot that fills and crops to the wrapper.
  | { src: string; variant?: "cover" }
  // The same photo composited inside the browser/device mockup frame.
  | { src: string; variant: "framed"; frameClassName?: string };

export type FeatureItemProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  media: FeatureItemMedia;
  imageWrapperClassName?: string;
  position?: "left" | "right" | "center";
  content?: React.ReactNode;
};

export default function FeatureItem({
  title,
  description,
  icon,
  media,
  position,
  content,
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
            "relative flex aspect-3/2 w-full items-center justify-center overflow-hidden rounded-lg xl:min-h-[550px]",
            imageWrapperClassName,
          )}
        >
          {media.variant === "framed" ? (
            <div className="flex h-full w-full items-center justify-center">
              <FigmaProtoFrame
                src={media.src}
                image
                className={media.frameClassName}
              />
            </div>
          ) : (
            <Image
              src={media.src}
              alt={title}
              fill
              sizes="(min-width: 640px) 60vw, 100vw"
              className="object-cover"
            />
          )}
        </div>
        <div className="flex flex-col gap-4 pt-4">
          <div className="flex flex-row gap-2 align-middle">
            <div className="h-6 w-6 rounded-md *:h-full *:w-full dark:bg-foreground">
              {icon}
            </div>
            <h3>{title}</h3>
          </div>
          <div className="grid w-full gap-6 sm:grid-cols-3">
            <p className="sm:col-span-1">{description}</p>
            <div className="flex flex-col gap-2 sm:col-span-2">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
