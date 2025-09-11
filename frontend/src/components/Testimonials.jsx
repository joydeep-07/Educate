import React from "react";

const Testimonials = () => {
  return (
    <div className="w-full bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center relative">
        {/* Floating avatars grid */}
        <div className="grid grid-cols-5 gap-6 justify-items-center mb-12">
          {/* Top Row (3 images centered) */}
          <div></div>
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="profile"
            className="w-24 h-24 object-cover rounded-2xl shadow-md"
          />
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="profile"
            className="w-24 h-24 object-cover rounded-2xl shadow-md"
          />
          <img
            src="https://randomuser.me/api/portraits/men/64.jpg"
            alt="profile"
            className="w-24 h-24 object-cover rounded-2xl shadow-md"
          />
          <div></div>

          {/* Middle Row (5 images full) */}
          <img
            src="https://randomuser.me/api/portraits/men/81.jpg"
            alt="profile"
            className="w-24 h-24 object-cover rounded-2xl shadow-md"
          />
          <img
            src="https://randomuser.me/api/portraits/women/66.jpg"
            alt="profile"
            className="w-24 h-24 object-cover rounded-2xl shadow-md"
          />
          <img
            src="https://randomuser.me/api/portraits/men/74.jpg"
            alt="profile"
            className="w-24 h-24 object-cover rounded-2xl shadow-md"
          />
          <img
            src="https://randomuser.me/api/portraits/women/55.jpg"
            alt="profile"
            className="w-24 h-24 object-cover rounded-2xl shadow-md"
          />
          <img
            src="https://randomuser.me/api/portraits/men/22.jpg"
            alt="profile"
            className="w-24 h-24 object-cover rounded-2xl shadow-md"
          />

          {/* Bottom Row (4 images staggered) */}
          <div></div>
          <img
            src="https://randomuser.me/api/portraits/women/21.jpg"
            alt="profile"
            className="w-24 h-24 object-cover rounded-2xl shadow-md"
          />
          <img
            src="https://randomuser.me/api/portraits/men/11.jpg"
            alt="profile"
            className="w-24 h-24 object-cover rounded-2xl shadow-md"
          />
          <img
            src="https://randomuser.me/api/portraits/women/85.jpg"
            alt="profile"
            className="w-24 h-24 object-cover rounded-2xl shadow-md"
          />
          <div></div>
        </div>

        {/* Text */}
        <p className="text-sm uppercase tracking-wide font-medium text-gray-400">
          Testimonials
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mt-2">
          Trusted by leaders <br />
          <span className="text-gray-500">from various industries</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
          Learn why professionals trust our solutions to complete their customer
          journeys.
        </p>

        {/* CTA */}
        <div className="mt-8">
          <button className="px-6 py-3 rounded-full bg-black text-white font-medium shadow-md hover:bg-gray-800 transition-all">
            Read Success Stories →
          </button>
        </div>
      </div>

      {/* Inline styles for demonstration purposes */}
      <style jsx>{`
        .grid {
          display: grid;
        }
        .grid-cols-5 {
          grid-template-columns: repeat(5, minmax(0, 1fr));
        }
        .gap-6 {
          gap: 1.5rem;
        }
        .justify-items-center {
          justify-items: center;
        }
        .mb-12 {
          margin-bottom: 3rem;
        }
        .w-24 {
          width: 6rem;
        }
        .h-24 {
          height: 6rem;
        }
        .object-cover {
          object-fit: cover;
        }
        .rounded-2xl {
          border-radius: 1rem;
        }
        .shadow-md {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .text-sm {
          font-size: 0.875rem;
        }
        .uppercase {
          text-transform: uppercase;
        }
        .tracking-wide {
          letter-spacing: 0.025em;
        }
        .font-medium {
          font-weight: 500;
        }
        .text-gray-400 {
          color: #9ca3af;
        }
        .text-3xl {
          font-size: 1.875rem;
        }
        .md\:text-5xl {
          font-size: 3rem;
        }
        .font-bold {
          font-weight: 700;
        }
        .text-gray-800 {
          color: #1f2937;
        }
        .mt-2 {
          margin-top: 0.5rem;
        }
        .text-gray-500 {
          color: #6b7280;
        }
        .text-gray-600 {
          color: #4b5563;
        }
        .max-w-2xl {
          max-width: 42rem;
        }
        .mx-auto {
          margin-left: auto;
          margin-right: auto;
        }
        .mt-4 {
          margin-top: 1rem;
        }
        .mt-8 {
          margin-top: 2rem;
        }
        .px-6 {
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .py-3 {
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
        }
        .rounded-full {
          border-radius: 9999px;
        }
        .bg-black {
          background-color: #000;
        }
        .text-white {
          color: #fff;
        }
        .shadow-md {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .hover\:bg-gray-800:hover {
          background-color: #1f2937;
        }
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }
        .w-full {
          width: 100%;
        }
        .bg-white {
          background-color: #fff;
        }
        .py-20 {
          padding-top: 5rem;
          padding-bottom: 5rem;
        }
        .px-6 {
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .max-w-6xl {
          max-width: 72rem;
        }
        .text-center {
          text-align: center;
        }
        .relative {
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
