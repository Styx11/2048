function Grid (size) {
  this.score = 0;
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
  var availableCells = this.availableCells();
  var availLength = availableCells.length;
  var index = Math.floor(Math.random() * availLength);
  var randomCell = availableCells[index];
  return randomCell;
}
// 获取可用单元格
Grid.prototype.availableCells = function () {
  if (this.cells.length) {
    var avail = [];
    this.cells.forEach(function (items, posY) {
      items.forEach(function (item, posX) {
        if (!item) {
          avail.push({
            posX: posX,
            posY: posY,
            value: 2
          })
        }
      })
    })
    return avail;
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
    while (x !== newEnd) {
      if (!this.cells[posY][x] || this.cells[posY][x].value === value) {
        availableCellInline = {
          posX: x,
          posY: posY,
          value: !this.cells[posY][x] ? value : value * 2
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
      if (!this.cells[y][posX] || this.cells[y][posX].value === value) {
        availableCellInline = {
          posX: posX,
          posY: y,
          value: !this.cells[y][posX] ? value : value * 2
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
Grid.prototype.updataCell = function (type, position, value) {
  var posX = position.posX;
  var posY = position.posY;
  if (type === 'remove') {
    this.cells[posY][posX] = null;
  } else if (type === 'fill') {
    this.cells[posY][posX] = {
      posX: posX,
      posY: posY,
      value: value
    }
  }
}
// 移动栅格
Grid.prototype.moveCells = function (key) {
  var redrawCells = [];
  // 判断从哪个方向开始移动
  var start = key===2 || key===3 ? 3 : 0;
  var end = key===2 || key===3 ? -1 : 4;

  if (key === 0 || key === 2) {// 左右
    var direct = !key ? 0 : 3;
    while (start !== end) {
      for (let y=0; y<this.size; y++) {
        if (this.cells[y][start] !== null) {// 获取单方向上单元格可移动的位置
          var avail = this.availableCellInline({posX: start, posY: y, value: this.cells[y][start].value}, direct, 'row');
          if (avail !== null) {
            redrawCells.push(avail);
            this.updataCell('remove', {posX: start, posY: y});
            this.updataCell('fill', {posX: avail.posX, posY: avail.posY}, avail.value);
          } else {
            redrawCells.push(this.cells[y][start]);// 无可移动单元格也需重绘
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
            redrawCells.push(avail);
            this.updataCell('remove', {posX: x, posY: start});
            this.updataCell('fill', {posX: avail.posX, posY: avail.posY}, avail.value);
          } else {
            redrawCells.push(this.cells[start][x]);
          }
        }
      }
      start < end ? start++ : start--;
    }
  }
  return redrawCells;
}