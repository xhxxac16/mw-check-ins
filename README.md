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
[http|https]://domain.com/getSignInHistory?user=&sign_data=&key=
```

+ `user`, **`String` 类型**; **默认值为`空`**。

+ `sign_data`, **`Array` 类型**; **默认值为`空`**。

+ `key`, **`String` 类型**; **默认值为`空`**; 进行有效性验证。