import Price from "./price";

export default function Label({
  title,
  amount,
  currencyCode,
  // position = "bottom",
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: "bottom" | "center";
}) {
  return (
    // <div
    //   className={clsx("absolute bottom-0 left-0 flex w-full px-4 pb-4", {
    //     "lg:px-20 lg:pb-[35%]": position === "center",
    //   })}
    // >
      <div className="flex flex-col items-start">
        {/* Title */}
        <h3 className="line-clamp-1 text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>

        {/* Price */}
        <Price
          className="mt-2 inline-block rounded-md bg-[var(--primarycolor)] px-3 py-1 text-sm font-bold text-white"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="ml-1 text-xs opacity-80"
        />
      </div>
    // </div>
  );
}
