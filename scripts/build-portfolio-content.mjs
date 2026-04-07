/**
 * Writes public/portfolio-content.json from in-script defaults that mirror the React app
 * (EditableText fallbacks, detailSections, projects, etc.). Source of truth is the code, not
 * any previous JSON or localStorage.
 * Run: node scripts/build-portfolio-content.mjs
 * Optional: --merge  merge existing file on top (old file wins on key collision; rare use).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outPath = path.join(root, "public", "portfolio-content.json");

const detail = {
  strategy: {
    tagline: "为品牌定位赋能的核心引擎",
    title: "品牌战略规划",
    content:
      "不仅仅是策划，更是将抽象的企业愿景转化为具象化、可视化的“品牌语言”。擅长从0到1构建品牌认知塔，包含：\n- 制定集团年度PR传播大图与北极星指标。\n- 产出企业专属的 Key Messages House，确保全球及本土发声信息的绝对一致。\n- 构建品牌VI/CI识别体系落地的传播规范。",
  },
  media: {
    tagline: "构建深厚且互信的发声渠道",
    title: "媒体关系网络",
    content:
      "常年担任企业一号位对外接口，与超过300家核心硬核科技、主流财经及新媒体KOL保持紧密联系：\n- 常态化召开核心媒体高层闭门吹风会（Media Briefing）。\n- 打造垂直垂类行业的“记者俱乐部”，建立意见领袖护城河。\n- 高效驱动科技垂直媒体产出高质量产品/技术深度评测。",
  },
  marketing: {
    tagline: "不设限的出圈爆款制造机",
    title: "整合营销传播",
    content:
      "具备丰富的活动操盘经验和创意嗅觉，精于通过行业峰会等实现品牌破圈与声量引爆：\n- 全链条负责大型发布会的策略、定调、预热、引爆及复盘。\n- 联合头部异业品牌打造现象级联名营销事件，实现品牌破圈与流量共享。\n- 打通 PR声量与 Marketing线索的协同壁垒，推动品牌声量向商业线索的有效转化。",
  },
  academic: {
    tagline: "",
    title: "学术传播与高端会议推广",
    content:
      "负责高端学术论坛的策展组织与品牌宣发，统筹会务落地与现场媒体采访，确保学术高度与传播声量的双重达成。\n- 会务落地与视觉呈现：全链路统筹论坛现场执行、动线设计及视觉物料把控，保障学术会议的高规格、零失误交付。\n- 现场媒体与专访：作为媒体接口人，统筹现场摄影摄像及专家深度采访，第一时间产出高质量传播素材。",
  },
  content: {
    tagline: "用专业文字构建企业的思想领导力",
    title: "深度内容营销",
    content:
      "优质的内容是打破受众认知壁垒的利器。无论晦涩的技术原理解析，还是宏大的行业趋势预判，都能转化为掷地有声的传播素材：\n- 建立符合行业洞察的长线内容矩阵。\n- 从多维视角切入，为主流阵地提供定制化文本。\n- 下方为代表性输出物格式阅览：",
  },
  growth: {
    tagline: "让声量变成线索，让品牌变成增长引擎",
    title: "业务增长赋能",
    content:
      "将品牌传播与业务目标对齐，用内容与传播路径驱动线索增长：\n- 设计从曝光到转化的内容漏斗与触点。\n- 通过案例、白皮书、活动等资产获取高质量ToB线索。\n- 与市场/销售共建指标口径与复盘机制，实现品效协同。",
  },
};

function sectionKeys() {
  const texts = {};
  for (const id of Object.keys(detail)) {
    const b = `${id}_v3`;
    const s = detail[id];
    texts[`competencies.${b}.tagline`] = s.tagline;
    texts[`competencies.${b}.title`] = s.title;
    texts[`competencies.${b}.content`] = s.content;
  }
  return texts;
}

const defaultTexts = {
  "hero.badge": "Open to new branding leadership roles",
  "hero.titleLine1": "将硬核科技，",
  "hero.titleLine2Prefix": "转化为清晰的",
  "hero.titleLine2Highlight": "品牌心智",
  "hero.floating1": "🎙️ 媒体关系",
  "hero.floating2": "✍️ 内容策略",
  "hero.floating3": "🚨 科技传播",
  "hero.intro":
    "您好，我是林镕（Linrong）。拥有8年资深科技行业品牌公关经验。从0到1搭建品牌认知，策划出圈传播事件，帮助硬核科技企业在喧嚣的市场中建立清晰、权威的发声阵地。",
  "hero.name": "林镕 Linrong",
  "hero.title": "品牌公关 / Brand PR",
  "hero.meta1": "8 Years in Tech PR",
  "hero.meta2": "Beijing / Shanghai",

  "about.p1":
    "我曾在顶级科技独角兽企业担任品牌宣传总监，深谙自动驾驶、人工智能、SaaS等领域的传播话语体系。",
  "about.p2":
    "我不仅懂得如何将晦涩难懂的技术术语转化为媒体受众喜闻乐见的故事，更擅长在危机发生时迅速反应，转危为机。我的工作理念是：“公关不是粉饰，而是放大真实的技术价值”。",
  "about.stats.0.value": "8年+",
  "about.stats.0.label": "从业经验",
  "about.stats.1.value": "30+",
  "about.stats.1.label": "主导大型发布会",
  "about.stats.2.value": "500+",
  "about.stats.2.label": "拓展核心媒体库",
  "about.stats.3.value": "¥50M+",
  "about.stats.3.label": "累计商业曝光价值",

  "skills.kicker": "CORE COMPETENCIES",
  "skills.title": "核心竞争力",
  "skills.subtitle":
    "构建全维度的品牌护城河，让每一次发声都有回响。点击下方各板块卡片，查阅详情解读。",
  "skills.strategy.title": "品牌战略规划",
  "skills.strategy.description":
    "从企业愿景出发，制定年度PR传播策略、品牌定位及关键信息矩阵（Message House）。",
  "skills.media.title": "媒体关系网络",
  "skills.media.description":
    "掌握科技垂直、商业财经及大众主流媒体资源，建立KOL/KOC长期合作阵地。",
  "skills.marketing.title": "整合营销传播",
  "skills.marketing.description":
    "主导新品发布会、行业峰会传播，统筹线上线下跨界营销活动，打造爆款案例。",
  "skills.academic.title": "学术传播与高端会议推广",
  "skills.academic.description":
    "高端学术论坛策展与品牌宣发，统筹会务落地与现场媒体采访，放大科研影响力与传播声量。",
  "skills.content.title": "深度内容营销",
  "skills.content.description":
    "产出高质量行业白皮书、创始人署名文章、深度专访稿件，建立思想领导力。",
  "skills.growth.title": "业务增长赋能",
  "skills.growth.description": "将品牌声量转化为业务线索，实现PR与Marketing的品效协同。",

  "projects.kicker": "SELECTED ACCOMPLISHMENTS",
  "projects.title": "代表项目",
  "projects.subtitle": "用真实的结果验证策略，让硬核科技的价值被更广泛地看见与认可。",

  "projects.p1.title": "‘智领未来’ 全球AI大模型年度发布会",
  "projects.p1.category": "新品发布 / 整合营销",
  "projects.p1.description":
    "作为项目一号位，统筹全局策划与宣发。针对ToB客户痛点提炼核心传播信息，结合线下千人峰会与线上多平台直播，打造现象级科技圈事件。",
  "projects.p1.metrics.0": "全网直播观看 500W+",
  "projects.p1.metrics.1": "核心媒体发稿 200+",
  "projects.p1.metrics.2": "直接带来优质线索 300+",
  "projects.p1.replay":
    "复盘要点：\n- 从“ToB痛点”反推信息架构，确保发布会每个环节都服务于转化。\n- 线上线下统一主叙事与关键数字，形成可被媒体复述的内容颗粒。\n- 以赛后数据闭环（观看-互动-线索）复盘内容命中率，并沉淀可复用模板。",

  "projects.p2.title": "科技向善：自动驾驶无障碍出行白皮书",
  "projects.p2.category": "ESG / CSR 传播",
  "projects.p2.description":
    "联合顶尖智库与主流财经媒体发布行业首本无障碍出行技术白皮书。成功将硬核严谨的技术语言转化为充满温度的人文关怀，极大提升了品牌美誉度。",
  "projects.p2.metrics.0": "央媒点赞报道",
  "projects.p2.metrics.1": "社交媒体讨论量 1000W+",
  "projects.p2.metrics.2": "获年度最佳CSR案例奖",
  "projects.p2.replay":
    "复盘要点：\n- 以“可解释技术价值”作为叙事桥梁，降低受众理解门槛。\n- 联合权威背书，确保白皮书的可信度与可传播性。\n- 通过媒体传播节奏与话题运营，让讨论从一时热度转为持续影响。",

  "projects.p3.title": "核心高管IP重塑与思想领导力建设",
  "projects.p3.category": "IP打造 / 高管公关",
  "projects.p3.description":
    "为其重新梳理对外人设，策划并落地一系列深度文字专访、播客对谈及行业顶级论坛Keynote演讲，半年内奠定其在行业内的意见领袖地位。",
  "projects.p3.metrics.0": "顶级科技播客专访 3场",
  "projects.p3.metrics.1": "阅读量10w+深度文章 5篇",
  "projects.p3.metrics.2": "舆情正面反馈提升 80%",
  "projects.p3.replay":
    "复盘要点：\n- 先做“观点盘点”，再从观点反推内容产品形态（稿件-播客-演讲）。\n- 统一对外口径与表达风格，降低传播偏差。\n- 用阶段性舆情与内容数据校准内容深度，持续强化思想领导力。",

  "contact.title": "期待您的联络",
  "contact.description":
    "无论是寻找全职的公关一号位，还是需要经验丰富的品牌传播顾问咨询，我都时刻准备着为您提供专业洞见。",
  "contact.emailLabel": "邮件沟通",
  "contact.emailValue": "linrong@example.com",
  "contact.linkedinLabel": "职场领英",
  "contact.linkedinValue": "linkedin.com/in/linrong",
  "contact.locationLabel": "常驻坐标",
  "contact.locationValue": "中国，北京 / 上海",
  "contact.formTitle": "快速留言",
  "contact.formNameLabel": "您的称呼",
  "contact.formNamePlaceholder": "例如：李总",
  "contact.formContactLabel": "联系邮箱或微信",
  "contact.formContactPlaceholder": "example@email.com",
  "contact.formIntentLabel": "合作意向简述",
  "contact.formIntentPlaceholder": "请简单描述您的背景与PR需求...",
  "contact.formSubmitText": "发送消息",

  "footer.copyrightName": "林镕 Linrong",
  "footer.copyrightSuffix": "All rights reserved.",
  "footer.tagline": "Brand & PR Strategy for Tech Innovators.",

  "competencies.pageTitle": "能力详情剖析",
  "competencies.pageSubtitle":
    "在复杂的市场环境中，公关不只是写稿发稿，它是企业战略的放大器与风险的防护盾。",

  "competencies.content.slice.media.title": "主流媒体深度稿件",
  "competencies.content.slice.media.desc":
    "如《36氪》、《晚点》等科技核心媒体近万字行业洞察与企业解析长文。",
  "competencies.content.slice.media.tag1": "千字/万字特稿",
  "competencies.content.slice.media.tag2": "技术白皮书",
  "competencies.content.slice.media.link": "https://example.com/article",

  "competencies.content.slice.keynote.title": "高管 Keynote 讲话稿",
  "competencies.content.slice.keynote.desc":
    "为 CEO 在如 WAIC（世界人工智能大会）等顶级峰会定制的主旨演讲中英双语逐字稿。",
  "competencies.content.slice.keynote.tag1": "金句提炼",
  "competencies.content.slice.keynote.tag2": "对外人设",
  "competencies.content.slice.keynote.link": "https://example.com/keynote",

  "competencies.content.slice.interview.title": "对谈发言",
  "competencies.content.slice.interview.desc":
    "涵盖顶尖科技播客播音前 QA 梳理、核心财经周刊面对面访谈的提纲对齐与临场风控。",
  "competencies.content.slice.interview.tag1": "播客文字稿",
  "competencies.content.slice.interview.tag2": "QA红线",
  "competencies.content.slice.interview.link": "https://example.com/interview",

  "competencies.content.slice.video.title": "品牌与技术 TVC",
  "competencies.content.slice.video.desc":
    "从脚本分镜到完片监制，制作高质感的品牌理念形象大片及产品原理解析短视频。",
  "competencies.content.slice.video.metric": "500W+ 播放",
  "competencies.content.slice.video.link": "https://example.com/video",

  ...linkPool("media", "https://example.com/article"),
  ...linkPool("keynote", "https://example.com/keynote"),
  ...linkPool("interview", "https://example.com/interview"),
  ...linkPoolVideo(),
};

function linkPool(slice, primaryUrl) {
  const base = `competencies.content.slice.${slice}.links`;
  const o = {};
  for (let i = 1; i <= 3; i++) {
    o[`${base}.${i}.label`] = `链接选项 ${i}`;
    o[`${base}.${i}.url`] = i === 1 ? primaryUrl : `https://example.com/option-${i}`;
  }
  return o;
}

function linkPoolVideo() {
  const base = "competencies.content.slice.video.links";
  const o = {};
  const primary = "https://example.com/video";
  for (let i = 1; i <= 6; i++) {
    o[`${base}.${i}.label`] = `链接选项 ${i}`;
    o[`${base}.${i}.url`] = i === 1 ? primary : `https://example.com/option-${i}`;
  }
  return o;
}

Object.assign(defaultTexts, sectionKeys());

const defaultImages = {
  "hero.portrait":
    "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400&h=400",
  "projects.p1.image":
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800&h=600",
  "projects.p2.image":
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800&h=600",
  "projects.p3.image":
    "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80&w=800&h=600",
  "competencies.content.slice.media.image":
    "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=1200&h=700",
  "competencies.content.slice.keynote.image":
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200&h=700",
  "competencies.content.slice.interview.image":
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200&h=700",
  "competencies.content.slice.video.image":
    "https://images.unsplash.com/photo-1574717024453-35405667b5eb?auto=format&fit=crop&q=80&w=1200&h=700",
  "competencies.growth.whitepaper.image": "/growth-whitepaper.png",
};

const merge = process.argv.includes("--merge");

let existing = { texts: {}, images: {} };
if (merge && fs.existsSync(outPath)) {
  try {
    const raw = JSON.parse(fs.readFileSync(outPath, "utf8"));
    if (raw && raw.version === 1) {
      existing = {
        texts: typeof raw.texts === "object" ? raw.texts : {},
        images: typeof raw.images === "object" ? raw.images : {},
      };
    }
  } catch {
    // ignore
  }
}

const payload = merge
  ? {
      version: 1,
      texts: { ...defaultTexts, ...existing.texts },
      images: { ...defaultImages, ...existing.images },
    }
  : {
      version: 1,
      texts: { ...defaultTexts },
      images: { ...defaultImages },
    };

fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), "utf8");

const tKeys = Object.keys(payload.texts).length;
const iKeys = Object.keys(payload.images).length;
const sizeKb = (fs.statSync(outPath).size / 1024).toFixed(1);
console.log(`Wrote ${outPath} (${sizeKb} KB) — ${tKeys} text keys, ${iKeys} image keys.`);
