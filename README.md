# animerecord
使用vscode开发。
前端: vuecli+vue3+element plus+nginx。
* 虽然是用vue3，但还是用的vue2语法(还没了解vue3的新特性)，打算以后边学边用vue3语法代替完。
* 使用nginx来作为前端网页服务器(做前后端分离)
后端: node.js+express+mysql。
* 使用node.js作为服务端，并使用pm2来进行管理且部署到服务器。
* 使用express框架来做为web框架处理路由。
* 使用mysql作为数据库，并且为了简单只设计了2个数据表。
## 前端运行
```
cd ./animerecord
npm install
npm run serve
```
## 后端运行
```
cd ./animerecord_nodejs
node app.js
```
## 预想的框架界面
![Alt text](framework.png)

## 网页展示
### 首页
![Alt text](./project_screetshoot/home.png)
* 按时间升序的方式排列出每个追番记录表，其中每个表用卡片做展示。
* 所有的内容修改(除了删除)都会在该页面中做处理。
* 双击单元格可以切换为输入框并修改，当失去焦点时会恢复为原来的单元格。如果修改了内容并且按下回车会提交修改并失去焦点。
* “添加追番”会对当前记录表增添一行记录，但是只有对其做修改了才会提交修改并保留，否则在刷新页面或者切换到别的页面时会自动删除。
* “删除记录表”会删除当前追番记录表，其会弹出一个框做二次确认。
* 如果表中无数据会展示“空状态(empty)”图片。
### 归档
![Alt text](./project_screetshoot/directory.png)
* 以时间线为主题将所有的追番记录列出来(老实说，我觉得用来做主页展示好像更好看点)。
* 如果某个追番日期下无数据，会展示“空状态(empty)”图片。
* 添加对某一个追番记录表中的动画记录做删除，其会弹出一个框做二次确认。
### 添加追番日期
![Alt text](./project_screetshoot/add.jpg)
* 其会向右弹出一个框来输入追番日期从而添加一个追番记录表。当确认添加后会刷新一次首页组件从而再读取数据。(向首页组件添加`inject: ['reload']`)。
## mysql数据表
### anime_date
| date_id(key) | date_name |
| ------- | --------- |
| varchar | varchar   |
* date_id: 使用年月日时分秒的形式来作为唯一id
* date_name: 格式为"2018.1"

### anime_record
| record_id(key) | date_id | anime_name | watch_status|
| ----- | ----- | ----- | ----- |
| varchar | varchar | varchar | varchar | 
* record_id: 使用年月日时分秒的形式来作为唯一id
* date_id: 外键

## 项目的一些改进 TODO
* 添加网页图标 ✔
* 添加项目描述 ✔
* 使用less来替换原先的css格式(也没什么要替换的，只是用了嵌套改写了一些css代码)

## 项目主要功能 TODO
* 左侧导航栏(首页, 归档, 添加追番日期) ✔
* 首页:
  * card-item的展示 ✔
  * card-item的点击单元格即可修改：双击单元格切换成输入框做修改，并且输入框自动对焦。输入框失去焦点时切换回原样并保存数据 ✔
  * card-item的删除: 删除对应的追番记录表 ✔
  * card-item的追番日期修改 ✔
* 归档:
  * 将所有的追番记录用时间线的方式列出来 ✔
  * 添加追番记录的删除，删除一个追番表中的动画 ✔
  * 调大点时间线的时间标题字体(隐藏原有的timestamp，自己做了一个) ✔
* 添加追番日期:
  * 点击后右边弹出一个框，然后可以输入追番日期，确认就是提交，点击空白处就是退出来 ✔
  * 添加完毕后，在主页中能马上出现新的追番记录表(使用inject来做) ✔
* 数据存储：本地json文件存储还是node.js+mysql ?
  * 本地json文件：在Home.vue中获取所有的anime_record并按日期放入每个card-item中，要新增或者修改数据的时候可以用emit返回给Home.vue中做修改。这要求card-item要返回每个anime_record的唯一标识，并根据这个标识做修改。
  * 还是使用node.js+mysql吧。✔
  * 创建一个追番日期的数据表和一个记录追番的数据表(使用年月日分秒作为唯一id)。✔
  * 创建node.js后端和编写路由: 
    * '/getAnimeDate': 获取所有的追番日期 ✔
    * '/getAnimeRecordByDateId': 根据追番日期的id来得到相应的追番记录 ✔
    * '/updateNewAnimeRecord': 添加新的追番记录到相应的追番日期中(点击单元格的记录并修改，如果存在就修改，否则删除) ✔
    * '/updateNewAnimeWatchStatus': 修改追番记录的观看状态 ✔
    * '/addNewAnimeDate': 增添新的追番日期 ✔
    * '/deleteAnimeRecord': 根据date_name删除anime_date的追番日期，并且也删除anime_record中的追番记录 ✔
    * '/updateRecordDateName': 根据date_id修改date_name ✔
    * '/deleteAnime': 删除一个追番表中的动画 ✔
* 部署到aliyun linux服务器:
  * 开放端口 ✔
  * 部署node.js后端 ✔
  * 部署vue前端到nginx ✔
