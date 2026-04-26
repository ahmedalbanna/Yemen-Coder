import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './lib/AuthContext';
import { ArrowRight, Briefcase, Building, MapPin, DollarSign, Calendar, ShieldCheck, CheckCircle, Bookmark } from 'lucide-react';
import { Job } from './types';

// Using the same mock data for now, ideally fetched from Firestore
const matchedJobs: Job[] = [
  {
    id: '1',
    title: 'Senior React Developer for FinTech Dashboard',
    description: 'Looking for an experienced React developer to build a modern financial dashboard. Must have experience with Recharts and Tailwind.\n\nResponsibilities:\n- Build reusable components.\n- Integrate with REST APIs.\n- Ensure high performance and security.\n\nThis is a long-term contract with potential for permanent placement.',
    budget: 3500,
    currency: 'USD',
    companyName: 'GlobalPay Inc.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Recharts'],
    postedAt: Date.now() - 86400000,
    clientId: 'c1',
    requiredExperienceLevel: 'senior',
    isVettedClient: true,
    status: 'open'
  },
  {
    id: '2',
    title: 'Mobile App for Logistics (Team Project)',
    description: 'A large scale app requiring a team of 3: Lead Flutter, UI/UX, and Backend Expert.\n\nProject Scope:\n- Driver tracking functionality.\n- Real-time notifications.\n- Admin dashboard integration.\n\nPlease apply as a pre-formed team or individually specifying your role.',
    budget: 8000,
    currency: 'USD',
    companyName: 'MoveLogix Global',
    tags: ['Flutter', 'Node.js', 'Teamwork', 'MongoDB'],
    postedAt: Date.now() - 43200000,
    clientId: 'c2',
    requiredExperienceLevel: 'mid',
    isVettedClient: true,
    teamRequired: true,
    status: 'open'
  }
];

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const job = matchedJobs.find(j => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans" dir="rtl">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">المشروع غير موجود</h2>
          <button onClick={() => navigate('/dashboard')} className="text-indigo-600 font-bold hover:underline">العودة للوحة التحكم</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-indigo-100" dir="rtl">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2 text-gray-600 font-bold">
            <ArrowRight className="w-5 h-5" /> عودة
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12 border-b border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <h1 className="text-3xl font-black text-gray-900 leading-tight">{job.title}</h1>
                  {job.isVettedClient && (
                    <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-black uppercase border border-blue-100">
                      <ShieldCheck className="w-4 h-4" /> عميل موثق
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-6 text-gray-500 font-medium text-sm flex-wrap">
                  <span className="flex items-center gap-2"><Building className="w-4 h-4" /> {job.companyName}</span>
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(job.postedAt).toLocaleDateString('ar-YE')}</span>
                </div>
              </div>

              <div className="bg-green-50 text-green-700 px-6 py-4 rounded-2xl border border-green-100 text-center min-w-[150px]">
                <span className="block text-sm font-bold opacity-80 mb-1">الميزانية</span>
                <span className="text-3xl font-black">${job.budget}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 md:flex-none px-8 py-3 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" /> تقديم الآن
              </button>
              <button className="px-6 py-3 border-2 border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-200 font-black rounded-xl transition-all flex items-center justify-center gap-2">
                <Bookmark className="w-5 h-5" /> حفظ
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-gray-100">
            <div className="md:col-span-2 p-8 md:p-12">
              <h2 className="text-xl font-black text-gray-900 mb-6">وصف المشروع</h2>
              <div className="prose prose-indigo text-gray-600 leading-relaxed max-w-none whitespace-pre-wrap">
                {job.description}
              </div>

              <h2 className="text-xl font-black text-gray-900 mt-12 mb-6">المهارات المطلوبة</h2>
              <div className="flex flex-wrap gap-2">
                {job.tags.map(tag => (
                  <span key={tag} className="bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 md:p-12 bg-gray-50/50">
              <h3 className="text-lg font-black text-gray-900 mb-6">تفاصيل إضافية</h3>
              <ul className="space-y-6">
                <li>
                  <span className="block text-sm text-gray-500 mb-1 font-medium">مستوى الخبرة المطلوبة</span>
                  <span className="font-bold text-gray-900 capitalize">
                    {job.requiredExperienceLevel === 'expert' ? 'مستشار' : job.requiredExperienceLevel === 'senior' ? 'خبير' : job.requiredExperienceLevel === 'mid' ? 'متوسط' : 'مبتدئ'}
                  </span>
                </li>
                <li>
                  <span className="block text-sm text-gray-500 mb-1 font-medium">نوع المشروع</span>
                  <span className="font-bold text-gray-900">{job.teamRequired ? 'مشروع جماعي (يتطلب فريق)' : 'مشروع فردي'}</span>
                </li>
                <li>
                  <span className="block text-sm text-gray-500 mb-1 font-medium">حالة المشروع</span>
                  <span className="font-bold text-gray-900">{job.status === 'open' ? 'مفتوح للتقديم' : 'مغلق'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
