import React, { useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { HistoryItem } from './HistoryItemComponent';

export const Transliteration = () => {
    const {loading, error, request} = useHttp();
    const [formTranslit, setFormTranslit] = useState({
        source: '', result: ''
    });
    const [status, setStatus] = useState('OK');
    const [amount, setAmount] = useState();
    const [history, setHistory] = useState([]);

    const changeSourceHandler = event => {
        setFormTranslit({...formTranslit, [event.target.name]: event.target.value});
    }

    const processingHandler = async () => {
        try {
            const data = await request('/api', 'POST', {'data': formTranslit.source});
            setFormTranslit({...formTranslit, result: data.data});
            setStatus('OK');
        } catch (err) {
            console.log(`Error: ${err}`);
            setStatus('Ошибка на сервере, попробуйте снова');
        }
    }

    const changeAmountHandler = event => setAmount(event.target.value);

    const recievingHistoryHandler = async () => {
        try {
            const data = await request(`/history?size=${amount}`, 'GET');
            setHistory(data.data);
            setStatus('OK');
        } catch (err) {
            console.log(`Error: ${err}`);
            setStatus('Ошибка на сервере, попробуйте снова');
        }
    }

    return (
        <div>
            <h1>Transliteration</h1>
            <form>
                <input type="text" id="source" name="source" placeholder="Введите слово" onChange={changeSourceHandler} />
                <button type="button" onClick={processingHandler}>Перевести</button>
                <input type="text" id="result" name="result" placeholder="Результат" disabled="true" value={formTranslit.result} />
            </form>
            <span>Статус сервера: {status}</span>
            <form>
                <h2>История последних запросов</h2>
                <input type="number" id="amount" name="amount" placeholder="Введите количество" onChange={changeAmountHandler}/>
                <button type="button" onClick={recievingHistoryHandler}>Получить</button>
                {history.map(item => <HistoryItem data={item} />)}
            </form>
        </div>
    )
}