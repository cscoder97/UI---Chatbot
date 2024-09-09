import React from 'react';

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

interface StockListProps {
    exchange: Exchange;
    onSelectStock: (stock: Stock) => void;
    goToHome: () => void;
}

const StockList: React.FC<StockListProps> = ({ exchange, onSelectStock, goToHome }) => {
    return (
        <div>
            <h2>{exchange.stockExchange} - Select a Stock</h2>
            {exchange.topStocks.map((stock) => (
                <button key={stock.code} onClick={() => onSelectStock(stock)}>
                    {stock.stockName}
                </button>
            ))}
            <button onClick={goToHome}>Go to Home Menu</button>
        </div>
    );
};

export default StockList;
