const express = require('express')
let mongoose = require('mongoose')
const app = express()
const db = require('./db/you')
const { oilRule, shouyiRule, shouruRule } = require('./model/userModel')
const bodyParser = require('body-parser')
app.disable('x-powered-by')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db(() => {
    app.get('/', function(req, res) {
        res.send('ok')
    })
    app.listen(3000, (err) => {
        if (!err) console.log('服务器启动成功')
        else console.log(err)
    })

    // let das = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    // console.log(das)
    let oilRule1 = mongoose.model('datas', oilRule)
    let shouyi = mongoose.model('shouyis', shouyiRule)
    let shouru = mongoose.model('shourus', shouruRule)

    let dataObj = {}
    let shouruObj = {}
        //查询油枪数据
    app.get('/get', (req, res) => {
        // res.send('odos')
        oilRule1.find({}, function(err, data) {
            if (!err) {
                console.log('查找成功')
                dataObj = data[data.length - 1]
                res.send(data)
            } else {
                console.log('没有您要查找的数据')
            }
        })
    });

    // oilRule1.find({}, function(err, data) {
    //     if (!err) {
    //         console.log('查找成功')
    //         console.log(data)
    //     } else {
    //         console.log('没有您要查找的数据')
    //     }
    // })
    //查询油枪当天收益
    app.get('/findShouyi', (req, res) => {
        // res.send('odos')
        shouyi.find({}, function(err, data) {
            if (!err) {
                console.log('查找成功')
                res.send(data)
            } else {
                console.log('没有您要查找的数据')
            }
        })
    });
    //新加油枪数据
    app.post('/add', (req, res) => {
        console.log(dataObj + '------------')
        console.log(dataObj.keys)
        const keys2 = (++dataObj.keys)
        console.log(keys2 + '==============')
        const {
            oil1,
            oil2,
            oil3,
            oil4,
            oil5,
            date,

        } = req.body
        console.log(req.body)
        oilRule1.create({
            oil1,
            oil2,
            oil3,
            oil4,
            oil5,
            date,
            keys: keys2
        }, function(err) {
            if (!err) {
                console.log('添加成功')
                res.send('你好呀')

            } else {
                console.log(err)
            }
        })

    });
    //新加油枪当前销量数据
    app.post('/shouyi', (req, res) => {
            console.log(dataObj)
            const oil1 = (req.body.oil1 - dataObj.oil1)
            const oil2 = (req.body.oil2 - dataObj.oil2)
            const oil3 = (req.body.oil3 - dataObj.oil3)
            const oil4 = (req.body.oil4 - dataObj.oil4)
            const oil5 = (req.body.oil5 - dataObj.oil5)
            const date = req.body.date
            const keys = dataObj.keys++

                shouyi.create({
                    oil1,
                    oil2,
                    oil3,
                    oil4,
                    oil5,
                    date,
                    keys: keys
                }, function(err) {
                    if (!err) {
                        console.log('添加成功')
                        res.send('你好呀')
                    } else {
                        console.log(err)
                    }
                })
        })
        //新加收入数据
    app.post('/addShouru', (req, res) => {
        let key = (shouruObj.kyes + 1)
        console.log(shouruObj.kyes)
        const { weixin1, weixin2, weixin3, alipay, money, date } = req.body
            // const dd = new Date(date)
            // let yy = dd.getFullYear()
            // let mm = (dd.getMonth() + 1)
            // if (mm < 10) {
            //     mm = ('0' + mm)
            // }
            // let d = dd.getDay()
            // if (d < 10) {
            //     d = ('0' + d)
            // }
            // const das = yy + "年" + mm + "月" + d + '日'
            // console.log(date.getDay())
        const dd = new Date(date)
        console.log(dd)
        shouru.create({
            weixin1,
            weixin2,
            weixin3,
            alipay,
            money,
            kyes: key,
            date: date,
            createTime: new Date()
        }, function(err) {
            if (!err) console.log('添加成功')
            else console.log('添加失败')
        })
    })

    //查询收入表中的数据
    app.get("/shouruData", (req, res) => {
        shouru.find({}, function(err, data) {
            if (!err) {
                console.log('收入表格数据查询成功')
                console.log(data)
                shouruObj = data[data.length - 1]
                console.log(shouruObj)
                res.send(data)
            } else {
                console.log('收入表格数据查询失败')
            }
        })
    })




    //查询某一条数据

    app.post('/findEdit', (req, res) => {
            const { _id } = req.body
            oilRule1.findOne({ _id: _id }, function(err, data) {
                if (!err) {

                    console.log(data)
                    res.send(data)
                } else {
                    console.log('没有您要查找的数据')
                }
            })
        })
        //编辑某天油枪销量
    app.post('/updateEdit', (req, res) => {

        const {
            _id,
            oil1,
            oil2,
            oil3,
            oil4,
            oil5,
            date
        } = req.body
        console.log(req.body)

        oilRule1.updateOne({ _id: _id }, {
            $set: {
                oil1: oil1,
                oil2: oil2,
                oil3: oil3,
                oil4: oil4,
                oil5: oil5,
                date: date
            }
        }, function(err, data) {
            if (!err) {
                console.log(data)
                res.send('hello')
            } else {
                console.log(err)
            }

        })
    })

}, (err) => {
    console.log('数据库连接失败', err)
})