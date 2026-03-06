import React from 'react';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Aarav Sharma',
      role: 'Class 10 Student',
      content:
        'The tutoring sessions were incredibly helpful. My math scores improved from 65 to 92 in just 3 months. The personalized approach made all the difference!',
      rating: 5,
      avatar: 'AS',
    },
    {
      name: 'Priya Patel',
      role: 'Parent of Class 8 Student',
      content:
        'We found the perfect tutor for our daughter! The tutor is not only knowledgeable but also patient and encouraging. Highly recommended!',
      rating: 5,
      avatar: 'PP',
    },
    {
      name: 'Rohan Gupta',
      role: 'Class 12 Student',
      content:
        'TutorConnect matched me with an excellent physics tutor. The flexible timing and one-on-one sessions made studying enjoyable. My JEE prep got a major boost!',
      rating: 5,
      avatar: 'RG',
    },
    {
      name: 'Anjali Verma',
      role: 'Parent of Class 6 Student',
      content:
        'My son struggled with English until we found a tutor through TutorConnect. Within weeks, his confidence and grades improved significantly!',
      rating: 4,
      avatar: 'AV',
    },
    {
      name: 'Vikram Singh',
      role: 'Class 11 Student',
      content:
        'As a working student, I needed flexible tutoring hours. TutorConnect provided exactly that! My economics tutor is fantastic and very supportive.',
      rating: 5,
      avatar: 'VS',
    },
    {
      name: 'Meera Reddy',
      role: 'Parent of Class 9 Student',
      content:
        'The quality of tutors on TutorConnect is exceptional. Our son\'s science scores went from average to excellent. Worth every penny!',
      rating: 5,
      avatar: 'MR',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          What Our Students Say
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Real success stories from students and parents who transformed their learning journey
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative"
          >
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 h-full border border-gray-100 hover:border-purple-300">
              {/* Stars Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ★
                  </span>
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-gray-300 text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-purple-200 via-blue-200 to-green-200 mb-6"></div>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {testimonial.avatar}
                </div>

                {/* Name and Role */}
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              {/* Quote Mark Decoration */}
              <div className="absolute top-6 right-6 text-6xl text-purple-200 opacity-20 font-serif">
                "
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <p className="text-gray-600 text-lg mb-6">
          Ready to join thousands of successful students?
        </p>
        <a
          href="https://wa.me/919582273806?text=Hi%20TutorConnect!%20I%20am%20looking%20for%20a%20tutor.%20Please%20help%20me%20find%20the%20right%20match."
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started Today
          </motion.button>
        </a>
      </motion.div>
    </div>
  );
}
