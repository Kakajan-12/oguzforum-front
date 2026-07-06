"use client";

import { useState, useRef, useEffect } from "react";

import { FiSend } from "react-icons/fi";

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MAX_TEXTAREA_HEIGHT = 128;

export default function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const scrollHeight = textarea.scrollHeight;

    if (scrollHeight > MAX_TEXTAREA_HEIGHT) {
      textarea.style.height = `${MAX_TEXTAREA_HEIGHT}px`;
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.height = `${scrollHeight}px`;
      textarea.style.overflowY = "hidden";
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [message]);

  const handleSubmit = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    onSend(trimmedMessage);
    setMessage("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.overflowY = "hidden";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-gray-100 bg-white p-3">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={"Write a message..."}
          className="max-h-32 flex-1 resize-none overflow-hidden rounded border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-[#1268B3] focus:bg-white"
          rows={1}
          style={{ minHeight: "40px" }}
        />

        <button
          onClick={handleSubmit}
          disabled={!message.trim()}
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1268B3] text-white transition-colors hover:bg-[#0f5694] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FiSend size={16} />
        </button>
      </div>
    </div>
  );
}
