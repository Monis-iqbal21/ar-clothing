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
  prevState: unknown,
  selectedVariantId: string | undefined
) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId || !selectedVariantId) {
    return "Error adding item to cart";
  }

  try {
    await addToCart(cartId, [
      { merchandiseId: selectedVariantId, quantity: 1 },
    ]);
    revalidateTag(TAGS.cart);
  } catch { // FIX: Removed the unused 'error' variable from the catch block
    return "Error adding item to cart";
  }
}

export async function updateItemQuantity(
  prevState: unknown,
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;
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
      await addToCart(cartId, [{ merchandiseId, quantity }]);
    }

    revalidateTag(TAGS.cart);
  } catch (error) { // The 'error' variable is used here by console.error(), so no change is needed
    console.error(error);
    return "Error updating item quantity";
  }
}

export async function removeItem(prevState: unknown, merchandiseId: string) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

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
  } catch { // FIX: Removed the unused 'error' variable from the catch block
    return "Error removing item from cart";
  }
}

export async function redirectToCheckout() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) {
    console.error("Missing cart ID");
    return;
  }

  const cart = await getCart(cartId);

  if (!cart) {
    console.error("Error fetching cart");
    return;
  }

  redirect(cart.checkoutUrl);
}

export async function createCartAndSetCookie() {
  const cart = await createCart();
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
