var grid = new Grid(4);
var tile = new Tile();
var KeyboardManager = new KeyboardManager();
var start = function () {
  var randomCell = grid.randomCell();
  tile.createTile(randomCell, randomCell.value);
  grid.updataCell('fill', randomCell, randomCell.value);
}
var score = 0;

start();
tile.newGame.onclick = function () {
  tile.delTile();
  grid.initGrid();
  start();
}
KeyboardManager.on("move", function (key) {
  if (key === 0 || key === 2 || key === 1 || key === 3) {
    var randomCell = grid.randomCell();
    if (randomCell !== undefined) {
      if (grid.availableCells().length === 16) {
        tile.createTile(randomCell, randomCell.value);
        grid.updataCell('fill', randomCell, randomCell.value);
      } else {
        var redrawCells = grid.moveCells(key);// 移动
        if (grid.score) {// 记录分数
          tile.scoreTile.innerHTML = parseInt(tile.scoreTile.innerHTML) + grid.score;
        }
        tile.delTile();// 删除单元格
        for (let i=0; i<redrawCells.length; i++) {// 创建单元格
          tile.createTile(redrawCells[i], redrawCells[i].value);
        }
        start();
        grid.score = 0;// 重置分数ßß
      }
    }
  }
})