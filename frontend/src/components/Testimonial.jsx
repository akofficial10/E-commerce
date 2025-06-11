import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Testimonials = () => {
  const swiperRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      quote:
        "You know sometimes when I'm talking, my words can't keep up with my thoughts. Probably so we can think twice.",
      author: "Arpit Kumar",
      role: "Entrepreneur",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      quote:
        "The service was exceptional from start to finish. Truly a game-changer for our business operations.",
      author: "Priya Sharma",
      role: "CEO",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 3,
      quote:
        "I've never experienced such attention to detail. The team understood our needs perfectly.",
      author: "Vikas Beriwal",
      role: "Marketing Director",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 4,
      quote:
        "The product has significantly improved our workflow efficiency. Highly recommended!",
      author: "Ananya Gupta",
      role: "CTO",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 5,
      quote:
        "Excellent customer support and a truly innovative solution to our problems.",
      author: "Ayush Kumar",
      role: "Operations Manager",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 6,
      quote:
        "We saw immediate results after implementation. Worth every penny invested.",
      author: "Neha Kapoor",
      role: "Product Manager",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: 7,
      quote:
        "The implementation was seamless and the training was comprehensive.",
      author: "Geetansh",
      role: "IT Director",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: 8,
      quote:
        "Our productivity increased by 40% within the first month of using this service.",
      author: "Meera Desai",
      role: "HR Director",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 9,
      quote:
        "The team went above and beyond to deliver exactly what we needed.",
      author: "Rahul Verma",
      role: "Financial Analyst",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ];

  return (
    <div className="bg-white pt-12 md:pt-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4">
          Happy Clients
        </h1>
        <div className="border-t border-gray-300 w-16 md:w-20 mx-auto mb-6 md:mb-8"></div>

        <div className="relative">
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={2} // Show 2 slides on mobile by default
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="!pb-10 md:!pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white p-4 md:p-6 h-full rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row">
                  <div className="w-20 h-20 sm:w-1/3 sm:pr-4 mb-3 sm:mb-0 flex items-center justify-center sm:justify-start">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full max-w-[80px] rounded-full object-cover aspect-square"
                    />
                  </div>
                  <div className="w-full sm:w-2/3">
                    <p className="text-gray-700 italic text-sm md:text-base mb-3 md:mb-4">
                      "{testimonial.quote}"
                    </p>
                    <div className="border-t border-gray-200 pt-2 md:pt-3">
                      <p className="font-semibold text-sm md:text-base">
                        {testimonial.author}
                      </p>
                      <p className="text-gray-500 text-xs md:text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="swiper-button-prev absolute top-1/2 left-0 z-10 -translate-y-1/2"></div>
          <div className="swiper-button-next absolute top-1/2 right-0 z-10 -translate-y-1/2"></div>
          <div className="swiper-pagination !relative !mt-6 md:!mt-8"></div>
        </div>
      </div>

      <style jsx="true" global="true">{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #000;
          background: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        @media (min-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            width: 40px;
            height: 40px;
          }
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 14px;
          font-weight: bold;
        }
        @media (min-width: 768px) {
          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 18px;
          }
        }
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #e5e7eb;
          opacity: 1;
          transition: all 0.3s ease;
        }
        @media (min-width: 768px) {
          .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
          }
        }
        .swiper-pagination-bullet-active {
          background: #000;
          transform: scale(1.2);
        }
        .swiper-slide {
          height: auto;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
