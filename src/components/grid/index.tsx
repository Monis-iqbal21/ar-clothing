import clsx from "clsx";

export default function Grid(props: React.ComponentProps<"ul">) {
  return (
    <ul
      {...props}
      className={clsx(" grid h-full w-full  grid-cols-3 px-10 py-5 gap-4 ", props.className)}
    >
      {props.children}
    </ul>
  );
}

export function GridItem(props: React.ComponentProps<"li">) {
  return (
    <li
      {...props}
      className={clsx("  transition-opacity", props.className)}
    >
      {props.children}
    </li>
  );
}

Grid.Item = GridItem;
