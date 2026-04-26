import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Users as UsersIcon, Plus, Save } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { Team } from '../types';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTeamModal: React.FC<CreateTeamModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [roles, setRoles] = useState<{ role: string }[]>([{ role: 'Lead Developer' }]);

  if (!isOpen) return null;

  const handleAddRole = () => setRoles([...roles, { role: '' }]);
  const handleRoleChange = (index: number, value: string) => {
    const newRoles = [...roles];
    newRoles[index].role = value;
    setRoles(newRoles);
  };
  const handleRemoveRole = (index: number) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!user || !name) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'teams'), {
        name,
        projectDescription,
        memberUserIds: [user.uid], // Simplified members handling
        createdAt: serverTimestamp(),
      });
      onClose();
    } catch (err) {
      console.error(err);
      alert('حدث خطأ');
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
            <UsersIcon className="w-5 h-5 text-indigo-600" />
            تأسيس فريق افتراضي
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">اسم الفريق</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="مثال: فريق النخبة التقني"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">وصف المشروع المستهدف</label>
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="ما نوع المشاريع التي سيعمل عليها الفريق؟"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">الأدوار المطلوبة في الفريق</label>
            {roles.map((r, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={r.role}
                  onChange={(e) => handleRoleChange(i, e.target.value)}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="مثال: مصمم UI/UX"
                />
                {roles.length > 1 && (
                  <button onClick={() => handleRemoveRole(i)} className="text-red-500 hover:bg-red-50 p-2 rounded-xl">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button onClick={handleAddRole} className="text-indigo-600 font-bold text-sm flex items-center gap-1 mt-2 hover:bg-indigo-50 px-3 py-1 rounded-lg transition-colors">
              <Plus className="w-4 h-4" /> إضافة دور آخر
            </button>
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
            disabled={loading || !name}
            className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? 'جاري الحفظ...' : <><Save className="w-4 h-4" /> تأسيس الفريق</>}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
