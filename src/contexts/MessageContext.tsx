
import { createContext, useContext, useState } from "react";

export interface Message {
    id: string;
    message: string;
    type: 'success' | 'error';
}

interface MessageContextType {
    messages: Message[];
    addMessage: (message: Message) => void;
    removeMessage: (id: string) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: {children: React.ReactNode}) {
    const [messages, setMessages] = useState<Message[]>([]);

    const addMessage = (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const removeMessage = (id: string) => {
        setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
    };

    return (
        <MessageContext.Provider value={{ messages, addMessage, removeMessage }}>
            {children}
        </MessageContext.Provider>
    )
}

export function useMessage() {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessage must be used within a MessageProvider');
    }
    return context;
}