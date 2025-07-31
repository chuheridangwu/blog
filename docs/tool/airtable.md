# airtable
使用airtable可以做一个数据的管理，当做免费的数据库，可以传图片，支持JavaScript。

airtable 可以创建多个数据库，数据库中可以创建多个表格，表中对应的是多个视图，视图只负责展示不同的样式，里面的数据是一样的。

级别	| 名称	 | 说明
---- | ---- | ----
顶层	| Workspace (工作区) |	包含多个Base的容器
中层	| Base (数据库)	 | 相当于一个完整数据库项目
底层	| Table (表)	| 存储特定类型数据的集合
底层	| View (视图)	| 同一表数据的不同展示方式

## 数据库的ID
如果使用JavaScript获取和创建数据，需要三个值，可以API秘钥，Base ID 和 Table ID或者Table名称。Base ID需要在对应的[api文档](https://airtable.com/developers/web/api/introduction)中去找，在当前页面下找你对应的数据库，点击之后就可以看到对应的Base ID。

或者在官网中点击自己的数据库，对应的网址以app开头的那段就是你的Base ID,比如`https://airtable.com/appge6qzUROzziF`,对应的`appge6qzUROzziF`就是Base ID,而且你如果想查看数据库的webapi,可以直接添加后缀`https://airtable.com/appge6qzUROzziF/api/docs`进行查看。


* [airtable官网](https://airtable.com/)
* [api文档](https://airtable.com/developers/web/api/introduction)