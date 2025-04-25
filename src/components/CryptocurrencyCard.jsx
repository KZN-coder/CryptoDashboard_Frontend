import React from "react";
import { Card } from "antd";

function formatMarketCap(value) {
    if (value >= 1e9) {
        return `${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
        return `${(value / 1e6).toFixed(2)}M`;
    } else {
        return `${value.toFixed(2)}`;
    }
}

function CryptocurrencyCard(props) {
    const { currency } = props;
    const price = currency.quote.USD.price;
    const percent_change = currency.quote.USD.percent_change_24h;
    const market_cap = currency.quote.USD.market_cap;

    const changeColor = percent_change >= 0 ? "text-green-500" : "text-red-500";

    return (
        <Card
            style={{
                width: 400,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)",
                padding: "1px",
                borderRadius: "6px",
                border: "none", // Убираем стандартную границу карточки
            }}
        >
            {/* Логотип и название криптовалюты */}
            <div className="flex items-center gap-3 mb-4">
                <img
                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}
                    alt={`${currency.name} icon`}
                    className="w-8 h-8 object-contain"
                />
                <span className="text-lg font-semibold">{currency.name}</span>
            </div>

            {/* Горизонтальная полоса */}
            <div className="border-b border-gray-300 mb-4"></div>

            {/* Информация о криптовалюте */}
            <div className="space-y-2">
                <p className="text-gray-700">
                    <span className="font-medium">Actual price:</span>{" "}
                    <span className="font-bold">{parseFloat(price.toFixed(5))}$</span>
                </p>
                <p className={`text-gray-700 ${changeColor}`}>
                    <span className="font-medium">Price change 24h:</span>{" "}
                    <span className="font-bold">{parseFloat(percent_change.toFixed(2))}%</span>
                </p>
                <p className="text-gray-700">
                    <span className="font-medium">Total volume:</span>{" "}
                    <span className="font-bold">${formatMarketCap(market_cap)}</span>
                </p>
            </div>
        </Card>
    );
}

export default CryptocurrencyCard;