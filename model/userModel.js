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
    },
    totals: {
        type: Number
    }

})

let urea1Rule = new Schema({
    enter: {
        type: Number,
        default: 0
    },
    out: {
        type: Number,
        default: 0
    },

    leftover: {
        type: Number,
        default: 0

    },
    date: {
        type: Date
    },
    createTime: {
        type: Date
    }

})
let urea2Rule = new Schema({
        enter: {
            type: Number,
            default: 0
        },
        out: {
            type: Number,
            default: 0
        },

        leftover: {
            type: Number,
            default: 0

        },
        date: {
            type: Date
        },
        createTime: {
            type: Date
        }

    })
    //油卡
let cardRule = new Schema({
    wanneng: {
        type: Number,
        default: 0
    },
    huihui: {
        type: Number,
        default: 0
    },
    lvchang: {
        type: Number,
        default: 0
    },
    zhongtian: {
        type: Number,
        default: 0
    },
    guoka: {
        type: Number,
        default: 0
    },
    date: {
        type: Date
    },
    createTime: {
        type: Date
    },
    totals: {
        type: Number
    }

})

module.exports = { oilRule, shouyiRule, shouruRule, urea1Rule, urea2Rule, cardRule }