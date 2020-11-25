// 导入
const url = require('url')
// 定义一个地址
const href = "http://www.xxx.com:8080/pathname?id=100#bbb";
// parse
// 第二参数不传，则对象的属性query为字符串
// 第二参数传，则对象的属性query为对象（建议用这种方式）
console.log(url.parse(href));
console.log(url.parse(href,true));
// resolve：将url拼接成一个完整的地址
// https://lynnn.cn/foo/bar
console.log(url.resolve("https://lynnn.cn/foo/bar", "bar"));
// https://lynnn.cn/bar
console.log(url.resolve("https://lynnn.cn/foo/bar", "/bar"));