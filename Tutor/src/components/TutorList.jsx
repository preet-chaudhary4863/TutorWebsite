import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { tutorAPI } from '../api/apiClient';

export default function TutorList() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        const data = await tutorAPI.getAllTutors();
        setTutors(data);
        setError(null);
      } catch (err) {
        setError('Failed to load tutors');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
        <p className="mt-4 text-gray-600">Loading tutors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

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
          Meet Our Expert Tutors
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Highly qualified educators passionate about helping you succeed
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tutors.map((tutor, index) => (
          <motion.div
            key={tutor._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative"
          >
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full border border-gray-100 hover:border-purple-300">
              {/* Header with gradient */}
              <div className="h-24 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 group-hover:from-purple-600 group-hover:via-blue-600 group-hover:to-green-600 transition-all duration-300"></div>

              {/* Content */}
              <div className="p-6 -mt-12 relative">
                {/* Avatar circle */}
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center mb-4 text-white font-bold text-2xl shadow-lg mx-auto">
                  {tutor.userId?.name?.charAt(0)}
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                  {tutor.userId?.name}
                </h3>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tutor.expertise?.slice(0, 2).map((exp, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
                    >
                      {exp}
                    </span>
                  ))}
                  {tutor.expertise?.length > 2 && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      +{tutor.expertise.length - 2}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-4">
                  <span className="text-yellow-400">★</span>
                  <span className="font-semibold text-gray-900">
                    {tutor.rating || '4.5'}
                  </span>
                  <span className="text-gray-500 text-sm">(Reviews)</span>
                </div>

                {/* Experience & Rate */}
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">{tutor.experience}</span> years experience
                  </p>
                  <p className="text-lg font-bold text-purple-600 mt-2">
                    ₹{tutor.hourlyRate}/hour
                  </p>
                </div>

                {/* Bio (truncated) */}
                {tutor.bio && (
                  <p className="text-sm text-gray-600 text-center line-clamp-2 mb-4">
                    {tutor.bio}
                  </p>
                )}

                {/* Contact Button */}
                <a
                  href={`https://wa.me/919582273806?text=Hi%20TutorConnect!%20I%20am%20interested%20in%20${tutor.userId?.name}.%20Please%20provide%20me%20with%20more%20details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-center text-sm"
                >
                  Contact Now
                </a>
              </div>

              {/* Hover effect decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {tutors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No tutors available at the moment.</p>
        </div>
      )}
    </div>
  );
}
