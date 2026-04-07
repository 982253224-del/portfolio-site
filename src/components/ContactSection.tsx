import React from 'react';
import { Mail, Linkedin, MapPin, Send } from 'lucide-react';
import EditableText from './EditableText';
import { useVisualEdit } from '../context/VisualEditContext';

const ContactSection: React.FC = () => {
  const { getText, editMode } = useVisualEdit();

  return (
    <section data-cmp="ContactSection" id="contact" className="w-full py-24 bg-background relative z-10">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Deep, sophisticated, subtle dark card avoiding overly bright purples */}
        <div 
          className="rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden border border-white/5"
          style={{ backgroundColor: '#09080c' }}
        >
          {/* Subtle illumination at the edges only */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[130px] pointer-events-none opacity-50 mix-blend-screen"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none opacity-40 mix-blend-screen"></div>
          
          {/* Tiny structural grid faintly visible */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_10%,transparent_100%)] pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white/95">
                <EditableText storageKey="contact.title" fallback="期待您的联络" className="bg-transparent" />
              </h2>
              <p className="text-white/60 mb-12 text-lg max-w-md leading-relaxed font-light">
                <EditableText
                  storageKey="contact.description"
                  fallback="无论是寻找全职的公关一号位，还是需要经验丰富的品牌传播顾问咨询，我都时刻准备着为您提供专业洞见。"
                  className="bg-transparent"
                  multiline
                />
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-5 group cursor-pointer">
                  <div className="w-14 h-14 bg-[#14121a] border border-white/5 rounded-2xl flex items-center justify-center group-hover:border-primary/30 transition-colors shadow-lg">
                    <Mail className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm text-white/40 mb-1 font-medium tracking-wide">
                      <EditableText storageKey="contact.emailLabel" fallback="邮件沟通" className="bg-transparent" />
                    </div>
                    <div className="font-medium text-lg text-white/80 group-hover:text-white transition-colors">
                      <EditableText storageKey="contact.emailValue" fallback="alex.zhang@example.com" className="bg-transparent" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-5 group cursor-pointer">
                  <div className="w-14 h-14 bg-[#14121a] border border-white/5 rounded-2xl flex items-center justify-center group-hover:border-primary/30 transition-colors shadow-lg">
                    <Linkedin className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm text-white/40 mb-1 font-medium tracking-wide">
                      <EditableText storageKey="contact.linkedinLabel" fallback="职场领英" className="bg-transparent" />
                    </div>
                    <div className="font-medium text-lg text-white/80 group-hover:text-white transition-colors">
                      <EditableText storageKey="contact.linkedinValue" fallback="linkedin.com/in/alex-hz" className="bg-transparent" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-[#14121a] border border-white/5 rounded-2xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-5 h-5 text-white/70" />
                  </div>
                  <div>
                    <div className="text-sm text-white/40 mb-1 font-medium tracking-wide">
                      <EditableText storageKey="contact.locationLabel" fallback="常驻坐标" className="bg-transparent" />
                    </div>
                    <div className="font-medium text-lg text-white/80">
                      <EditableText storageKey="contact.locationValue" fallback="中国，北京 / 上海" className="bg-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form customized to match dark sleek theme */}
            <div className="bg-[#110f17]/80 backdrop-blur-md rounded-[2rem] p-8 lg:p-10 text-white shadow-2xl border border-white/5">
              <h3 className="text-2xl font-medium mb-8 tracking-wide text-white/90">
                <EditableText storageKey="contact.formTitle" fallback="快速留言" className="bg-transparent" />
              </h3>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/50">
                    <EditableText storageKey="contact.formNameLabel" fallback="您的称呼" className="bg-transparent" />
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#1a1722] border border-white/5 rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary/40 text-white placeholder:text-white/20 transition-colors"
                    placeholder={getText("contact.formNamePlaceholder", "例如：李总")}
                  />
                  {editMode && (
                    <div className="mt-2">
                      <EditableText storageKey="contact.formNamePlaceholder" fallback="例如：李总" className="bg-transparent text-white/60 text-sm" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/50">
                    <EditableText storageKey="contact.formContactLabel" fallback="联系邮箱或微信" className="bg-transparent" />
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#1a1722] border border-white/5 rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary/40 text-white placeholder:text-white/20 transition-colors"
                    placeholder={getText("contact.formContactPlaceholder", "example@email.com")}
                  />
                  {editMode && (
                    <div className="mt-2">
                      <EditableText storageKey="contact.formContactPlaceholder" fallback="example@email.com" className="bg-transparent text-white/60 text-sm" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/50">
                    <EditableText storageKey="contact.formIntentLabel" fallback="合作意向简述" className="bg-transparent" />
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-[#1a1722] border border-white/5 rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary/40 text-white placeholder:text-white/20 resize-none transition-colors"
                    placeholder={getText("contact.formIntentPlaceholder", "请简单描述您的背景与PR需求...")}
                  ></textarea>
                  {editMode && (
                    <div className="mt-2">
                      <EditableText storageKey="contact.formIntentPlaceholder" fallback="请简单描述您的背景与PR需求..." className="bg-transparent text-white/60 text-sm" />
                    </div>
                  )}
                </div>
                <button className="w-full bg-primary/90 text-white font-medium text-base py-4 rounded-xl hover:bg-primary transition-all flex justify-center items-center gap-2 mt-6">
                  <EditableText storageKey="contact.formSubmitText" fallback="发送消息" className="bg-transparent" /> <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;