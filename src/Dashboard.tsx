import React, { useState } from 'react';
import { useAuth } from './lib/AuthContext';
import { ShieldCheck, Trophy, Briefcase, Star, Search, Filter, LogOut, CheckCircle, Clock, Zap, Target, Users as UsersIcon, BookOpen, MessageSquare, Mic, ArrowRight } from 'lucide-react';
import { signOut } from './lib/firebase';
import { Job, Profile, Challenge } from './types';
import { motion, AnimatePresence } from 'motion/react';

// Mock data for matched jobs (Smart Matching)
const matchedJobs: Job[] = [
  {
    id: '1',
    title: 'Senior React Developer for FinTech Dashboard',
    description: 'Looking for an experienced React developer to build a modern financial dashboard. Must have experience with Recharts and Tailwind.',
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
    description: 'A large scale app requiring a team of 3: Lead Flutter, UI/UX, and Backend Expert.',
    budget: 8000,
    currency: 'USD',
    companyName: 'MoveLogix Global',
    tags: ['Flutter', 'Node.js', 'Teamwork'],
    postedAt: Date.now() - 43200000,
    clientId: 'c2',
    requiredExperienceLevel: 'mid',
    isVettedClient: true,
    teamRequired: true,
    status: 'open'
  }
];

const academyChallenges: Challenge[] = [
  {
    id: 'ch1',
    title: 'تحدي واجهة المستخدم 2G',
    description: 'صمم واجهة تسوق ذكية تعمل بكفاءة على شبكات الجيل الثاني (أقل من 50 كيلو بايت).',
    pointsReward: 500,
    difficulty: 'medium',
    type: 'design',
    deadline: Date.now() + 172800000
  },
  {
    id: 'ch2',
    title: 'تحسين كود Dart للبطارية',
    description: 'قم بتحليل وتحسين هذا الكود لتقليل استهلاك البطارية في أجهزة الأندرويد القديمة.',
    pointsReward: 800,
    difficulty: 'hard',
    type: 'code',
    deadline: Date.now() + 86400000
  }
];

