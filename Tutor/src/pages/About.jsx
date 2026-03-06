import { motion as Motion } from "framer-motion";
import { useState } from "react";
import aboutImg from "../assets/At-Home-Tutor-is-Having-Your-Own-Personal-Teacher.jpg";
import Team from "../components/Team";
import FormModal from "../components/FormModal";

export default function About() {
  const [showFormModal, setShowFormModal] = useState(false);
  const [formType, setFormType] = useState("join");
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <Motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-green-500/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <Motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 bg-clip-text text-transparent"
          >
            About TutorConnect
          </Motion.h1>
          <Motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            Empowering students through personalized education and connecting
            passionate tutors with eager learners across the globe.
          </Motion.p>
        </div>
      </Motion.section>

      {/* Mission & Vision Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                At TutorConnect, we believe every student deserves access to
                quality education tailored to their unique learning style. Our
                mission is to bridge the gap between passionate educators and
                students seeking to unlock their full potential.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-700">
                    Personalized learning experiences for every student
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-700">
                    Connecting qualified tutors with students worldwide
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-700">
                    Making quality education accessible and affordable
                  </p>
                </div>
              </div>
            </Motion.div>
            <Motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <img
                  src={aboutImg}
                  alt="Personalized tutoring experience"
                  loading="lazy"
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 bg-white/50"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                50+
              </div>
              <p className="mt-2 text-gray-600 font-medium">Students Helped</p>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                10+
              </div>
              <p className="mt-2 text-gray-600 font-medium">Expert Tutors</p>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-purple-500 bg-clip-text text-transparent">
                98%
              </div>
              <p className="mt-2 text-gray-600 font-medium">Success Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                10+
              </div>
              <p className="mt-2 text-gray-600 font-medium">Subjects Covered</p>
            </div>
          </div>
        </div>
      </Motion.section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we serve our
              community.
            </p>
          </Motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl text-white">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                Excellence
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                We strive for excellence in every tutoring session, ensuring
                students receive the highest quality education and support.
              </p>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl text-white">🤝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                Connection
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Building meaningful relationships between tutors and students is
                at the heart of effective learning and personal growth.
              </p>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl text-white">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                Growth
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                We're committed to the continuous growth of our students,
                tutors, and platform to create better learning outcomes.
              </p>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <Motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-green-500"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their academic
            performance with personalized tutoring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setFormType("find");
                setShowFormModal(true);
              }}
              className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-50 transition-colors duration-200"
            >
              Are you seeking a tutor?
            </Motion.button>
            <Motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setFormType("join");
                setShowFormModal(true);
              }}
              className="px-8 py-4 bg-white/20 text-white rounded-full font-semibold hover:bg-white/30 transition-colors duration-200 backdrop-blur-sm"
            >
              Are you a tutor?
            </Motion.button>
          </div>
        </div>
      </Motion.section>

      {/* Team Section */}
      <section className="bg-white py-8">
        <Team />
      </section>

      <FormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        title={formType === "join" ? "Join as a Tutor" : "Find a Tutor"}
        formType={formType}
      />
    </div>
  );
}
