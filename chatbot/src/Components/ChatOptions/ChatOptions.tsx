interface ChatOptionsProps {
    content: string;
    options: { label: string; value: string; optionType: string }[];
    handleOptionClick: (value: string, optionType: string) => void;
}

const ChatOptions: React.FC<ChatOptionsProps> = ({ content, options, handleOptionClick }) => {
    return (
        <div className="chat-text">
            {content}
            <div className="chat-options">
                {options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => handleOptionClick(option.value, option.optionType)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChatOptions;

