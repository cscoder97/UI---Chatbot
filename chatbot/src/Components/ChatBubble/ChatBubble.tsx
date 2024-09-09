import ChatOptions from '../ChatOptions/ChatOptions';

interface ChatBubbleProps {
    sender: 'user' | 'bot';
    content: string;
    type: 'text' | 'option';
    options?: { label: string; value: string; optionType: string }[];
    handleOptionClick?: (value: string, optionType: string) => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ sender, content, type, options, handleOptionClick }) => {
    return (
        <div className={`chat-message ${sender}`}>
            <div className="chat-avatar">{sender === 'user' ? '👤' : '🤖'}</div>
            {type === 'text' ? (
                <div className="chat-text">{content}</div>
            ) : (
                <ChatOptions content={content} options={options!} handleOptionClick={handleOptionClick!} />
            )}
        </div>
    );
};

export default ChatBubble;

