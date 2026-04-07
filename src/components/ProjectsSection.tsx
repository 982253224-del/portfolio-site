import React from 'react';
import ProjectCard from './ProjectCard';
import EditableText from './EditableText';

const ProjectsSection: React.FC = () => {
  const projects = [
    {
      id: "p1",
      title: "‘智领未来’ 全球AI大模型年度发布会",
      category: "新品发布 / 整合营销",
      description: "作为项目一号位，统筹全局策划与宣发。针对ToB客户痛点提炼核心传播信息，结合线下千人峰会与线上多平台直播，打造现象级科技圈事件。",
      metrics: ["全网直播观看 500W+", "核心媒体发稿 200+", "直接带来优质线索 300+"],
      replay:
        "复盘要点：\n- 从“ToB痛点”反推信息架构，确保发布会每个环节都服务于转化。\n- 线上线下统一主叙事与关键数字，形成可被媒体复述的内容颗粒。\n- 以赛后数据闭环（观看-互动-线索）复盘内容命中率，并沉淀可复用模板。",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800&h=600"
    },
    {
      id: "p2",
      title: "科技向善：自动驾驶无障碍出行白皮书",
      category: "ESG / CSR 传播",
      description: "联合顶尖智库与主流财经媒体发布行业首本无障碍出行技术白皮书。成功将硬核严谨的技术语言转化为充满温度的人文关怀，极大提升了品牌美誉度。",
      metrics: ["央媒点赞报道", "社交媒体讨论量 1000W+", "获年度最佳CSR案例奖"],
      replay:
        "复盘要点：\n- 以“可解释技术价值”作为叙事桥梁，降低受众理解门槛。\n- 联合权威背书，确保白皮书的可信度与可传播性。\n- 通过媒体传播节奏与话题运营，让讨论从一时热度转为持续影响。",
      imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800&h=600"
    },
    {
      id: "p3",
      title: "核心高管IP重塑与思想领导力建设",
      category: "IP打造 / 高管公关",
      description: "为其重新梳理对外人设，策划并落地一系列深度文字专访、播客对谈及行业顶级论坛Keynote演讲，半年内奠定其在行业内的意见领袖地位。",
      metrics: ["顶级科技播客专访 3场", "阅读量10w+深度文章 5篇", "舆情正面反馈提升 80%"],
      replay:
        "复盘要点：\n- 先做“观点盘点”，再从观点反推内容产品形态（稿件-播客-演讲）。\n- 统一对外口径与表达风格，降低传播偏差。\n- 用阶段性舆情与内容数据校准内容深度，持续强化思想领导力。",
      imageUrl: "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80&w=800&h=600"
    }
  ];

  return (
    <section data-cmp="ProjectsSection" id="projects" className="w-full py-28 relative overflow-hidden bg-background">
      {/* Reduced visual noise: Simple fluid background over grids */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-[radial-gradient(ellipse_at_center,rgba(241,228,251,0.4)_0,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(136,72,249,0.05)_0,transparent_70%)] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10 w-full">
        <div className="mb-20 text-center max-w-2xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center rounded-sm bg-muted px-2.5 py-1 text-sm font-bold mb-6 text-primary border border-primary/10 tracking-widest">
            <EditableText storageKey="projects.kicker" fallback="SELECTED ACCOMPLISHMENTS" className="bg-transparent" />
          </div>
          <h2 className="text-4xl font-bold mb-6 text-foreground tracking-tight">
            <EditableText storageKey="projects.title" fallback="代表项目" className="bg-transparent" />
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-medium">
            <EditableText
              storageKey="projects.subtitle"
              fallback="用真实的结果验证策略，让硬核科技的价值被更广泛地看见与认可。"
              className="bg-transparent"
              multiline
            />
          </p>
        </div>
        
        <div className="space-y-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id ?? index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;