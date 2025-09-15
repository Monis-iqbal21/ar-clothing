import { getMenu } from "@/src/lib/shopify";
import { Menu } from "@/src/lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import { Search } from "./search";
import MobileMenu from "./mobile-menu";
import CartModal from "../../cart/modal";
import "../../../app/globals.css";


export async function Navbar() {
  const menu = await getMenu("ar-main-menu");

  console.log(menu);

  return (
    <nav
      className=" top-0 left-0 right-0 z-50 "
      style={{ backgroundColor: "var(--primarycolor)" }}
    >
      <div className="full-nav flex flex-cols justify-around items-center px-2 lg:justify-evenly lg:pl-6 lg:pr-2 md:px-0  py-3">
        <div className="block flex-none md:hidden">
          <MobileMenu menu={menu} />
        </div>
        <div className="siteLogo flex-shrink-0">
          <Link href={"/"}>
            <Image
              src={"/assets/ar-logo.jpg"}
              alt="AR Clothing Logo"
              width={120}
              height={120}
              className="h-auto w-auto max-h-16"
            />
          </Link>
        </div>

        <div className="menu-ul justify-center  hidden md:block">
          {menu.length > 0 ? (
            <ul className="flex space-x-4 lg:space-x-8 text-sm lg:text-base">
              {menu.map((item: Menu) => (
                <li
                  key={item.title}
                  className=" "
                  style={{ color: "var(--hoveringeffect)", fontWeight: "500" }}
                >
                  <Link href={item.path} prefetch={true} className="">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="flex items-center justify-end lg:space-x-4 md:space-x-4  ">
          <Search />
          <CartModal />
        </div>
      </div>
    </nav>
  );
}
