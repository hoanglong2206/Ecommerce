import { Product } from "@/interfaces";

interface ProductImagesProps {
  data: Product;
}

const ProductImages = ({ data }: ProductImagesProps) => {
  return (
    <div className="grid grid-cols-6 gap-2 ">
      <div className="flex flex-col items-center justify-center gap-4 cursor-pointer  max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        {data.images.map((image) => (
          <div
            key={image.color}
            className={`relative w-4/5 aspect-square rounded border-teal-300 border-[1.5px] p-1`}
          >
            <img
              src={image.image}
              alt={image.color}
              className="object-contain"
            />
          </div>
        ))}
      </div>
      <div className="col-span-5 relative aspect-square">
        <img
          src={data.images[0].image}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ProductImages;
