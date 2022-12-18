import React from "react";

export default function Services() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:flex lg:justify-between  items-center gap-x-10">
        <section className="w-full bg-gray-100 flex justify-between items-center p-10 rounded-3xl">
          <div>
            <h2 className="text-3xl font-bold relative z-10 w-min before:content-[''] before:inline-block before:absolute before:w-full before:h-3 before:bg-red-200 before:-z-10 before:bottom-0">
              Search
            </h2>
            <p className="max-w-xs text-base font-normal mt-3">
              1500+ products <span className="flex">to choose from</span>
            </p>
          </div>
          <img
            className="w-32"
            src="https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/draw-1.png?v=21001993641126917431642089713"
            alt=""
          />
        </section>
        <section className="w-full bg-gray-100 flex justify-between items-center py-10 px-8 rounded-3xl">
          <div>
            <h2 className="text-3xl font-bold relative z-10 w-min before:content-[''] before:inline-block before:absolute before:w-full before:h-3 before:bg-red-200 before:-z-10 before:bottom-0">
              Tap
            </h2>
            <p className="max-w-xs text-base font-normal mt-3">
              Checkout in seconds{" "}
              <span className="flex">with express checkout</span>
            </p>
          </div>

          <img
            className="w-32"
            src="https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/draw-3.png?v=14863949714463418361642089715"
            alt=""
          />
        </section>
        <section className="w-full bg-gray-100 flex justify-between items-center p-10 rounded-3xl">
          <div>
            <h2 className="text-3xl font-bold relative before:content-[''] z-10 w-min before:inline-block before:absolute before:w-full before:h-3 before:bg-red-200 before:-z-10 before:bottom-0">
              Drink
            </h2>
            <p className="max-w-xs text-base font-normal mt-3">
              Delivered to your <span className="flex">door within days</span>
            </p>
          </div>

          <img
            className="w-32"
            src="https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/draw-2.png?v=36843252368110017251642089714"
            alt=""
          />
        </section>
      </div>
    </div>
  );
}
