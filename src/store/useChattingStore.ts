import { ChattingType } from '@/app/api/websocket';
import { create } from 'zustand';

interface GeneralChatState {
  users: number;
  setUsers: (users: number) => void;
  messages: ChattingType[];
  addMessage: (message: ChattingType) => void;
}

const useGeneralChatStore = create<GeneralChatState>(set => ({
  users: 0,
  setUsers: (users: number) => set({ users }),
  messages: [],
  addMessage: (message: ChattingType) =>
    set(state => ({
      messages: [...state.messages, message as ChattingType],
    })),
}));

export interface AIType {
  success: boolean;
  message: string;
  results: string;
}

interface AIChatState {
  AImessages: AIType[];
  addAIMessage: (message: AIType) => void;
}

const useAIChatStore = create<AIChatState>(set => ({
  AImessages: [],
  addAIMessage: (message: AIType) =>
    set(state => ({
      AImessages: [...state.AImessages, message as AIType],
    })),
}));

interface ChatStore {
  isvisibleChat: boolean;
  toggleChat: () => void;
}

const useVisibleChat = create<ChatStore>(set => ({
  isvisibleChat: true,
  toggleChat: () => set(state => ({ isvisibleChat: !state.isvisibleChat })),
}));

export { useGeneralChatStore, useAIChatStore, useVisibleChat };
