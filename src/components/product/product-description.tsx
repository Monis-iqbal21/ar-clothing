import { Product } from "@/src/lib/shopify/types";
import Price from "../price";
import VariantSelector from "./variant-selector";
import Prose from "../prose";
import { AddToCart } from "../cart/add-to-cart";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <div className="w-full h-full flex flex-col justify-start pt-2 ">
      <div className="flex flex-col py-5">
        <h1 className="mb-0 text-3xl font-medium text-center md:text-4xl md:ml-0 lg:text-5xl lg:ml-5 xl:text-6xl lg:text-left">{product.title}</h1>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      {product.descriptionHtml ? (
        <>
          <p className="mt-2 mb-4 text-sm text-gray-500 font-bold uppercase tracking-wide">Description : </p>
          <Prose
            className="text-center md:ml-0 lg:ml-5 lg:text-left mb-4 text-sm leading-light text-black "
            html={product.descriptionHtml}
          />
        </>
      ) : null}
      <div
        className="mr-auto w-full py-2 text-xl font-bold text-[var(--primarycolor)] " >
        <p className="mt-2 mb-2  text-sm text-gray-500 font-bold uppercase tracking-wide  "> Price </p>
        <Price
          amount={product.priceRange.maxVariantPrice.amount}
          currencyCode={product.priceRange.maxVariantPrice.currencyCode}
        />
      </div>
      <AddToCart product={product} />
    </div>
  );
}
