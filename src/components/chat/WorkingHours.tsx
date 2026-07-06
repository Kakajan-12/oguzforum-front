"use client";

import { useState } from "react";

interface WorkingHoursProps {
  onLeaveMessage: (email: string, message: string) => void;
}

export default function WorkingHours({ onLeaveMessage }: WorkingHoursProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setIsSubmitting(true);
    onLeaveMessage(email, message);
    setEmail("");
    setMessage("");
    setIsSubmitting(false);
  };

  return (
    <div className="p-4">
      <div className="mb-4 rounded bg-[#1268B3]/5 p-3 text-center">
        <h3 className="text-sm font-semibold text-gray-800">
          {"It's not working hours now"}
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          {"We are online from 10:00 to 19:00 (UTC+5)"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-xs font-semibold text-gray-700"
          >
            {"Your Email *"}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-[#1268B3] focus:bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-1 block text-xs font-semibold text-gray-700"
          >
            {"Your message *"}
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={"Describe your question..."}
            rows={3}
            required
            className="w-full resize-none rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-[#1268B3] focus:bg-white"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-[#1268B3] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0f5694] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? `${"Sending..."}` : `${"Send a message"}`}
        </button>

        <p className="text-center text-xs text-gray-400">
          {"We will reply to you by email during business hours."}
        </p>
      </form>
    </div>
  );
}
