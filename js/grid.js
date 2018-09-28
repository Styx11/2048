function Grid (size) {
  this.size = size;
  this.cells = [];
}

// 重置或初始化栅格
Grid.prototype.initGrid = function () {
  var row = this.size;
  var cells = [];
  for (let x=0; x<row; x++) {
    cells[x] = [];
    for (let y=0; y<row; y++) {
      cells[x].push(null);
    }
  }
  this.cells = cells;
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
// 随机获取单元格
Grid.prototype.randomCells = function () {
  var availableCells = this.availableCells();
  var availLength = availableCells.length;
  var index = Math.floor(Math.random() * availLength);
  var randomCell = availableCells[index];
  return randomCell;
}
var grid = new Grid(4);
grid.initGrid();