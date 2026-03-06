import { motion as Motion } from "framer-motion";
import Card from "../components/ui/Card";
import { PrimaryButton } from "../components/ui/Button";

const services = [
  {
    title: "Home Tutoring",
    desc: "Personalized in-person tutoring sessions at the comfort of your home with flexible scheduling.",
    icon: "🏠",
    features: [
      "One-on-one sessions",
      "Flexible scheduling",
      "All subjects covered",
      "Progress tracking",
    ],
    popular: false,
  },
  {
    title: "Online Tutoring",
    desc: "Interactive online sessions with expert tutors using advanced learning platforms and tools.",
    icon: "💻",
    features: [
      "HD video sessions",
      "Screen sharing",
      "Digital whiteboard",
      "24/7 availability",
    ],
    popular: true,
  },
  {
    title: "Exam Preparation",
    desc: "Comprehensive exam preparation with targeted strategies, practice tests, and performance analysis.",
    icon: "📚",
    features: [
      "Mock tests",
      "Performance analysis",
      "Study strategies",
      "Last-minute prep",
    ],
    popular: false,
  },
  {
    title: "Skill Development",
    desc: "Specialized workshops and courses to build valuable academic and life skills for future success.",
    icon: "🎯",
    features: [
      "Interactive workshops",
      "Practical exercises",
      "Certification",
      "Career guidance",
    ],
    popular: false,
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <Motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-green-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <Motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 bg-clip-text text-transparent"
          >
            Our Services
          </Motion.h1>
          <Motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            Discover our comprehensive range of tutoring services designed to
            help students excel academically and develop essential skills for
            future success.
          </Motion.p>
        </div>
      </Motion.section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              From personalized home tutoring to interactive online sessions, we
              have the perfect solution for every learning style and schedule.
            </p>
          </Motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full ${
                    service.popular ? "ring-2 ring-purple-200 scale-105" : ""
                  }`}
                >
                  <div className="text-6xl mb-6 text-center">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 text-center mb-6 leading-relaxed">
                    {service.desc}
                  </p>

                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <PrimaryButton
                      variant={service.popular ? "purple" : "green"}
                      className="w-full"
                    >
                      Get Started
                    </PrimaryButton>
                  </div>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <Motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-white/50"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Getting started with TutorConnect is simple and straightforward.
              Follow these easy steps to begin your learning journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Choose Your Service",
                desc: "Select the tutoring service that best fits your learning needs and schedule preferences.",
                icon: "🎯",
              },
              {
                step: "02",
                title: "Match with a Tutor",
                desc: "We'll connect you with a qualified tutor who specializes in your subject area and learning style.",
                icon: "🤝",
              },
              {
                step: "03",
                title: "Start Learning",
                desc: "Begin your personalized learning journey with flexible scheduling and progress tracking.",
                icon: "🚀",
              },
            ].map((item, index) => (
              <Motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </Motion.section>

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
            Ready to Excel in Your Studies?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their academic
            performance with our personalized tutoring services.
          </p>
          <a
            href="https://wa.me/919582273806?text=Hi%20TutorConnect!%20I%20would%20like%20to%20book%20a%20free%20demo%20session.%20Please%20guide%20me."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-purple-600 font-bold text-lg rounded-full hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl"
            >
              BOOK A FREE DEMO NOW
            </Motion.button>
          </a>
        </div>
      </Motion.section>
    </div>
  );
}
