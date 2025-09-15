"use server";
"use server";

import { TAGS } from "@/src/lib/constants";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "@/src/lib/shopify";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addItem(
  prevState: any, // Error: Unexpected any. Specify a different type. (@typescript-eslint/no-explicit-any)
  selectedVariantId: string | undefined
) {
  const cookieStore = await cookies();
  let cartId = cookieStore.get("cartId")?.value; // Error: 'cartId' is never reassigned. Use 'const' instead. (prefer-const)

  if (!cartId || !selectedVariantId) {
    return "Error adding item to cart";
  }

  try {
    await addToCart(cartId, [
      { merchandiseId: selectedVariantId, quantity: 1 },
    ]);
    revalidateTag(TAGS.cart);
  } catch (error) { // Error: 'error' is defined but never used. (@typescript-eslint/no-unused-vars)
    return "Error adding item to cart";
  }
}

export async function updateItemQuantity(
  prevState: any, // Error: Unexpected any. Specify a different type. (@typescript-eslint/no-explicit-any)
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
  const cookieStore = await cookies();
  let cartId = cookieStore.get("cartId")?.value; // Error: 'cartId' is never reassigned. Use 'const' instead. (prefer-const)
  if (!cartId) {
    return "Missing cart ID";
  }

  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart(cartId);
    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart(cartId, [lineItem.id]);
      } else {
        await updateCart(cartId, [
          {
            id: lineItem.id,
            merchandiseId,
            quantity,
          },
        ]);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart(cartId, [{ merchandiseId, quantity }]);
    }

    revalidateTag(TAGS.cart);
  } catch (error) {
    console.error(error); // This line uses the 'error' variable, so it should not be an unused-vars error based on the log. However, the log snippet provided still flags it. This suggests a potential issue in the log or a conditional path where it remains unused.
    return "Error updating item quantity";
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  const cookieStore = await cookies();
  let cartId = cookieStore.get("cartId")?.value; // Error: 'cartId' is never reassigned. Use 'const' instead. (prefer-const)

  if (!cartId) {
    return "Missing cart ID";
  }

  try {
    const cart = await getCart(cartId);
    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      await removeFromCart(cartId, [lineItem.id]);
      revalidateTag(TAGS.cart);
    } else {
      return "Item not found in cart";
    }
  } catch (error) { // Error: 'error' is defined but never used. (@typescript-eslint/no-unused-vars)
    return "Error removing item from cart";
  }
}

export async function redirectToCheckout() {
  const cookieStore = await cookies();
  let cartId = cookieStore.get("cartId")?.value; // Error: 'cartId' is never reassigned. Use 'const' instead. (prefer-const)

  if (!cartId) {
      console.error("Missing cart ID");
    return;
  }

  let cart = await getCart(cartId); // Error: 'cart' is never reassigned. Use 'const' instead. (prefer-const)

  if (!cart) {
    console.error("Error fetching cart");
    return;
  }

  redirect(cart.checkoutUrl);
}

export async function createCartAndSetCookie() {
  let cart = await createCart(); // Error: 'cart' is never reassigned. Use 'const' instead. (prefer-const)
  const cookieStore = await cookies();
  cookieStore.set("cartId", cart.id!);
}

// old code below


// import { TAGS } from "@/src/lib/constants";
// import {
//   addToCart,
//   createCart,
//   getCart,
//   removeFromCart,
//   updateCart,
// } from "@/src/lib/shopify";
// import { revalidateTag } from "next/cache";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export async function addItem(
//   prevState: any,
//   selectedVariantId: string | undefined
// ) {
//   const cookieStore = await cookies();
//   let cartId = cookieStore.get("cartId")?.value;

//   if (!cartId || !selectedVariantId) {
//     return "Error adding item to cart";
//   }

//   try {
//     await addToCart(cartId, [
//       { merchandiseId: selectedVariantId, quantity: 1 },
//     ]);
//     revalidateTag(TAGS.cart);
//   } catch (error) {
//     return "Error adding item to cart";
//   }
// }

// export async function updateItemQuantity(
//   prevState: any,
//   payload: {
//     merchandiseId: string;
//     quantity: number;
//   }
// ) {
//   const cookieStore = await cookies();
//   let cartId = cookieStore.get("cartId")?.value;
//   if (!cartId) {
//     return "Missing cart ID";
//   }

//   const { merchandiseId, quantity } = payload;

//   try {
//     const cart = await getCart(cartId);
//     if (!cart) {
//       return "Error fetching cart";
//     }

//     const lineItem = cart.lines.find(
//       (line) => line.merchandise.id === merchandiseId
//     );

//     if (lineItem && lineItem.id) {
//       if (quantity === 0) {
//         await removeFromCart(cartId, [lineItem.id]);
//       } else {
//         await updateCart(cartId, [
//           {
//             id: lineItem.id,
//             merchandiseId,
//             quantity,
//           },
//         ]);
//       }
//     } else if (quantity > 0) {
//       // If the item doesn't exist in the cart and quantity > 0, add it
//       await addToCart(cartId, [{ merchandiseId, quantity }]);
//     }

//     revalidateTag(TAGS.cart);
//   } catch (error) {
//     console.error(error);
//     return "Error updating item quantity";
//   }
// }

// export async function removeItem(prevState: any, merchandiseId: string) {
//   const cookieStore = await cookies();
//   let cartId = cookieStore.get("cartId")?.value;

//   if (!cartId) {
//     return "Missing cart ID";
//   }

//   try {
//     const cart = await getCart(cartId);
//     if (!cart) {
//       return "Error fetching cart";
//     }

//     const lineItem = cart.lines.find(
//       (line) => line.merchandise.id === merchandiseId
//     );

//     if (lineItem && lineItem.id) {
//       await removeFromCart(cartId, [lineItem.id]);
//       revalidateTag(TAGS.cart);
//     } else {
//       return "Item not found in cart";
//     }
//   } catch (error) {
//     return "Error removing item from cart";
//   }
// }

// export async function redirectToCheckout() {
//   const cookieStore = await cookies();
//   let cartId = cookieStore.get("cartId")?.value;

//   if (!cartId) {
//       console.error("Missing cart ID"); 
//     return; 
//   }

//   let cart = await getCart(cartId);

//   if (!cart) {
//     console.error("Error fetching cart"); 
//     return; 
//   }

//   redirect(cart.checkoutUrl);
// }

// export async function createCartAndSetCookie() {
//   let cart = await createCart();
//   const cookieStore = await cookies();
//   cookieStore.set("cartId", cart.id!);
// }
