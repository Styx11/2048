var grid = new Grid(4);
var tile = new Tile();
var KeyboardManager = new KeyboardManager();
var localStorageManager = new localStorageManager();
var bestScore     = localStorageManager.getBestScore();
var previousState = localStorageManager.getGameState('gameState');
var previousScore = localStorageManager.getGameState('gameScore');

var start = function () {// 基本开始
  var randomCell = grid.randomCell();
  tile.createTile(randomCell, randomCell.value);
  grid.updataCell('fill', randomCell, randomCell.value);
  tile.bestTile.innerHTML  = bestScore;// DOM对象只需引用一次
  tile.scoreTile.innerHTML = previousScore;
}
var restart = function () {
  localStorageManager.clearGameState();// 清空本地状态
  previousScore = localStorageManager.getGameState('gameScore');// 重新获得分数
  tile.scoreTile.innerHTML = previousScore;
  tile.delTile();
  grid.initGrid();
  start();
  localStorageManager.setGameState(grid.cells);
}
var keyCallback = function (key) {// 操作触发事件
  if (KeyboardManager.timer) {// 函数截流
    clearTimeout(KeyboardManager.timer);
  }
  KeyboardManager.timer = setTimeout(function () {
    var moveCells = grid.moveCells(key);// 移动
    var gameOver = 0;
    for (let i=0; i<4; i++) {
      gameOver += grid.moveCells(i, true).length;
    }
    if (!gameOver) {
      tile.gameOver.parentElement.style.left = '0';
      return;
    }
    if (!moveCells.length) return;// 若当前方向栅格无法移动，则返回
    if (grid.score) {// 记录分数
      previousScore += grid.score;
      if (previousScore > bestScore) {// 设置最高分
        bestScore = previousScore;
        localStorageManager.setBestScore(previousScore);
      }
    }
    moveCells.forEach(function (item) {
        tile.moveTile(item.delCell, item.redrawCell);
    })
    setTimeout(function () {
      tile.delTile();
      var drawCells = grid.availableCells().unavail;// 获取应当重绘的单元格
      for (let i=0; i<drawCells.length; i++) {
        tile.createTile(drawCells[i], drawCells[i].value);
      }
      start();// 随机单元格、记录分数
      localStorageManager.setGameState('gameState', grid.cells);// 记录状态
      localStorageManager.setGameState('gameScore', previousScore);
      grid.score = 0;// 重置分数
    }, 200)// 等待移动动画
  }, 200)// 函数截流时间与动画等待相同
}

if (previousState) {// 是否应用先前状态
  grid.cells = previousState;
  var drawCells = grid.availableCells().unavail;// 获取应该绘制的单元格
  for (let i=0; i<drawCells.length; i++) {
    tile.createTile(drawCells[i], drawCells[i].value);
  }
  tile.bestTile.innerHTML  = bestScore;
  tile.scoreTile.innerHTML = previousScore;
} else {
  start();
}
// 游戏重开
tile.newGame.addEventListener('click', function () {
  restart();
  tile.gameOver.parentElement.style.left = '100rem';
});
tile.gameOver.addEventListener('click', function () {
  restart();
  tile.gameOver.parentElement.style.left = '100rem';
})
KeyboardManager.on("move", keyCallback);
KeyboardManager.on("touch", keyCallback);