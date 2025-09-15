import Collections from "@/src/components/layout/search/collections";
import FilterList from "@/src/components/layout/search/filter";
import { sorting } from "@/src/lib/constants";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mt-5 mx-auto h-auto flex max-w-screen-2xl flex-cols gap-x-8 px-4 pb-4 text-black md:flex-row">
        <div className="relative order-first w-full flex-none md:max-w-[125px] space-y-8 md:order-none md:w-48 lg:w-64 ">
          <Collections />
          <div>
            <FilterList list={sorting} title="Sort By" />
          </div>
        </div>

        <div className=" relative order-last h-auto w-full md:order-none bg-yello-200 flex flex-cols gap-4 md:flex-1 lg:flex-auto bg-blue-50">
          {children}
        </div>
      </div>
    </>
  );
}
