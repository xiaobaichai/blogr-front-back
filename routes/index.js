const express=require('express')
const router =express.Router()

// 连接数据库
const db =require('../db/db.js')

router.get('/',(req,res)=>{
    res.send('hi')
})




module.exports=router