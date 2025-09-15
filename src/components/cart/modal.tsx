"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./cart-context";

import Image from "next/image";
import Link from "next/link";
import Price from "../price";
import OpenCart from "./open-cart";
import CloseCart from "./close-cart";
import { DEFAULT_OPTION } from "@/src/lib/constants";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import { useFormStatus } from "react-dom";
import LoadingDots from "../loading-dots";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import { createURL } from "@/src/lib/utils";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // Create cart on first load
  useEffect(() => {
    if (!cart) createCartAndSetCookie();
  }, [cart]);

  // Auto-open when cart quantity changes
  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) setIsOpen(true);
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity]);

  return (
    <>
      {/* Open button */}
      <button aria-label="Open cart" onClick={openCart} className=" m-0">
        <OpenCart quantity={cart?.totalQuantity} className="text-white "/>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed  z-40 bg-black/30 backdrop-blur-sm transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Modal panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm transform bg-white/80 p-6 text-black shadow-xl backdrop-blur-xl transition-transform duration-300  ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">My Cart</p>
          <button aria-label="Close cart" onClick={closeCart}>
            <CloseCart />
          </button>
        </div>

        {/* Empty cart */}
        {!cart || cart.lines.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <ShoppingCartIcon className="h-16 text-neutral-400" />
            <p className="mt-6 text-center text-2xl font-bold">
              Your Cart is Empty.
            </p>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-between overflow-hidden p-1">
            {/* Cart items */}
            <ul className="flex-grow overflow-auto py-4">
              {cart.lines
                .sort((a, b) =>
                  a.merchandise.product.title.localeCompare(
                    b.merchandise.product.title
                  )
                )
                .map((item, i) => {
                  const merchandiseSearchParams =
                    {} as MerchandiseSearchParams;

                  item.merchandise.selectedOptions.forEach(
                    ({ name, value }) => {
                      if (value !== DEFAULT_OPTION) {
                        merchandiseSearchParams[name.toLowerCase()] = value;
                      }
                    }
                  );

                  const merchandiseUrl = createURL(
                    `/product/${item.merchandise.product.handle}`,
                    new URLSearchParams(merchandiseSearchParams)
                  );

                  return (
                    <li
                      key={i}
                      className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                    >
                      <div className="flex justify-between py-4">
                        <DeleteItemButton
                          item={item}
                          optimisticUpdate={updateCartItem}
                        />
                      </div>
                      <div className="flex flex-row">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-200 dark:border-neutral-700 ">
                          <Image
                            className="h-full w-full object-cover"
                            width={64}
                            height={64}
                            alt={
                              item.merchandise.product.featuredImage.altText ||
                              item.merchandise.product.title
                            }
                            src={item.merchandise.product.featuredImage.url}
                          />
                        </div>
                        <Link
                          href={merchandiseUrl}
                          onClick={closeCart}
                          className="ml-2 flex flex-col"
                        >
                          <span className="font-medium">
                            {item.merchandise.product.title}
                          </span>
                          {item.merchandise.title !== DEFAULT_OPTION && (
                            <p className="text-sm text-neutral-500 ">
                              {item.merchandise.title}
                            </p>
                          )}
                        </Link>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <Price
                          className="text-sm font-medium"
                          amount={item.cost.totalAmount.amount}
                          currencyCode={item.cost.totalAmount.currencyCode}
                        />
                        <div className="ml-auto flex items-center rounded-full border px-2 py-1 border-neutral-200 ">
                          <EditItemQuantityButton
                            item={item}
                            type="minus"
                            optimisticUpdate={updateCartItem}
                          />
                          <span className="px-2 text-sm">{item.quantity}</span>
                          <EditItemQuantityButton
                            item={item}
                            type="plus"
                            optimisticUpdate={updateCartItem}
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>

            {/* Cart summary */}
            <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="mb-3 flex justify-between border-b pb-1 ">
                <p>Taxes</p>
                <Price
                  className="text-right text-base text-black dark:text-white"
                  amount={cart.cost.totalTaxAmount.amount}
                  currencyCode={cart.cost.totalTaxAmount.currencyCode}
                />
              </div>
              <div className="mb-3 flex justify-between border-b pb-1 ">
                <p>Shipping</p>
                <p className="text-right">Calculated at checkout</p>
              </div>
              <div className="mb-3 flex justify-between border-b pb-1 ">
                <p>Total</p>
                <Price
                  className="text-right text-base text-black "
                  amount={cart.cost.totalAmount.amount}
                  currencyCode={cart.cost.totalAmount.currencyCode}
                />
              </div>
            </div>

            {/* Checkout button */}
            <form action={redirectToCheckout}>
              <CheckoutButton />
            </form>
          </div>
        )}
      </div>
    </>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-white" /> : "Proceed to Checkout"}
    </button>
  );
}
