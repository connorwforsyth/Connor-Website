import Image from "next/image";
import { cn } from "@/lib/utils";

type FigmaProtoFrameProps = {
  src: string;
  className?: string;
  image?: boolean;
  wrapper?: boolean;
};

const FigmaProtoFrame = ({
  src,
  className,
  image,
  wrapper = true,
}: FigmaProtoFrameProps) => {
  const card = (
    <div
      className={cn(
        "mx-auto w-full max-w-5xl rounded-[8px] border border-zinc-300 bg-zinc-300 p-[4px] shadow-md *:rounded-[4px] md:rounded-[12px] md:bg-white/50 md:p-[8px] md:*:rounded-[6px] dark:bg-white/50",
        !wrapper && className
      )}
    >
      {image ? (
        <Image
          alt="image"
          className="relative aspect-[1440/1024] w-full overflow-clip bg-white object-cover"
          height={1024}
          src={src}
          width={1440}
        />
      ) : (
        <iframe
          className="relative aspect-[1440/1024] w-full overflow-clip bg-white"
          src={`${src}&scaling=scale-down-width&hide-ui=1`}
          title="Figma prototype"
        />
      )}
    </div>
  );

  if (!wrapper) {
    return card;
  }

  return (
    <div
      className={cn(
        "relative z-10 flex w-full flex-col justify-center rounded-lg from-orange-300 to-orange-500 md:bg-gradient-to-r md:p-24",
        className
      )}
    >
      {card}
    </div>
  );
};

export default FigmaProtoFrame;
