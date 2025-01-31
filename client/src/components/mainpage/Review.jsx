import React, { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Competitive Programmer",
    feedback:
      "DSAfied’s personalized recommendations helped me ace coding interviews at top companies. The leaderboard keeps me motivated daily!",
    avatar: "https://via.placeholder.com/50",
  },
  {
    name: "Priya Sharma",
    role: "Software Engineer at TechCorp",
    feedback:
      "The adaptive learning paths on DSAfied made practicing DSA so much easier. I love how it tracks progress and suggests relevant problems.",
    avatar: "https://via.placeholder.com/50",
  },
  {
    name: "Rohan Patel",
    role: "CS Student, VJTI",
    feedback:
      "DSAfied’s doubt-solving feature is a lifesaver! Getting help from peers on tough problems is seamless. Highly recommended for students.",
    avatar: "https://via.placeholder.com/50",
  },
  {
    name: "Ananya Gupta",
    role: "Tech Lead at InnovateHub",
    feedback:
      "DSAfied has been instrumental in upskilling my team. The curated problem sets and tracking tools make it an invaluable resource for professionals.",
    avatar: "https://via.placeholder.com/50",
  },
  {
    name: "Kunal Verma",
    role: "Final Year Student, IIT Delhi",
    feedback:
      "The discipline and consistency DSAfied enforces helped me secure an internship at a top tech company. Best platform for DSA practice!",
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
