import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "../helpers/formatCurrency";
import { useCartStore } from "../../../../store/cartStore";
import Image from "next/image";
import DeleteItemDialog from "./DeleteItem";
import { Trash2 } from "lucide-react";

interface CartItemProps {
  product: { id: string; name: string; price: number; imageUrl: string };
  quantity: number;
}

const CartItem = ({ product, quantity }: CartItemProps) => {
  const { removeItem, updateQuantity } = useCartStore();

  return (
    <Card className="p-4 transition-all hover:shadow-md max-w-3xl">
      <div
        className="flex flex-col lg:flex-row flex-warp w-full "
        // className="grid grid-cols-1 lg:grid-cols-[100px_1fr_180px] gap-4 items-start"
      >
        {/* Product Image */}
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 50vw, 100px"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col  items-start lg:items-center gap-4 w-full">
          <div className="flex-1 space-y-2">
            <h3 className="text-base font-semibold line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {formatCurrency(product.price)} each
            </p>
          </div>

          {/* Controls Section */}
          <div className="flex flex-col sm:flex-row  lg:flex-row items-center gap-4 w-full">
            {/* Quantity Controls */}
            <div className="flex items-center flex-col gap-2 w-full justify-between">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 px-0 rounded-r-none"
                  onClick={() => updateQuantity(product.id, -1)}
                  disabled={quantity <= 1}
                >
                  −
                </Button>
                <span className="w-10 text-center text-sm font-medium">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 px-0 rounded-l-none"
                  onClick={() => updateQuantity(product.id, 1)}
                >
                  +
                </Button>
              </div>

              {/* Total Price */}
              <p className="text-base font-semibold text-primary">
                {formatCurrency(product.price * quantity)}
              </p>

              <DeleteItemDialog
                productId={product.id}
                productName={product.name}
                removeItem={removeItem}
              />
            </div>

            {/* Delete Button */}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartItem;
