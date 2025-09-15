"use client";
import "./styles/home.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faCar,
  faShoppingCart,
  faPhone,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";



import Review from "../components/review/Review";
import Carousel from "../components/carousel/Carousel";
// import { Fullscreen } from "lucide-react";
// import { getProducts } from "../lib/shopify/index";
// import { ur } from "zod/v4/locales";

export default function Home() {
  const initialImages = [
    "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&auto=format&fit=crop",
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // const goToPrevious = (): void => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? initialImages.length - 1 : prevIndex - 1
  //   );
  // };

  const goToNext = useCallback((): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === initialImages.length - 1 ? 0 : prevIndex + 1
    );
  }, [initialImages.length]);

  useEffect(() => {
    if (initialImages.length > 1) {
      const timer = setTimeout(goToNext, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, initialImages.length, goToNext]);

  const images = [
    "/assets/carousel1.jpg",
    "/assets/carousel2.jpg",
    "/assets/carousel3.jpg",
    "/assets/carousel4.jpg",
    "/assets/carousel5.jpg",
    "/assets/carousel6.jpg",
    "/assets/carousel7.jpg",
  ];

 
  // const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div>
      {/* Carousel */}
      <div className="h-screen w-full mb-10">
        <Carousel images={images} />
      </div>

      {/* Category Products */}
      <div className="flex justify-center items-center text-center flex-col mb-4 mt-20">
        <h1
          className="w-full text-5xl mb-10 mt-5 font-bold"
          style={{ color: "var(--primarycolor)" }}
        >
          - Featured Collection -
        </h1>
        <p
          style={{ color: "var(--secondarycolor)" }}
          className="font-semibold max-w-200 text-center"
        >
          Discover our handpicked selection of premium Pakistani fashion pieces,
          crafted with the finest materials and traditional artistry.
        </p>
      </div>


      <div className=" px-2 py-10 grid grid-row-2 md:grid-rows-1 md:grid-cols-2 gap-10 align-center md:px-15 lg:px-30 ">
        {/* 1st  */}
        <div className="bg-[#f3f3f3] h-[90vh] md:[80vh] w-full grid grid-cols-[60%_40%] rounded-2xl shadow-2xl">
          <div className="relative">
            <Image
              src="/assets/carousel1.jpg"
              alt="Featured Collection 1"
              fill
              className="w-full h-full object-cover object-center  rounded-l-2xl"
              priority
            />
          </div>
          <div className="grid grid-rows h-[80%] justify-evenly items-center px-2 py-5 md:px-7  md:py-10">
            {/* <div className="h-full flex flex-col justify-center items-center justify-evenly "> */}
              <p
                className="text-sm md:text-md md:font-bold rounded-2xl text-white px-3 py-1 text-center"
                style={{ backgroundColor: "#2a9541ff" }}
              >
                traditional wear
              </p>
              <p className="text-lg font-bold text-black text-center">
                Premium sherwani wear
              </p>
              <p
                className="text-lg md:text-2xl font-black  text-center "
                style={{ color: "var(--primarycolor)" }}
              >
                PKR 25,000{" "}<br />
                <span className="line-through text-gray-400 text-sm md:text-lg ">
                  PKR 26,000
                </span>
              </p>
            {/* </div> */}

            {/* <div className="h-auto flex  items-center "> */}
              <button className="w-full h-10 mb-0 mr-0 block bg-green-500 text-white py-2 rounded">
                Add to Cart
              </button>
            {/* </div> */}
          </div>
        </div>

        {/* 2nd  */}
        <div className="bg-[#f3f3f3] h-[90vh] w-full grid grid-rows-[60%_40%] rounded-2xl shadow-2  xl">
          <div className="relative">
            <Image
              src="/assets/card1_no.png"
              alt="Featured Collection 1"
              fill
              className="w-full h-full object-contain object-center  rounded-t-2xl"
              priority
            />
          </div>
          <div className="grid grid-cols-[70%_30%] gap-y-2 px-10 pl-5 pr-3">
            <div className="h-full flex flex-col justify-center items-start justify-evenly ">
              <p
                className="text-md font-bold rounded-xl text-white px-3 py-1"
                style={{ backgroundColor: "#2a9541ff" }}
              >
                traditional wear
              </p>
              <p className="text-lg font-bold text-black">
                Premium sherwani wear
              </p>
              <p
                className="text-lg font-bold text-[25px]"
                style={{ color: "var(--primarycolor)" }}
              >
                PKR 25,000 <br />
                <span className="line-through text-gray-400 text-md !important">
                  PKR 26,000
                </span>
              </p>
            </div>

            <div className="h-[95%] flex items-end justify-end ">
              <button className="w-full h-10 mb-4 mr-0 block bg-green-500 text-white py-2  rounded">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* product show */}

      {/* product show end */}

      {/* Trending */}
      <div className="flex justify-center items-center text-center flex-col mb-4 mt-20">
        <Link
          href={"/search/trending"}
          className="w-full text-3xl md:text-4xl lg:text-5xl mb-10 mt-5 font-bold"
          style={{ color: "var(--primarycolor)" }}
        >
          - Trending Items -
        </Link>
        <p
          style={{ color: "var(--secondarycolor)" }}
          className="font-semibold max-w-200 text-center text-base md:text-lg lg:text-xl"
        >
          Discover our handpicked selection of premium Pakistani fashion pieces,
          crafted with the finest materials and traditional artistry.
        </p>
      </div>

      <div className="px-4 py-10 gap-15 flex flex-wrap gap-4 justify-center  h-auto mb-20 bg-[var(--primarycolor)]">
        {/* w-[275px] h-[465px] */}
        <div className="w-[400px] h-[635px] md:w-[275px] md:h-[465px]  grid grid-rows-[55%_45%] rounded-2xl bg-[#eae4d7] transition-transform duration-300 hover:scale-105">
          <div className="w-full h-full relative rounded-b-2xl  rounded-t-2xl">
            <p
              className=" absolute z-1 ml-5 my-5 text-white px-2 py-1 rounded-xl text-sm"
              style={{ backgroundColor: "var(--primarycolor)" }}
            >
              new
            </p>
            <Image
              src="/assets/carousel1.jpg"
              alt="trending"
              fill
              className="object-cover  rounded-t-2xl"
            />
          </div>

          <div className="flex flex-col justify-evenly px-7 py-5  rounded-b-2xl space-y-2">
            <div className="text-left">
              <span className="rounded-xl text-white bg-[#2a9541ff] px-3 py-1 text-sm font-bold">
                casual wear
              </span>
            </div>
            <p className="text-center md:text-left lg:text-left font-bold text-2xl">
              Premium Sherwani
            </p>
            <p
              className="text-center md:text-left lg:text-left font-bold"
              style={{ color: "var(--primarycolor)" }}
            >
              <span className="text-lg">PKR 15,000</span>{" "}
              <span className="line-through text-sm">PKR 18,000</span>
            </p>

            <button
              className="text-white w-[70%] font-bold rounded-xl px-5 py-2 mx-auto hover:text-green-900 hover:bg-white hover:cursor-pointer"
              style={{
                backgroundColor: "var(--primarycolor)",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#fff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--primarycolor)")
              }
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div className="w-[400px] h-[635px] md:w-[275px] md:h-[465px] grid grid-rows-[55%_45%] rounded-2xl bg-[#eae4d7] transition-transform duration-300 hover:scale-105">
          <div className="w-full h-full relative rounded-b-2xl  rounded-t-2xl">
            <p
              className=" absolute z-1 ml-5 my-5 text-white px-2 py-1 rounded-xl text-sm"
              style={{ backgroundColor: "var(--primarycolor)" }}
            >
              new
            </p>
            <Image
              src="/assets/carousel1.jpg"
              alt="trending"
              fill
              className="object-cover  rounded-t-2xl"
            />
          </div>

          <div className="flex flex-col justify-evenly px-7 py-5  rounded-b-2xl space-y-2">
            <div className="text-center md:text-left lg:text-left ">
              <span className="rounded-xl text-white bg-[#2a9541ff] px-3 py-1 text-sm font-bold">
                casual wear
              </span>
            </div>
            <p className="text-center md:text-left lg:text-left font-bold text-2xl">
              Premium Sherwani
            </p>
            <p
              className="text-center md:text-left lg:text-left font-bold"
              style={{ color: "var(--primarycolor)" }}
            >
              <span className="text-lg">PKR 15,000</span>{" "}
              <span className="line-through text-sm">PKR 18,000</span>
            </p>

            <button
              className="text-white w-[40%] font-bold rounded-xl px-3 py-2 mx-auto flex items-center justify-center gap-2 hover:text-green-900 hover:bg-white hover:cursor-pointer"
              style={{
                backgroundColor: "var(--primarycolor)",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#fff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--primarycolor)")
              }
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              Add
            </button>
          </div>
        </div>

        <div className="w-[400px] h-[635px] md:w-[275px] md:h-[465px]  grid grid-rows-[55%_45%] rounded-2xl bg-[#eae4d7] transition-transform duration-300 hover:scale-105">
          <div className="w-full h-full relative rounded-b-2xl  rounded-t-2xl">
            <p
              className=" absolute z-1 ml-5 my-5 text-white px-2 py-1 rounded-xl text-sm"
              style={{ backgroundColor: "red" }}
            >
              HOT
            </p>
            <Image
              src="/assets/carousel1.jpg"
              alt="trending"
              fill
              className="object-cover  rounded-t-2xl"
            />
          </div>

          <div className="flex flex-col justify-evenly px-7 py-5  rounded-b-2xl space-y-2">
            <div className="text-left">
              <span className="rounded-xl text-white bg-[#2a9541ff] px-3 py-1 text-sm font-bold">
                casual wear
              </span>
            </div>
            <p className="text-left font-bold text-xl">Premium Sherwani</p>
            <p
              className="text-left font-bold"
              style={{ color: "var(--primarycolor)" }}
            >
              <span className="text-xl">PKR 15,000</span>{" "}
              <span className="line-through text-sm">PKR 18,000</span>
            </p>

            <button
              className="text-white w-[40%] font-bold rounded-xl px-3 py-2 ml-auto flex items-center justify-center gap-2 hover:text-green-900 hover:bg-white hover:cursor-pointer"
              style={{
                backgroundColor: "var(--primarycolor)",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#fff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--primarycolor)")
              }
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              Add
            </button>
          </div>
        </div>

        <div className="w-[400px] h-[635px] md:w-[275px] md:h-[465px]  grid grid-rows-[55%_45%] rounded-2xl bg-[#eae4d7] transition-transform duration-300 hover:scale-105">
          <div className="w-full h-full relative rounded-b-2xl  rounded-t-2xl">
            <p
              className=" absolute z-1 ml-5 my-5 text-white px-2 py-1 rounded-xl text-sm"
              style={{ backgroundColor: "red" }}
            >
              HOT
            </p>
            <Image
              src="/assets/carousel1.jpg"
              alt="trending"
              fill
              className="object-cover  rounded-t-2xl"
            />
          </div>

          <div className="flex flex-col justify-evenly px-7 py-5  rounded-b-2xl space-y-2">
            <div className="text-left">
              <span className="rounded-xl text-white bg-[#2a9541ff] px-3 py-1 text-sm font-bold">
                casual wear
              </span>
            </div>
            <p className="text-left font-bold text-2xl">Premium Sherwani</p>
            <p
              className="text-left font-bold"
              style={{ color: "var(--primarycolor)" }}
            >
              <span className="text-lg">PKR 15,000</span>{" "}
              <span className="line-through text-sm">PKR 18,000</span>
            </p>

            <button
              className="text-white w-[40%] font-bold rounded-xl px-3 py-2 ml-auto flex items-center justify-center gap-2 hover:text-green-900 hover:bg-white hover:cursor-pointer"
              style={{
                backgroundColor: "var(--primarycolor)",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#fff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--primarycolor)")
              }
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* card 1 */}

      <div className="relative w-full h-[100vh] grid grid-rows-[40%_60%] md:grid-rows-1 md:grid-cols-[50%_50%] bg-[linear-gradient(90deg,rgba(73,88,78,1)_0%,rgba(87,110,96,1)_50%,rgba(73,88,78,1)_100%)] px-5 md:px-20 lg:px-30">
        <div className="order-2 md:order-1 relative w-full h-full flex items-end justify-center">
          <Image
            src={"/assets/card1_no.png"}
            alt="man in kameez shalwar"
            fill
            className="object-contain w-[100vw] lg:w-auto md:w-full drop-shadow-[0_12px_20px_rgba(255,255,255,0.3)] md:drop-shadow-none lg:drop-shadow-none "
          />
        </div>
        <div className="order-1 md:order-2 w-full h-full flex flex-col justify-center items-center text-white ">
          <Image
            src={"/assets/ar-logo.jpg"}
            alt="AR logo"
            width={80}
            height={80}
            className="mb-5 "
          />
          <p className="mb-5 text-xl md:text-2xl lg:text-4xl">
            You think it we made it !
          </p>
          <Link
            href="/search/traditional-wear"
            className="rounded-3xl px-5 py-2 text-center bg-[var(--primarycolor)] text-base md:text-2xl lg:text-3xl"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* card 1  END  */}



      {/* Services */}
      <div className="w-full h-auto my-20">
        <div className="flex flex-wrap w-full items-center gap-10 justify-evenly py-20">
          {/* 1. Free Delivery */}
          <div className="fspw_div">
            <FontAwesomeIcon icon={faCar} className="fspw_icon_size" />
            <p className="fspw_heading">Free Delivery</p>
            <p className="fspw_center_text">Free delivery all across Karachi</p>
          </div>

          {/* 2. Optimized Cart */}
          <div className="fspw_div">
            <FontAwesomeIcon icon={faShoppingCart} className="fspw_icon_size" />
            <p className="fspw_heading">Optimized Cart</p>
            <p className="fspw_center_text">
              Select your order in optimized cart
            </p>
          </div>

          {/* 3. Customer Service */}
          <div className="fspw_div">
            <FontAwesomeIcon icon={faPhone} className="fspw_icon_size" />
            <p className="fspw_heading">Customer Service</p>
            <p className="fspw_center_text">
              Call for any Inquiry or to confirm order
            </p>
          </div>

          {/* 4. Payment Methods */}
          <div className="fspw_div">
            <FontAwesomeIcon icon={faWallet} className="fspw_icon_size" />
            <p className="fspw_heading">Payment methods</p>
            <p className="fspw_center_text">
              Various payment methods are available
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="section_heading_div">
        <FontAwesomeIcon icon={faMinus} className="hr_line" />
        <p className="section_text">Reviews</p>
        <FontAwesomeIcon icon={faMinus} className="hr_line" />
      </div>
      <div className="review_fwidth_div">
        <Review />
      </div>
    </div>
  );
}
