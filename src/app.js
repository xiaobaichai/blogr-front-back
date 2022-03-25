const express =require('express')
const app=express()
const path = require("path")
// 引入body-parser处理不带文件的post请求
const bodyParser=require('body-parser')
 
//配置body-parser中间件
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//开发静态资源
app.use("/public/", express.static(path.join(__dirname, "../public/")));
app.use(express.static(path.join(__dirname, "../dist/"), { maxAge: 86400000 }));

//配置模板引擎art-template
app.engine("html", require("express-art-template"));
//设置模板目录
app.set("views", path.join(__dirname, "../views"));

// 引入路由
const router =require("../routes/index.js")
// 挂载路由
app.use(router)


app.listen(3000,()=>{
    console.log(`Server running at...`)
})