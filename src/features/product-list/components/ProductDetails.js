import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAllProductByIdAsync,
  selectProductListStatus,
  selectProductbyId,
} from "../productSlice";
import { useParams } from "react-router-dom";

import { addToCartAsync, selectCartItems } from "../../cart/cartSlice";

import { useAlert } from "react-alert";
import { Oval } from "react-loader-spinner";

const colors = [
  { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
  { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
  { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
];
const sizes = [
  { name: "XXS", inStock: false },
  { name: "XS", inStock: true },
  { name: "S", inStock: true },
  { name: "M", inStock: true },
  { name: "L", inStock: true },
  { name: "XL", inStock: true },
  { name: "2XL", inStock: true },
  { name: "3XL", inStock: true },
];

const highlights = [
  // "Hand cut and sewn locally",
  // "Dyed with our proprietary colors",
  // "Pre-washed & pre-shrunk",
  // "Ultra-soft 100% cotton",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const alert = useAlert();
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);

  const status = useSelector(selectProductListStatus);

  const product = useSelector(selectProductbyId);
  const dispatch = useDispatch();
  const params = useParams(); //can be used to access the URL parameters of a Route i.e the specific information/resource that is to be fetched when the page is to be rendered
  const items = useSelector(selectCartItems);
  // console.log("hi",product);
  useEffect(() => {
    dispatch(fetchAllProductByIdAsync(params.id)); // why params.id? bcz we provided id after '/productDetails/:id'
  }, [dispatch, params.id]);

  const handleCart = (e) => {
    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      const newItem = { product: product.id, quantity: 1 };
      dispatch(addToCartAsync(newItem));
      alert.success("Item added in your cart");
    } else {
      alert.show("Item is already added!");
    }
    e.preventDefault();
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === product.images.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? product.images.length - 1 : prevSlide - 1
    );
  };

  // in server data we will add color,size & highlights
  return (
    <div className="bg-white">
      {status === "loading" ? (
        <div className="flex justify-center items-center col-span-3">
          <Oval
            visible={true}
            height="80"
            width="80"
            color="black"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : null}
      {product && (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              {product.breadcrumbs &&
                product.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <a
                        href={breadcrumb.href}
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        {breadcrumb.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))}
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.title}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}

          <div className="px-6 py-5 max-w-2xl mx-auto  border border-black border-opacity-10">
            <div
              id="default-carousel"
              className="relative"
              data-carousel="static"
            >
              {/* Carousel wrapper */}
              <div className="overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
                {/* Dynamically render slides based on images array */}
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`${
                      index === currentSlide ? "block" : "hidden"
                    } duration-700 ease-in-out`}
                    data-carousel-item
                  >
                    <img
                      src={image}
                      className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
                      alt={product.title}
                    />
                  </div>
                ))}
              </div>
              {/* Slider indicators */}
              <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`w-3 h-3 rounded-full ${
                      index === currentSlide ? "bg-black" : "bg-gray-300"
                    }`}
                    aria-current={index === currentSlide ? "true" : "false"}
                    aria-label={`Slide ${index + 1}`}
                    onClick={() => setCurrentSlide(index)}
                  ></button>
                ))}
              </div>
              {/* Slider controls */}
              <button
                type="button"
                className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                data-carousel-prev
                onClick={prevSlide}
              >
                <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                  <span className="hidden">Previous</span>
                </span>
              </button>
              <button
                type="button"
                className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                data-carousel-next
                onClick={nextSlide}
              >
                <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                  <span className="hidden">Next</span>
                </span>
              </button>
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                ${product.price}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {colors.map((color) => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedClass,
                              active && checked ? "ring ring-offset-1" : "",
                              !active && checked ? "ring-2" : "",
                              "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              "h-8 w-8 rounded-full border border-black border-opacity-10"
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  {(product.category === "womens-dresses" ||
                    product.category === "mens-shirts" ||
                    product.category === "tops")? <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a>
                  </div>:null}

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    {product.category === "womens-dresses" ||
                    product.category === "mens-shirts" ||
                    product.category === "tops" ? (
                      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                        {sizes.map((size) => (
                          <RadioGroup.Option
                            key={size.name}
                            value={size}
                            disabled={!size.inStock}
                            className={({ active }) =>
                              classNames(
                                size.inStock
                                  ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                  : "cursor-not-allowed bg-gray-50 text-gray-200",
                                active ? "ring-2 ring-indigo-500" : "",
                                "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as="span">
                                  {size.name}
                                </RadioGroup.Label>
                                {size.inStock ? (
                                  <span
                                    className={classNames(
                                      active ? "border" : "border-2",
                                      checked
                                        ? "border-indigo-500"
                                        : "border-transparent",
                                      "pointer-events-none absolute -inset-px rounded-md"
                                    )}
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                  >
                                    <svg
                                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                      stroke="currentColor"
                                    >
                                      <line
                                        x1={0}
                                        y1={100}
                                        x2={100}
                                        y2={0}
                                        vectorEffect="non-scaling-stroke"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    ) : null}
                  </RadioGroup>
                </div>

                <button
                  onClick={handleCart}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
                {/* <button
                  onClick={(e) => {
                    alert.show("Oh look, an alert!");
                  }}
                >
                  Show Alert
                </button> */}
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// {<div className="max-w-2xl mx-auto  border border-black border-opacity-10" >
//             <div
//               id="default-carousel"
//               className="relative  border border-black border-opacity-10"
//               data-carousel="static"
//             >
//               {/* Carousel wrapper */}
//               <div className="overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
//                 {/* Item 1 */}
//                 <div
//                   className="hidden duration-700 ease-in-out"
//                   data-carousel-item
//                 >
//                   <span className="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-gray-800">
//                     First Slide
//                   </span>
//                   <img
//                     src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
//                     className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
//                     alt="..."
//                   />
//                 </div>
//                 {/* Item 2 */}
//                 <div
//                   className="hidden duration-700 ease-in-out"
//                   data-carousel-item
//                 >
//                   <img
//                     src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
//                     className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
//                     alt="..."
//                   />
//                 </div>
//                 {/* Item 3 */}
//                 <div
//                   className="hidden duration-700 ease-in-out"
//                   data-carousel-item
//                 >
//                   <img
//                     src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
//                     className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
//                     alt="..."
//                   />
//                 </div>
//               </div>
//               {/* Slider indicators */}
//               <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
//                 <button
//                   type="button"
//                   className="w-3 h-3 rounded-full"
//                   aria-current="false"
//                   aria-label="Slide 1"
//                   data-carousel-slide-to="0"
//                 ></button>
//                 <button
//                   type="button"
//                   className="w-3 h-3 rounded-full"
//                   aria-current="false"
//                   aria-label="Slide 2"
//                   data-carousel-slide-to="1"
//                 ></button>
//                 <button
//                   type="button"
//                   className="w-3 h-3 rounded-full"
//                   aria-current="false"
//                   aria-label="Slide 3"
//                   data-carousel-slide-to="2"
//                 ></button>
//               </div>
//               {/* Slider controls */}
//               <button
//                 type="button"
//                 className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
//                 data-carousel-prev
//               >
//                 <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//                   <svg
//                     className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M15 19l-7-7 7-7"
//                     ></path>
//                   </svg>
//                   <span className="hidden">Previous</span>
//                 </span>
//               </button>
//               <button
//                 type="button"
//                 className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
//                 data-carousel-next
//               >
//                 <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//                   <svg
//                     className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M9 5l7 7-7 7"
//                     ></path>
//                   </svg>
//                   <span className="hidden">Next</span>
//                 </span>
//               </button>
//             </div>

//           </div>}
