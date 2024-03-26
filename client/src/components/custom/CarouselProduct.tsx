import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { products } from "@/utils/products";

export default function CarouselProduct() {
  return (
    <Carousel className="w-4/5 mx-auto" opts={{ loop: true }}>
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 cursor-pointer"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <img
                    src={product.images[0].image}
                    alt={product.name}
                    className="object-contain h-full w-full"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="flex lg:hidden" />
      <CarouselNext className="flex lg:hidden" />
    </Carousel>
  );
}
