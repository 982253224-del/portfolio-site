import React from 'react';
import { TrendingUp, Presentation, Users, PenTool, Lightbulb, GraduationCap } from 'lucide-react';
import SkillCard from './SkillCard';
import EditableText from './EditableText';

const SkillsSection: React.FC = () => {
  const skills = [
    {
      id: "strategy",
      title: "品牌战略规划",
      description: "从企业愿景出发，制定年度PR传播策略、品牌定位及关键信息矩阵（Message House）。",
      icon: Lightbulb,
      linkTo: "/competencies?section=strategy"
    },
    {
      id: "media",
      title: "媒体关系网络",
      description: "掌握科技垂直、商业财经及大众主流媒体资源，建立KOL/KOC长期合作阵地。",
      icon: Users,
      linkTo: "/competencies?section=media"
    },
    {
      id: "marketing",
      title: "整合营销传播",
      description: "主导新品发布会、行业峰会传播，统筹线上线下跨界营销活动，打造爆款案例。",
      icon: Presentation,
      linkTo: "/competencies?section=marketing"
    },
    {
      id: "academic",
      title: "学术传播与高端会议推广",
      description: "高端学术论坛策展与品牌宣发，统筹会务落地与现场媒体采访，放大科研影响力与传播声量。",
      icon: GraduationCap,
      linkTo: "/competencies?section=academic"
    },
    {
      id: "content",
      title: "深度内容营销",
      description: "产出高质量行业白皮书、创始人署名文章、深度专访稿件，建立思想领导力。",
      icon: PenTool,
      linkTo: "/competencies?section=content"
    },
    {
      id: "growth",
      title: "业务增长赋能",
      description: "将品牌声量转化为业务线索，实现PR与Marketing的品效协同。",
      icon: TrendingUp,
      linkTo: "/competencies?section=growth"
    }
  ];

  return (
    <section data-cmp="SkillsSection" id="skills" className="w-full py-24 relative overflow-hidden bg-background">
      {/* Background glow enhancements for depth */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(136,72,249,0.035)_0,transparent_100%)] pointer-events-none -translate-y-1/4 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(136,72,249,0.04)_0,transparent_100%)] pointer-events-none translate-y-1/4 -translate-x-1/4"></div>
      
      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="mb-20 text-center max-w-2xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center rounded-md bg-muted px-2.5 py-0.5 text-sm font-semibold mb-6 text-primary border border-primary/10">
            <EditableText storageKey="skills.kicker" fallback="CORE COMPETENCIES" className="bg-transparent" />
          </div>
          <h2 className="text-4xl font-bold mb-6 text-foreground tracking-tight">
            <EditableText storageKey="skills.title" fallback="核心竞争力" className="bg-transparent" />
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            <EditableText
              storageKey="skills.subtitle"
              fallback="构建全维度的品牌护城河，让每一次发声都有回响。点击下方各板块卡片，查阅详情解读。"
              className="bg-transparent"
              multiline
            />
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={skill.id ?? index} {...skill} storageId={skill.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;