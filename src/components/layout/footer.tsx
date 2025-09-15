import Link from "next/link";
import Image from "next/image";
import { getMenu } from "@/src/lib/shopify";
import { Menu } from "@/src/lib/shopify/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default async function Footer() {
  const menu1 = await getMenu("footer");
  const menu2 = await getMenu("footer-pages");

  return (
    <footer className="bg-[var(--primarycolor)] text-gray-400 py-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="flex items-center sm:items-start justify-center sm:justify-start md:pl-20">
            <Link href={"/"}>
              <Image
                src={"/assets/ar-logo.jpg"}
                alt="AR Clothing Logo"
                width={100}
                height={100}
              />
            </Link>
          </div>

          {/* Categories Section */}
          <nav>
            <h2 className="text-white text-center  font-semibold text-lg mb-4">Categories</h2>
            {menu1.length > 0 && (
              <ul className="space-y-2 text-center">
                {menu1.map((item: Menu) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      className="hover:text-white transition-colors duration-300"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </nav>

          {/* Pages Section */}
          <nav>
            <h2 className="text-white font-semibold text-center text-lg mb-4">Pages</h2>
            {menu2.length > 0 && (
              <ul className="space-y-2 text-center">
                {menu2.map((item: Menu) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      className="hover:text-white transition-colors duration-300"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </nav>

          {/* Social Media & Contact Section */}
          <div className="space-y-4 text-center">
            <h2 className="text-white font-semibold text-lg mb-4">Follow Us</h2>
            <div className="flex space-x-4 justify-center">
              <Link
                href={"https://www.facebook.com/"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-white transition-colors duration-300 "
              >
                <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
              </Link>
              <Link
                href={"https://www.instagram.com/"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-white transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
              </Link>
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg mt-6 mb-2">Contact Us</h2>
              <p>clothingar3@gmail.com</p>
              <p>+92 123456789</p>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>Copyright © 2025 AR Designer. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}