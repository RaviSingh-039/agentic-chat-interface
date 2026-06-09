import React, { createContext, useContext, ReactNode } from 'react';
import { useMessageStore, Message, Conversation } from '../store/messageStore';

interface MessageContextType {
  currentConversation: Conversation | null;
  conversations: Conversation[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (message: string, provider?: string, model?: string) => Promise<void>;
  createNewConversation: () => void;
  loadConversation: (id: string) => Promise<void>;
  loadAllConversations: () => Promise<void>;
  deleteConversation: (id: string) => Promise<void>;
  clearError: () => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const store = useMessageStore();

  return (
    <MessageContext.Provider
      value={{
        currentConversation: store.currentConversation,
        conversations: store.conversations,
        isLoading: store.isLoading,
        error: store.error,
        sendMessage: store.sendMessage,
        createNewConversation: store.createNewConversation,
        loadConversation: store.loadConversation,
        loadAllConversations: store.loadAllConversations,
        deleteConversation: store.deleteConversation,
        clearError: store.clearError,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessageContext must be used within MessageProvider');
  }
  return context;
};
