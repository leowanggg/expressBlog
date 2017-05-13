# expressBlog
## 一个基于nodejs, expressjs和mongoDB的个人博客。
### 简介
- #### 框架： nodejs和expressjs；
- #### UI： Bootstrap和jQuery；
- #### 数据库： mongoDB；
- #### 功能：
    - ##### 管理员：
        - 博文的增/删/改;
        - 管理博文下方评论;
        - 管理站内消息；
    - ##### 普通游客：
        - 浏览博文；
        - 评论博文；
        - 发送站内消息；

### 使用
- `$ npm install`
- `$ DEBUG=expressBlog:* npm start`

### PS:
- 启动server前需先启动mongoDB数据库`sudo mongod --dbpath database/
`
