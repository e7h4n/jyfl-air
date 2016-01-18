var express = require('express');
var router = express.Router();
var moment = require('moment');
var sprintf = require('sprintf');
var mysql = require('../lib/mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
    mysql.query('SELECT * from data where type = "pm025_air_ug" order by id desc limit 1', function (err, rows, field) {
        if (err) {
            throw err;
        }

        res.locals.latestData = rows[0];
        res.locals.sprintf = sprintf.sprintf;

        mysql.query('SELECT * from data where type = "pm025_air_ug" order by id desc limit 1440', function (err, rows, field) {
            if (err) {
                throw err;
            }

            res.locals.maxData = -1;
            rows.forEach(function (data) {
                if (data.value > res.locals.maxData) {
                    res.locals.maxData = data.value;
                }
            });

            rows.reverse();

            res.locals.historyDatas = rows;
            res.render('index');
        });
    });
});

module.exports = router;
