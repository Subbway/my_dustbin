//引入内置模块
const http = require('http');

//引入文件模块(读取、写入)
const fs = require('fs');//fileSystem

//引入url模块
let url = require('url');

//引入querystring模块，用于get和post数据格式化
let querystring = require('querystring');

//引入path模块
let path = require('path');

//引入path模块
let mime = require('./mime.js');

//引入
const app = http.createServer((req,res)=>{
    
    //格式化url,并格式化url中的search参数
    //解构文件路径
    let {pathname} = url.parse(req.url,true);//url.parse(url, boolean)：把url信息转成对象
    // console.log(pathname)
    //- false(默认)：参数为字符串
    //- true：将参数转转对象
    //pathname:URL中路径，下面例子的 /one
    //path: pathname 和 search的合集
    
    //得到扩展名(返回(.xxx))
    let extname =  path.extname(pathname).substring(1);

    //获取真实路径
    let realpath = path.join(__dirname,pathname);
    console.log(realpath)
    if(extname){
        extname!='html'&&(realpath = path.join(__dirname,'/static',pathname));
        console.log(77)
    }else{
        realpath = path.join(realpath,'/index.html')
        console.log(666)
    }
    fs.readFile(realpath,(err,data)=>{
        if(err){
            //如果读取文件错误，则跑出404
            res.writeHead(404,{'content-type':mime[extname] + 'charset=utf-8'});
            fs.readFile('./404.html',function(err,data){
                if(err){
                    throw err;
                    return;
                }
                res.end(data)
            });
            return;
        }
        //正确读取文件
        res.writeHead(200,{'content-type':mime[extname] + ';charser=utf8'});
        res.end(data)
    })
});
//引入文件模块
let {PORT} = require("./config")
console.log(PORT);
app.listen(PORT,()=>{
    console.log('http://localhost:%s',PORT)
});
