// 导入模块
const querystring = require('querystring')

// 将字符串转化成对象
console.log(querystring.parse('name=zhangsan&age=22&gender=1'));
console.log(querystring.decode("name=zhangsan&age=22&gender=1"));
// sex：生理上的性别
// gender：社交属性上的性别

// 将对象转化成字符串
console.log(querystring.stringify({username: 'lisi',password: '123456'}));
console.log(querystring.encode({username: 'lisi',password: '123456'}));