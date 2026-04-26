import React from 'react';
import { Star, ShieldCheck, PlayCircle, MapPin, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';

interface DeveloperCardProps {
  name: string;
  role: string;
  bio: string;
  location: string;
  skills: string[];
  isVouched: boolean;
  rating: number;
  avatar: string;
}

export const DeveloperCard: React.FC<DeveloperCardProps> = ({ 
  name, role, bio, location, skills, isVouched, rating, avatar 
}) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <img src={avatar} alt={name} className="w-16 h-16 rounded-2xl object-cover" />
          <div>
            <h4 className="font-bold text-gray-900 text-lg">{name}</h4>
            <div className="flex items-center gap-1 text-indigo-600 font-semibold text-sm">
              <Briefcase className="w-3 h-3" />
              {role}
            </div>
          </div>
        </div>
        {isVouched && (
          <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            موثوق
          </div>
        )}
      </div>

      <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
        {bio}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {skills.slice(0, 3).map((skill, i) => (
          <span key={i} className="px-3 py-1 bg-gray-50 text-gray-500 rounded-lg text-xs font-medium">
            {skill}
          </span>
        ))}
        {skills.length > 3 && <span className="text-xs text-gray-400 self-center">+{skills.length - 3}</span>}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-400">{location}</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors">
            <PlayCircle className="w-5 h-5" />
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors">
            عرض الملف
          </button>
        </div>
      </div>
    </motion.div>
  );
};
