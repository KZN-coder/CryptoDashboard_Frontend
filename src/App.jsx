import React, { useEffect, useState } from 'react';
import { Menu, Spin } from 'antd';
import axios from "axios";
import CryptocurrencyCard from "./components/CryptocurrencyCard.jsx";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type
    };
}

const App = () => {

    const [currencies, setCurrencies] = useState([]);
    const [currencyId, setCurrencyId] = useState(1);
    const [currencyData, setCurrencyData] = useState(null);

    const fetchCurrencies = () => {
        axios.get('http://127.0.0.1:8000/cryptocurrencies').then(r => {
            const currenciesResponse = r.data;
            const menuItems = [
                getItem('Список криптовалют', 'g1', null, currenciesResponse.map(c => {
                    return { label: c.name, key: c.id }
                }), 'group'),
            ]
            setCurrencies(menuItems);
        })
    }

    const fetchCurrency = () => {
        axios.get(`http://127.0.0.1:8000/cryptocurrencies/${currencyId}`).then(r => {
            setCurrencyData(r.data)
        })
    }

    useEffect(() => {
        fetchCurrencies();
    }, []);

    useEffect(() => {
        setCurrencyData(null);
        fetchCurrency();
    }, [currencyId]);

    const onClick = e => {
        setCurrencyId(e.key);
    };

    return (
        <div className="flex bg-white min-h-screen">
            {/* Левое меню */}
            <Menu
                onClick={onClick}
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                mode="inline"
                items={currencies}
                theme="light" // Установка светлой темы для меню
                className="h-screen overflow-scroll border-r border-gray-200 custom-scrollbar"
            />

            {/* Основной контент */}
            <div className="flex mx-auto my-auto">
                {currencyData ? (
                    <CryptocurrencyCard currency={currencyData} />
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <Spin size="large" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;