import {useState} from 'react';
import axios from 'axios';

export default function Backtest() {
    const [ticker, setTicker] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await axios.post('http://localhost:8080/api/v1/backtest', {
                ticker,
                startDate,
                endDate,
                strategy: ""
            });

            setResult(result.data.total_return);
        } catch (error) {
            console.error('요청 실패', error);
            setResult('???');

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 ">
            <div className="flex flex-col justify-center items-center text-4xl font-bold mb-6">
                BackTest
            </div>
            <form onSubmit={handleSubmit} className="flex gap-4">
                <input
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    placeholder="티커 입력"
                    className="border px-3 py-2 rounded p-2"
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border px-3 py-2 rounded p-2"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border px-3 py-2 rounded p-2"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    전송
                </button>
            </form>

            {loading && <p className="mt-4">로딩 중...</p>}
            {result !== null && <p className="mt-4">수익률: {result}</p>}
            <p>Backtest your strategies here.</p>
        </div>
    );
}
