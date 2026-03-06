import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { formAPI } from '../api/apiClient';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await formAPI.submitForm(
        formData.name,
        formData.email,
        formData.phone,
        formData.subject,
        formData.message,
        'contact'
      );

      setSuccessMsg('✓ Thank you! Your message has been sent successfully. We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (error) {
      setErrorMsg(`✗ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: '📞',
      title: 'Phone',
      contact: '+91 95822 73806',
      available: 'Mon-Fri, 9AM-6PM',
    },
    {
      icon: '📧',
      title: 'Email',
      contact: 'info@tutorconnect.com',
      available: '24/7 Response',
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      contact: '+91 95822 73806',
      available: '24/7 Available',
    },
  ];

  const faqs = [
    {
      question: 'How do I get started with tutoring?',
      answer:
        'Fill out our contact form or message us on WhatsApp. We will match you with the perfect tutor and schedule a free demo session.',
    },
    {
      question: 'What subjects do you cover?',
      answer:
        'We offer tutoring for Math, Science, English, History, Languages, and test preparation at all levels.',
    },
    {
      question: 'What is your pricing?',
      answer:
        'Our tutors charge between ₹350-₹800 per hour based on their expertise. Flexible payment plans are available.',
    },
    {
      question: 'Can I choose my tutor?',
      answer:
        'Yes, you can browse tutor profiles on our website and select someone who matches your needs.',
    },
    {
      question: 'Do you offer online and home tutoring?',
      answer:
        'Yes, we offer both online and home tutoring options. Choose what works best for you.',
    },
    {
      question: 'Is there a free trial?',
      answer:
        'Yes, we offer free demo sessions so you can meet the tutor before committing.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <Motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative py-12 md:py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-green-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <Motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 bg-clip-text text-transparent"
          >
            Get in Touch
          </Motion.h1>
          <Motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-4 md:mt-6 text-lg text-gray-700 max-w-3xl mx-auto"
          >
            Ready to start your learning journey? Contact us today!
          </Motion.p>
        </div>
      </Motion.section>

      {/* Contact Methods - Full Width at Top */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 mb-8 md:mb-12">
            {contactMethods.map((method, index) => (
              <Motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-3">{method.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                <p className="font-medium text-purple-600 text-sm mb-1">{method.contact}</p>
                <p className="text-xs text-gray-500">{method.available}</p>
              </Motion.div>
            ))}
          </div>

          {/* Contact Form - Full Width */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="How can we help?"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Tell us more..."
                />
              </div>

              {/* Status Messages */}
              {successMsg && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-sm">{successMsg}</p>
                </div>
              )}
              {errorMsg && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{errorMsg}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 transition-all"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </Motion.div>

          {/* FAQs Section */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4 md:space-y-6">
              {faqs.map((faq, index) => (
                <Motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-2 text-base md:text-lg">
                    ❓ {faq.question}
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </Motion.div>
              ))}
            </div>
          </Motion.div>
        </div>
      </section>
    </div>
  );
}
