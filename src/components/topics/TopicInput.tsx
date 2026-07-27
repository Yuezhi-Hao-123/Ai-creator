"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useStrings } from "@/lib/i18n";

interface TopicInputProps {
  onGenerate: (topic: string) => void;
  loading: boolean;
}

export default function TopicInput({ onGenerate, loading }: TopicInputProps) {
  const strings = useStrings();
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || loading) return;
    onGenerate(trimmed);
  };

  return (
    <div className="flex gap-3 items-end">
      <div className="flex-1">
        <Input
          placeholder={strings.topics.inputPlaceholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
          disabled={loading}
        />
      </div>
      <Button onClick={handleSubmit} loading={loading} disabled={!value.trim() || loading} size="lg">
        {loading ? strings.topics.generating : strings.topics.generateButton}
      </Button>
    </div>
  );
}
