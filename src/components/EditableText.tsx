import React, { useEffect, useMemo, useState } from "react";
import { useVisualEdit } from "../context/VisualEditContext";

type EditableTextProps = {
  storageKey: string;
  fallback: string;
  className?: string;
  multiline?: boolean;
};

export default function EditableText({ storageKey, fallback, className, multiline }: EditableTextProps) {
  const { editMode, getText, setText } = useVisualEdit();
  const valueFromStore = getText(storageKey, fallback);
  const [draft, setDraft] = useState(valueFromStore);

  useEffect(() => {
    setDraft(valueFromStore);
  }, [valueFromStore]);

  const baseClass = useMemo(
    () =>
      editMode
        ? "outline-none ring-1 ring-primary/40 bg-primary/5 rounded-md px-2 py-1 focus:ring-2 focus:ring-primary/60 transition-shadow"
        : "",
    [editMode]
  );

  if (!editMode) {
    return <span className={className}>{valueFromStore}</span>;
  }

  if (multiline) {
    return (
      <textarea
        className={[baseClass, "w-full min-h-24 resize-y", className].filter(Boolean).join(" ")}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => setText(storageKey, draft)}
      />
    );
  }

  return (
    <input
      className={[baseClass, "w-full", className].filter(Boolean).join(" ")}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => setText(storageKey, draft)}
    />
  );
}

