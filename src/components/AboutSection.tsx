import React from 'react';
import EditableText from './EditableText';

const AboutSection: React.FC = () => {
  const stats = [
    { label: "从业经验", value: "8年+" },
    { label: "主导大型发布会", value: "30+" },
    { label: "拓展核心媒体库", value: "500+" },
    { label: "累计商业曝光价值", value: "¥50M+" }
  ];

  return (
    <section data-cmp="AboutSection" id="about" className="w-full py-24 relative overflow-hidden bg-background">
      {/* Soft Ambient Background Glows instead of gradients */}
      <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center rounded-sm bg-muted px-2.5 py-1 text-sm font-bold mb-6 text-primary border border-primary/10 tracking-widest">
              WHO AM I
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground tracking-tight">关于我</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg font-medium">
              <p>
                <EditableText
                  storageKey="about.p1"
                  fallback="我曾在顶级科技独角兽企业担任品牌宣传总监，深谙自动驾驶、人工智能、SaaS等领域的传播话语体系。"
                  className="bg-transparent"
                  multiline
                />
              </p>
              <p>
                <EditableText
                  storageKey="about.p2"
                  fallback="我不仅懂得如何将晦涩难懂的技术术语转化为媒体受众喜闻乐见的故事，更擅长在危机发生时迅速反应，转危为机。我的工作理念是：“公关不是粉饰，而是放大真实的技术价值”。"
                  className="bg-transparent"
                  multiline
                />
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 lg:gap-6 relative">
            <div className="absolute inset-0 bg-primary/5 rounded-[2rem] -z-10 blur-2xl transform scale-110"></div>
            {stats.map((stat, index) => (
              <div key={index} className="bg-card backdrop-blur-xl p-6 lg:p-8 rounded-[1.5rem] border border-border shadow-custom flex flex-col justify-center hover:-translate-y-1 hover:border-primary/30 transition-all duration-300">
                <div className="text-3xl lg:text-4xl font-black text-primary mb-3">
                  <EditableText
                    storageKey={`about.stats.${index}.value`}
                    fallback={stat.value}
                    className="bg-transparent"
                  />
                </div>
                <div className="text-sm font-semibold text-muted-foreground tracking-wide leading-tight">
                  <EditableText
                    storageKey={`about.stats.${index}.label`}
                    fallback={stat.label}
                    className="bg-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;