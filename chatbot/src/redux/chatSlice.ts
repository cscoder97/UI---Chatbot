import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import stockData from '../assets/Chatbot - stock data.json'; // Import stock data
import  { Exchange, ChatMessage, ChatState } from '../Interfaces/Interfaces';


const exchanges = stockData as Exchange[];


const initialState: ChatState = {
    chatHistory: [
    {
        sender: 'bot',
        content: "Welcome to the Stock Chatbot! How can I assist you today?",
        type: 'option',
        options: exchanges.map((exchange) => ({
            label: exchange.stockExchange,
            value: exchange.code,
            optionType: 'exchange',
        })),
    },
],
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
    },
});

export const { addMessageToChat, setSelectedExchange, setSelectedStock } = chatSlice.actions;

export default chatSlice.reducer;
