import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addMessageToChat, setSelectedExchange, setSelectedStock } from '../../redux/chatSlice';
import ChatBubble from '../ChatBubble/ChatBubble';
import stockData from '../../assets/Chatbot - stock data.json'; // Import stock data
import '../../App.css';
import  { Exchange } from '../../Interfaces/Interfaces';


const ChatContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { chatHistory, selectedExchange } = useSelector((state: RootState) => state.chat);
    const chatBodyRef = useRef<HTMLDivElement>(null);
    const exchanges = stockData as Exchange[];

    const [isChatOpen, setIsChatOpen] = useState(false); // State for controlling chat visibility

    // Scroll to the bottom of chat when a new message is added
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [chatHistory]);

    // Handle exchange selection
    const handleExchangeSelection = (exchangeCode: string) => {
        const exchange = exchanges.find((e) => e.code === exchangeCode);
        if (exchange) {
            dispatch(setSelectedExchange(exchangeCode));
            dispatch(setSelectedStock(null));

            // Add user's selected exchange to chat
            dispatch(addMessageToChat({
                sender: 'user',
                content: exchange.stockExchange,
                type: 'text',
            }));

            // Add stock options from the selected exchange
            dispatch(addMessageToChat({
                sender: 'bot',
                content: `Here are some stocks for ${exchange.stockExchange}:`,
                type: 'option',
                options: exchange.topStocks.map((stock) => ({
                    label: stock.stockName,
                    value: stock.code,
                    optionType: 'stock',
                })),
            }));
        }
    };

    // Handle stock selection
    const handleStockSelection = (stockCode: string) => {
        const exchange = exchanges.find(e => e.code === selectedExchange);
        const stock = exchange?.topStocks.find(s => s.code === stockCode);

        if (stock) {
            // Add user's selected stock to chat
            dispatch(addMessageToChat({
                sender: 'user',
                content: stock.stockName,
                type: 'text',
            }));

            // Add stock price
            dispatch(addMessageToChat({
                sender: 'bot',
                content: `The current price of ${stock.stockName} is $${stock.price}.`,
                type: 'text',
            }));

            // Add navigation options (Go back to stock list or main menu)
            dispatch(addMessageToChat({
                sender: 'bot',
                content: '',
                type: 'option',
                options: [
                    { label: 'Go Back to Stock List', value: 'back-to-stock-list', optionType: 'navigate' },
                    { label: 'Go to Main Menu', value: 'main-menu', optionType: 'navigate' }
                ]
            }));
        }
    };

    // Handle going back to the stock list
    const handleGoBackToStocks = () => {
        const exchange = exchanges.find((e) => e.code === selectedExchange);
        if (exchange) {
            // Add stock options for the current exchange again
            dispatch(addMessageToChat({
                sender: 'bot',
                content: `Here are some stocks for ${exchange.stockExchange}:`,
                type: 'option',
                options: exchange.topStocks.map((stock) => ({
                    label: stock.stockName,
                    value: stock.code,
                    optionType: 'stock',
                })),
            }));
        }
    };

    // Handle going back to the main menu
    const handleGoBackToMenu = () => {
        // Add stock exchange selection prompt
        dispatch(addMessageToChat({
            sender: 'bot',
            content: 'Please select a stock exchange:',
            type: 'option',
            options: exchanges.map((exchange) => ({
                label: exchange.stockExchange,
                value: exchange.code,
                optionType: 'exchange',
            })),
        }));
    };

    // Handle option click (differentiate between exchange, stock, and navigation actions)
    const handleOptionClick = (optionValue: string, optionType: string) => {
        if (optionType === 'stock') {
            handleStockSelection(optionValue);
        } else if (optionType === 'exchange') {
            handleExchangeSelection(optionValue);
        } else if (optionValue === 'back-to-stock-list') {
            handleGoBackToStocks();
        } else if (optionValue === 'main-menu') {
            handleGoBackToMenu();
        }
    };

    // Render chat messages dynamically based on data from Redux
    const renderMessage = (message: any, index: number) => {
        return (
            <ChatBubble
                key={index}
                sender={message.sender}
                content={message.content}
                type={message.type}
                options={message.options}
                handleOptionClick={handleOptionClick}
            />
        );
    };

    return (
        <>
            {!isChatOpen && (
                <button 
                    className="chat-toggle-button"
                    onClick={() => setIsChatOpen(true)}
                    style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}
                >
                    Open Chat
                </button>
            )}

            {isChatOpen && (
                <div className="chat-container" style={{ position: 'fixed', bottom: '20px', right: '20px', width: '400px', height: '600px', zIndex: 9999, background: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                    <div className="chat-header" style={{ background: '#007BFF', color: '#fff', padding: '10px', borderRadius: '10px 10px 0 0' }}>
                        Stock Chatbot
                        <button onClick={() => setIsChatOpen(false)} style={{ float: 'right', color: '#fff', background: 'none', border: 'none', cursor: 'pointer' }}>✖</button>
                    </div>
                    <div className="chat-body" ref={chatBodyRef} style={{ padding: '10px', overflowY: 'auto', height: 'calc(100% - 60px)' }}>
                        {chatHistory.map((message, index) => renderMessage(message, index))}
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatContainer;