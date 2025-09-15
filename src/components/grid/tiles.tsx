import clsx from "clsx";
import Image from "next/image";
import Label from "../label";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: "bottom" | "center";
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        "group flex flex-col h-full min-h-[400px] w-full overflow-hidden rounded-xl border bg-white shadow-md hover:shadow-lg transition",
        {
          relative: label,
          "border-2 border-blue-600": active,
          "border-neutral-200": !active,
        }
      )}
    >
      {/* Image Section */}
      {props.src ? (
        <div className="relative h-[70vh] w-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <Image
            
            className={clsx("h-full w-full object-cover object-[75%_25%]", {
              "transition duration-300 ease-in-out group-hover:scale-105":
                isInteractive,
            })}
            {...props}
          alt="some pic"/>
        </div>
      ) : null}

      {/* Label Section (Title + Price) */}
      {label ? (
        <div className="p-4 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700">
          <Label
            title={label.title}
            amount={label.amount}
            currencyCode={label.currencyCode}
            position={label.position}
          />
        </div>
      ) : null}
    </div>
  );
}
