import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "../helpers/formatCurrency";
import { useCartStore } from "../../../../store/cartStore";
import Image from "next/image";
import DeleteItemDialog from "./DeleteItem";
import { Trash2 } from "lucide-react";

interface CartItemProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    details: string | null;
  };
  quantity: number;
}

const CartItem = ({ product, quantity }: CartItemProps) => {
  const { removeItem, updateQuantity } = useCartStore();

  return (
    <Card className="p-4 transition-all hover:shadow-md dark:hover:shadow-gray-800/50 max-w-3xl border-2 border-gradient rounded-xl">
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Product Image */}
        <div className="relative w-full lg:w-32 aspect-square rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 50vw, 100px"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="space-y-2">
            {/* Product Name */}
            <h3 className="text-lg font-semibold line-clamp-2 text-foreground">
              {product.name}
            </h3>
            {/* Product Details */}
            {product.details && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.details}
              </p>
            )}
            {/* Price per Item */}
            <p className="text-sm text-muted-foreground">
              {formatCurrency(product.price)} each
            </p>
          </div>

          {/* Controls Section */}
          <div className="flex flex-col sm:flex-row lg:flex-row items-center gap-4 w-full">
            {/* Quantity Controls */}
            <div className="flex items-center border rounded-lg border-gradient">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 px-0 rounded-r-none hover:bg-primary/10"
                onClick={() => updateQuantity(product.id, -1)}
                disabled={quantity <= 1}
              >
                −
              </Button>
              <span className="w-10 text-center text-sm font-medium text-foreground">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 px-0 rounded-l-none hover:bg-primary/10"
                onClick={() => updateQuantity(product.id, 1)}
              >
                +
              </Button>
            </div>

            {/* Total Price */}
            <p className="text-lg font-semibold text-primary">
              {formatCurrency(product.price * quantity)}
            </p>

            {/* Delete Button */}
            <div className="flex items-center justify-end flex-1">
              <DeleteItemDialog
                productId={product.id}
                productName={product.name}
                removeItem={removeItem}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartItem;
