import { useState, useEffect } from "react";
import "./CryptoData.css"

const CryptoData = () => {
    const [crypto, setCrypto] = useState("");
    const [search, setSearch] = useState("");
    const [random, setRandom] = useState("");

    const getData = async () => {
        try {
            const request = await fetch("https://api.coincap.io/v2/assets");
            const json = await request.json();
            setCrypto(json);
        } catch(error) {
            console.log(error)
        }
    }
    const getRandom = async () => {
        try {
            const randomList = []
            const randomElement = await crypto.data.map((element) => randomList.push(element))
            const randomSymbol = randomElement[Math.floor(Math.random() * randomElement.length)]
            setRandom(crypto.data[randomSymbol].symbol)
        } catch(error) {
            console.log(error)
        }
        
    }
    useEffect(() => {
        getData();
        getRandom();
    }, []);
    return (
        <>
            <div className="app-container">
                <div className="search-container">
                    <input type="text" placeholder="your currency..." onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="random-container">
                    <a href={`https://www.binance.com/en/trade/${random}_BUSD`}>
                        <button>Big Investment</button>
                    </a>
                </div>
                <div className="card-container">
                    {crypto && crypto.data.filter((crypto) => crypto.name.toLowerCase().includes(search.toLowerCase())).map((c) => (
                        <div className="crypto-card">
                            <h2>{c.name}</h2>
                            <h2>{c.priceUsd}$</h2>
                            <h2>{c.rank}</h2>
                            <h2>{c.symbol}</h2>
                            <h2>{c.supply}</h2>
                            <div className="crypto-card-link">
                                <a href={`https://www.binance.com/en/trade/${c.symbol}_BUSD`}>
                                    <div className="crypto-card-link-button">
                                        <button>Buy Some?</button>
                                    </div>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default CryptoData