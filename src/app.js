const express =require('express')
const app=express()
const path = require("path")
// 引入body-parser处理不带文件的post请求
const bodyParser=require('body-parser')

//引入express-session为用户设置session
const session =require('express-session')
//引入express-mysql-session将为用户设置的session存储在mysql中
const Store =require('express-mysql-session')
let options={
    host:'localhost',
    user:'root',
    password:'123456',
    port:'3306',
    database:'blogr'
} 
app.use(session({                   //为用户设置session
    name:'sid',
    secret:'sdfjlskdf.&',
    resave:false,
    saveUninitialized:true,
    store:new Store(options),           //session持久化
    cookie:{maxAge:1000*3600*24}        //表示cookie过期时间
}))

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