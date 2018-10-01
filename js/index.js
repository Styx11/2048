var grid = new Grid(4);
var keyManager = new KeyboardManager();

console.log(grid.availableCellInline({posX: 1, posY: 0, value: 2}, 3, 'col'));

keyManager.on("move", function (key) {
  if (key === 0 || key === 1 || key === 2 || key === 3) {
    var randomCell = grid.randomCell();
    if (randomCell !== undefined) {
      var tile = new Tile(randomCell, randomCell.value);
      tile.createTile();
      grid.updataCell("fill", randomCell, randomCell.value);
      console.log(grid.availableCells());
    }
  }
})