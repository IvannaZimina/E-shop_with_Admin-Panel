// раннер отвечающий за коннект к бд
const mongoose = require('mongoose');
const db = require('../../../storages/db/index.js');

// настройки с конфигурации в файле config
    // const url = 'mongodb://localhost:27017/myApp';
    // const options = {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // };
const { url, options } = require('../../../config/db');

// сам раннер
const init = () => new Promise( (resolve, reject) => {
    // если произойдет ошибка коннекта, она выховет исключение и сработает reject
    mongoose.connect(url, options);
    
    db.once('error', (err) => {
        // тут ловятся ошибки возникающие в процессе работы бд
        console.log('DB err:', err);
    });

    db.once('open', (err) => {
        // двигает дальше процес раннига. у mongoose есть кеш запросов.
        // порядок не важен, но во избежания странніх ситуаций, он настроен так же, как и другие раннеры
        console.log('Connected to DB');
        resolve();
    });

    db.once('close', () => {
        // уведомление для логов
        console.log('Close connected to DB');
    });
});

module.exports = init;