import React from 'react';
import {
  User,
  GraduationCap,
  Calendar,
  School,
  MapPin,
  Mail,
  Linkedin,
  Github
} from 'lucide-react';

const DeveloperCorner = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div
        className="
          w-full max-w-4xl
          bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b]
          text-[#66FF99]
          rounded-3xl shadow-2xl p-8 md:p-12
        "
      >
        <h1 className="text-4xl font-extrabold text-center mb-10 text-[#66FF99] tracking-wide">
          Developer Corner
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[17px] font-medium">
          <div className="flex items-start gap-3">
            <User className="text-[#66FF99]" size={22} />
            <p>
              <span className="font-semibold text-[#66FF99]">Name:</span>{' '}
              <span className="text-white">Hemant Porwal</span>
            </p>
          </div>

          <div className="flex items-start gap-3">
            <GraduationCap className="text-[#66FF99]" size={22} />
            <p>
              <span className="font-semibold text-[#66FF99]">College:</span>{' '}
              <span className="text-white">
                Indian Institute of Information Technology Guwahati
              </span>
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="text-[#66FF99]" size={22} />
            <p>
              <span className="font-semibold text-[#66FF99]">Batch:</span>{' '}
              <span className="text-white">2026</span>
            </p>
          </div>

          <div className="flex items-start gap-3">
            <School className="text-[#66FF99]" size={22} />
            <p>
              <span className="font-semibold text-[#66FF99]">Branch:</span>{' '}
              <span className="text-white">
                Electronics and Communication Engineering (ECE)
              </span>
            </p>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="text-[#66FF99]" size={22} />
            <p>
              <span className="font-semibold text-[#66FF99]">Location:</span>{' '}
              <span className="text-white">India</span>
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="text-[#66FF99]" size={22} />
            <p>
              <span className="font-semibold text-[#66FF99]">Email:</span>{' '}
              <a
                href="mailto:hemantporwal2k3@gmail.com"
                className="underline text-white hover:text-[#66FF99] transition"
              >
                hemantporwal2k3@gmail.com
              </a>
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Linkedin className="text-[#66FF99]" size={22} />
            <p>
              <span className="font-semibold text-[#66FF99]">LinkedIn:</span>{' '}
              <a
                href="https://www.linkedin.com/in/hemant-porwal-462b1b258/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-white hover:text-[#66FF99] transition"
              >
                linkedin.com/in/hemant-porwal
              </a>
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Github className="text-[#66FF99]" size={22} />
            <p>
              <span className="font-semibold text-[#66FF99]">GitHub:</span>{' '}
              <a
                href="https://github.com/hemant-porwal"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-white hover:text-[#66FF99] transition"
              >
                github.com/hemant-porwal
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperCorner;
