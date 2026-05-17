import { useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, ChevronDown, MoveRight, ChevronLeft, ChevronRight } from "lucide-react";
import SlideViewer from "./components/SlideViewer";

import schoolImg from "./assets/校.jpg";
import modelImg from "./assets/模型.png";
import profileImg from "./assets/profile.jpg";

const PROJECTS = [
  {
    id: "01",
    title: "連假方案",
    description: "2026 高雄出發：清明連假「南北雙棲」深度遊。",
    isPresentation: true,
    embed: "https://www.youtube.com/embed/KCzKd_m6aEg",
    link: "https://sites.google.com/nkust.edu.tw/a111182145/%E9%A6%96%E9%A0%81/%E6%B8%85%E6%98%8E%E9%80%A3%E5%81%87%E8%A1%8C%E7%A8%8B",
    tags: ["AI", "清明連假", "PPT"]
  },
  {
    id: "02",
    title: "製作個人3D公仔",
    description: "從生活照生成可愛的公仔圖片，再透過Tripo3D轉成3D模型。",
    image: modelImg,
    link: "https://studio.tripo3d.ai/3d-model/fc2a8498-f8c0-47ee-a5aa-6c6cad13fd19?invite_code=1TW3Z3",
    tags: ["AI", "3D模型", "公仔"]
  }
];

const SKILLS = [
  "ENTP-A",
  "血型O型",
  "天蠍座",
  "2006-11-18"
];

const easing = [0.16, 1, 0.3, 1];

