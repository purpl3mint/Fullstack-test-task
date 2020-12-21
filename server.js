const express = require('express');
const config = require('config');
const cors = require('cors');
const level = require('level');
const translit = require('./transliteration');

const app = express();
const PORT = config.get('port') || 5000;

const db = level('test-db', {createIfMissing: true}, function (err, db) {
    if (err instanceof level.errors.OpenError) {
      console.log('failed to open database')
}});

app.listen(PORT, () => console.log(`App has been started on port ${PORT}!`));

app.use(cors());
app.use(express.json());

app.post('/api', (req, res) => {
    const {data} = req.body;
    const result = translit(data);

    db.put(data, result, function(err) {
        if (err) return res.status(500).json({'message': 'Ошибка на сервере, попробуйте снова'});

        return res.status(200).json({"status": "success", "data": result});
    });

});

app.get('/history', (req, res) => {
    const size = req.query['size'];
    const result = [];

    console.log(size);

    let stream = db.createReadStream({
        reverse: true,
        limit: size
    });


    stream.on('data', function(record){
        console.log(record['value']);
        result.push(record['value']);
    });

    if (result === []) return res.status(500).json({'message': 'Записи не найдены'});

    return res.status(200).json({'data': result});
});