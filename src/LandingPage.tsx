import { motion } from "motion/react";
import { Mic, Globe, ShieldCheck, Wallet, PlayCircle, Star, Users, MessageSquare, ArrowLeft, ArrowRight, LogOut, User as UserIcon, LayoutDashboard, BookOpen, Target, CheckCircle, Briefcase } from "lucide-react";
import { useState } from "react";
import { VoiceRecorder } from "./components/VoiceRecorder";
import { DeveloperCard } from "./components/DeveloperCard";
import { useAuth } from "./lib/AuthContext";
import { signInWithGoogle, signOut } from "./lib/firebase";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 fixed top-0 w-full z-50 overflow-hidden">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">Y</div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">يمن كودر</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium font-sans">
        <a href="#features" className="hover:text-indigo-600 transition-colors">المميزات</a>
        <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">كيف يعمل</a>
        <a href="#developers" className="hover:text-indigo-600 transition-colors">المطورون</a>
      </div>
      <div className="flex items-center gap-4">
        {loading ? (
          <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse"></div>
        ) : user ? (
          <div className="flex items-center gap-4">
             <button 
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-lg flex items-center gap-2 hover:bg-indigo-100 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              لوحة التحكم
            </button>
          </div>
        ) : (
          <>
            <button 
              onClick={handleAuth}
              className="px-4 py-2 text-indigo-600 font-semibold hover:bg-indigo-50 rounded-lg transition-colors"
            >
              دخول
            </button>
            <button 
              onClick={handleAuth}
              className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
            >
              انضم إلينا
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="pt-32 pb-20 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold mb-6">
          جسر المبرمج اليمني إلى العالم
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-8">
          ابنِ مستقبلك من <span className="text-indigo-600">بيتك</span> بدخل عالمي
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mb-10">
          منصة "يمن كودر" تساعد المبرمجين والمبدعين اليمنيين على تجاوز الحواجز، عرض مهاراتهم بالصوت والصورة، واستلام مستحقاتهم بالدولار عبر بوابات دفع محلية.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all hover:-translate-y-1">
            ابدأ رحلتك الآن
            <Globe className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all">
            شاهد قصص النجاح
            <PlayCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-12 flex items-center gap-6">
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-500 font-medium">
            <span className="text-indigo-600 font-bold">+500</span> مبرمج يمني يعملون الآن مع شركات عالمية
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
          <img 
            src="https://images.unsplash.com/photo-1573164713988-821c33b6d739?auto=format&fit=crop&q=80&w=1000" 
            alt="Developer coding" 
            className="w-full aspect-[4/5] object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-lg font-bold italic line-clamp-2">"يمن كودر غيّر حياتي، استطعت الحصول على أول عقد عمل دولي لي وأنا في صنعاء."</p>
            <p className="opacity-80 mt-2">أحمد - مطور Full-stack</p>
          </div>
        </div>
        <div className="absolute -top-10 -left-10 bg-white p-6 rounded-3xl shadow-xl z-20 border border-gray-50 animate-bounce-slow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold">تم الاستلام</p>
              <p className="text-xl font-black text-gray-900">$1,200.00</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const DevelopersMarketplace = () => {
  const devs = [
    {
      name: "ليث اليافعي",
      role: "React & Node.js Developer",
      bio: "أصمم تجارب مستخدم فريدة وأبني أنظمة خلفية قوية. خبرة 4 سنوات في العمل الحر.",
      location: "عدن، اليمن",
      skills: ["React", "Express", "Firebase", "Tailwind"],
      isVouched: true,
      rating: 4.9,
      avatar: "https://i.pravatar.cc/150?u=lith"
    },
    {
      name: "أروى قاسم",
      role: "UI/UX Designer",
      bio: "متخصصة في تحويل الأفكار المعقدة إلى واجهات بسيطة وجذابة. أركز على هوية المنتج.",
      location: "صنعاء، اليمن",
      skills: ["Figma", "Adobe XD", "Branding", "CSS"],
      isVouched: true,
      rating: 5.0,
      avatar: "https://i.pravatar.cc/150?u=arwa"
    },
    {
      name: "سامي ناصر",
      role: "Mobile App Developer",
      bio: "أطور تطبيقات أيفون وأندرويد باستخدام Flutter. اهتمام عالي بالأداء وسلاسة الحركة.",
      location: "تعز، اليمن",
      skills: ["Flutter", "Dart", "Firebase", "API"],
      isVouched: false,
      rating: 4.7,
      avatar: "https://i.pravatar.cc/150?u=sami"
    }
  ];

  return (
    <section id="developers" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">اكتشف المبدعين</h2>
            <p className="text-lg text-gray-600">نخبة من أفضل المطورين والمصممين اليمنيين الجاهزين للعمل على مشاريعك.</p>
          </div>
          <button className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-4 transition-all">
            شاهد جميع المطورين
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {devs.map((dev, i) => (
            <DeveloperCard key={i} {...dev} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const list = [
    {
      title: "نظام الكفيل الرقمي",
      desc: "تحت إشراف كبار المبرمجين اليمنيين، نضمن جودة كودك ونوفر ضمانة تقنية تجذب كبار العملاء الدوليين.",
      icon: <ShieldCheck className="w-8 h-8" />,
      color: "bg-purple-600",
      badge: "Kafala System"
    },
    {
      title: "الفرق الافتراضية",
      desc: "نكون لك فريقاً متكاملاً (تصميم، برمجة، إدارة) لتنفيذ أضخم المشاريع الدولية التي كانت مستحيلة سابقاً.",
      icon: <Users className="w-8 h-8" />,
      color: "bg-blue-600",
      badge: "Virtual Teams"
    },
    {
      title: "أكاديمية يمن كودر",
      desc: "تحديات برمجية أسبوعية تعمل حتى على أضعف سرعات الإنترنت، لتطوير مهاراتك والحصول على شهادات معتمدة.",
      icon: <BookOpen className="w-8 h-8" />,
      color: "bg-indigo-600",
      badge: "Academy"
    },
    {
      title: "دفع محلي مضمون",
      desc: "استلم حقوقك فوراً بسعر صرف السوق العادل عبر 'حوِّل'. لا حاجة لـ PayPal أو تعقيدات البنوك.",
      icon: <Wallet className="w-8 h-8" />,
      color: "bg-green-600",
      badge: "Instant Payout"
    },
    {
      title: "المطابقة الذكية",
      desc: "خوارزميات تحلل صوتك ومهاراتك لترشح لك فقط المشاريع التي تناسب شغفك ومستوى خبرتك.",
      icon: <Target className="w-8 h-8" />,
      color: "bg-orange-600",
      badge: "Smart Matching"
    },
    {
      title: "بورتفوليو صوتي",
      desc: "اشرح تفكيرك الهندسي بصوتك، لتبني ثقة إنسانية فورية تتجاوز أي حواجز جغرافية.",
      icon: <Mic className="w-8 h-8" />,
      color: "bg-red-600",
      badge: "Audio Vetting"
    }
  ];

  return (
    <section id="features" className="py-24 bg-gray-50 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">حلول برمجية وطنية <br />تتجاوز الحدود</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">بنينا نظاماً متكاملاً يحل معضلات الدفع، التوثيق، والتوجيه التقني، لنحول العزلة الرقمية إلى ميزة تنافسية عالمية.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 group-hover:bg-indigo-600 transition-colors"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-6 block">{item.badge}</span>
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg ring-8 ring-indigo-50/50`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const KafalaSection = () => (
  <section className="py-24 px-6 bg-indigo-900 text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-800/50 -skew-x-12 translate-x-1/2"></div>
    <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-20 items-center">
      <div className="order-2 lg:order-1">
        <div className="inline-flex items-center gap-2 bg-indigo-800/50 px-4 py-2 rounded-full text-indigo-200 text-sm font-bold mb-8 border border-white/10">
          <ShieldCheck className="w-4 h-4" /> ضمانة القودة اليمنية
        </div>
        <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">نظام الكفيل الرقمي: <br />جسر الثقة مع العالم</h2>
        <p className="text-xl opacity-80 mb-12 leading-relaxed font-medium">
          العملاء الدوليون يحتاجون إلى ثقة. يمن كودر يوفر ذلك من خلال إشراف مبرمجين يمنيين خبراء يضمنون جودة العمل قبل تسليمه.
        </p>
        <ul className="space-y-6">
          {[
            "مراجعة الكود من خبراء (Kafala) في الداخل والخارج.",
            "وساطة قانونية تضمن استلام المدفوعات الدولية.",
            "نظام تقييم مرموق يبني سمعة المبرمج اليمني.",
            "دفع فوري عبر محفظة 'حوِّل' المحلية بالريال."
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="order-1 lg:order-2">
        <div className="relative group">
          <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
            alt="Cooperation" 
            className="rounded-[3rem] shadow-2xl relative z-10 border-4 border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700" 
          />
        </div>
      </div>
    </div>
  </section>
);

const VoiceShowcaseSection = () => (
  <section className="py-24 px-6 bg-indigo-900 text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
      <div className="order-2 md:order-1">
        <VoiceRecorder />
      </div>
      <div className="order-1 md:order-2">
        <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">جرب بنفسك: <br /><span className="text-indigo-400">سجل هويتك الصوتية</span></h2>
        <p className="text-xl text-indigo-100 leading-relaxed mb-10 opacity-90">
          في يمن كودر، نؤمن أن الثقة تبدأ من نبرة الصوت. سجل مقطعاً تشرح فيه شغفك ومشاريعك، واختبر ميزة "معرض الأعمال الصوتي" الآن.
        </p>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h5 className="font-bold text-xl mb-2 text-indigo-400">ثقة أكبر</h5>
            <p className="opacity-70 text-sm">يحل مشكلة "المجهولية" ويزيد من فرص قبول العرض بنسبة 70%.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h5 className="font-bold text-xl mb-2 text-indigo-400">هوية مميزة</h5>
            <p className="opacity-70 text-sm">تميز عن آلاف المستقلين بسيرتك الذاتية الحية والمسموعة.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section className="py-24 px-6 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">كيف يعمل يمن كودر؟</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">أربع خطوات تفصلك عن فرصتك العالمية التالية.</p>
      </div>
      <div className="grid md:grid-cols-4 gap-8 relative">
        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-100"></div>
        {[
          {
            step: "1",
            title: "سجل ملفك وصوتك",
            desc: "أنشئ حسابك، اذكر مهاراتك، وسجل مقطعاً صوتياً صغيراً تشرح فيه شغفك.",
            icon: <UserIcon className="w-6 h-6 text-indigo-600" />
          },
          {
            step: "2",
            title: "احصل على الكفالة",
            desc: "خبراء يمنيون يراجعون ملفك ويزكونك للمشاريع المناسبة لخبرتك.",
            icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />
          },
          {
            step: "3",
            title: "ابدأ العمل والتنفيذ",
            desc: "تواصل مع العميل الدولي داخل المنصة، أو عبر فرق افتراضية مع زملائك.",
            icon: <Briefcase className="w-6 h-6 text-indigo-600" />
          },
          {
            step: "4",
            title: "استلم أموالك محلياً",
            desc: "يمن كودر يتولى التحصيل الدولي ويحول مستحقاتك إلى محفظتك المحلية.",
            icon: <Wallet className="w-6 h-6 text-indigo-600" />
          }
        ].map((item, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="bg-white relative z-10 p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all text-center flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-white relative">
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-black shadow-md">{item.step}</span>
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
            <p className="text-gray-500 font-medium text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const DigitalSponsor = () => (
  <section className="py-24 px-6">
    <div className="max-w-7xl mx-auto rounded-[3rem] bg-indigo-50 p-12 md:p-20 flex flex-col md:flex-row items-center gap-16">
      <div className="md:w-1/2">
        <h2 className="text-4xl font-black text-gray-900 mb-8">نظام الكفيل الرقمي</h2>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          نحن نعلم أن "البداية" هي الأصعب. لذا قمنا بتفعيل نظام التزكية الرقمية؛ حيث يقوم خبراء مبرمجون بتقييم عملك ومنحك "شارة الثقة" التي تضمن جودتك أمام الشركات.
        </p>
        <ul className="space-y-4">
          {[
            "تقييم فني من خبراء يمنيين محترفين",
            "شارة 'موثوق' تظهر في ملفك الشخصي",
            "زيادة فرص الحصول على أول مشروع بـ 3 أضعاف"
          ].map((text, i) => (
            <li key={i} className="flex items-center gap-3 text-lg font-semibold text-gray-800">
              <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white shrink-0">
                <Star className="w-3 h-3 fill-white" />
              </div>
              {text}
            </li>
          ))}
        </ul>
      </div>
      <div className="md:w-1/2 grid grid-cols-2 gap-6 relative">
        <div className="absolute inset-0 bg-indigo-200/20 blur-3xl rounded-full"></div>
        {[
          { name: "علي هاني", role: "CTO @ Technia", img: "https://i.pravatar.cc/150?u=ali" },
          { name: "سارة خالد", role: "Lead Designer", img: "https://i.pravatar.cc/150?u=sara" },
          { name: "عمر سالم", role: "Back-end Expert", img: "https://i.pravatar.cc/150?u=omar" },
          { name: "ليلى قاسم", role: "AI Researcher", img: "https://i.pravatar.cc/150?u=leila" }
        ].map((person, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-lg relative z-10 hover:scale-105 transition-transform border border-indigo-100">
            <img src={person.img} alt={person.name} className="w-16 h-16 rounded-2xl mb-4" referrerPolicy="no-referrer" />
            <h4 className="font-bold text-gray-900">{person.name}</h4>
            <p className="text-sm text-gray-500">{person.role}</p>
            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2 text-indigo-600 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              ضامن رقمي
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white py-20 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-right">
      <div className="max-w-xs">
        <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">Y</div>
          <span className="text-2xl font-bold">يمن كودر</span>
        </div>
        <p className="opacity-60 leading-relaxed text-sm">
          نحن نبني اقتصاداً يمنياً مستداماً يعتمد على العقول المبدعة التي لا تعرف الحدود. منصة يمن كودر هي بوابتك للعالمية.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-16 font-medium">
        <div className="space-y-4">
          <h5 className="font-bold text-lg mb-6 text-indigo-400">الروابط</h5>
          <p className="opacity-60 hover:opacity-100 cursor-pointer">عن المنصة</p>
          <p className="opacity-60 hover:opacity-100 cursor-pointer">قصص المبدعين</p>
          <p className="opacity-60 hover:opacity-100 cursor-pointer">لأصحاب الشركات</p>
        </div>
        <div className="space-y-4">
          <h5 className="font-bold text-lg mb-6 text-indigo-400">تواصل معنا</h5>
          <p className="opacity-60 hover:opacity-100 cursor-pointer">support@yemancoder.com</p>
          <p className="opacity-60 hover:opacity-100 cursor-pointer">+967 7xx xxx xxx</p>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center opacity-40 text-sm">
      &copy; {new Date().getFullYear()} يمن كودر. جميع الحقوق محفوظة. صنع بكل فخر في اليمن.
    </div>
  </footer>
);

const data = [
  { name: '2021', earnings: 400, devs: 120 },
  { name: '2022', earnings: 1200, devs: 340 },
  { name: '2023', earnings: 2800, devs: 760 },
  { name: '2024', earnings: 5400, devs: 1500 },
  { name: '2025', earnings: 8900, devs: 2800 },
];

const StatsSection = () => (
  <section className="py-24 px-6 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-gray-900 mb-4">انتعاش الاقتصاد الرقمي</h2>
        <p className="text-lg text-gray-600">نحن لا نوفر فرص عمل فقط، بل نبني مستقبلاً اقتصادياً جديداً لليمن.</p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 h-[400px]">
          <h3 className="text-xl font-bold mb-6 text-gray-800">نمو عوائد المبرمجين (بالأف الدولارات)</h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="earnings" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <p className="text-4xl font-black text-indigo-600 mb-2">+2.8k</p>
              <p className="text-gray-500 font-bold">مبرمج نشط</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <p className="text-4xl font-black text-green-600 mb-2">$8.9M</p>
              <p className="text-gray-500 font-bold">إجمالي العوائد</p>
            </div>
          </div>
          <div className="bg-indigo-600 p-8 rounded-[2rem] text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <h4 className="text-2xl font-bold mb-4 relative z-10">لماذا هذا مهم؟</h4>
            <p className="opacity-90 leading-relaxed font-medium relative z-10">
              كل مبرمج يمني يعمل دولياً يساهم في إدخال العملة الصعبة، تحسين جودة التعليم الرقمي، وتقليص نسبة البطالة في أوساط الموهوبين.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-right font-sans selection:bg-indigo-100 selection:text-indigo-900" dir="rtl">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorksSection />
      <KafalaSection />
      <StatsSection />
      <DevelopersMarketplace />
      <VoiceShowcaseSection />
      <DigitalSponsor />
      <Footer />
    </div>
  );
}
