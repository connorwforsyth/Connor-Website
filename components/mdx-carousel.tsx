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
    <CarouselItem className="basis-11/12  ">{child}</CarouselItem>
  ));

  return (
    <>
      <Carousel className="mx-auto mt-6 w-full max-w-6xl " setApi={setApi}>
        <div className="mx-auto w-full max-w-2xl pb-3 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
        <div className="overflow-clip">
          <CarouselContent className="">{items}</CarouselContent>
        </div>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
