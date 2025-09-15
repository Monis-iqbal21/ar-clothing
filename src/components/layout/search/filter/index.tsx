import { SortFilterItem } from "@/src/lib/shopify/types";
import { FilterItem } from "./item";
import FilterItemDropDown from "./dropdown";

export type PathFilterItem = { title: string; path: string };
export type ListItem = SortFilterItem | PathFilterItem;

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem key={i} item={item} />
      ))}
    </>
  );
}

export default function FilterList({
  list,
  title,
}: {
  list: ListItem[];
  title?: string;
}) {
  return (
    <>
      <nav className="">
        {title ? (
          <div>
            <h3 className="hidden w-full text-md md:text-lg lg:text-lg text-neutral-500 font-bold md:block ">
              {title}
              <hr className="h-0.5 bg-gray-300 border-0 rounded"/>
            </h3>
          </div>
        ) : null}
        <ul className="hidden md:block ">
          <FilterItemList list={list} />
        </ul>
        <ul className="md:hidden ">
          <FilterItemDropDown list={list} />
        </ul>
      </nav>
    </>
  );
}
