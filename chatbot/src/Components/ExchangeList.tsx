import React from 'react';

interface Exchange {
    code: string;
    stockExchange: string;
}

interface ExchangeListProps {
    exchanges: Exchange[];
    onSelect: (exchangeCode: string) => void;
}

const ExchangeList: React.FC<ExchangeListProps> = ({ exchanges, onSelect }) => {
    return (
        <div>
            <h2>Select a Stock Exchange</h2>
            {exchanges.map((exchange) => (
                <button key={exchange.code} onClick={() => onSelect(exchange.code)}>
                    {exchange.stockExchange}
                </button>
            ))}
        </div>
    );
};

export default ExchangeList;
