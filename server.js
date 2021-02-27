const express = require('express')
let mongoose = require('mongoose')
const app = express()
const db = require('./db/you')
const { oilRule, shouyiRule, shouruRule, urea1Rule, urea2Rule, cardRule } = require('./model/userModel')
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
        //数据库连接
    let oilRule1 = mongoose.model('datas', oilRule)
    let shouyi = mongoose.model('shouyis', shouyiRule)
    let shouru = mongoose.model('shourus', shouruRule)
    let urea1 = mongoose.model('urea1', urea1Rule)
    let urea2 = mongoose.model('urea2', urea2Rule)
    let cards = mongoose.model('cards', cardRule)

    let dataObj = {}
    let shouruObj = {}
    let datasUrea1 = {}
    let datasUrea2 = {}
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

    //第一号油的数据查询

    app.get('/urea1', (req, res) => {
            urea1.find({}, function(err, data) {
                res.send(data)
                if (data.length >= 1) {
                    datasUrea1 = data[data.length - 1]
                }

            })
        })
        //第一号油的数据添加，进货，出货情况
    app.post('/addUrea1', (req, res) => {

            const { enter, out, date } = req.body
            let leftovers
            if (datasUrea1.length <= 0) {
                leftovers = (parseFloat(enter) - parseFloat(out))
            } else {
                leftovers = (datasUrea1.leftover + parseFloat(enter) - parseFloat(out))
            }

            console.log(typeof(datasUrea1.leftover), typeof(enter), typeof(out))
            urea1.create({
                enter,
                out,
                leftover: leftovers,
                date: date,
                createTime: new Date()
            }, function(err, data) {
                if (!err) {
                    res.send('添加成功')
                } else {
                    console.log(err)
                }
            })
        })
        //编辑时先查询某一条数据，返回页面
    app.post('/findOneUrea1', (req, res) => {
            const { _id } = req.body
            urea1.findOne({ _id: _id }, function(err, data) {
                if (!err) {
                    res.send(data)
                    console.log(data)

                } else {

                }
            })
        })
        //执行编辑某一条数据
    app.post('/editUrea1', (req, res) => {
        const {
            enter,
            out,
            date,
            _id
        } = req.body
        urea1.updateOne({ _id: _id }, {
            $set: {
                enter,
                out,
                date
            }
        }, function(err, data) {
            if (!err) {
                console.log('编辑成功')
                res.send('编辑成功')
            } else {
                console.log('编辑错误')
            }
        })
    })































    //第二号油的数据查询

    app.get('/urea2', (req, res) => {
        urea2.find({}, function(err, data) {
            res.send(data)
            if (data.length >= 1) {
                datasUrea2 = data[data.length - 1]
            }

        })
    })

    //第2号油的数据添加，进货，出货情况
    app.post('/addUrea2', (req, res) => {

            const { enter, out, date } = req.body
            let leftovers
            if (datasUrea2.length <= 0) {
                leftovers = (parseFloat(enter) - parseFloat(out))
            } else {
                leftovers = (datasUrea2.leftover + parseFloat(enter) - parseFloat(out))
            }

            console.log(typeof(datasUrea2.leftover), typeof(enter), typeof(out))
            urea2.create({
                enter,
                out,
                leftover: leftovers,
                date: date,
                createTime: new Date()
            }, function(err, data) {
                if (!err) {
                    res.send('添加成功')
                } else {
                    console.log(err)
                }
            })
        })
        //编辑时先查询某一条数据，返回页面
    app.post('/findOneUrea2', (req, res) => {
            const { _id } = req.body
            urea2.findOne({ _id: _id }, function(err, data) {
                if (!err) {
                    res.send(data)
                    console.log(data)

                } else {

                }
            })
        })
        //执行编辑某一条数据
    app.post('/editUrea2', (req, res) => {
        const {
            enter,
            out,
            date,
            _id
        } = req.body
        urea2.updateOne({ _id: _id }, {
            $set: {
                enter,
                out,
                date
            }
        }, function(err, data) {
            if (!err) {
                console.log('编辑成功')
                res.send('编辑成功')
            } else {
                console.log('编辑错误')
            }
        })
    })





























    //新加收入数据
    app.post('/addShouru', (req, res) => {
        let key = (shouruObj.kyes + 1)
        console.log(shouruObj.kyes)
        const { weixin1, weixin2, weixin3, alipay, money, date } = req.body
        const totals = (parseFloat(weixin1) + parseFloat(weixin2) + parseFloat(weixin3) + parseFloat(alipay) + parseFloat(money))
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
            createTime: new Date(),
            totals
        }, function(err) {
            if (!err) {
                console.log('添加成功')
                res.send('添加成功')
            } else console.log('添加失败')
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
        //查询某一条收入表中的数据
    app.post('/shouruOneData', (req, res) => {
            const { _id } = req.body
            shouru.findOne({ _id: _id }, function(err, data) {
                if (!err) {
                    console.log('收入单条数据查询成功')
                    res.send(data)
                }
            })
        })
        //提交编辑某条收入数据
    app.post('/editShouruData', (req, res) => {
        const {
            weixin1,
            weixin2,
            weixin3,
            alipay,
            money,
            _id
        } = req.body
        const totals = (parseFloat(weixin1) + parseFloat(weixin2) + parseFloat(weixin3) + parseFloat(alipay) + parseFloat(money))
        shouru.updateOne({ _id }, {
            $set: {
                weixin1,
                weixin2,
                weixin3,
                alipay,
                money,
                totals
            }
        }, function(err, data) {
            if (!err) {
                console.log('编辑收入数据成功')
                res.send('成功')
            } else {
                console.log('编辑收入数据失败')
            }
        })
    })





    //添加油卡数据





    app.post('/addCardData', function(req, res) {
        const {
            wanneng,
            huihui,
            lvchang,
            zhongtian,
            guoka,
            date
        } = req.body
        const totals = parseFloat(wanneng) + parseFloat(huihui) + parseFloat(lvchang) + parseFloat(zhongtian) + parseFloat(guoka)
        cards.create({
            wanneng,
            huihui,
            lvchang,
            zhongtian,
            guoka,
            date,
            createTime: new Date(),
            totals
        }, function(err, data) {
            if (!err) {
                console.log('油卡数据添加成功！')

            }
        })
    })










}, (err) => {
    console.log('数据库连接失败', err)
})