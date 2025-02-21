import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

// Define the structure of a cart item, which includes a product and its quantity.
interface CartItem {
  product: Product; // The product object (includes details like id, name, price, etc.)
  quantity: number; // The quantity of the product in the cart
}

// Define the state and actions for managing the shopping cart.
interface CartState {
  cart: Record<string, CartItem>; // A record where keys are product IDs and values are CartItems
  addItem: (product: Product, quantity: number) => void; // Function to add or update a product in the cart
  updateQuantity: (productId: string, delta: number) => void; // Function to update the quantity of a specific product
  removeItem: (productId: string) => void; // Function to remove a product from the cart
  clearCart: () => void; // ✅ Function to clear the entire cart
  getTotalItems: () => number; // Function to calculate the total number of items in the cart
  getTotalUniqueItems: () => number; // Function to calculate the total number of unique products in the cart
  getTotalPrice: () => number; // Function to calculate the total price of all items in the cart
}

// Create a Zustand store with persistence middleware to manage the shopping cart.
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initialize the cart as an empty object.
      cart: {},

      // Add or update a product in the cart. If the product already exists, increase its quantity.
      addItem: (product, quantity) =>
        set((state) => {
          const existingItem = state.cart[product.id]; // Check if the product is already in the cart
          return {
            cart: {
              ...state.cart,
              [product.id]: {
                product,
                quantity: existingItem
                  ? existingItem.quantity + quantity // Increment quantity if product exists
                  : quantity, // Set initial quantity if product is new
              },
            },
          };
        }),

      // Update the quantity of a specific product in the cart. If the new quantity is zero, remove the product.
      updateQuantity: (productId, delta) =>
        set((state) => {
          const existingItem = state.cart[productId]; // Get the product from the cart
          if (!existingItem) return state; // Do nothing if the product doesn't exist
          const newQuantity = Math.max(0, existingItem.quantity + delta); // Ensure quantity doesn't go below zero
          if (newQuantity === 0) {
            const newCart = { ...state.cart }; // Create a copy of the cart
            delete newCart[productId]; // Remove the product if quantity is zero
            return { cart: newCart };
          }
          return {
            cart: {
              ...state.cart,
              [productId]: { ...existingItem, quantity: newQuantity }, // Update the product's quantity
            },
          };
        }),

      // Remove a product from the cart by its ID.
      removeItem: (productId) =>
        set((state) => {
          const newCart = { ...state.cart }; // Create a copy of the cart
          delete newCart[productId]; // Remove the product
          return { cart: newCart };
        }),

      // Clear the entire cart by resetting it to an empty object.
      clearCart: () =>
        set(() => ({
          cart: {}, // ✅ Reset the cart to an empty object
        })),

      // Calculate the total number of items in the cart (sum of all quantities).
      getTotalItems: () =>
        Object.values(get().cart).reduce((acc, item) => acc + item.quantity, 0),

      // Calculate the total number of unique products in the cart (number of distinct products).
      getTotalUniqueItems: () => Object.keys(get().cart).length,

      // Calculate the total price of all items in the cart (sum of quantity * price for each product).
      getTotalPrice: () =>
        Object.values(get().cart).reduce(
          (acc, item) => acc + item.quantity * item.product.price, // Multiply quantity by price and sum
          0
        ),
    }),
    { name: "cart-storage" } // Persist the cart state in local storage under the key "cart-storage"
  )
);

// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { Product } from "@/types/product";

// // Define the structure of a cart item, which includes a product and its quantity.
// interface CartItem {
//   product: Product; // The product object (includes details like id, name, price, etc.)
//   quantity: number; // The quantity of the product in the cart
// }

// // Define the state and actions for managing the shopping cart.
// interface CartState {
//   cart: Record<string, CartItem>; // A record where keys are product IDs and values are CartItems
//   addItem: (product: Product, quantity: number) => void; // Function to add or update a product in the cart
//   updateQuantity: (productId: string, delta: number) => void; // Function to update the quantity of a specific product
//   removeItem: (productId: string) => void; // Function to remove a product from the cart
//   clearCart: () => void; // ✅ Function to clear the entire cart
//   getTotalItems: () => number; // Function to calculate the total number of items in the cart
//   getTotalUniqueItems: () => number; // Function to calculate the total number of unique products in the cart
//   getTotalPrice: () => number; // Function to calculate the total price of all items in the cart
// }

// // Create a Zustand store with persistence middleware to manage the shopping cart.
// export const useCartStore = create<CartState>()(
//   persist(
//     (set, get) => ({
//       // Initialize the cart as an empty object.
//       cart: {},

//       // Add or update a product in the cart. If the product already exists, increase its quantity.
//       addItem: (product, quantity) =>
//         set((state) => {
//           const existingItem = state.cart[product.id]; // Check if the product is already in the cart
//           return {
//             cart: {
//               ...state.cart,
//               [product.id]: {
//                 product,
//                 quantity: existingItem
//                   ? existingItem.quantity + quantity // Increment quantity if product exists
//                   : quantity, // Set initial quantity if product is new
//               },
//             },
//           };
//         }),

//       // Update the quantity of a specific product in the cart. If the new quantity is zero, remove the product.
//       updateQuantity: (productId, delta) =>
//         set((state) => {
//           const existingItem = state.cart[productId]; // Get the product from the cart
//           if (!existingItem) return state; // Do nothing if the product doesn't exist
//           const newQuantity = Math.max(0, existingItem.quantity + delta); // Ensure quantity doesn't go below zero
//           if (newQuantity === 0) {
//             const newCart = { ...state.cart }; // Create a copy of the cart
//             delete newCart[productId]; // Remove the product if quantity is zero
//             return { cart: newCart };
//           }
//           return {
//             cart: {
//               ...state.cart,
//               [productId]: { ...existingItem, quantity: newQuantity }, // Update the product's quantity
//             },
//           };
//         }),

//       // Remove a product from the cart by its ID.
//       removeItem: (productId) =>
//         set((state) => {
//           const newCart = { ...state.cart }; // Create a copy of the cart
//           delete newCart[productId]; // Remove the product
//           return { cart: newCart };
//         }),

//       // Clear the entire cart by resetting it to an empty object.
//       clearCart: () =>
//         set(() => ({
//           cart: {}, // ✅ Reset the cart to an empty object
//         })),

//       // Calculate the total number of items in the cart (sum of all quantities).
//       getTotalItems: () =>
//         Object.values(get().cart).reduce((acc, item) => acc + item.quantity, 0),

//       // Calculate the total number of unique products in the cart (number of distinct products).
//       getTotalUniqueItems: () => Object.keys(get().cart).length,

//       // Calculate the total price of all items in the cart (sum of quantity * price for each product).
//       getTotalPrice: () =>
//         Object.values(get().cart).reduce(
//           (acc, item) => acc + item.quantity * item.product.price, // Multiply quantity by price and sum
//           0
//         ),
//     }),
//     { name: "cart-storage" } // Persist the cart state in local storage under the key "cart-storage"
//   )
// );
