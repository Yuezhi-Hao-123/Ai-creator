"use client";

import { useEffect, useState, createContext, useContext, useCallback, type ReactNode } from "react";

/**
 * Toast — lightweight notification that slides up from the bottom.
 * Auto-dismisses after 3 seconds.
 *
 * Usage:
 *   const { showToast } = useToast();
 *   showToast("Profile saved", "success");
 */

type ToastType = "success" | "error" | "info";

interface ToastData {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = nextId++;
      setToasts((prev) => [...prev, { id, message, type }]);
    },
    []
  );

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDone={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({
  toast,
  onDone,
}: {
  toast: ToastData;
  onDone: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => setVisible(true));

    // Auto-dismiss
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 300); // wait for exit animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onDone]);

  const colorMap: Record<ToastType, string> = {
    success: "bg-emerald-700 text-white",
    error: "bg-red-600 text-white",
    info: "bg-gray-800 text-white",
  };

  return (
    <div
      className={[
        "px-4 py-2.5 rounded-[var(--radius-button)] text-sm font-medium shadow-lg pointer-events-auto transition-all duration-300",
        colorMap[toast.type],
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      ].join(" ")}
    >
      {toast.message}
    </div>
  );
}
