import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

const SLIDES = [
  {
    type: "title",
    title: "2026 高雄出發：清明連假「南北雙棲」深度遊",
    content: "四天三夜，從高雄出發，一次玩遍台南花季、府城文化、屏東海鮮與墾丁秘境。精打細算的預算規劃，人均不到萬元的深度體驗。"
  },
  {
    type: "timeline",
    title: "行程總覽",
    days: [
      { date: "4/3 (五)", name: "台南花季", desc: "白河木棉花道、後壁雅聞森林、新化老街" },
      { date: "4/4 (六)", name: "府城時光", desc: "奇美博物館、十鼓文創園區、國華街美食" },
      { date: "4/5 (日)", name: "屏東海味", desc: "東港華僑市場、海生館、墾丁大街" },
      { date: "4/6 (一)", name: "南境秘境", desc: "龍磐草原、水蛙窟、返回高雄" }
    ]
  },
  {
    type: "day",
    title: "第一天：台南花季",
    sections: [
      { subtitle: "路線規劃", text: "高雄出發，沿路欣賞白河木棉花道的壯麗花海，前往後壁雅聞森林感受春日氛圍，最後漫步新化老街品嚐在地小吃。" },
      { subtitle: "住宿安排", text: "當日返回高雄住宿，為隔天府城之旅養精蓄銳，也為旅程省下一晚住宿費用。" }
    ]
  },
  {
    type: "day-cards",
    title: "第二天：府城時光",
    cards: [
      { name: "奇美博物館", text: "歐式建築與豐富藝術收藏，拍照打卡必去" },
      { name: "十鼓文創園區", text: "舊糖廠改造的文創空間，體驗鼓樂文化" },
      { name: "國華街美食", text: "台南小吃天堂，牛肉湯、碗粿、鱔魚意麵" }
    ],
    footer: "入住台南市區民宿，體驗府城夜生活與清晨慢活。"
  },
  {
    type: "day-list",
    title: "第三天：屏東海味",
    items: [
      { time: "上午", name: "東港華僑市場", desc: "品嚐當季黑鮪魚，感受漁港市場的熱鬧氛圍。" },
      { time: "下午", name: "海生館", desc: "亞洲最大水族館之一，探索海洋生物的奧秘。" },
      { time: "晚上", name: "墾丁大街", desc: "熱鬧的夜市與美食，為旅程增添活力。" }
    ],
    footer: "入住恆春或墾丁飯店，享受海風吹拂的夜晚。"
  },
  {
    type: "day",
    title: "第四天：南境秘境",
    sections: [
      { subtitle: "龍磐草原", text: "太平洋畔的草原高地，俯瞰壯麗海岸線" },
      { subtitle: "水蛙窟", text: "Windows桌布取景地，宛如仙境的瀑布秘境" },
      { subtitle: "返回高雄", text: "沿著海岸公路，帶著美好回憶返家" }
    ]
  },
  {
    type: "budget",
    title: "預算規劃",
    items: [
      { amount: "$8K", name: "住宿 (2晚)", desc: "4/3 回家睡省一晚，4/4-4/5 出外體驗" },
      { amount: "$2.5K", name: "交通 (油錢)", desc: "自備車輛，僅需油錢與停車費" },
      { amount: "$7K", name: "餐飲 (4天)", desc: "包含東港黑鮪魚、台南牛肉湯、波波廚房" },
      { amount: "$3K", name: "門票活動", desc: "海生館、奇美博物館、十鼓園區" }
    ]
  },
  {
    type: "summary",
    title: "總預算與節省攻略",
    stats: [
      { amount: "$20.5K", label: "總預算", desc: "四天三夜完整旅程" },
      { amount: "$10.25K", label: "人均費用", desc: "兩人同行更划算" }
    ],
    tips: [
      "4/3 當日返回高雄住宿，省下一晚房費",
      "自備車輛減少交通成本",
      "精選必去景點，避免浪費門票",
      "品嚐在地美食而非高價餐廳"
    ],
    footer: "比非高雄出發的遊客省近萬元，精打細算的深度旅行首選！"
  }
];

