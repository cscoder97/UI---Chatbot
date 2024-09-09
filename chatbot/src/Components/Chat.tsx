
import stockData from '../assets/Chatbot - stock data.json'; // Import the stock data
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addMessageToChat, setSelectedExchange, setSelectedStock, clearChat } from '../store/chatSlice';
import '../App.css';



interface Stock {
    code: string;
    stockName: string;
    price: number;
}

interface Exchange {
    code: string;
    stockExchange: string;
    topStocks: Stock[];
}

const Chat: React.FC = () => {
    const dispatch = useDispatch();
    const { chatHistory, selectedExchange, selectedStock } = useSelector((state: RootState) => state.chat);
    const chatBodyRef = useRef<HTMLDivElement>(null);
    const exchanges = stockData as Exchange[];

    // Scroll to the bottom when chat history updates
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [chatHistory]);

    // Handles exchange selection
    const handleExchangeSelection = (exchangeCode: string) => {
        const exchange = exchanges.find((e) => e.code === exchangeCode);
        if (exchange) {
            dispatch(setSelectedExchange(exchangeCode));
            dispatch(setSelectedStock(null));

            // Add user exchange selection bubble
            dispatch(
                addMessageToChat({
                    sender: 'user',
                    content: exchange.stockExchange,
                    type: 'text',
                })
            );

            // Add stock options bubble for the selected exchange
            dispatch(
                addMessageToChat({
                    sender: 'bot',
                    content: `Here are some stocks for ${exchange.stockExchange}:`,
                    type: 'option',
                    options: exchange.topStocks.map((stock) => ({
                        label: stock.stockName,
                        value: stock.code,
                        optionType: 'stock', // Mark this option as a stock
                    })),
                })
            );
        }
    };

    // Handles stock selection
    const handleStockSelection = (stockCode: string) => {
        const exchange = exchanges.find((e) => e.code === selectedExchange);
        const stock = exchange?.topStocks.find((s) => s.code === stockCode);

        if (stock) {
            dispatch(setSelectedStock(stockCode));

            // Add user stock selection bubble
            dispatch(
                addMessageToChat({
                    sender: 'user',
                    content: stock.stockName,
                    type: 'text',
                })
            );

            // Add stock price bubble
            dispatch(
                addMessageToChat({
                    sender: 'bot',
                    content: `The current price of ${stock.stockName} is $${stock.price}.`,
                    type: 'text',
                })
            );

            // Add options for going back or returning to the main menu
            dispatch(
                addMessageToChat({
                    sender: 'bot',
                    content: '',
                    type: 'option',
                    options: [
                        { label: 'Go Back to Stock List', value: 'back-to-stock-list' },
                        { label: 'Go to Main Menu', value: 'main-menu' },
                    ],
                })
            );
        }
    };

    const handleGoBackToStocks = () => {
        const exchange = exchanges.find((e) => e.code === selectedExchange);
        if (exchange) {
            // Re-render the stock list for the selected exchange
            dispatch(
                addMessageToChat({
                    sender: 'bot',
                    content: `Here are the stocks for ${exchange.stockExchange} again:`,
                    type: 'option',
                    options: exchange.topStocks.map((stock) => ({
                        label: stock.stockName,
                        value: stock.code,
                        optionType: 'stock', // Mark this option as a stock
                    })),
                })
            );
        }
    };

    const handleGoBackToMenu = () => {
        // Render the stock exchanges again without clearing the chat
        dispatch(
            addMessageToChat({
                sender: 'bot',
                content: 'Please select a stock exchange:',
                type: 'option',
                options: exchanges.map((exchange) => ({
                    label: exchange.stockExchange,
                    value: exchange.code,
                    optionType: 'exchange', // Mark this option as an exchange
                })),
            })
        );
    };

    // Render chat messages dynamically based on data from Redux
    const renderMessage = (message: any, index: number) => {
        if (message.type === 'text') {
            return (
                <div className={`chat-message ${message.sender}`} key={index}>
                    <div className="chat-avatar">{message.sender === 'user' ? '👤' : '🤖'}</div>
                    <div className="chat-text">{message.content}</div>
                </div>
            );
        } else if (message.type === 'option') {
            return (
                <div className="chat-message bot" key={index}>
                    <div className="chat-avatar">🤖</div>
                    <div className="chat-text">
                        {message.content}
                        <div className="chat-options">
                            {message.options.map((option: any) => (
                                <button
                                    key={option.value}
                                    onClick={() =>
                                        option.value === 'back-to-stock-list'
                                            ? handleGoBackToStocks()
                                            : option.value === 'main-menu'
                                            ? handleGoBackToMenu()
                                            : option.optionType === 'stock'
                                            ? handleStockSelection(option.value)
                                            : handleExchangeSelection(option.value)
                                    }
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">Stock Chatbot</div>
            <div className="chat-body" ref={chatBodyRef}>
                {chatHistory.map((message, index) => renderMessage(message, index))}

                {!selectedExchange && chatHistory.length === 0 && (
                    <div className="chat-message bot">
                        <div className="chat-avatar">🤖</div>
                        <div className="chat-text">
                            Please select a stock exchange:
                            <div className="chat-options">
                                {exchanges.map((exchange) => (
                                    <button key={exchange.code} onClick={() => handleExchangeSelection(exchange.code)}>
                                        {exchange.stockExchange}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
