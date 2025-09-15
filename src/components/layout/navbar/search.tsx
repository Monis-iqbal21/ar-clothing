"use client";

import { createURL } from "@/src/lib/utils";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export const Search = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
    }

    router.push(createURL("/search", newParams));
  }

  // Collapse when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative flex items-center">
      {/* Show toggle icon only when collapsed */}
      {!isExpanded && (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="flex items-center hidden md:flex"
        >
          <MagnifyingGlassCircleIcon className="h-6 text-white hover:cursor-pointer" />
        </button>
      )}

      {/* Collapsible search form */}
      <form
        onSubmit={onSubmit}
        className={`relative ml-2 overflow-hidden transition-all duration-300 rounded-lg ease-in-out 
          ${isExpanded ? "w-60 opacity-100" : "w-0 opacity-0"}`}
      >
        <input
          type="text"
          key={searchParams?.get("q")}
          name="search"
          placeholder="Search Your Product..."
          autoComplete="off"
          defaultValue={searchParams?.get("q") || ""}
          className="relative w-full rounded-lg  bg-white px-4 py-2 pr-10 text-sm text-black border border-none 
            placeholder:text-neutral-500"
          style={{
            borderColor: "var(--secondarycolor)",
            color: "var(--primarytext)",
          }}
        />
        {/* Submit button inside input */}
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          <MagnifyingGlassCircleIcon className="h-6 text-black hover:cursor-pointer" />
        </button>
      </form>
    </div>
  );
};


export const SearchInMobileMenu = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams?.get("q") || "");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams.toString());

    if (query) {
      newParams.set("q", query);
    } else {
      newParams.delete("q");
    }

    router.push(createURL("/search", newParams));
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full">
      <input
        type="text"
        name="search"
        placeholder="Search your product..."
        autoComplete="off"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="text-md w-full rounded-lg border bg-white px-4 py-2 pr-10 text-black
        placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent
        dark:text-white dark:placeholder:text-neutral-400"
        required
      />
      <button
        type="submit"
        className="absolute right-0 top-0 mr-3 flex h-full items-center text-neutral-600 dark:text-neutral-300"
      >
        <MagnifyingGlassCircleIcon className="h-5 w-5 " />
      </button>
    </form>
  );
};

export function SearchSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full lg:80 xl:w-full">
      <input type="text" />
      <div>
        <MagnifyingGlassCircleIcon className="h-4 " />
      </div>
    </form>
  );
}
