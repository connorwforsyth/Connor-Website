"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

export default function MDXCarousel({ children }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const items = React.Children.map(children, (child) => (
    <CarouselItem className="">{child}</CarouselItem>
  ));

  return (
    <>
      <Carousel className="" setApi={setApi}>
        <div className="mx-auto flex h-auto w-full max-w-2xl items-center justify-center gap-3 pt-3 text-sm text-muted-foreground">
          <CarouselPrevious />
          <p>
            Slide {current} of {count}
          </p>
          <CarouselNext />
        </div>
        <CarouselContent className="mx-auto w-full max-w-6xl cursor-grab">
          {items}
        </CarouselContent>
      </Carousel>
    </>
  );
}
