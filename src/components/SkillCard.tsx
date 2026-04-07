import React from 'react';
import { LucideIcon, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useVisualEdit } from '../context/VisualEditContext';
import EditableText from './EditableText';

interface SkillCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  linkTo?: string;
  storageId?: string;
}

const SkillCard: React.FC<SkillCardProps> = ({
  title,
  description,
  icon: Icon,
  linkTo = "/competencies",
  storageId,
}) => {
  const { editMode } = useVisualEdit();
  const targetLink = editMode
    ? `${linkTo}${linkTo.includes("?") ? "&" : "?"}edit=1`
    : linkTo;

  const cardInner = (
    <>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-125" />
      
      {/* Top right icon */}
      <div className="absolute top-6 right-6 opacity-0 translate-x-2 -translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-primary">
        <ArrowUpRight className="w-6 h-6" />
      </div>

      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
        <Icon strokeWidth={2} className="w-7 h-7" />
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
        {storageId ? (
          <EditableText storageKey={`skills.${storageId}.title`} fallback={title} className="bg-transparent" />
        ) : (
          title
        )}
      </h3>
      <p className="text-muted-foreground leading-relaxed transition-colors group-hover:text-foreground/80">
        {storageId ? (
          <EditableText
            storageKey={`skills.${storageId}.description`}
            fallback={description}
            className="bg-transparent"
            multiline
          />
        ) : (
          description
        )}
      </p>
    </>
  );

  const className =
    "block bg-card p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 shadow-custom group relative overflow-hidden hover:-translate-y-1";

  if (editMode) {
    return (
      <div data-cmp="SkillCard" className={className} role="group" aria-label="Skill card (edit mode)">
        {cardInner}
        <Link
          to={targetLink}
          className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          进入详情
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <Link to={targetLink} data-cmp="SkillCard" className={className}>
      {cardInner}
    </Link>
  );
};

export default SkillCard;