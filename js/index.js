var grid = new Grid(4);
var tile = new Tile();
var KeyboardManager = new KeyboardManager();

// console.log(grid.availableCellInline({posX: 1, posY: 3, value: 2}, 0, 'col'));

KeyboardManager.on("move", function (key) {
  if (key === 0 || key === 2 || key === 1 || key === 3) {
    var randomCell = grid.randomCell();
    if (randomCell !== undefined) {
      if (grid.availableCells().length === 16) {
        tile.createTile(randomCell, randomCell.value);
        grid.updataCell('fill', randomCell, randomCell.value);
      } else {
        var redrawCells = grid.moveCells(key);
        tile.delTile();
        for (let i=0; i<redrawCells.length; i++) {
          tile.createTile(redrawCells[i], redrawCells[i].value);
        }
        randomCell = grid.randomCell();
        tile.createTile(randomCell, randomCell.value);
        grid.updataCell('fill', randomCell, randomCell.value);
        console.log(grid.cells);
      }
    }
  }
})