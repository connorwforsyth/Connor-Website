import { cn } from "@/lib/utils";
import Image from "next/image";
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
        "mx-auto w-full max-w-5xl rounded-[8px] border border-zinc-300 bg-zinc-300 p-[4px] shadow-md *:rounded-[4px] dark:bg-white/50 md:rounded-[12px] md:bg-white/50 md:p-[8px] md:*:rounded-[6px]",
        !wrapper && className,
      )}
    >
      {image ? (
        <Image
          src={src}
          alt="image"
          width={1440}
          height={1024}
          className="relative aspect-[1440/1024] w-full overflow-clip bg-white object-cover"
        />
      ) : (
        <iframe
          className="relative aspect-[1440/1024] w-full overflow-clip bg-white"
          src={`${src}&scaling=scale-down-width&hide-ui=1`}
        />
      )}
    </div>
  );

  if (!wrapper) return card;

  return (
    <div
      className={cn(
        "relative z-10 flex w-full flex-col justify-center rounded-lg from-orange-300 to-orange-500 md:bg-gradient-to-r md:p-24",
        className,
      )}
    >
      {card}
    </div>
  );
};

export default FigmaProtoFrame;
