import { FiMessageCircle } from "react-icons/fi";
import { ChatMessage } from "@/lib/chat/types";

interface Props {
    messages: ChatMessage[];
}

export default function MessageList({ messages }: Props) {
    if (messages.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#1268B3]/10 text-[#1268B3]">
                    <FiMessageCircle size={22} />
                </div>
                <p className="text-sm font-medium text-gray-700">How can we help?</p>
                <p className="mt-1 text-xs text-gray-400">
                    Send us a message and we&apos;ll reply shortly.
                </p>
            </div>
        );
    }

    return (
        <div>
            {messages.map((msg, index) => {
                const isUser = msg.sender === "user";
                return (
                    <div
                        key={index}
                        className={`mb-3 flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                        <div className="max-w-[80%]">
                            <div
                                className={`rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                                    isUser
                                        ? "rounded-br-sm bg-[#1268B3] text-white"
                                        : "rounded-bl-sm bg-white text-gray-800 ring-1 ring-black/5"
                                }`}
                            >
                                {msg.text}
                            </div>
                            <div
                                className={`mt-1 text-[10px] text-gray-400 ${
                                    isUser ? "text-right" : "text-left"
                                }`}
                            >
                                {new Date(msg.time).toLocaleTimeString("ru-RU", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
