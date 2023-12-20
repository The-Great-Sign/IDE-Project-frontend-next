import { create } from 'zustand';

export enum GeneralMessageType {
  ENTER = 'ENTER',
  EXIT = 'EXIT',
  TALK = 'TALK',
}

export interface GeneralMessage {
  messageType: GeneralMessageType;
  userNickname: string;
  content: string;
  currentUsers: number;
}

interface GeneralChatState {
  messages: GeneralMessage[];
  addMessage: (message: GeneralMessage) => void;
}

const useGeneralChatStore = create<GeneralChatState>(set => ({
  messages: [],
  addMessage: (message: GeneralMessage) =>
    set(state => ({
      messages: [...state.messages, message as GeneralMessage],
    })),
}));

// export enum AIMessageType {
//   REVIEW = 'REVIEW',
//   AI_TALK = 'AI_TALK',
// }

// export interface AIMessage {
//   messageType: AIMessageType;
//   content: string;
//   currentUsers?: number;
//   nickName: string;
// }

// type ChatMessage = GeneralMessage | AIMessage;
// const useAIChatStore = create<ChatState>(set => ({
//   messages: [],
//   addMessage: (message: ChatMessage) =>
//     set(state => ({ messages: [...state.messages, message as AIMessage] })),
// }));

export default useGeneralChatStore;
