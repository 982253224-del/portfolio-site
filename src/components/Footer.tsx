import React from 'react';
import EditableText from './EditableText';

const Footer: React.FC = () => {
  return (
    <footer data-cmp="Footer" className="w-full py-8 border-t border-border bg-background">
      <div className="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} <EditableText storageKey="footer.copyrightName" fallback="林镕 Linrong" className="bg-transparent" />. <EditableText storageKey="footer.copyrightSuffix" fallback="All rights reserved." className="bg-transparent" />
        </div>
        <div className="text-muted-foreground text-sm font-medium">
          <EditableText storageKey="footer.tagline" fallback="Brand & PR Strategy for Tech Innovators." className="bg-transparent" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;