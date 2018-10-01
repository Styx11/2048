function Grid (size) {
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
    var x = posX < end ? posX+1 : posX-1;
    end = posX < end ? end+1 : end-1;
    while (x !== end) {
      if (!this.cells[posY][x] || this.cells[posY][x].value === value) {
        availableCellInline = {
          posX: x,
          posY: posY,
          value: !this.cells[posY][x] ? value : value * 2
        }
      } else {
        break;
      }
      posX < end ? x++ : x--;
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
      } else {
        break;
      }
      posY < end ? y++ : y--;
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
  var that = this;
  var movingCells = [];
  var deletingCells = [];

  if (key === 0 || key === 2) {
    var direct = !key ? 0 : 3;
    for (let x=0; x<this.size; x++) {
      for (let y=0; y<this.size; y++) {
        if (this.cells[y][x] !== null) {
          var avail = this.availableCellInline({posX: x, posY: y, value: this.cells[y][x].value}, direct, 'row');
          if (avail !== null) {
            movingCells.push(avail);
            deletingCells.push(this.cells[y][x]);
            this.updataCell('remove', {posX: x, posY: y});
            this.updataCell('fill', {posX: avail.posX, posY: avail.posY}, avail.value);
          }
        }
      }
    }
  } else if (key === 1 || key === 3) {
    var direct = key === 1 ? 0 : 3;
    for (let y=0; y<this.size; y++) {
      for (let x=0; x<this.size; x++) {
        if (this.cells[y][x] !== null) {
          var avail = this.availableCellInline({posX: x, posY: y, value: this.cells[y][x].value}, direct, 'col');
          if (avail !== null) {
            movingCells.push(avail);
            deletingCells.push(this.cells[y][x]);
            this.updataCell('remove', {posX: x, posY: y});
            this.updataCell('fill', {posX: avail.posX, posY: avail.posY}, avail.value);
          }
        }
      }
    }
  }
  return {
    movingCells: movingCells,
    deletingCells: deletingCells
  }
}