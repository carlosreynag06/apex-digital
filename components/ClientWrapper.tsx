"use client";

import BlueprintPopup from '@/components/BlueprintPopup';
import ChatbotWidget from '@/components/ChatbotWidget';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main id="main" className="pt-header">
        {children}
      </main>
      
      <BlueprintPopup />
      <ChatbotWidget />
    </>
  );
}