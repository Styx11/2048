# 2048

> 仿制的2048，欢迎Android/iOS端的同学Fork

### 如果您想参与编写，以下API可以帮您快速了解我的编程思路
## Grid
Gird栅格对象是游戏的核心部分，它直接作为用户与页面交互的直接渠道。类似于VirtualDOM的设计思想，我们并不直接频繁地操作DOM对象，而是通过栅格系统操作、记录每个单元格的位置信息与相对位置。
## *构造函数*
**Grid(size)**

---
创建一个Grid对象

## *属性*
**score**

---
- 类型：Number,
- 默认值：0
- 描述：记录每次单元格移动时获得的分数

**size**

---
- 类型：Number,
- 默认值：0
- 描述：栅格尺寸

**cells**

---
- 类型：Array,
- 默认值：[]
- 描述：栅格主体

## *方法*
**initGrid()**

---
- 参数：无,
- 返回值：无
- 描述：重置或初始化栅格

**randomCell()**

---
- 参数：无,
- 返回值：{Object} {x: posX, y: posY, value: value}其中，x 和 y 表示单元格的坐标值，value表示其携带的数值
- 描述：随机获取可用单元格

**availableCells()**

---
- 参数：无,
- 返回值：{Object}
   - avail {Array} 返回未用单位格位置 {x: posX, y: posY} 组成的数组
   - unavail {Array} 返回已占用单元格 {x: posX, y: posY, value: value} 组成的数组
- 描述：返回包含单元格状态的对象

**availableCellInline(cell, end, line)**

---
- 参数：
   - {Object} cell 期望获取可用目标的单元格 {x: posX, y: posY, value: value}
   - {Number} end 搜索的结束索引
   - {String} "row"|"col" line 期望搜索行或列
- 返回值：{Object} 搜索结果值 {x: posX, y: posY, value: value}
- 描述：当进行移动时搜索单元格可达到的位置

**updataCell(type, position, value)**

---
- 参数：
   - {String} "fill"|"remove" type 操作类型
   - {Object} 更新的位置 {x: posX, y: posY}
   - {Number} 更新值
- 返回值：无
- 描述：更新单元格状态

**moveCells(key)**

---
- 参数：{Number} key keyCode,
- 返回值：
   - {Array} moveCells 包含一个由移动单元格与目标单元格组成的数组
- 描述：根据key值移动单元格

## Tile
Tile对象是所有DOM对象的操作接口，包括数字砖的创建、数值更改、链接功能键以及数字砖的特效

## *属性*
**container**

---
- 类型：Object,
- 默认值：DOM对象
- 描述：游戏区域的容器

**scoreTile**

---
- 类型：Object,
- 默认值：DOM对象
- 描述：记录当前分值的数字砖

**bestTile**

---
- 类型：Object,
- 默认值：DOM对象
- 描述：记录历史最高分的数字砖

**newGame**

---
- 类型：Object,
- 默认值：DOM对象
- 描述：重启游戏的功能键

## *方法*
**createTile(position, value)**

---
- 参数：
   - {Object} position 数字砖的位置信息 {posX: x, posY: y}
   - {Number} value 数字砖的数值
- 返回值：无
- 描述：绘制数字砖

**delTile()**

---
- 参数：无,
- 返回值：无
- 描述：移除容器中的数字砖对象

**moveTile(oldPosition, newPosition)**

---
- 参数：
   - {Object} oldPosition 将要移动的单元格位置 {posX: x, posY: y}
   - {Object} newPosition 移动目标 {posX: x, posY: y}
- 返回值：无
- 描述：将原单元格移动到新的位置

## KeyboardManager
KeyboardManager对象监听了用户操作相关的事件，其中包括键盘输入与触屏

## *属性*
**events**

---
- 类型：Object,
- 默认值：null
- 描述：events 属性用来储存目标事件以及它们对应的回调函数

**start**

---
- 类型：Object,
- 默认值：null
- 描述：start 属性用以储存触屏事件开始时的位置信息

**end**

---
- 类型：Object,
- 默认值：null
- 描述：end 属性用以储存触屏事件结束时的位置信息

## *方法*
**on(event, callback)**

---
- 参数：
   - {String} event 监听的事件名称
   - {Function} callback 事件对应的回调函数，可有多个
- 返回值：无
- 描述：添加事件监听

**emit(event, data)**

---
- 参数：
   - {String} event 触发的监听事件名称
   - {String|Object|Function|Array|Number}} data 可选，针对不同回调而定
- 返回值：无
- 描述：触发监听事件

**listen()**

---
- 参数：无
- 返回值：无
- 描述：事件监听总线，初始时调用

## localStorageManager
locaStorageManager对象管理着游戏过程的数据状态，并将它们储存至本地

## *属性*
**gameState**

---
- 类型：String,
- 默认值："gameState"
- 描述：gameState 对应了栅格状态的本地存储对象名

**gameScore**

---
- 类型：String,
- 默认值："gameScore"
- 描述：gameScore 对应了游戏分数的本地存储对象名

**bestScore**

---
- 类型：String,
- 默认值："bestScore"
- 描述：bestScore 对应了游戏最高分数的本地存储对象名

**storageManager**

---
- 类型：Object,
- 默认值：window.localStorage
- 描述：storageManager 存储了进行过兼容性处理的localStorage对象

**getGameState(item)**

---
- 参数：{String} item 本地存储对象名,
- 返回值：{Array|Number} 本地存储对象
- 描述：获得本地存储对象

**setGameState(item, value)**

---
- 参数：
   - {String} item 本地存储对象名,
   - {Array|Number} value 存储值
- 返回值：无
- 描述：存储数据

**clearGameState()**

---
- 参数：无,
- 返回值：无
- 描述：清除本地游戏分数及状态

**getBestScore()**

---
- 参数：无,
- 返回值：{Number} 本地最高分数
- 描述：获得本地最高分数

**setBestScore(value)**

---
- 参数：{Number} value 期望存入的分数,
- 返回值：无
- 描述：存储最高分