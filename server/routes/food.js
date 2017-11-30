var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.get('/', function (req, res) {
    console.log("In get good thing");
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        }
        else {
            console.log("in pool");
            client.query('SELECT * from food;', function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
});

router.post('/', function (req, res) {
    var newFood = req.body;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        console.log("made it to app.post pool");
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        }
        else {
            client.query(`INSERT INTO food (name, deliciousness_rating, is_hot)
            VALUES ($1, $2, $3);`, [newFood.name, newFood.deliciousness_rating, newFood.is_hot], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201)
                    }
                });
        }
    });
});;

module.exports = router;