export default function SlideViewer() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    setCurrentSlide(Math.round(scrollLeft / clientWidth));
  };

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: index * scrollRef.current.clientWidth,
      behavior: "smooth"
    });
  };

  const next = () => {
    if (currentSlide < SLIDES.length - 1) scrollTo(currentSlide + 1);
  };

  const prev = () => {
    if (currentSlide > 0) scrollTo(currentSlide - 1);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#1d1d1f] relative group">
      {/* Scroll View */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {SLIDES.map((slide, i) => (
          <div key={i} className="min-w-full w-full h-full p-6 md:p-10 snap-center flex flex-col justify-center bg-[#252528] shrink-0">
            {slide.type === "title" && (
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-[#f5f5f7] leading-tight" style={{ color: "rgba(255, 230, 150, 0.9)" }}>
                  {slide.title}
                </h2>
                <p className="text-[#a1a1a6] text-lg leading-relaxed">
                  {slide.content}
                </p>
              </div>
            )}

            {(slide.type === "timeline" || slide.type === "budget") && (
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-semibold mb-8" style={{ color: "rgba(255, 230, 150, 0.9)" }}>{slide.title}</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {slide.type === "timeline" && slide.days?.map((d, idx) => (
                    <div key={idx} className="flex flex-col border-t border-[#444] pt-4">
                      <div className="text-xl font-medium text-white mb-2">{d.date}</div>
                      <div className="text-md text-[#f5f5f7] mb-2">{d.name}</div>
                      <div className="text-sm text-[#86868b]">{d.desc}</div>
                    </div>
                  ))}
                  {slide.type === "budget" && slide.items?.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center">
                      <div className="text-4xl text-white font-serif mb-3">{item.amount}</div>
                      <div className="text-md text-[#f5f5f7] mb-2">{item.name}</div>
                      <div className="text-xs text-[#86868b]">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {slide.type === "day" && (
              <div className="max-w-3xl">
                <h2 className="text-2xl md:text-3xl font-semibold mb-8" style={{ color: "rgba(255, 230, 150, 0.9)" }}>{slide.title}</h2>
                <div className="flex flex-col gap-8">
                  {slide.sections?.map((sec, idx) => (
                    <div key={idx}>
                      <h4 className="text-lg text-[#f5f5f7] font-medium mb-2">{sec.subtitle}</h4>
                      <p className="text-[#a1a1a6] leading-relaxed">{sec.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {slide.type === "day-cards" && (
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-semibold mb-8" style={{ color: "rgba(255, 230, 150, 0.9)" }}>{slide.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {slide.cards?.map((card, idx) => (
                    <div key={idx} className="bg-[#333] border border-[#444] p-5 rounded-xl">
                      <h4 className="text-lg text-white mb-2">{card.name}</h4>
                      <p className="text-[#a1a1a6] text-sm leading-relaxed">{card.text}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[#f5f5f7] text-sm">{slide.footer}</p>
              </div>
            )}

            {slide.type === "day-list" && (
              <div className="w-full max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-semibold mb-8" style={{ color: "rgba(255, 230, 150, 0.9)" }}>{slide.title}</h2>
                <div className="flex flex-col gap-6 mb-8">
                  {slide.items?.map((item, idx) => (
                    <div key={idx}>
                      <span className="text-[#f5f5f7] font-medium mr-3">{item.time} : {item.name}</span>
                      <p className="text-[#a1a1a6] text-sm mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[#f5f5f7] text-sm">{slide.footer}</p>
              </div>
            )}

            {slide.type === "summary" && (
              <div className="w-full h-full flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-semibold mb-8" style={{ color: "rgba(255, 230, 150, 0.9)" }}>{slide.title}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                  <div className="flex justify-around items-center h-full gap-4">
                    {slide.stats?.map((stat, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-8 border-[#444] flex items-center justify-center mb-4 relative" style={{ borderTopColor: "rgba(255, 230, 150, 0.9)"}}>
                           <span className="text-2xl md:text-3xl font-serif text-white">{stat.amount}</span>
                        </div>
                        <h4 className="text-[#f5f5f7] font-medium mb-1">{stat.label}</h4>
                        <p className="text-[#86868b] text-xs">{stat.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="bg-[#5a502e] text-[#f5f5f7] px-4 py-2 text-sm font-medium rounded-t-md inline-flex items-center gap-2">
                       <span className="w-4 h-4 rounded-sm border border-[#fff]"></span> 節省秘訣
                    </div>
                    <div className="bg-[#413922] p-6 rounded-md rounded-tl-none">
                      <ul className="flex flex-col gap-3">
                        {slide.tips?.map((tip, idx) => (
                          <li key={idx} className="flex gap-3 text-sm text-[#d4cfc1]">
                            <span className="text-white mt-0.5">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-xs text-[#a1a1a6] mt-6">{slide.footer}</p>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-0 flex items-center px-2">
        <button 
          onClick={prev}
          disabled={currentSlide === 0}
          className="p-2 rounded-full bg-black/50 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-opacity"
        >
          <ChevronLeft size={20} />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center px-2">
        <button 
          onClick={next}
          disabled={currentSlide === SLIDES.length - 1}
          className="p-2 rounded-full bg-black/50 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-opacity"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Pagination indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {SLIDES.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => scrollTo(idx)}
            className={`h-1.5 rounded-full transition-all ${idx === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
