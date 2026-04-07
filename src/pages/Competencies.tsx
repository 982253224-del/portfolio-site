import React, { useEffect } from 'react';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, CheckCircle2, FileText, Video, Mic, Newspaper, PlayCircle, Eye, ArrowUpRight } from 'lucide-react';
import { useVisualEdit } from '../context/VisualEditContext';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';
import { publicUrl } from '@/lib/publicUrl';

const Competencies: React.FC = () => {
  const { hash } = useLocation();
  const [searchParams] = useSearchParams();
  const { editMode, getText, getImage } = useVisualEdit();

  useEffect(() => {
    const section =
      searchParams.get('section')?.trim() || (hash ? hash.replace(/^#/, '') : '');
    if (section) {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, searchParams]);

  const detailSections = [
    {
      id: "strategy",
      title: "品牌战略规划",
      tagline: "为品牌定位赋能的核心引擎",
      content: "不仅仅是策划，更是将抽象的企业愿景转化为具象化、可视化的“品牌语言”。擅长从0到1构建品牌认知塔，包含：\n- 制定集团年度PR传播大图与北极星指标。\n- 产出企业专属的 Key Messages House，确保全球及本土发声信息的绝对一致。\n- 构建品牌VI/CI识别体系落地的传播规范。",
    },
    {
      id: "media",
      title: "媒体关系网络",
      tagline: "构建深厚且互信的发声渠道",
      content: "常年担任企业一号位对外接口，与超过300家核心硬核科技、主流财经及新媒体KOL保持紧密联系：\n- 常态化召开核心媒体高层闭门吹风会（Media Briefing）。\n- 打造垂直垂类行业的“记者俱乐部”，建立意见领袖护城河。\n- 高效驱动科技垂直媒体产出高质量产品/技术深度评测。",
    },
    {
      id: "marketing",
      title: "整合营销传播",
      tagline: "不设限的出圈爆款制造机",
      content: "具备丰富的活动操盘经验和创意嗅觉，精于通过行业峰会等实现品牌破圈与声量引爆：\n- 全链条负责大型发布会的策略、定调、预热、引爆及复盘。\n- 联合头部异业品牌打造现象级联名营销事件，实现品牌破圈与流量共享。\n- 打通 PR声量与 Marketing线索的协同壁垒，推动品牌声量向商业线索的有效转化。",
    },
    {
      id: "academic",
      title: "学术传播与高端会议推广",
      tagline: "",
      content:
        "负责高端学术论坛的策展组织与品牌宣发，统筹会务落地与现场媒体采访，确保学术高度与传播声量的双重达成。\n- 会务落地与视觉呈现：全链路统筹论坛现场执行、动线设计及视觉物料把控，保障学术会议的高规格、零失误交付。\n- 现场媒体与专访：作为媒体接口人，统筹现场摄影摄像及专家深度采访，第一时间产出高质量传播素材。",
    },
    {
      id: "content",
      title: "深度内容营销",
      tagline: "用专业文字构建企业的思想领导力",
      content: "优质的内容是打破受众认知壁垒的利器。无论晦涩的技术原理解析，还是宏大的行业趋势预判，都能转化为掷地有声的传播素材：\n- 建立符合行业洞察的长线内容矩阵。\n- 从多维视角切入，为主流阵地提供定制化文本。\n- 下方为代表性输出物格式阅览：",
    },
    {
      id: "growth",
      title: "业务增长赋能",
      tagline: "让声量变成线索，让品牌变成增长引擎",
      content:
        "将品牌传播与业务目标对齐，用内容与传播路径驱动线索增长：\n- 设计从曝光到转化的内容漏斗与触点。\n- 通过案例、白皮书、活动等资产获取高质量ToB线索。\n- 与市场/销售共建指标口径与复盘机制，实现品效协同。",
    }
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground relative">
      {/* Decorative subtle top blurs */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-primary/5 blur-[120px] -z-10 rounded-full"></div>
      <div className="absolute top-[50vh] left-0 w-[30vw] h-[40vh] bg-indigo-500/5 blur-[120px] -z-10 rounded-full"></div>
      
      <Header />
      
      <main className="max-w-[840px] mx-auto px-6 py-20">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-12 font-medium bg-muted px-4 py-2 rounded-lg text-sm">
          <ArrowLeft className="w-4 h-4 mr-2" /> 返回作品集
        </Link>
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            <EditableText storageKey="competencies.pageTitle" fallback="能力详情剖析" className="bg-transparent" />
          </h1>
          <p className="text-xl text-muted-foreground border-l-4 border-primary pl-5 tracking-wide leading-relaxed">
            <EditableText
              storageKey="competencies.pageSubtitle"
              fallback="在复杂的市场环境中，公关不只是写稿发稿，它是企业战略的放大器与风险的防护盾。"
              className="bg-transparent"
              multiline
            />
          </p>
        </div>

        <div className="space-y-20">
          {detailSections.map((section) => {
            const keyBase = `${section.id}_v3`;
            return (
            <div key={section.id} id={section.id} className="scroll-mt-32">
              <div className="bg-primary/10 tracking-widest text-[13px] font-bold text-primary px-3 py-1 rounded-sm inline-block mb-5">
                <EditableText
                  storageKey={`competencies.${keyBase}.tagline`}
                  fallback={section.tagline}
                  className="bg-transparent"
                />
              </div>
              <h2 className="text-3xl font-bold mb-6 tracking-tight">
                <EditableText
                  storageKey={`competencies.${keyBase}.title`}
                  fallback={section.title}
                  className="bg-transparent"
                />
              </h2>
              <div className="bg-card border border-border/80 rounded-[1.5rem] p-8 md:p-10 shadow-custom">
                {editMode ? (
                  <EditableText
                    storageKey={`competencies.${keyBase}.content`}
                    fallback={section.content}
                    className="bg-transparent text-base leading-relaxed"
                    multiline
                  />
                ) : (
                  getText(`competencies.${keyBase}.content`, section.content)
                    .split('\n')
                    .map((line, idx) => {
                      if (line.startsWith('-')) {
                        return (
                          <div key={idx} className="flex items-start mb-4 group">
                            <CheckCircle2 className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity" />
                            <p className="text-muted-foreground text-[17px] leading-relaxed font-medium">{line.substring(1).trim()}</p>
                          </div>
                        );
                      }
                      return (
                        <p key={idx} className="text-lg leading-relaxed text-foreground mb-6 font-semibold">
                          {line}
                        </p>
                      );
                    })
                )}

                {/* 针对内容营销的逼真区块展示 */}
                {section.id === "content" && (
                  <div className="mt-12 pt-10 border-t border-border/50">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">产出物载体切片</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-fr">
                      
                      {/* 媒体长篇深度稿 */}
                      <div className="group relative border border-border bg-background p-6 rounded-2xl transition-all hover:shadow-custom hover:border-primary/30 flex flex-col h-full cursor-pointer">
                        <div className="mb-4 rounded-xl overflow-hidden border border-border/70 relative">
                          {editMode ? (
                            <EditableImage
                              storageKey="competencies.content.slice.media.image"
                              fallbackSrc="https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=1200&h=700"
                              alt="主流媒体深度稿件封面"
                              className="w-full h-36 object-cover"
                            />
                          ) : (
                            <EditableImage
                              storageKey="competencies.content.slice.media.image"
                              fallbackSrc="https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=1200&h=700"
                              alt="主流媒体深度稿件封面"
                              className="w-full h-36 object-cover"
                            />
                          )}
                          {!editMode && (
                            <Link
                              to="/resource-links?type=media"
                              className="absolute right-2 bottom-2 inline-flex items-center rounded-md bg-muted/90 border border-border px-2 py-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground"
                            >
                              选择链接
                            </Link>
                          )}
                        </div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center">
                            <Newspaper className="w-6 h-6" />
                          </div>
                          <div className="p-1.5 bg-muted rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>
                        <h4 className="font-bold text-foreground mb-2 text-lg">
                          {editMode ? (
                            <EditableText storageKey="competencies.content.slice.media.title" fallback="主流媒体深度稿件" className="bg-transparent" />
                          ) : (
                            <a href={getText("competencies.content.slice.media.link", "#")} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                              <EditableText storageKey="competencies.content.slice.media.title" fallback="主流媒体深度稿件" className="bg-transparent" />
                            </a>
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                          <EditableText
                            storageKey="competencies.content.slice.media.desc"
                            fallback="如《36氪》、《晚点》等科技核心媒体近万字行业洞察与企业解析长文。"
                            className="bg-transparent"
                            multiline
                          />
                        </p>
                        <div className="mt-5 flex gap-2">
                          <span className="text-[11px] font-medium px-2 py-1 bg-muted rounded">
                            <EditableText storageKey="competencies.content.slice.media.tag1" fallback="千字/万字特稿" className="bg-transparent" />
                          </span>
                          <span className="text-[11px] font-medium px-2 py-1 bg-muted rounded">
                            <EditableText storageKey="competencies.content.slice.media.tag2" fallback="技术白皮书" className="bg-transparent" />
                          </span>
                        </div>
                        {editMode && (
                          <div className="mt-4">
                            <p className="text-xs text-muted-foreground mb-1">跳转链接（点击封面/标题）</p>
                            <EditableText
                              storageKey="competencies.content.slice.media.link"
                              fallback="https://example.com/article"
                              className="bg-transparent text-xs text-primary break-all"
                            />
                          </div>
                        )}
                      </div>

                      {/* 高管讲话稿 */}
                      <div className="group relative border border-border bg-background p-6 rounded-2xl transition-all hover:shadow-custom hover:border-primary/30 flex flex-col h-full cursor-pointer">
                        <div className="mb-4 rounded-xl overflow-hidden border border-border/70 relative">
                          {editMode ? (
                            <EditableImage
                              storageKey="competencies.content.slice.keynote.image"
                              fallbackSrc="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200&h=700"
                              alt="高管讲话稿封面"
                              className="w-full h-36 object-cover"
                            />
                          ) : (
                            <EditableImage
                              storageKey="competencies.content.slice.keynote.image"
                              fallbackSrc="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200&h=700"
                              alt="高管讲话稿封面"
                              className="w-full h-36 object-cover"
                            />
                          )}
                          {!editMode && (
                            <Link
                              to="/resource-links?type=keynote"
                              className="absolute right-2 bottom-2 inline-flex items-center rounded-md bg-muted/90 border border-border px-2 py-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground"
                            >
                              选择链接
                            </Link>
                          )}
                        </div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6" />
                          </div>
                          <div className="p-1.5 bg-muted rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>
                        <h4 className="font-bold text-foreground mb-2 text-lg">
                          {editMode ? (
                            <EditableText storageKey="competencies.content.slice.keynote.title" fallback="高管 Keynote 讲话稿" className="bg-transparent" />
                          ) : (
                            <a href={getText("competencies.content.slice.keynote.link", "#")} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                              <EditableText storageKey="competencies.content.slice.keynote.title" fallback="高管 Keynote 讲话稿" className="bg-transparent" />
                            </a>
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                          <EditableText
                            storageKey="competencies.content.slice.keynote.desc"
                            fallback="为 CEO 在如 WAIC（世界人工智能大会）等顶级峰会定制的主旨演讲中英双语逐字稿。"
                            className="bg-transparent"
                            multiline
                          />
                        </p>
                        <div className="mt-5 flex gap-2">
                          <span className="text-[11px] font-medium px-2 py-1 bg-muted rounded">
                            <EditableText storageKey="competencies.content.slice.keynote.tag1" fallback="金句提炼" className="bg-transparent" />
                          </span>
                          <span className="text-[11px] font-medium px-2 py-1 bg-muted rounded">
                            <EditableText storageKey="competencies.content.slice.keynote.tag2" fallback="对外人设" className="bg-transparent" />
                          </span>
                        </div>
                        {editMode && (
                          <div className="mt-4">
                            <p className="text-xs text-muted-foreground mb-1">跳转链接（点击封面/标题）</p>
                            <EditableText
                              storageKey="competencies.content.slice.keynote.link"
                              fallback="https://example.com/keynote"
                              className="bg-transparent text-xs text-primary break-all"
                            />
                          </div>
                        )}
                      </div>

                      {/* 1V1 专访 */}
                      <div className="group relative border border-border bg-background p-6 rounded-2xl transition-all hover:shadow-custom hover:border-primary/30 flex flex-col h-full cursor-pointer">
                        <div className="mb-4 rounded-xl overflow-hidden border border-border/70 relative">
                          {editMode ? (
                            <EditableImage
                              storageKey="competencies.content.slice.interview.image"
                              fallbackSrc="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200&h=700"
                              alt="创始人专访封面"
                              className="w-full h-36 object-cover"
                            />
                          ) : (
                            <EditableImage
                              storageKey="competencies.content.slice.interview.image"
                              fallbackSrc="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200&h=700"
                              alt="创始人专访封面"
                              className="w-full h-36 object-cover"
                            />
                          )}
                          {!editMode && (
                            <Link
                              to="/resource-links?type=interview"
                              className="absolute right-2 bottom-2 inline-flex items-center rounded-md bg-muted/90 border border-border px-2 py-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground"
                            >
                              选择链接
                            </Link>
                          )}
                        </div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center">
                            <Mic className="w-6 h-6" />
                          </div>
                          <div className="p-1.5 bg-muted rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>
                        <h4 className="font-bold text-foreground mb-2 text-lg">
                          {editMode ? (
                            <EditableText storageKey="competencies.content.slice.interview.title" fallback="对谈发言" className="bg-transparent" />
                          ) : (
                            <a href={getText("competencies.content.slice.interview.link", "#")} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                              <EditableText storageKey="competencies.content.slice.interview.title" fallback="对谈发言" className="bg-transparent" />
                            </a>
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                          <EditableText
                            storageKey="competencies.content.slice.interview.desc"
                            fallback="涵盖顶尖科技播客播音前 QA 梳理、核心财经周刊面对面访谈的提纲对齐与临场风控。"
                            className="bg-transparent"
                            multiline
                          />
                        </p>
                        <div className="mt-5 flex gap-2">
                          <span className="text-[11px] font-medium px-2 py-1 bg-muted rounded">
                            <EditableText storageKey="competencies.content.slice.interview.tag1" fallback="播客文字稿" className="bg-transparent" />
                          </span>
                          <span className="text-[11px] font-medium px-2 py-1 bg-muted rounded">
                            <EditableText storageKey="competencies.content.slice.interview.tag2" fallback="QA红线" className="bg-transparent" />
                          </span>
                        </div>
                        {editMode && (
                          <div className="mt-4">
                            <p className="text-xs text-muted-foreground mb-1">跳转链接（点击封面/标题）</p>
                            <EditableText
                              storageKey="competencies.content.slice.interview.link"
                              fallback="https://example.com/interview"
                              className="bg-transparent text-xs text-primary break-all"
                            />
                          </div>
                        )}
                      </div>

                      {/* 视频传播 */}
                      <div className="group relative border border-border bg-background p-6 rounded-2xl transition-all hover:shadow-custom hover:border-primary/30 flex flex-col h-full cursor-pointer overflow-hidden">
                        <div className="mb-4 rounded-xl overflow-hidden border border-border/70 relative z-10">
                          {editMode ? (
                            <EditableImage
                              storageKey="competencies.content.slice.video.image"
                              fallbackSrc="https://images.unsplash.com/photo-1574717024453-35405667b5eb?auto=format&fit=crop&q=80&w=1200&h=700"
                              alt="品牌与技术TVC封面"
                              className="w-full h-36 object-cover"
                            />
                          ) : (
                            <EditableImage
                              storageKey="competencies.content.slice.video.image"
                              fallbackSrc="https://images.unsplash.com/photo-1574717024453-35405667b5eb?auto=format&fit=crop&q=80&w=1200&h=700"
                              alt="品牌与技术TVC封面"
                              className="w-full h-36 object-cover"
                            />
                          )}
                          {!editMode && (
                            <Link
                              to="/resource-links?type=video"
                              className="absolute right-2 bottom-2 inline-flex items-center rounded-md bg-muted/90 border border-border px-2 py-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground"
                            >
                              选择链接
                            </Link>
                          )}
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-5 text-primary pointer-events-none">
                          <PlayCircle className="w-32 h-32" />
                        </div>
                        <div className="flex items-start justify-between mb-4 relative z-10">
                          <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                            <Video className="w-6 h-6" />
                          </div>
                          <div className="p-1.5 bg-muted rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>
                        <h4 className="font-bold text-foreground mb-2 text-lg relative z-10">
                          {editMode ? (
                            <EditableText storageKey="competencies.content.slice.video.title" fallback="品牌与技术 TVC" className="bg-transparent" />
                          ) : (
                            <a href={getText("competencies.content.slice.video.link", "#")} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                              <EditableText storageKey="competencies.content.slice.video.title" fallback="品牌与技术 TVC" className="bg-transparent" />
                            </a>
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-grow relative z-10">
                          <EditableText
                            storageKey="competencies.content.slice.video.desc"
                            fallback="从脚本分镜到完片监制，制作高质感的品牌理念形象大片及产品原理解析短视频。"
                            className="bg-transparent"
                            multiline
                          />
                        </p>
                        <div className="mt-5 flex gap-2 relative z-10">
                          <span className="flex items-center text-[11px] font-medium px-2 py-1 bg-muted rounded text-foreground/70">
                            <Eye className="w-3 h-3 mr-1" />
                            <EditableText storageKey="competencies.content.slice.video.metric" fallback="500W+ 播放" className="bg-transparent" />
                          </span>
                        </div>
                        {editMode && (
                          <div className="mt-4 relative z-10">
                            <p className="text-xs text-muted-foreground mb-1">跳转链接（点击封面/标题）</p>
                            <EditableText
                              storageKey="competencies.content.slice.video.link"
                              fallback="https://example.com/video"
                              className="bg-transparent text-xs text-primary break-all"
                            />
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                )}

                {section.id === "media" && (
                  <div className="mt-12 pt-10 border-t border-border/50">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">
                      标杆案例
                    </h3>
                      <div className="rounded-3xl border border-border/70 bg-card shadow-custom overflow-hidden">
                        <div className="px-7 py-6 border-b border-border/60 bg-muted/30">
                          <p className="text-xs tracking-widest text-muted-foreground mb-2">Kernel Ecosystem Campaign</p>
                          <h4 className="text-[2.05rem] leading-tight font-extrabold tracking-tight text-foreground">算子生态（Kernel Ecosystem）品牌战役</h4>
                      </div>
                      <div className="p-7 space-y-5">
                        <div className="rounded-2xl border border-border bg-background p-6">
                          <p className="text-sm font-bold text-primary mb-2">策略破圈</p>
                          <p className="text-muted-foreground leading-relaxed">
                            针对技术门槛较高的“算子生态”，策划低门槛、高价值的产业解读内容，旨在打通官媒圈层与大众认知。
                          </p>
                        </div>
                        <div className="rounded-2xl border border-border bg-background p-6">
                          <p className="text-sm font-bold text-primary mb-2">权威背书</p>
                          <p className="text-muted-foreground leading-relaxed">
                            成功撬动“深圳发布”（深圳市政府官方发布平台）的主动关注，实现 2 次专题深度报道，确立技术在区域内的政策示范意义。
                          </p>
                        </div>
                        <div className="rounded-2xl border border-border bg-background p-6">
                          <p className="text-sm font-bold text-primary mb-2">涟漪效应</p>
                          <p className="text-muted-foreground leading-relaxed">
                            凭借官方背书引发行业共振，带动超过 20 家主流及科技媒体主动跟进转载。
                          </p>
                        </div>

                      </div>
                    </div>
                  </div>
                )}

                {section.id === "marketing" && (
                  <div className="mt-12 pt-10 border-t border-border/50">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">
                      标杆案例
                    </h3>
                    <div className="rounded-3xl border border-border/70 bg-card shadow-custom overflow-hidden">
                      <div className="px-7 py-6 border-b border-border/60 bg-muted/30">
                        <p className="text-xs tracking-widest text-muted-foreground mb-2">Integrated Marketing Case</p>
                        <h4 className="text-[2.05rem] leading-tight font-extrabold tracking-tight text-foreground">
                          2025“科普春晚”——科技影响力破圈战役
                        </h4>
                      </div>

                      <div className="p-7 space-y-5">
                        <div className="rounded-2xl border border-border bg-background p-6">
                          <p className="text-sm font-bold text-primary mb-2">核心成果</p>
                          <p className="text-muted-foreground leading-relaxed">
                            <span className="font-bold text-foreground">传播数据：</span>
                            全网点赞互动超 <span className="font-bold text-foreground">12 万</span>，视频播放量破
                            <span className="font-bold text-foreground">1030 万</span>，相关话题阅读量飙升至
                            <span className="font-bold text-foreground">9800 万+</span>。
                            <br />
                            <span className="font-bold text-foreground">破圈效应：</span>
                            成功打通学术圈、电视端与社交网络，实现科技内容的全民热议。
                          </p>
                        </div>

                        <div className="rounded-2xl border border-border bg-background p-6">
                          <p className="text-sm font-bold text-primary mb-2">核心职责与亮点</p>
                          <p className="text-muted-foreground leading-relaxed mb-4">
                            全案策略与 0-1 孵化、跨界生态共建、内容与嘉宾管理、媒体矩阵传播。
                          </p>
                          <div className="space-y-3">
                            <p className="text-muted-foreground leading-relaxed">
                              <span className="font-bold text-foreground">【全案策略与 0-1 孵化】</span>
                              独立主导项目创意构思与整体方案设计，把控从选题策划到播出发行的全链路闭环，确保高质量交付。
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                              <span className="font-bold text-foreground">【跨界生态共建（资源撬动）】</span>
                              作为核心发起人，成功构建“深圳卫视（播出）+ 微博（发酵）+ CCF（学术背书）+《科技日报》（权威发声）”的五维合作生态，
                              最大化资源协同效应。
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                              <span className="font-bold text-foreground">【内容与嘉宾管理】</span>
                              统筹 8 位跨领域专家的内容策划与演讲打磨，平衡科学严谨性与大众娱乐性。
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                              <span className="font-bold text-foreground">【媒体矩阵传播】</span>
                              精准把控深圳卫视大屏曝光与微博热搜话题节奏，实现长周期热度维持。
                            </p>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-border bg-background p-6">
                          <p className="text-sm font-bold text-primary mb-3">案例插图</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[760px] mx-auto">
                            <div className="rounded-xl overflow-hidden border border-border/70 bg-muted/30">
                              <img src={publicUrl("/marketing-case-2.png")} alt="科普春晚案例插图 2" className="w-full h-[180px] object-cover" loading="lazy" />
                            </div>
                            <div className="rounded-xl overflow-hidden border border-border/70 bg-muted/30">
                              <img src={publicUrl("/marketing-case-3.png")} alt="科普春晚案例插图 3" className="w-full h-[180px] object-cover" loading="lazy" />
                            </div>
                            <div className="rounded-xl overflow-hidden border border-border/70 bg-muted/30">
                              <img src={publicUrl("/marketing-case-1.png")} alt="科普春晚案例插图 1" className="w-full h-[180px] object-cover" loading="lazy" />
                            </div>
                            <div className="rounded-xl overflow-hidden border border-border/70 bg-muted/30">
                              <img src={publicUrl("/marketing-case-4.png")} alt="科普春晚案例插图 4" className="w-full h-[180px] object-cover" loading="lazy" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {section.id === "academic" && (
                  <div className="mt-12 pt-10 border-t border-border/50">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">
                      Academic Communication Case
                    </h3>
                    <div className="rounded-3xl border border-border/70 bg-card shadow-custom overflow-hidden">
                      <div className="px-7 py-6 border-b border-border/60 bg-muted/30">
                        <h4 className="text-[2.05rem] leading-tight font-extrabold tracking-tight text-foreground">
                          MIIS 数据科学国际研讨会（品牌重塑与全球推广）
                        </h4>
                      </div>
                      <div className="p-7 space-y-5">
                        <div className="rounded-2xl border border-border bg-background p-6">
                          <p className="text-muted-foreground leading-relaxed">
                            作为品牌负责人与项目 PM，从 0 到 1 重构论坛品牌定位与年度传播主题。统筹四届大会的全周期宣传，
                            通过搭建学术媒体矩阵与原创内容策划，实现参会规模与媒体曝光量创历史新高。
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                            <p className="text-xs text-muted-foreground mb-2">内容传播</p>
                            <p className="text-2xl font-black text-foreground">29,000+</p>
                            <p className="text-sm text-muted-foreground mt-1">黄大年茶思屋观看量</p>
                          </div>
                          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                            <p className="text-xs text-muted-foreground mb-2">权威媒体</p>
                            <p className="text-xl font-black text-foreground">深视新闻 / Shenzhen Daily</p>
                            <p className="text-sm text-muted-foreground mt-1">权威报道背书</p>
                          </div>
                          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                            <p className="text-xs text-muted-foreground mb-2">项目交付</p>
                            <p className="text-2xl font-black text-foreground">连续4年</p>
                            <p className="text-sm text-muted-foreground mt-1">零事故落地</p>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-border bg-background p-6">
                          <p className="text-sm font-bold text-primary mb-3">复盘要点</p>
                          <div className="space-y-3">
                            <p className="text-muted-foreground leading-relaxed">
                              <span className="font-bold text-foreground">【学术IP长线运营】</span>
                              摒弃单次活动思维，建立年度传播主题与核心受众沟通机制，持续沉淀品牌资产。
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                              <span className="font-bold text-foreground">【跨文化内容策展】</span>
                              策划《MIIS老友记》等系列原创内容，平衡学术严谨性与传播趣味性，有效触达国际学者圈层。
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                              <span className="font-bold text-foreground">【危机管理与执行】</span>
                              建立跨部门协同与供应商管理机制，确保高规格国际会议在复杂环境下的“零重大事故”交付。
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {section.id === "growth" && (
                  <div className="mt-12 pt-10 border-t border-border/50">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">
                      白皮书与增长资产
                    </h3>
                    <div className="rounded-3xl border border-border/70 bg-card shadow-custom overflow-hidden">
                      <div className="px-7 py-6 border-b border-border/60 bg-muted/30">
                        <p className="text-xs tracking-widest text-muted-foreground mb-2">Whitepaper Assets</p>
                        <h4 className="text-[2.05rem] leading-tight font-extrabold tracking-tight text-foreground">业务赋能增长白皮书</h4>
                      </div>

                      <div className="p-7">
                        <div className="rounded-2xl border border-border bg-background p-4">
                          <div className="block">
                            <div className="rounded-xl overflow-hidden border border-border/70 bg-white">
                              <EditableImage
                                storageKey="competencies.growth.whitepaper.image"
                                fallbackSrc={publicUrl("/growth-whitepaper.png")}
                                alt="白皮书展示图"
                                className="w-full h-auto object-cover"
                              />
                            </div>
                            <p className="mt-3 text-sm text-center">
                              <a
                                href="https://www.sribd.cn/sites/default/files/2026-02/%E6%B7%B1%E5%9C%B3%E5%B8%82%E5%A4%A7%E6%95%B0%E6%8D%AE%E7%A0%94%E7%A9%B6%E9%99%A2%E7%A7%91%E7%A0%94%E6%88%90%E6%9E%9C%E7%99%BD%E7%9A%AE%E4%B9%A6%EF%BC%882025%EF%BC%89_1.pdf"
                                target="_blank"
                                rel="noreferrer"
                                className="text-foreground hover:text-primary transition-colors font-medium"
                              >
                                深圳市大数据研究院白皮书
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="px-7 pb-7">
                        <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-white to-muted/20 p-7 md:p-8">
                          <div className="mb-5">
                            <p className="text-xs tracking-widest text-muted-foreground mb-2">SOCIAL MEDIA MATRIX</p>
                            <h5 className="text-[2.05rem] leading-tight font-extrabold tracking-tight text-foreground">社交媒体矩阵框架及成果</h5>
                          </div>
                          <div className="space-y-4">
                            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                              <p className="text-sm font-bold text-primary mb-3">矩阵数据表现</p>
                              <div className="space-y-2 text-sm text-foreground font-medium">
                                <p>公众号运营粉丝增长 <span className="font-black">200+%</span></p>
                                <p>B站运营粉丝净增长 <span className="font-black">400</span>，增幅 <span className="font-black">800+%</span></p>
                                <p>微博2个月粉丝净增长 <span className="font-black">2500</span></p>
                              </div>
                            </div>
                            <div className="rounded-2xl border border-border bg-background p-5">
                              <p className="text-sm font-bold text-primary mb-3">社交媒体矩阵</p>
                              <div className="rounded-xl border border-border/80 bg-muted/20 p-3 space-y-2">
                                <div className="grid grid-cols-[84px,1fr] gap-2 items-center rounded-lg border border-border bg-background p-3 text-sm">
                                  <div className="rounded bg-primary text-primary-foreground text-center py-1 font-bold">公众号</div>
                                  <div className="text-foreground text-center">官方媒体渠道：重点新闻发布</div>
                                </div>
                                <div className="grid grid-cols-[84px,1fr] gap-2 items-center rounded-lg border border-border bg-background p-3 text-sm">
                                  <div className="rounded bg-primary text-primary-foreground text-center py-1 font-bold">bilibili</div>
                                  <div className="text-foreground text-center">学术影响力窗口：前沿知识分享</div>
                                </div>
                                <div className="grid grid-cols-[84px,1fr] gap-2 items-center rounded-lg border border-border bg-background p-3 text-sm">
                                  <div className="rounded bg-primary text-primary-foreground text-center py-1 font-bold">视频号</div>
                                  <div className="text-foreground text-center">注意力链接区：短平快内容分发</div>
                                </div>
                                <div className="grid grid-cols-[84px,1fr] gap-2 items-center rounded-lg border border-border bg-background p-3 text-sm">
                                  <div className="rounded bg-primary text-primary-foreground text-center py-1 font-bold">微博</div>
                                  <div className="text-foreground text-center">活动推送阵地：热点扩散与分享</div>
                                </div>
                              </div>
                            </div>
                            <div className="rounded-2xl border border-border bg-background p-5">
                              <p className="text-sm font-bold text-primary mb-3">成果可视化图示</p>
                              <div className="rounded-xl overflow-hidden border border-border/70 bg-white">
                                <img
                                  src={publicUrl("/social-matrix-result.png")}
                                  alt="社交媒体矩阵案例成果图"
                                  className="w-full h-auto object-cover"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {section.id === "strategy" && (
                  <div className="mt-12 pt-10 border-t border-border/50">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">
                      战略可视化案例
                    </h3>
                    <div className="grid grid-cols-1 gap-8">
                      <div className="rounded-3xl border border-border/70 bg-card shadow-custom overflow-hidden relative">
                        <div className="absolute -top-24 -right-20 w-56 h-56 bg-primary/10 blur-3xl pointer-events-none" />
                        <div className="px-7 py-6 border-b border-border/60 bg-muted/30 relative">
                          <p className="text-xs tracking-widest text-muted-foreground mb-2">品牌规划 for SRIBD</p>
                          <h4 className="text-3xl font-extrabold tracking-tight text-foreground">定局 — 破局 — 成局</h4>
                        </div>
                        <div className="p-7 space-y-6">
                          <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-5 shadow-lg">
                            <p className="text-xs opacity-80 mb-1">目标 2024-2026</p>
                            <p className="text-2xl font-bold mb-1">重塑品牌力</p>
                            <p className="text-base opacity-90">让客户因为研究院品牌而更愿意购买我们的产品与服务</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-[120px,1fr] gap-4 items-stretch">
                            <div className="rounded-2xl bg-amber-200 flex items-center justify-center text-xl font-extrabold text-slate-900 shadow-sm">方向</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="rounded-2xl border border-amber-300/70 bg-amber-50 p-5 shadow-sm transition-transform duration-300 hover:-translate-y-0.5">
                                <p className="text-xl font-extrabold mb-1">品牌形象转型</p>
                                <p className="text-sm text-slate-700">基础科研机构 - 科研生产力</p>
                              </div>
                              <div className="rounded-2xl border border-amber-300/70 bg-amber-50 p-5 shadow-sm transition-transform duration-300 hover:-translate-y-0.5">
                                <p className="text-xl font-extrabold mb-1">品牌价值塑造</p>
                                <p className="text-sm text-slate-700">研究 + 价值创造双生态驱动</p>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-5 shadow-lg">
                            <p className="text-xs opacity-80 mb-1">落地 2025</p>
                            <p className="text-xl font-bold">提升内容质量 + 突破传播声量 + 加强终端渗透效率</p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-3xl border border-border/70 bg-card shadow-custom overflow-hidden relative">
                        <div className="absolute -bottom-24 -left-20 w-56 h-56 bg-primary/10 blur-3xl pointer-events-none" />
                        <div className="px-7 py-6 border-b border-border/60 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                          <p className="text-xs tracking-widest opacity-80 mb-2">2023-2025 品牌年度传播专项</p>
                          <h4 className="text-[2.05rem] leading-tight font-extrabold tracking-tight">科研为未来赋值</h4>
                        </div>
                        <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="rounded-2xl border border-border bg-background p-6 shadow-sm relative transition-all duration-300 hover:shadow-md hover:border-primary/30">
                            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-amber-300 to-amber-200" />
                            <p className="inline-flex rounded-md bg-amber-200 text-slate-900 text-xs font-bold px-3 py-1 mb-3">宏观视角</p>
                            <p className="text-2xl font-black mb-2">01 「SRIBD，用科研能力造就未来」</p>
                            <p className="text-muted-foreground leading-relaxed">以 SRIBD 通过技术能力推动各行各业的变革，展现 SRIBD 为数智化时代的贡献。</p>
                          </div>
                          <div className="rounded-2xl border border-border bg-background p-6 shadow-sm relative transition-all duration-300 hover:shadow-md hover:border-primary/30">
                            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-amber-300 to-amber-200" />
                            <p className="inline-flex rounded-md bg-amber-200 text-slate-900 text-xs font-bold px-3 py-1 mb-3">微观视角</p>
                            <p className="text-2xl font-black mb-2">02 「SRIBD&创新者、创新成果」</p>
                            <p className="text-muted-foreground leading-relaxed">以各类技术突破点和行业学者为背景，推动展现大数据及研究院。</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )})}
          
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Competencies;