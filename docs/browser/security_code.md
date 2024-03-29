# 前端安全

### XSS 攻击
跨站脚本攻击（Cross-site scripting），攻击者往 Web 页面里插入可执行的网页脚本代码，当用户浏览该页之时，嵌入其中 Web 里面的脚本代码会被执行，从而可以达到攻击者盗取用户信息或其他侵犯用户安全隐私的目的。

主要分2种：
* 通过URL参数注入，如：链接输入`https://abc/?wd=<script>alert(document.cookie)</script>`
* 通过表单注入脚本。如：表单中输入`<script>alert('入库数据')</script>`

如何预防：
* **转义**：最普遍的做法是转义输入输出的内容，对于引号，尖括号，斜杠进行转义
* Header设置[Content-Security-Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy__by_cnvoid)


### CSRF（Cross-site request forgery，跨站请求伪造）
CSRF 是借用了当前操作者的权限来偷偷地完成某个操作，而不是拿到用户的信息。 

例如，一个支付类网站，给他人转账的接口是http://buy.com/pay?touid=999&money=100，而这个接口在使用时没有任何密码或者 token 的验证，只要打开访问就直接给他人转账。一个用户已经登录了http://buy.com，在选择商品时，突然收到一封邮件，而这封邮件正文有这么一行代码<img src="http://buy.com/pay?touid=999&money=100"/>，他访问了邮件之后，其实就已经完成了购买。 

CSRF 的发生其实是借助了一个 cookie 的特性。我们知道，登录了http://buy.com之后，cookie 就会有登录过的标记了，此时请求http://buy.com/pay?touid=999&money=100是会带着 cookie 的，因此 server 端就知道已经登录了。而如果在http://buy.com去请求其他域名的 API 例如http://abc.com/api时，是不会带 cookie 的，这是浏览器的同源策略的限制。但是 —— 此时在其他域名的页面中，请求http://buy.com/pay?touid=999&money=100，会带着buy.com的 cookie ，这是发生 CSRF 攻击的理论基础。 

预防 CSRF 就是加入各个层级的权限验证，例如现在的购物网站，只要涉及现金交易，肯定要输入密码或者指纹才行。除此之外，敏感的接口使用POST请求而不是GET也是很重要的。 
