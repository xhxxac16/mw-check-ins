MW Sign-in for WeChat
=====================



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



涉及的预处理功能
----------------

| 功能                                    | 概要                               |
|----------------------------------------|------------------------------------|
| Sass                                   | [Sass](http://sass-lang.com/) 是一种 CSS 扩展语言，提供了许多便利的写法，使得CSS的开发，变得简单和可维护。 |
| JSX                                    | [JSX](http://facebook.github.io/jsx/) 是一个看起来很像 XML 的 JavaScript 语法扩展。|


