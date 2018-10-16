function Grid (size) {
  this.score = size ? size : 0;
  this.size = size;
  this.cells = [];
  this.initGrid();
}

// 重置或初始化栅格
Grid.prototype.initGrid = function () {
  var row = this.size;
  var cells = [];
  for (let y=0; y<row; y++) {
    cells[y] = [];
    for (let x=0; x<row; x++) {
      cells[y].push(null);
    }
  }
  this.cells = cells;
}
// 随机获取单元格
Grid.prototype.randomCell = function () {
  var availableCells = this.availableCells().avail;
  var availLength = availableCells.length;
  var index = Math.floor(Math.random() * availLength);
  var value = Math.floor(Math.random() * 2 + 1) * 2;// 随机数值
  var randomCell = availableCells[index];
  randomCell.value = value;
  randomCell.new = false;
  return randomCell;
}
// 获取可用单元格
Grid.prototype.availableCells = function () {
  if (this.cells.length) {
    var avail = [];
    var unavail = [];
    this.cells.forEach(function (items, posY) {
      items.forEach(function (item, posX) {
        if (!item) {
          avail.push({
            posX: posX,
            posY: posY,
          })
        } else {
          unavail.push(item)
        }
      })
    })
    return {
      avail: avail,
      unavail: unavail
    };
  }
}
// 获取单行/列可用单元格
Grid.prototype.availableCellInline = function (cell, end, line) {
  var posY = cell.posY;
  var posX = cell.posX;
  var value = cell.value;
  var availableCellInline = null;

  if (line === 'row') {
    var x = posX < end ? posX+1 : posX-1;// 判断起终点
    var newEnd = posX < end ? end+1 : end-1;
    while (x !== newEnd) {// 判断单元格是否是为新增单元格
      if (!this.cells[posY][x] || (this.cells[posY][x].value === value && !this.cells[posY][x].new)) {
        availableCellInline = {
          posX: x,
          posY: posY,
          value: !this.cells[posY][x] ? value : value * 2,
          new: !this.cells[posY][x] ? false : true
        }// 记录分数
        this.score += !this.cells[posY][x] ? 0 : value * 2;
      } else {
        break;
      }
      x < newEnd ? x++ : x--;
    }
  } else if (line === 'col') {
    var y = posY < end ? posY+1 : posY-1;
    var newEnd = posY < end ? end+1 : end-1;
    while (y !== newEnd) {
      if (!this.cells[y][posX] || (this.cells[y][posX].value === value && !this.cells[y][posX].new)) {
        availableCellInline = {
          posX: posX,
          posY: y,
          value: !this.cells[y][posX] ? value : value * 2,
          new: !this.cells[y][posX] ? false : true
        }
        this.score += !this.cells[y][posX] ? 0 : value * 2;
      } else {
        break;
      }
      y < newEnd ? y++ : y--;
    }
  }
  return availableCellInline;
}
// 更新栅格状态
Grid.prototype.updataCell = function (type, position, value, newCell) {
  var posX = position.posX;
  var posY = position.posY;
  if (type === 'remove') {
    this.cells[posY][posX] = null;
  } else if (type === 'fill') {
    this.cells[posY][posX] = {
      posX: posX,
      posY: posY,
      value: value,// 新增单元格状态
      new: newCell ? true : false
    }
  }
}
// 移动栅格
Grid.prototype.moveCells = function (key, imitate) {
  var moveCells = [];
  // 判断从哪个方向开始移动
  var start = key===2 || key===3 ? 3 : 0;
  var end = key===2 || key===3 ? -1 : 4;

  if (!imitate) {// 非模拟状态下清空新单元格状态
    this.cells.forEach(function (items) {
      items.forEach(function (item) {
        if (item && item.new) {
          item.new = false;
        }
      })
    })
  }
  if (key === 0 || key === 2) {// 左右
    var direct = !key ? 0 : 3;
    while (start !== end) {
      for (let y=0; y<this.size; y++) {
        if (this.cells[y][start] !== null) {// 获取单方向上单元格可移动的位置
          var avail = this.availableCellInline({posX: start, posY: y, value: this.cells[y][start].value}, direct, 'row');
          if (avail !== null) {
            moveCells.push({// 获取应删除单元格与目标单元格
              redrawCell: avail,
              delCell: this.cells[y][start]
            })
            if (!imitate) {// 模拟移动是并不操作栅格
              this.updataCell('remove', {posX: start, posY: y});
              this.updataCell('fill', {posX: avail.posX, posY: avail.posY}, avail.value, avail.new);
            }
          }
        }
      }
      start < end ? start++ : start--;
    }
  } else if (key === 1 || key === 3) {// 上下
    var direct = key === 1 ? 0 : 3;
    while (start !== end) {
      for (let x=0; x<this.size; x++) {
        if (this.cells[start][x] !== null) {
          var avail = this.availableCellInline({posX: x, posY: start, value: this.cells[start][x].value}, direct, 'col');
          if (avail !== null) {
            moveCells.push({
              redrawCell: avail,
              delCell: this.cells[start][x]
            })
            if (!imitate) {// 模拟移动是并不操作栅格
              this.updataCell('remove', {posX: x, posY: start});
              this.updataCell('fill', {posX: avail.posX, posY: avail.posY}, avail.value, avail.new);
            }
          }
        }
      }
      start < end ? start++ : start--;
    }
  }
  return moveCells
}