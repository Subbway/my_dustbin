//引入内置模块
const http = require('http');
const app = http.createServer((request,response)=>{

});
//引入文件模块
let {PORT} = require("../../config")
console.log(PORT);
app.listen(PORT,()=>{
    console.log('http://localhost:%s',PORT)
});
