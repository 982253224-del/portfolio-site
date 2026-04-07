import React from 'react';
import { ArrowRight, Mail, MapPin, Briefcase } from 'lucide-react';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

const HeroSection: React.FC = () => {
  return (
    <section data-cmp="HeroSection" className="w-full min-h-[90vh] flex items-center py-20 relative overflow-hidden bg-background">
      {/* Modern Aurora / Glow Background instead of grid */}
      <div className="absolute top-0 inset-x-0 h-full overflow-hidden opacity-40 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] mix-blend-multiply" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-[rgba(67,56,202,0.2)] blur-[150px] mix-blend-multiply" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-primary/10 blur-[100px] mix-blend-multiply" />
      </div>
      
      <div className="max-w-[1440px] mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-[55%] flex flex-col items-start text-left">
            <div className="inline-flex items-center rounded-full border border-primary/20 px-4 py-1.5 text-sm font-semibold mb-8 text-primary bg-primary/5 backdrop-blur-md shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              <EditableText
                storageKey="hero.badge"
                fallback="Open to new branding leadership roles"
                className="bg-transparent"
              />
            </div>
            
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black tracking-tight text-foreground leading-[1.15] mb-6">
              <EditableText storageKey="hero.titleLine1" fallback="将硬核科技，" className="bg-transparent" />
              <br />
              <EditableText storageKey="hero.titleLine2Prefix" fallback="转化为清晰的" className="bg-transparent" />
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">品牌心智</span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-primary/10 -z-10 rounded-full"></span>
              </span>。
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed font-medium">
              <EditableText
                storageKey="hero.intro"
                fallback="您好，我是林镕（Linrong）。拥有8年资深科技行业品牌公关经验。从0到1搭建品牌认知，策划出圈传播事件，帮助硬核科技企业在喧嚣的市场中建立清晰、权威的发声阵地。"
                className="bg-transparent"
                multiline
              />
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="#projects" className="inline-flex h-12 md:h-14 items-center justify-center rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-custom hover:bg-primary/90 transition-all gap-2">
                查看代表项目 <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#contact" className="inline-flex h-12 md:h-14 items-center justify-center rounded-xl border border-border bg-background/50 backdrop-blur-md px-8 text-base font-semibold text-foreground hover:bg-muted transition-all gap-2">
                联系我 <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Right Floating Profile Card - Smaller & Refined */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end py-10 relative">
            <div className="relative w-full max-w-[360px] bg-card/80 backdrop-blur-xl border border-border/60 rounded-[2rem] p-8 shadow-2xl flex flex-col items-center group transform transition-transform duration-500 hover:-translate-y-2">
              
              {/* Photo Area - Circular & Neat */}
              <div className="relative w-32 h-32 mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-indigo-500 animate-spin-slow blur-xl opacity-40 group-hover:opacity-60 transition-opacity" style={{ animationDuration: '8s' }}></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-inner">
                  {/* User can replace this with their actual portrait */}
                <EditableImage
                  storageKey="hero.portrait"
                  fallbackSrc="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400&h=400"
                  alt="林镕 Linrong"
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500"
                />
                </div>
              </div>

              {/* Name & Title */}
            <h3 className="text-2xl font-bold text-foreground mb-1">
              <EditableText storageKey="hero.name" fallback="林镕 Linrong" className="bg-transparent" />
            </h3>
            <p className="text-primary font-medium text-sm mb-6 uppercase tracking-wider">
              <EditableText storageKey="hero.title" fallback="品牌公关 / Brand PR" className="bg-transparent" />
            </p>
              
              {/* Mini Details */}
              <div className="w-full space-y-3 mb-6 bg-muted/40 p-4 rounded-2xl border border-border/50">
                <div className="flex items-center text-sm text-muted-foreground font-medium">
                  <Briefcase className="w-4 h-4 mr-3 text-primary/70" />
                  <EditableText storageKey="hero.meta1" fallback="8 Years in Tech PR" className="bg-transparent" />
                </div>
                <div className="flex items-center text-sm text-muted-foreground font-medium">
                  <MapPin className="w-4 h-4 mr-3 text-primary/70" />
                  <EditableText storageKey="hero.meta2" fallback="Beijing / Shanghai" className="bg-transparent" />
                </div>
              </div>

              {/* Floating Elements corresponding to skills */}
              <div className="absolute -top-6 -right-6 bg-background border border-border shadow-lg rounded-full px-4 py-2 text-xs font-bold text-foreground flex items-center gap-2 animate-bounce" style={{ animationDuration: '3s' }}>
                🎙️ Media Relations
              </div>
              <div className="absolute -bottom-4 -left-8 bg-background border border-border shadow-lg rounded-full px-4 py-2 text-xs font-bold text-foreground flex items-center gap-2 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                ✍️ Content Strategy
              </div>
              <div className="absolute top-1/2 -right-10 bg-background border border-border shadow-lg rounded-full px-4 py-2 text-xs font-bold text-foreground flex items-center gap-2 animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }}>
                🚨 Tech Mgt.
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;