const ProjectMediaViewer = ({ project }: { project: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (project.embed && project.isPresentation) {
    const panels = [
      { type: 'presentation' },
      { type: 'embed', content: project.embed }
    ];
    return (
      <div className="absolute inset-0 w-full h-full group/carousel">
        {/* Carousel Mask */}
        <div className="absolute inset-0 rounded-[24px] overflow-hidden border border-[#333]/50 bg-[#1d1d1f]">
          <div className="w-full h-full flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
             {panels.map((p, i) => (
               <div key={i} className="w-full h-full min-w-full shrink-0 relative">
                 {p.type === 'embed' ? (
                   <div className="w-full h-full bg-[#1d1d1f]">
                     <iframe 
                       src={p.content} 
                       title={project.title}
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                       allowFullScreen
                       className="absolute inset-0 w-full h-full border-0" 
                     ></iframe>
                   </div>
                 ) : (
                   <SlideViewer />
                 )}
               </div>
             ))}
          </div>
        </div>
        
        {/* Navigation Arrows (Outside Mask) */}
        <button 
           onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
           className={`absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#333] hover:bg-[#444] border border-[#555] text-white shadow-lg transition-all ${currentIndex > 0 ? 'opacity-100 transform hover:scale-110' : 'opacity-0 pointer-events-none'}`}
        >
           <ChevronLeft size={20} />
        </button>
        <button 
           onClick={() => setCurrentIndex(prev => Math.min(panels.length - 1, prev + 1))}
           className={`absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#333] hover:bg-[#444] border border-[#555] text-white shadow-lg transition-all ${currentIndex < panels.length - 1 ? 'opacity-100 transform hover:scale-110' : 'opacity-0 pointer-events-none'}`}
        >
           <ChevronRight size={20} />
        </button>

        {/* Indicators */}
        <div className="absolute -bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
          {panels.map((_, i) => (
             <button
               key={i}
               onClick={() => setCurrentIndex(i)}
               className={`h-1.5 rounded-full transition-all ${i === currentIndex ? 'w-6 bg-[#f5f5f7]' : 'w-1.5 bg-[#f5f5f7]/30 hover:bg-[#f5f5f7]/50'}`}
             />
          ))}
        </div>
      </div>
    );
  }

  if (project.isPresentation) return (
    <div className="absolute inset-0 w-full h-full rounded-[24px] overflow-hidden border border-[#333]/50">
      <SlideViewer />
    </div>
  );
  
  if (project.embed) {
    return (
      <iframe 
        src={project.embed} 
        title={project.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
        className="w-full h-full border border-[#333]/50 rounded-[24px] overflow-hidden" 
      ></iframe>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full rounded-[24px] overflow-hidden border border-[#333]/50">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" 
      />
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-black text-[#f5f5f7] selection:bg-white/20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none fixed">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] bg-[#1d1d1f] rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] bg-[#2c2c2e] rounded-full blur-[100px] opacity-30"></div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-xl bg-black/40 border-b border-white/[0.05]">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: easing }}
          className="text-lg font-medium tracking-tight"
        >
          林嵩恩<span className="text-white/40">.</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: easing }}
          className="flex items-center gap-6 text-sm font-medium text-[#86868b]"
        >
          <a href="#about" className="hover:text-white transition-colors duration-300">關於我</a>
          <a href="#projects" className="hover:text-white transition-colors duration-300">精選專案</a>
          <a href="#contact" className="hover:text-white transition-colors duration-300">聯絡方式</a>
        </motion.div>
      </nav>

      <section className="relative h-screen flex flex-col items-center justify-center pt-20">
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: easing }}
            className="text-6xl md:text-8xl lg:text-[110px] font-semibold tracking-tight leading-[1.1]"
          >
            專業 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#86868b]">
              數位履歷。
            </span>
          </motion.h1>
          
          <motion.img 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: easing }}
            className="mt-12 max-w-[200px] md:max-w-[300px] object-contain rounded-3xl opacity-90 shadow-2xl shadow-white/5 border border-white/10 relative z-20"
            src={schoolImg}
            alt="School Logo"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-2 text-[#86868b]"
        >
          <span className="text-xs font-medium uppercase tracking-widest">向下捲動探索</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          <div className="lg:col-span-5">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: easing }}
              className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]"
            >
              追求 <br /><span className="text-[#86868b]">卓越與完美。</span>
            </motion.h2>
          </div>
          
          <div className="lg:col-span-7 space-y-8">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: easing }}
              className="text-xl md:text-2xl font-light leading-relaxed text-[#f5f5f7]"
            >
              <span className="text-4xl md:text-5xl font-medium tracking-tight text-white mr-1 align-baseline">我</span>成長於港都高雄，自幼對航運產業充滿嚮往。就讀航海系期間，我專注於航海實務與海上安全，並透過實習確立職涯志向。
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: easing }}
              className="text-lg text-[#86868b] leading-relaxed max-w-2xl"
            >
              過去擁有身為羽球選手的背景，賦予我高度的「<span className="text-[#f5f5f7]">團隊協作能力與紀律</span>」，我深信這在商船運作中至關重要。
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: easing }}
              className="pt-8 flex flex-wrap gap-3"
            >
              {SKILLS.map((skill, index) => (
                <div key={index} className="px-4 py-2 bg-[#1d1d1f] border border-[#333] rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-[#86868b] tracking-wide">{skill}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section id="experience" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 border-t border-[#333]/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          <div className="lg:col-span-5">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: easing }}
              className="text-2xl md:text-4xl font-semibold tracking-tight text-[#f5f5f7]"
            >
              經歷
            </motion.h2>
          </div>
          
          <div className="lg:col-span-7 flex flex-col gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: easing }}
            >
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-5">去過的國家</h3>
              <ul className="flex flex-col gap-3">
                {["日本", "韓國", "泰國", "美國"].map((country, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-white text-lg md:text-xl font-medium tracking-wide">
                    <span className="text-[#86868b] text-xl">•</span>
                    {country}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: easing }}
            >
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-5">實習經歷</h3>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-4 text-white text-lg md:text-xl font-medium tracking-wide">
                  <span className="text-[#86868b] text-xl">•</span>
                  育風輪
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="education" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 border-t border-[#333]/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          <div className="lg:col-span-5">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: easing }}
              className="text-2xl md:text-4xl font-semibold tracking-tight text-[#f5f5f7]"
            >
              學歷
            </motion.h2>
          </div>
          
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: easing }}
              className="group relative overflow-hidden rounded-[24px] bg-[#1d1d1f]/50 border border-[#333]/50 p-8 md:p-10 hover:border-[#86868b]/50 transition-colors duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white mb-2">國立高雄科技大學</h3>
                  <p className="text-[#86868b]">National Kaohsiung University of Science and Technology</p>
                </div>
                <div className="inline-flex w-fit items-center px-4 py-1.5 rounded-full border border-[#444] bg-black/50 text-sm font-mono text-white tracking-wider uppercase">
                  現在
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="languages" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 border-t border-[#333]/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          <div className="lg:col-span-5">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: easing }}
              className="text-2xl md:text-4xl font-semibold tracking-tight text-[#f5f5f7]"
            >
              語言能力
            </motion.h2>
          </div>
          
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: easing }}
              className="group relative overflow-hidden rounded-[24px] bg-[#1d1d1f]/50 border border-[#333]/50 p-8 md:p-10 hover:border-[#86868b]/50 transition-colors duration-500"
            >
              <div className="flex flex-col gap-6 w-full sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col md:items-center flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white">英文</h3>
                    <span className="px-3 py-1 rounded-md border border-[#333] bg-black/50 text-xs font-mono text-[#86868b] uppercase tracking-wider">初級</span>
                  </div>
                  <p className="text-[#86868b] text-sm">TOEIC 0 分</p>
                </div>
                <div className="hidden sm:block w-[1px] h-16 bg-[#86868b]/30"></div>
                <div className="flex flex-col md:items-center flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white">台語</h3>
                    <span className="px-3 py-1 rounded-md border border-[#333] bg-black/50 text-xs font-mono text-[#86868b] uppercase tracking-wider">中級</span>
                  </div>
                  <p className="text-[#86868b] text-sm">可聽懂日常對話</p>
                </div>
                <div className="hidden sm:block w-[1px] h-16 bg-[#86868b]/30"></div>
                <div className="flex flex-col md:items-center flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white">中文</h3>
                    <span className="px-3 py-1 rounded-md border border-[#333] bg-black/50 text-xs font-mono text-[#86868b] uppercase tracking-wider">高級</span>
                  </div>
                  <p className="text-[#86868b] text-sm">可熟練與他人對話</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="certifications" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 border-t border-[#333]/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          <div className="lg:col-span-5">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: easing }}
              className="text-2xl md:text-4xl font-semibold tracking-tight text-[#f5f5f7]"
            >
              專業證照
            </motion.h2>
          </div>
          
          <div className="lg:col-span-7">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {[
                "進階滅火",
                "基本安全",
                "救生艇筏",
                "人員求生",
                "保全職責",
                "醫療急救"
              ].map((cert, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.1 + (index * 0.05), ease: easing }}
                  className="flex items-center gap-4 text-white text-lg md:text-xl font-medium tracking-wide"
                >
                  <span className="text-[#86868b] text-xl">•</span>
                  {cert}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: easing }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
            精選 <br /><span className="text-[#86868b]">專案。</span>
          </h2>
          <a href="#" className="group flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-[#86868b] hover:text-white transition-colors">
            查看完整專案庫 
            <MoveRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <div className="flex flex-col gap-8 md:gap-12">
          {PROJECTS.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: easing }}
              className="group bg-[#1d1d1f] hover:bg-[#252528] rounded-[32px] border border-[#333] p-4 md:p-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 transition-colors duration-500 overflow-hidden"
            >
              <div className="w-full lg:w-[45%] lg:order-none aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] relative">
                 <ProjectMediaViewer project={project} />
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none rounded-[24px]" />
              </div>

              <div className="w-full lg:w-[55%] flex flex-col justify-center px-4 md:px-0 lg:py-8">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-[1px] bg-[#86868b]/50"></div>
                 </div>
                 
                 <h3 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight text-[#f5f5f7]">{project.title}</h3>
                 <p className="text-[#86868b] text-base md:text-xl mb-8 leading-relaxed max-w-xl">
                   {project.description}
                 </p>

                 <div className="flex flex-wrap gap-2 mb-10">
                    {project.tags.map(tag => (
                       <span key={tag} className="text-xs font-mono text-[#a1a1a6] bg-black/40 px-3 py-1.5 rounded-md border border-[#333]/50">
                          {tag}
                       </span>
                    ))}
                 </div>

                 <div className="flex items-center gap-4">
                    <a 
                      href={project.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white text-black px-6 py-3.5 rounded-full text-xs font-bold hover:bg-gray-200 transition-colors"
                    >
                       查看專案 <ExternalLink size={14} />
                    </a>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#1d1d1f] relative z-10">
        <div className="flex flex-col pb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: easing }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter w-full mb-12 whitespace-nowrap overflow-x-auto overflow-y-hidden no-scrollbar"
          >
            讓我們共同創造 <span className="text-[#86868b]">非凡的數位體驗。</span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: easing }}
          >
            <a href="mailto:A111182145@nkust.edu.tw" className="group inline-flex items-center flex-wrap gap-4 text-xl md:text-3xl lg:text-4xl font-light hover:text-[#86868b] transition-colors duration-300">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border border-[#333] shrink-0 group-hover:border-[#86868b] transition-colors relative">
                <img src={profileImg} alt="Profile Avatar" className="w-full h-full object-cover" />
              </div>
              <span className="break-all">A111182145@nkust.edu.tw</span>
              <MoveRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform duration-300 shrink-0" />
            </a>
          </motion.div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-[#1d1d1f] text-[#86868b] text-[11px] uppercase tracking-wider">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div>
              <p className="mb-1">專業領域</p>
              <p className="text-white font-medium">航海科</p>
            </div>
            <div>
              <p className="mb-1">所在地</p>
              <p className="text-white font-medium">台灣</p>
            </div>
          </div>
          <div>© {new Date().getFullYear()} 林嵩恩 (Lin Song-En) 版權所有</div>
        </div>
      </section>
    </div>
  );
}
