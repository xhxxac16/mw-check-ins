应用编程接口
-----------

#### 请求持久存储的签到历史记录数据

```http
[http|https]://domain.com/getSignInHistory?user=&key=
```

+ `user`, **`String` 类型**; **默认值为`空`**。

+ `key`, **`String` 类型**; **默认值为`空`**; 进行有效性验证。

**返回数据的表现：**

```json
[
  {"date": "2015-12-27"},
  {"date": "2016-01-02"},
  {"date": "2016-01-04"}
]
```

#### 发送当前访问页面时签到的记录至服务器端供持久存储

```http
[http|https]://domain.com/saveSignInData?user=&sign_data=&key=
```

+ `user`, **`String` 类型**; **默认值为`空`**。

+ `sign_data`, **`Array` 类型**; **默认值为`空`**。

+ `key`, **`String` 类型**; **默认值为`空`**; 进行有效性验证。



依赖的第三方库&技术
------------

目前，该前端工程依赖的第三方库&技术：

* [React.js](https://facebook.github.io/react/index.html)，用于构建用户界面的 `JavaScript` 库。
* [jQuery](https://jquery.com/)，一个兼容多浏览器的 `JavaSript` 框架，写得更少，做得更多。
* [jQuery UI Calendar](https://jqueryui.com/datepicker/)，一个以 `jQuery` 为基础的 `JavaScript` 用户界面套件（萃取日期插件来辅助表现本工程用户界面）。
* [CSS VW 长度单位](http://web-design-weekly.com/2014/11/18/viewport-units-vw-vh-vmin-vmax/)，相对于视窗宽度的长度单位。



依赖的预处理技术
--------------

| 技术                                    | 概要                               |
|----------------------------------------|------------------------------------|
| Sass                                   | [Sass](http://sass-lang.com/) 是一种 `CSS` 扩展语言，提供了许多便利的写法，使得 `CSS` 的开发，变得简单和可维护。 |
| JSX                                    | [JSX](http://facebook.github.io/jsx/) 是一个看起来很像 `XML` 的 `JavaScript` 语法扩展。|


