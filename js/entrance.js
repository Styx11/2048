var grid = new Grid(4);
var tile = new Tile();
var KeyboardManager = new KeyboardManager();
var localStorageManager = new localStorageManager();
var bestScore = localStorageManager.getBestScore();
var previousState = localStorageManager.getGameState();
var scoreTile = parseInt(tile.scoreTile.innerHTML) + grid.score;
var start = function () {
  var randomCell = grid.randomCell();
  tile.createTile(randomCell, randomCell.value);
  grid.updataCell('fill', randomCell, randomCell.value);
  tile.bestTile.innerHTML = bestScore;
  tile.scoreTile.innerHTML = scoreTile;
}

if (previousState) {
  grid.cells = previousState;
  var drawCells = grid.availableCells().unavail;
  for (let i=0; i<drawCells.length; i++) {
    tile.createTile(drawCells[i], drawCells[i].value);
  }
  console.log(grid.cells);
  console.log(drawCells);
  tile.bestTile.innerHTML = bestScore;
  tile.scoreTile.innerHTML = scoreTile;
} else {
  start();
}
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
          scoreTile += grid.score;
          if (scoreTile > bestScore) {
            bestScore = scoreTile;
            localStorageManager.setBestScore(scoreTile);
          }
        }
        tile.delTile();// 删除单元格
        for (let i=0; i<redrawCells.length; i++) {// 创建单元格
          tile.createTile(redrawCells[i], redrawCells[i].value);
        }
        start();
        grid.score = 0;// 重置分数
        localStorageManager.setGameState(grid.cells);
      }
    }
  }
})