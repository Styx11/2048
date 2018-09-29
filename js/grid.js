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
var grid = new Grid(4);
grid.initGrid();
console.log(grid.cells);
console.log(grid.availableCells());