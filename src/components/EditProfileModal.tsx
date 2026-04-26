import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Save, User as UserIcon } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Profile, ExperienceLevel } from '../types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile | null;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, profile }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || user?.displayName || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    skills: profile?.skills?.join(', ') || '',
    experienceLevel: profile?.experienceLevel || 'mid',
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user || !profile) return;
    setLoading(true);
    try {
      const skillsArray = formData.skills.split(',').map((s) => s.trim()).filter(Boolean);
      await updateDoc(doc(db, 'profiles', user.uid), {
        name: formData.name,
        bio: formData.bio,
        location: formData.location,
        skills: skillsArray,
        experienceLevel: formData.experienceLevel,
      });
      onClose();
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء حفظ البيانات');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden"
        dir="rtl"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
            <UserIcon className="w-5 h-5 text-indigo-600" />
            تعديل الملف الشخصي
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">الاسم الكامل</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">النبذة التعريفية</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="اكتب نبذة عنك..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">المدينةالمنطقة</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="مثال: صنعاء، اليمن"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">المهارات (مفصولة بفاصلة)</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="React, Node.js, UI/UX"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">مستوى الخبرة</label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="junior">مبتدئ (Junior)</option>
              <option value="mid">متوسط (Mid-level)</option>
              <option value="senior">خبير (Senior)</option>
              <option value="expert">مستشار (Expert)</option>
            </select>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors"
          >
            إلغاء
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? 'جاري الحفظ...' : <><Save className="w-4 h-4" /> حفظ التعديلات</>}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
