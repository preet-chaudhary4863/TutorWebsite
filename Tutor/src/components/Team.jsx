import React from 'react';
import { motion } from 'framer-motion';

export default function Team() {
  const teamMembers = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      bio: 'Education visionary with 15+ years of experience in the tutoring industry.',
      avatar: 'RK',
      expertise: 'Leadership',
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Academics',
      bio: 'PhD in Education with expertise in curriculum development and student assessment.',
      avatar: 'PS',
      expertise: 'Academics',
    },
    {
      name: 'Amit Verma',
      role: 'Technology Director',
      bio: 'Tech innovator building scalable solutions for online learning platforms.',
      avatar: 'AV',
      expertise: 'Technology',
    },
    {
      name: 'Neha Gupta',
      role: 'Student Success Manager',
      bio: 'Passionate about helping students achieve their goals and reach their potential.',
      avatar: 'NG',
      expertise: 'Student Support',
    },
    {
      name: 'Vikram Singh',
      role: 'Tutor Recruitment Lead',
      bio: 'Recruits and mentors top tutors to ensure quality education delivery.',
      avatar: 'VS',
      expertise: 'Recruitment',
    },
    {
      name: 'Anjali Patel',
      role: 'Community Manager',
      bio: 'Builds strong relationships between students, tutors, and the TutorConnect community.',
      avatar: 'AP',
      expertise: 'Community',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Meet Our Team
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Dedicated professionals committed to transforming education through innovation and excellence
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative"
          >
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full border border-gray-100 hover:border-purple-300">
              {/* Header with gradient */}
              <div className="h-20 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 group-hover:from-purple-600 group-hover:via-blue-600 group-hover:to-green-600 transition-all duration-300"></div>

              {/* Content */}
              <div className="p-6 -mt-10 relative">
                {/* Avatar circle */}
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center mb-4 text-white font-bold text-2xl shadow-lg mx-auto">
                  {member.avatar}
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-gray-900 text-center mb-1">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-center text-purple-600 font-semibold mb-3">
                  {member.role}
                </p>

                {/* Expertise Tag */}
                <div className="text-center mb-4">
                  <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                    {member.expertise}
                  </span>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  {member.bio}
                </p>

                {/* Social Links (future) */}
                <div className="flex justify-center gap-3 mt-4">
                  <a
                    href="#"
                    className="w-8 h-8 bg-gray-200 hover:bg-purple-500 rounded-full flex items-center justify-center transition-colors duration-300"
                    title="LinkedIn"
                  >
                    <span className="text-xs text-gray-700 hover:text-white">in</span>
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-gray-200 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors duration-300"
                    title="Twitter"
                  >
                    <span className="text-xs text-gray-700 hover:text-white">𝕏</span>
                  </a>
                </div>
              </div>

              {/* Hover effect decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
