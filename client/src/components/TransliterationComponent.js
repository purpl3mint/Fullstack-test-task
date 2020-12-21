import React, { useState } from 'react';
import { useHttp } from '../hooks/http.hook';

export const TransliterationComponent = () => {
    const {loading, error, request} = useHttp();
    const [form, setForm] = useState({
        source: '', result: ''
    });
    const [status, setStatus] = useState('OK');

    const ChangeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const processingHandler = async () => {
        try {
            const data = await request('/api', 'POST', {'data': form.source});
            setForm({...form, result: data.data});
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
                <input type="text" id="source" name="source" placeholder="Введите слово" onChange={ChangeHandler}></input>
                <button type="button" onClick={processingHandler}>Перевести</button>
                <input type="text" id="result" name="result" placeholder="Результат" disabled="true" value={form.result}></input>
            </form>
            <span>Статус сервера: {status}</span>
        </div>
    )
}