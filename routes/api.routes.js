const transliteration = require('../transliteration');
const {Router} = require('express');
const translit = require('../transliteration');
const router = Router();

router.post('/', async(req, res) => {
    try {
        const {source} = req.body;

        const result = translit(source);

        

    } catch (e) {
        res.status(500).json({message: 'Ошибка на сервере'});
    }
});


module.exports = router;