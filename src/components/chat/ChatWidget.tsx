"use client";

import { useEffect, useRef, useState } from "react";
import chatStore from "@/lib/chat/chat.store";
import { initWS, onWSMessage, wsSend } from "@/lib/chat/ws";
import { initChat, sendMessage } from "@/lib/chat/chat.service";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import WorkingHours from "./WorkingHours";
import Modal from "./Modal";
import messageIcon from "../../../public/chat.svg";
import Image from "next/image";
import { FiX } from "react-icons/fi";

export default function ChatWidget() {
  const messages = chatStore((s) => s.messages);
  const addMessage = chatStore((s) => s.addMessage);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const [isMinimized, setIsMinimized] = useState(true);
  const [isWorkingHours, setIsWorkingHours] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const showModal = (title: string, message: string) => {
    setModalContent({ title, message });
    setModalOpen(true);
  };

  useEffect(() => {
    const checkWorkingHours = () => {
      const now = new Date();
      const utc5Time = new Date(now.getTime() + 5 * 60 * 60 * 1000);
      const hour = utc5Time.getUTCHours();

      const isWorkTime = hour >= 10 && hour < 19;
      setIsWorkingHours(isWorkTime);
    };

    checkWorkingHours();
    const interval = setInterval(checkWorkingHours, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    initWS();
    initChat();

    onWSMessage((data) => {
      if (data.type === "admin_message") {
        addMessage({
          sender: "admin",
          text: data.message,
          time: Date.now(),
        });

        setIsMinimized(false);
      } else if (data.type === "user_message_sent") {
        addMessage({
          sender: "user",
          text: data.message,
          time: Date.now(),
        });
      } else if (data.type === "offline_message_sent") {
        showModal(
          `${"Message sent"}`,
          `${"Your message has been sent successfully! We will respond during business hours."}`,
        );
      }
    });
  }, [addMessage]);

  useEffect(() => {
    if (!isMinimized && messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages, isMinimized]);

  const handleLeaveMessage = (email: string, messageText: string) => {
    const session = window.sessionStorage.getItem("session");

    wsSend({
      type: "offline_message",
      session_id: session,
      email: email,
      message: messageText,
      timestamp: new Date().toLocaleString("ru-RU", {
        timeZone: "Asia/Tashkent",
      }),
    });
  };

  const unreadAdmin = messages.filter((msg) => msg.sender === "admin").length;

  if (isMinimized) {
    return (
      <>
        <div className="fixed bottom-6 right-6 z-[999]">
          <button
            onClick={() => setIsMinimized(false)}
            aria-label="Open chat"
            className="relative flex h-12 w-12 items-center justify-center rounded bg-[#1268B3] text-white shadow-lg shadow-[#1268B3]/30 transition-transform hover:scale-105"
          >
            <Image src={messageIcon} alt="Message" width={24} height={24} />

            {!isWorkingHours && (
              <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-yellow-400" />
            )}

            {isWorkingHours && unreadAdmin > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[10px] font-semibold">
                {unreadAdmin}
              </span>
            )}
          </button>
        </div>
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={modalContent.title}
        >
          <p className="text-gray-700">{modalContent.message}</p>
        </Modal>
      </>
    );
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[999] flex w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#002A5F] to-[#1268B3] px-4 py-3.5 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <Image src={messageIcon} alt="Message" width={18} height={18} />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">Online Chat</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/80">
                <span
                  className={`h-2 w-2 rounded-full ${isWorkingHours ? "bg-green-400" : "bg-yellow-400"}`}
                />
                {isWorkingHours ? "We are online" : "Not working time"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsMinimized(true)}
            aria-label="Close chat"
            className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex h-96 flex-col bg-gray-50">
          <div ref={messageContainerRef} className="flex-1 overflow-y-auto p-4">
            {isWorkingHours ? (
              <>
                <MessageList messages={messages} />
                <div ref={messagesEndRef} />
              </>
            ) : (
              <WorkingHours onLeaveMessage={handleLeaveMessage} />
            )}
          </div>

          {isWorkingHours && <MessageInput onSend={sendMessage} />}
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
      >
        <p className="text-gray-700">{modalContent.message}</p>
      </Modal>
    </>
  );
}
