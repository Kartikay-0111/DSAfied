import React, { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    name: "John Martinez",
    role: "Director, Trendsetters LLC",
    feedback:
      "The financial management tools provided by Flike are unmatched. With detailed reports and easy-to-use features, my financial processes have never been smoother.",
    avatar: "https://via.placeholder.com/50",
  },
  {
    name: "Jessica Patel",
    role: "Freelance Consultant",
    feedback:
      "The real-time insights from Flike have been essential for my budgeting. Truly a fantastic tool for freelancers!",
    avatar: "https://via.placeholder.com/50",
  },
  {
    name: "Emily Johnson",
    role: "Founder, The FTC Group",
    feedback:
      "Flike has transformed the way we handle finances. The intuitive dashboard allows us to optimize our income streams effectively. Highly recommend!",
    avatar: "https://via.placeholder.com/50",
  },
  {
    name: "Ryan Carter",
    role: "Project Manager, BuildMore Inc.",
    feedback:
      "Flike’s collaboration features have improved our team’s financial workflow tremendously. Great tool for teams!",
    avatar: "https://via.placeholder.com/50",
  },
  {
    name: "Sophia Nguyen",
    role: "CEO, TechSolutions",
    feedback:
      "The level of customization available in Flike is top-notch. It’s made managing finances so much easier for my team.",
    avatar: "https://via.placeholder.com/50",
  },
];

const Testimonials = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    let scrollAmount = 0;

    const scrollTestimonials = () => {
      if (!isHovered && scrollContainer) {
        scrollContainer.scrollLeft += 1; // Adjust the speed by changing the increment value
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0; // Reset scroll to create a seamless loop
        }
      }
    };

    const interval = setInterval(scrollTestimonials, 20); // Adjust the speed by changing the interval duration

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [isHovered]);

  return (
    <div
      className="relative bg-black text-white p-6 overflow-hidden mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-hidden scrollbar-none w-full"
      >
        {testimonials.concat(testimonials).map((testimonial, index) => (
          <div
            key={index}
            className="min-w-[350px] max-w-[350px] p-4 bg-gradient-to-r from-blue-900 to-black rounded-lg shadow-lg flex-shrink-0"
          >
            <p className="text-gray-300 mb-4">{testimonial.feedback}</p>
            <div className="flex items-center">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="text-white font-semibold">{testimonial.name}</h3>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