export default function Dashboard() {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'matching' | 'academy' | 'teams'>('matching');

  const points = profile?.points || 1250;
  const badges = profile?.badges || ['أول مشروع', 'سريع الاستجابة'];
  const experienceLevel = profile?.experienceLevel || 'mid';

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-indigo-900 font-bold">يرجى تسجيل الدخول</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-indigo-100" dir="rtl">
      {/* Dashboard Nav */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">Y</div>
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-gray-900 leading-none mb-1">يمن كودر</h1>
            <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest leading-none">Workspace</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar py-2">
          {[
            { id: 'matching', label: 'المطابقة الذكية', icon: <Target className="w-4 h-4" /> },
            { id: 'academy', label: 'الأكاديمية', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'teams', label: 'الفرق الافتراضية', icon: <UsersIcon className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all shrink-0 ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-xl text-indigo-700 font-bold border border-indigo-100">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span>{points} نقطة</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={signOut} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 w-full flex-grow grid lg:grid-cols-12 gap-8">
        
        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          {/* User Widget */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="relative mb-6">
                <img 
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
                  alt={user.displayName || ""} 
                  className="w-24 h-24 rounded-[2rem] border-4 border-white shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {profile?.role === 'sponsor' && (
                  <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                )}
              </div>
              <h2 className="text-xl font-black text-gray-900 mb-1">{user.displayName}</h2>
              <p className="text-sm font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full mb-6">
                {profile?.role === 'sponsor' ? 'كفيل رقمي - خبير' : profile?.role === 'client' ? 'عميل دولي' : 'كودر يمني'}
              </p>
              
              <div className="w-full space-y-4">
                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <span>مستوى التقدم</span>
                  <span className="text-indigo-600">65%</span>
                </div>
                <div className="w-full bg-gray-50 rounded-full h-2 overflow-hidden border border-gray-100">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    className="bg-indigo-600 h-full rounded-full shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full mt-8">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-2xl font-black text-gray-900">12</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">مشروع</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-2xl font-black text-gray-900">$850</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">أرباح</p>
                </div>
              </div>
            </div>
          </div>

          {/* Gamification Badges */}
          <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white">
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
              <Zap className="text-yellow-400 w-5 h-5" /> أوسمة الإنجاز
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Star className="w-5 h-5 text-indigo-400 fill-indigo-400" />
                  </div>
                  <span className="text-[10px] font-bold text-center opacity-80">{badge}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
              مشاهدة المتجر <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9">
          <AnimatePresence mode="wait">
            {activeTab === 'matching' && (
              <motion.div 
                key="matching"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">محرك المطابقة الذكي</h2>
                    <p className="text-gray-500 font-medium">مشاريع منقحة حسب مهاراتك ونظام "الكفالة الرقمية".</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <input type="text" placeholder="بحث مخصص..." className="bg-white border border-gray-100 rounded-2xl px-6 py-3 pl-12 focus:outline-none focus:ring-4 focus:ring-indigo-50 shadow-sm w-full md:w-64" />
                      <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-6">
                  {matchedJobs.map(job => (
                    <motion.div 
                      whileHover={{ scale: 1.01 }}
                      key={job.id} 
                      className={`group p-8 rounded-[2.5rem] border transition-all duration-500 relative bg-white ${job.teamRequired ? 'border-purple-100 hover:border-purple-300' : 'border-indigo-50 hover:border-indigo-200'}`}
                    >
                      <div className="absolute top-8 left-8 flex flex-col items-end gap-3 z-10">
                        <div className="bg-green-50 text-green-600 px-5 py-2 text-xl font-black rounded-2xl border border-green-100 shadow-sm">
                          ${job.budget}
                        </div>
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">
                          {new Date(job.postedAt).toLocaleDateString('ar-YE')}
                        </span>
                      </div>

                      <div className="flex gap-8 items-start">
                        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-lg ${job.teamRequired ? 'bg-purple-600 text-white' : 'bg-indigo-600 text-white'}`}>
                          {job.teamRequired ? <UsersIcon className="w-10 h-10" /> : <Briefcase className="w-10 h-10" />}
                        </div>
                        
                        <div className="flex-1 pr-4">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-2xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight">{job.title}</h3>
                            {job.isVettedClient && (
                              <div className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase border border-blue-100">
                                <ShieldCheck className="w-3 h-3" /> موثق دولياً
                              </div>
                            )}
                            {job.teamRequired && (
                              <div className="flex items-center gap-1.5 bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-[10px] font-black uppercase border border-purple-100">
                                <UsersIcon className="w-3 h-3" /> مشروع جماعي
                              </div>
                            )}
                          </div>
                          
                          <p className="text-gray-500 font-bold text-sm mb-4">{job.companyName}</p>
                          <p className="text-gray-600 font-medium leading-relaxed mb-8 max-w-2xl">{job.description}</p>
                          
                          <div className="flex flex-wrap gap-3">
                            {job.tags.map(tag => (
                              <span key={tag} className="bg-gray-50 text-gray-500 px-4 py-1.5 rounded-xl text-xs font-black border border-gray-100">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="mt-8 flex gap-4">
                            <button className="px-8 py-3 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
                              تقديم العرض الآن
                            </button>
                            <button className="px-6 py-3 border-2 border-gray-100 text-gray-400 hover:text-indigo-600 hover:border-indigo-100 font-black rounded-2xl transition-all">
                              حفظ للمراجعة
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'academy' && (
              <motion.div 
                key="academy"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-12"
              >
                <div className="bg-indigo-600 p-12 rounded-[3.5rem] text-white relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative z-10 max-w-2xl">
                    <h2 className="text-4xl font-black mb-6 leading-tight">أكاديمية يمن كودر: <br />طور مهاراتك من كبار الخبراء</h2>
                    <p className="text-xl font-medium opacity-80 mb-10 leading-relaxed">تحديات برمجية أسبوعية، مراجعة كود مجانية، ولقاءات صوتية مع رواد التقنية في المهجر.</p>
                    <div className="flex gap-4">
                      <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black shadow-xl hover:-translate-y-1 transition-all">ابدأ التعلم الآن</button>
                      <button className="bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black border border-indigo-400/50 hover:bg-indigo-400 transition-all">خريطة الطريق</button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                    <Zap className="text-indigo-600 w-6 h-6" /> تحديات هذا الأسبوع
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    {academyChallenges.map(challenge => (
                      <div key={challenge.id} className="bg-white border-2 border-gray-50 p-8 rounded-[2.5rem] hover:border-indigo-100 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${challenge.difficulty === 'hard' ? 'bg-red-500' : 'bg-indigo-500'}`}>
                            {challenge.type === 'code' ? 'JS' : 'UI'}
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">{challenge.difficulty}</span>
                            <p className="text-2xl font-black text-gray-900">{challenge.pointsReward} XP</p>
                          </div>
                        </div>
                        <h4 className="text-xl font-black text-gray-900 mb-4 group-hover:text-indigo-600">{challenge.title}</h4>
                        <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8">{challenge.description}</p>
                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                          <span className="text-xs font-bold text-gray-400">ينتهي خلال: 24 ساعة</span>
                          <button className="flex items-center gap-2 text-indigo-600 font-black hover:gap-4 transition-all">
                            دخول التحدي <ArrowRight className="w-4 h-4 ml-2" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'teams' && (
              <motion.div 
                key="teams"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="text-center py-20 bg-gray-50 rounded-[3.5rem] border border-dashed border-gray-200">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                    <UsersIcon className="w-10 h-10 text-indigo-600" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-4">الفرق الافتراضية</h2>
                  <p className="text-gray-500 font-medium max-w-md mx-auto mb-10 leading-relaxed">
                    هذا القسم مخصص للتعاون في المشاريع الضخمة. ابحث عن فريق للانضمام إليه أو أسس فريقك لتنفيذ مشروع عملاق.
                  </p>
                  <button className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:scale-105 transition-all">
                    تأسيس فريق جديد
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
}

