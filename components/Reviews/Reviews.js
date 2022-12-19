import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

export default function Reviews() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-32">
        <h2 className="flex flex-col ">
          <p className="sm:text-6xl text-lg font-bold tracking-wide text-black">
            Read What Others
          </p>
          <p className="letter text-6xl mt-5">Are Saying</p>
        </h2>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: false,
          }}
          modules={[]}
          className="mySwiper"
        >
          <SwiperSlide className="bg-gray-50 py-12 px-9 mt-20 rounded-4xl">
            <section>
              <h3 className="text-black text-sm font-semibold uppercase">
                Best Scotch
              </h3>
              <p className="text-sm mt-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                ducimus deleniti quaerat eos doloremque. Nulla facere impedit
                perspiciatis voluptate possimus!{" "}
              </p>
            </section>
            <section className="mt-5">
              <p className="text-sm text-right text-gray-400">Customer</p>
            </section>
            <section className="mt-40">
              <p className="text-center text-sm">
                Lorem ipsum dolor sit amet r adipisicing.
              </p>
            </section>{" "}
          </SwiperSlide>
          <SwiperSlide className="bg-gray-50 py-12 px-9 mt-20 rounded-4xl">
            <section>
              <h3 className="text-black text-sm font-semibold uppercase">
                awesome crown royal
              </h3>
              <p className="text-sm mt-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                iure voluptas id enim fugit labore?
              </p>
            </section>
            <section className="mt-5">
              <p className="text-sm text-right text-gray-400">Customer</p>
            </section>
            <section className="mt-40">
              <p className="text-center text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </p>
            </section>{" "}
          </SwiperSlide>
          <SwiperSlide className="bg-gray-50 py-12 px-9 mt-20 rounded-4xl">
            <section>
              <h3 className="text-black text-sm font-semibold uppercase">
                sweet Smirnoff Watermelon
              </h3>
              <p className="text-sm mt-5">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Praesentium ducimus suscipit dolorum hic dicta.
              </p>
            </section>
            <section className="mt-5">
              <p className="text-sm text-right text-gray-400">Customer</p>
            </section>
            <section className="mt-40">
              <p className="text-center text-sm">
                Lorem ipsum dolor sit amet .
              </p>
            </section>
          </SwiperSlide>
          <SwiperSlide className="bg-gray-50 py-12 px-9 mt-20 rounded-4xl">
            <section>
              <h3 className="text-black text-sm font-semibold uppercase">
                Best Scotch
              </h3>
              <p className="text-sm mt-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                ducimus deleniti quaerat eos doloremque. Nulla facere impedit
                perspiciatis voluptate possimus!{" "}
              </p>
            </section>
            <section className="mt-5">
              <p className="text-sm text-right text-gray-400">Customer</p>
            </section>
            <section className="mt-40">
              <p className="text-center text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </p>
            </section>
          </SwiperSlide>
          <SwiperSlide className="bg-gray-50 py-12 px-9 mt-20 rounded-4xl">
            <section>
              <h3 className="text-black text-sm font-semibold uppercase">
                Best Scotch
              </h3>
              <p className="text-sm mt-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                ducimus deleniti quaerat eos doloremque. Nulla facere impedit
                perspiciatis voluptate possimus!{" "}
              </p>
            </section>
            <section className="mt-5">
              <p className="text-sm text-right text-gray-400">Customer</p>
            </section>
            <section className="mt-40">
              <p className="text-center text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </p>
            </section>{" "}
          </SwiperSlide>
          <SwiperSlide className="bg-gray-50 py-12 px-9 mt-20 rounded-4xl">
            <section>
              <h3 className="text-black text-sm font-semibold uppercase">
                Best Scotch
              </h3>
              <p className="text-sm mt-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                ducimus deleniti quaerat eos doloremque. Nulla facere impedit
                perspiciatis voluptate possimus!{" "}
              </p>
            </section>
            <section className="mt-5">
              <p className="text-sm text-right text-gray-400">Customer</p>
            </section>
            <section className="mt-40">
              <p className="text-center text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </p>
            </section>{" "}
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
