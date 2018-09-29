function Grid (size) {
  this.size = size;
  this.cells = [];
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
Grid.prototype.randomCells = function () {
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
            posY: posY
          })
        }
      })
    })
    return avail;
  }
}
// 获取单行/列可用单元格
Grid.prototype.availableCellInline = function (position, end, line) {
  var posY = position.posY;
  var posX = position.posX;
  var availableCellInline = {};
  if (line === 'row') {
    for (let x=end; x>posX; x--) {
      if (!this.cells[posY][x]) {
        return availableCellInline = {
          posX: x,
          posY: posY
        }
      }
    }
  } else {
    for (let y=end; y>posY; y--) {
      if (!this.cells[posX][y]) {
        return availableCellInline = {
          posX: posX,
          posY: y
        }
      }
    }
  }
}
// 更新栅格状态
Grid.prototype.updataCell = function (type, position) {
  var posX = position.posX;
  var posY = position.posY;
  if (type === 'remove') {
    this.cells[posY][posX] = null;
  } else if (type === 'fill') {
    this.cells[posY][posX] = {
      posX: posX,
      posY: posY
    }
  }
}