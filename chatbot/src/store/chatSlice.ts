import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatMessage {
    sender: 'user' | 'bot';
    content: string;
    type: 'text' | 'option';
    options?: { label: string; value: string }[];
}

interface ChatState {
    chatHistory: ChatMessage[];
    selectedExchange: string | null;
    selectedStock: string | null;
}

const initialState: ChatState = {
    chatHistory: [],
    selectedExchange: null,
    selectedStock: null,
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
        clearChat: (state) => {
            state.selectedExchange = null;
            state.selectedStock = null;
            state.chatHistory = [];
        },
    },
});

export const { addMessageToChat, setSelectedExchange, setSelectedStock, clearChat } = chatSlice.actions;

export default chatSlice.reducer;
