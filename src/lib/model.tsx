"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type ModelId = "deepseek-chat" | "deepseek-v4-pro";

export const MODELS: { id: ModelId; label: string }[] = [
  { id: "deepseek-chat", label: "DeepSeek Chat (Fast)" },
  { id: "deepseek-v4-pro", label: "DeepSeek V4 Pro (Powerful)" },
];

interface ModelContextValue {
  model: ModelId;
  setModel: (m: ModelId) => void;
}

const ModelContext = createContext<ModelContextValue>({
  model: "deepseek-chat",
  setModel: () => {},
});

const STORAGE_KEY = "ai_content_planner_model";

function getStoredModel(): ModelId {
  if (typeof window === "undefined") return "deepseek-chat";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "deepseek-chat" || stored === "deepseek-v4-pro") return stored;
  return "deepseek-chat";
}

export function ModelProvider({ children }: { children: ReactNode }) {
  const [model, setModelState] = useState<ModelId>(getStoredModel);

  const setModel = useCallback((m: ModelId) => {
    setModelState(m);
    localStorage.setItem(STORAGE_KEY, m);
  }, []);

  return (
    <ModelContext.Provider value={{ model, setModel }}>
      {children}
    </ModelContext.Provider>
  );
}

export function useModel() {
  return useContext(ModelContext);
}
