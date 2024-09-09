export interface Stock {
    code: string;
    stockName: string;
    price: number;
}

export interface Exchange {
    code: string;
    stockExchange: string;
    topStocks: Stock[];
}

export interface ChatOption {
    label: string;
    value: string;
    optionType: 'stock' | 'exchange' | 'navigate'; // Updated option types
}

export interface ChatMessage {
    sender: 'user' | 'bot';
    content: string;
    type: 'text' | 'option';
    options?: ChatOption[]; // Options array
}

export interface ChatState {
    chatHistory: ChatMessage[];
    selectedExchange: string | null;
    selectedStock: string | null;
}