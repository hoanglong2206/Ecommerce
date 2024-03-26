import { Product } from "@/interfaces";
import { Rating } from "@mui/material";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProductReviewsProps {
  data: Product;
}

const ProductReviews = ({ data }: ProductReviewsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">Product Reviews</h3>
      <div className="space-y-6">
        {data.comments &&
          data.comments.map((comment) => (
            <div key={comment.id} className="space-y-2">
              <div key={comment.id} className="flex items-center gap-x-2">
                <Avatar>
                  <AvatarImage src={comment.user.image} alt="Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="font-semibold">{comment.user.name}</div>
                <div className="font-light">
                  {moment(comment.createdDate).fromNow()}
                </div>
              </div>
              <div className="space-x-2">
                <Rating value={comment.rating} readOnly />
                <div>{comment.comment}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductReviews;
