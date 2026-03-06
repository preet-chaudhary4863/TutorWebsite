import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { PrimaryButton } from "../components/ui/Button";
import FormModal from "../components/FormModal";
import TutorList from "../components/TutorList";
import Testimonials from "../components/Testimonials";
import studyImg from "../assets/At-Home-Tutor-is-Having-Your-Own-Personal-Teacher.jpg";

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let startTime;
          let animationFrame;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min(
              (timestamp - startTime) / (duration * 1000),
              1
            );

            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeOutCubic * end);

            setCount(currentCount);

            if (progress < 1) {
              animationFrame = requestAnimationFrame(animate);
            }
          };

          animationFrame = requestAnimationFrame(animate);

          return () => {
            if (animationFrame) {
              cancelAnimationFrame(animationFrame);
            }
          };
        }
      },
      { threshold: 0.2 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [end, duration, hasAnimated]);

  return (
    <span ref={counterRef}>
      {count}
      {suffix}
    </span>
  );
};

const features = [
  {
    icon: "👤",
    title: "Verified Tutors",
    desc: "Thoroughly screened and qualified tutors.",
  },
  {
    icon: "🏠",
    title: "Home Comfort",
    desc: "Learn in the comfort of your home.",
  },
  {
    icon: "📚",
    title: "Personalized Learning",
    desc: "Tailored lesson plans based on needs.",
  },
  {
    icon: "⏰",
    title: "Flexible Timing",
    desc: "Schedule sessions that suit you.",
  },
  {
    icon: "✅",
    title: "Proven Results",
    desc: "Improved scores and confidence.",
  },
  {
    icon: "💬",
    title: "24/7 Support",
    desc: "We are here to help when needed.",
  },
];

export default function Home() {
  const [showFormModal, setShowFormModal] = useState(false);
  const [formType, setFormType] = useState("join"); // "join" or "find"

  const openJoinForm = () => {
    setFormType("join");
    setShowFormModal(true);
  };

  const openFindForm = () => {
    setFormType("find");
    setShowFormModal(true);
  };

  const getFormTitle = () => {
    if (formType === "join") return "Join as a Tutor";
    if (formType === "find") return "Find a Tutor";
    return "Apply to Join a Tutor";
  };

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
              Ready to Start Your Learning Journey?{" "}
              <span className="text-yellow-300">TutorConnect</span>
            </h1>
            <p className="mt-4 text-lg text-white/90">
              Connecting passionate tutors with eager learners for personalized
              home education experiences.
            </p>
            <div className="mt-6 flex flex-wrap gap-5">
              <PrimaryButton
                color="purple"
                onClick={openJoinForm}
                aria-label="Join as a Tutor"
              >
                Join as a Tutor
              </PrimaryButton>
              <PrimaryButton
                color="green"
                onClick={openFindForm}
                aria-label="Find a Tutor"
              >
                Find a Tutor
              </PrimaryButton>
            </div>
            <div className="mt-6 text-sm text-white/80">
              Trusted by <strong>100+</strong> families{" "}
              <span className="ml-2">⭐⭐⭐⭐⭐</span>
              <div className="mt-2 flex items-center gap-2">
                <span>📱 Connect instantly:</span>
                <a
                  href="https://wa.me/919582273806"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-300 hover:text-green-200 font-semibold"
                >
                  +91 95822 73806
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-72 md:h-96 rounded-xl shadow-lg overflow-hidden border-2 border-white/10">
              <img
                src={studyImg}
                alt="students studying"
                loading="lazy"
                className="w-full h-full object-cover brightness-[.85]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="md:flex md:items-center md:gap-10">
          <div className="md:flex-1">
            <h2 className="text-3xl font-bold">
              Meet Our <span className="text-purple-600">Founder</span>
            </h2>
            <p className="mt-4 text-gray-700">
              Our founders, Preet & Rajat, are passionate about connecting talented teachers with students. They believe in personalized learning that adapts to each student’s pace, needs, and academic goals.
            </p>
            <p className="mt-4 text-sm text-gray-600">
              Trusted by families and schools, TutorConnect continues to grow
              and help students reach their potential.
            </p>
          </div>
          <div className="mt-6 md:mt-0 md:w-72">
            <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
              <img
                className="w-20 h-20 rounded-full object-cover"
                src={studyImg}
                alt="founder portrait"
                loading="lazy"
              />
              <div>
                <h4 className="font-semibold">Preet & Rajat</h4>
                <p className="text-sm text-gray-500">Founder & CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-green-500/5"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 bg-clip-text text-transparent mb-6">
              Why Choose TutorConnect?
            </h3>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              We bridge the gap between tutors and students through a trusted
              platform built for exceptional results and personalized learning
              experiences.
            </p>
          </motion.div>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 h-full border border-gray-100 hover:border-purple-200">
                  {/* Icon with gradient background */}
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-3xl">{feature.icon}</div>
                  </div>

                  {/* Title with gradient on hover */}
                  <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {feature.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                    {feature.desc}
                  </p>

                  {/* Decorative element */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 rounded-3xl p-12 text-white text-center">
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-2xl font-bold mb-8"
              >
                Join Thousands of Successful Students
              </motion.h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  {
                    end: 100,
                    suffix: "+",
                    label: "Happy Students",
                    delay: 0.6,
                  },
                  { end: 10, suffix: "+", label: "Expert Tutors", delay: 0.7 },
                  { end: 98, suffix: "%", label: "Success Rate", delay: 0.8 },
                  {
                    end: 10,
                    suffix: "+",
                    label: "Subjects Covered",
                    delay: 0.9,
                  },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: stat.delay,
                      duration: 0.5,
                      type: "spring",
                      bounce: 0.3,
                    }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="text-4xl font-bold mb-2"
                      whileInView={(isInView) => ({
                        scale: isInView ? [1, 1.1, 1] : 1,
                      })}
                      transition={{ duration: 0.5, delay: stat.delay + 0.5 }}
                      viewport={{ once: true }}
                    >
                      <AnimatedCounter
                        end={stat.end}
                        duration={2}
                        suffix={stat.suffix}
                      />
                    </motion.div>
                    <motion.div
                      className="text-white/90"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: stat.delay + 1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {stat.label}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
          </motion.div>
        </div>
      </section>

      {/* Tutor List Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <TutorList />
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-8">
        <Testimonials />
      </section>

      {/* CTA Section - Book Free Demo */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Book your free demo session today and discover how our tutors can help you succeed.
            </p>

            <a
              href="https://wa.me/919582273806?text=Hi%20TutorConnect!%20I%20would%20like%20to%20book%20a%20free%20demo%20session.%20Please%20guide%20me."
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-purple-600 font-bold text-lg rounded-full hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl"
              >
                BOOK A FREE DEMO NOW
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>

      <FormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        title={getFormTitle()}
        formType={formType}
      />
    </div>
  );
}
