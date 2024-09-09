import React from 'react';

interface Stock {
    code: string;
    stockName: string;
    price: number;
}

interface StockDetailProps {
    stock: Stock;
}

const StockDetail: React.FC<StockDetailProps> = ({ stock }) => {
    return (
        <div>
            <h2>{stock.stockName}</h2>
            <p>Current Price: ${stock.price}</p>
        </div>
    );
};

export default StockDetail;
