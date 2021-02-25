let mongoose = require('mongoose')
let Schema = mongoose.Schema
let oilRule = new Schema({
    oil1: {
        type: Number,
        required: true
    },
    oil2: {
        type: Number,
        required: true
    },
    oil3: {
        type: Number,
        required: true
    },
    oil4: {
        type: Number,
        required: true
    },
    oil5: {
        type: Number,
        required: true
    },
    date: {
        type: String
            // type: Date,
            // default: Date.now()
    },
    keys: {
        type: Number,
        default: 0
    }
})
let shouyiRule = new Schema({
    oil1: {
        type: Number,
        required: true
    },
    oil2: {
        type: Number,
        required: true
    },
    oil3: {
        type: Number,
        required: true
    },
    oil4: {
        type: Number,
        required: true
    },
    oil5: {
        type: Number,
        required: true
    },
    date: {
        type: String
            // type: Date,
            // default: Date.now()
    },
    keys: {
        type: Number,
        default: 0
    }
})
let shouruRule = new Schema({
    weixin1: {
        type: Number,
        default: 0
    },
    weixin2: {
        type: Number,
        default: 0
    },
    weixin3: {
        type: Number,
        default: 0
    },
    alipay: {
        type: Number,
        default: 0
    },
    money: {
        type: Number,
        default: 0
    },
    kyes: {
        type: Number
    },
    date: {
        type: Date
    },
    createTime: {
        type: Date
    }
})
module.exports = { oilRule, shouyiRule, shouruRule }