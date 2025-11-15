import React from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Kapil Paliwal",
    position: "Full Stack Developer",
    avatar:
      "https://media.licdn.com/dms/image/v2/D5603AQFgZO0p5iBbPg/profile-displayphoto-shrink_200_200/B56ZPkTFXSG4AY-/0/1734702029826?e=1759363200&v=beta&t=vSKCSc_rzrzopndE4eGXWThDgPi_1a69QkH3cPnwRzw",
    content:
      "This resume builder is incredible! The AI tailored my resume perfectly for tech roles. I landed a great position in just two weeks.",
    rating: 5,
  },
  {
    name: "Akash Yadav",
    position: "Electrical Engineer",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4E03AQE39EkCWSZj5Q/profile-displayphoto-shrink_200_200/B4EZRllWAhHMAY-/0/1736871078034?e=1759363200&v=beta&t=23VtaVFXP6m-ZEJyvc-4KOYeUk8ZuPe68Xh0GwO5JEc",
    content:
      "The templates are clean and professional. I saw a noticeable increase in interview callbacks after updating my resume.",
    rating: 5,
  },
  {
    name: "Vikas Babu",
    position: "Software Engineer",
    avatar:
      "https://media.licdn.com/dms/image/v2/D5635AQFeDVKA_5l_pA/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1729191216649?e=1758135600&v=beta&t=mNI4VMTCzTkRtKJ3aNAr-fcFUzIoV70UdUIok5EdpmQ",
    content:
      "Loved how quick and intuitive it was. The AI suggestions made my resume more impactful — and it looks great too.",
    rating: 5,
  },
  {
    name: "Krishn Kant",
    position: "Civil Engineer",
    avatar:
      "https://images.pexels.com/photos/33873495/pexels-photo-33873495.jpeg",
    content:
      "Creating a polished resume took me less than 10 minutes. It's a great tool for engineers like me who don’t want to start from scratch.",
    rating: 4.3,
  },
  {
    name: "Aditya Sushil Sahu",
    position: "AI ML Engineer",
    avatar:
      "https://media.licdn.com/dms/image/v2/D5635AQFeDVKA_5l_pA/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1729191216649?e=1758135600&v=beta&t=mNI4VMTCzTkRtKJ3aNAr-fcFUzIoV70UdUIok5EdpmQ",
    content:
      "Impressed with how well it highlights AI and ML skills. The customization options and export features are fantastic.",
    rating: 5,
  },
  {
    name: "Ayush Verma",
    position: "Civil Engineer",
    avatar:
      "https://media.licdn.com/dms/image/v2/D5635AQFeDVKA_5l_pA/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1729191216649?e=1758135600&v=beta&t=mNI4VMTCzTkRtKJ3aNAr-fcFUzIoV70UdUIok5EdpmQ",
    content:
      "Simple, fast, and beautifully designed. My resume finally stands out, and I can easily update it anytime from my phone.",
    rating: 4.9,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const Testimonials = () => {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our
            <span className="bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent ml-3">
              Users Say
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers
            with our platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:bg-gray-900/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity">
                <Quote className="w-8 h-8 text-blue-400" />
              </div>

              <div className="flex space-x-1 mb-6">
                {[1, 2, 3, 4, 5].map((starIndex) => {
                  const ratingValue = testimonial.rating;
                  let starType = "empty";
                  if (ratingValue >= starIndex) starType = "full";
                  else if (ratingValue >= starIndex - 0.5) starType = "half";

                  return (
                    <span key={starIndex}>
                      {starType === "full" && (
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      )}
                      {starType === "half" && (
                        <Star className="w-5 h-5 text-yellow-400 fill-current opacity-50" />
                      )}
                      {starType === "empty" && (
                        <Star className="w-5 h-5 text-gray-300" />
                      )}
                    </span>
                  );
                })}
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                "{testimonial.content}"
              </p>

              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full ring-2 ring-blue-400/50 group-hover:ring-blue-400 transition-all"
                />
                <div>
                  <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {testimonial.position}
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
