import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';


interface ChatOption {
    label: string;
    value: string;
    optionType: 'stock' | 'exchange' | 'navigate'; // Updated option types
}

interface ChatMessage {
    sender: 'user' | 'bot';
    content: string;
    type: 'text' | 'option';
    options?: ChatOption[]; // Options array
}

interface ChatState {
    chatHistory: ChatMessage[];
    selectedExchange: string | null;
    selectedStock: string | null;
    hasShownWelcome: boolean; // Track if welcome message has been shown
}

const initialState: ChatState = {
    chatHistory: [],
    selectedExchange: null,
    selectedStock: null,
    hasShownWelcome: false, // Initially false
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessageToChat: (state, action: PayloadAction<ChatMessage>) => {
            state.chatHistory.push(action.payload);
        },
        setSelectedExchange: (state, action: PayloadAction<string | null>) => {
            state.selectedExchange = action.payload;
        },
        setSelectedStock: (state, action: PayloadAction<string | null>) => {
            state.selectedStock = action.payload;
        },
        setHasShownWelcome: (state) => {
            state.hasShownWelcome = true;
        }
    },
});
export const getHasShownWelcome = (state: RootState) => state.chat.hasShownWelcome;

export const { addMessageToChat, setSelectedExchange, setSelectedStock, setHasShownWelcome } = chatSlice.actions;

export default chatSlice.reducer;
