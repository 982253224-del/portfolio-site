import React from 'react';
import { Orbit } from 'lucide-react';

const Header: React.FC = () => {
  console.log("Header component rendered");

  return (
    <header data-cmp="Header" className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="p-2 rounded-lg border border-primary/30 bg-gradient-to-br from-primary/20 via-indigo-400/20 to-cyan-400/20">
            <Orbit className="w-5 h-5 text-foreground" />
          </div>
          <span
            className="text-xl font-extrabold leading-none tracking-tight text-foreground"
            style={{ fontFamily: '"Avenir Next", "Nunito Sans", "Segoe UI", "Inter", sans-serif' }}
          >
            Roslyn Studio
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#about" className="hover:text-foreground transition-colors">个人简介</a>
          <a href="#skills" className="hover:text-foreground transition-colors">核心能力</a>
          <a href="#projects" className="hover:text-foreground transition-colors">代表项目</a>
          <a href="#contact" className="hover:text-foreground transition-colors">联系我</a>
        </nav>

        <a href="#contact" className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-custom hover:opacity-90 transition-opacity">
          获取简历
        </a>
      </div>
    </header>
  );
};

export default Header;