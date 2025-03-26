import React, { useEffect } from 'react';

declare global {
  interface Window {
    AgentInitializer: {
      init: (config: any) => void;
    };
  }
}

export function ChatBot() {
  useEffect(() => {
    if (window.AgentInitializer) {
      window.AgentInitializer.init({
        agentRenderURL: "https://agent.jotform.com/0195cb0f2a7575e39118d7a422c60c6d90ac",
        rootId: "JotformAgent-0195cb0f2a7575e39118d7a422c60c6d90ac",
        formID: "0195cb0f2a7575e39118d7a422c60c6d90ac",
        queryParams: ["skipWelcome=1", "maximizable=1"],
        domain: "https://www.jotform.com",
        isDraggable: false,
        background: "linear-gradient(180deg, #B3D37B 0%, #B3D37B 100%)",
        buttonBackgroundColor: "#3C4C1E",
        buttonIconColor: "#FFF",
        variant: false,
        customizations: {
          "greeting": "Yes",
          "greetingMessage": "Hi! How can I assist you?",
          "openByDefault": "No",
          "pulse": "Yes",
          "position": "right",
          "autoOpenChatIn": "0"
        },
        isVoice: undefined
      });
    }
  }, []);

  return null;
}