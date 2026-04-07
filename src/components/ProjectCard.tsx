import React, { useEffect, useMemo, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useVisualEdit } from '../context/VisualEditContext';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  metrics: string[];
  imageUrl: string;
  replay: string;
}

function splitReplayLines(text: string) {
  return text.split('\n').map((s) => s.trim()).filter(Boolean);
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, category, description, metrics, imageUrl, replay }) => {
  const { editMode, getText } = useVisualEdit();
  const [showReplay, setShowReplay] = useState(false);

  useEffect(() => {
    if (editMode) setShowReplay(true);
  }, [editMode]);

  const titleText = useMemo(() => getText(`projects.${id}.title`, title), [getText, id, title]);
  const categoryText = useMemo(() => getText(`projects.${id}.category`, category), [getText, id, category]);
  const descriptionText = useMemo(
    () => getText(`projects.${id}.description`, description),
    [getText, id, description]
  );
  const replayText = useMemo(() => getText(`projects.${id}.replay`, replay), [getText, id, replay]);

  return (
    <div data-cmp="ProjectCard" className="group rounded-2xl overflow-hidden bg-card border border-border shadow-custom flex flex-col md:flex-row">
      <div className="w-full md:w-2/5 overflow-hidden border-b md:border-b-0 md:border-r border-border bg-muted">
        <EditableImage
          storageKey={`projects.${id}.image`}
          fallbackSrc={imageUrl}
          alt={title}
          className="w-full h-full object-cover min-h-[300px] transform group-hover:scale-105 transition-transform duration-500 will-change-transform"
        />
      </div>
      <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
        <div className="text-primary font-medium text-sm mb-3 uppercase tracking-wider">
          {editMode ? (
            <EditableText storageKey={`projects.${id}.category`} fallback={category} className="bg-transparent" />
          ) : (
            categoryText
          )}
        </div>
        <h3 className="text-2xl font-bold mb-4 text-foreground">
          {editMode ? (
            <EditableText storageKey={`projects.${id}.title`} fallback={title} className="bg-transparent" />
          ) : (
            titleText
          )}
        </h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {editMode ? (
            <EditableText
              storageKey={`projects.${id}.description`}
              fallback={description}
              className="bg-transparent"
              multiline
            />
          ) : (
            descriptionText
          )}
        </p>
        
        <div className="flex flex-wrap gap-3 mb-8 mt-auto">
          {metrics.map((metric, index) => {
            const mKey = `projects.${id}.metrics.${index}`;
            const mText = getText(mKey, metric);
            if (!editMode) {
              return (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full border border-border bg-background text-xs font-semibold text-foreground"
                >
                  {mText}
                </span>
              );
            }

            return (
              <EditableText
                key={index}
                storageKey={mKey}
                fallback={metric}
                className="inline-flex items-center px-3 py-1 rounded-full border border-border bg-background text-xs font-semibold text-foreground w-auto"
              />
            );
          })}
        </div>
        
        <button
          type="button"
          onClick={() => setShowReplay((v) => !v)}
          className="inline-flex items-center font-medium text-primary hover:text-primary/80 transition-colors w-fit gap-2"
        >
          {showReplay ? "收起复盘" : "查看完整复盘"} <ExternalLink className="w-4 h-4" />
        </button>

        {showReplay && (
          <div className="mt-6 pt-6 border-t border-border">
            {editMode ? (
              <EditableText
                storageKey={`projects.${id}.replay`}
                fallback={replay}
                multiline
                className="bg-transparent w-full min-h-40"
              />
            ) : (
              <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {splitReplayLines(replayText).join('\n')}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;