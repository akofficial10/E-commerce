import React from "react";
import vid1 from "../assets/vid1.mp4";
import vid2 from "../assets/vid2.mp4";

const VideoSection = () => {
  return (
    <section className="px-4 py-10 sm:px-6 md:px-20 ">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-green-700 mb-2 sm:mb-3">
          See the Glow in Action
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700 text-xs sm:text-sm md:text-base">
          Watch how our dermatologist-approved skincare transforms real
          skin—backed by nature and perfected with care.
        </p>
      </div>

      <div className="flex flex-row overflow-x-auto whitespace-nowrap gap-4 pb-4 md:flex-row md:overflow-visible md:whitespace-normal md:justify-center md:gap-8">
        <div className="inline-block w-[43vw] flex-none md:w-1/2 md:inline-flex">
          <video
            className="w-full h-auto rounded-md shadow-lg outline-none transition-transform duration-300"
            src={vid1}
            autoPlay
            muted
            loop
            playsInline
            controls
          />
        </div>
        <div className="inline-block w-[43vw] flex-none md:w-1/2 md:inline-flex">
          <video
            className="w-full h-auto rounded-md shadow-lg outline-none transition-transform duration-300"
            src={vid2}
            autoPlay
            muted
            loop
            playsInline
            controls
          />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
