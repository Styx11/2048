var grid = new Grid(4);
var keyManager = new KeyboardManager();

console.log(grid.cells);
// console.log(grid.availableCellInline({posX: 1, posY: 3, value: 2}, 0, 'col'));

keyManager.on("move", function (key) {
  if (key === 0 || key === 2 || key === 1 || key === 3) {
    var randomCell = grid.randomCell();
    var tile = new Tile();
    if (randomCell !== undefined) {
      if (grid.availableCells().length === 16) {
        tile.createTile(randomCell, randomCell.value);
        grid.updataCell('fill', randomCell, randomCell.value);
      } else {
        var moveCells = grid.moveCells(key);
        var movingCells = moveCells.movingCells;
        var deletingCells = moveCells.deletingCells;
        // for (let i=0; i<deletingCells.length; i++) {
        //   tile.delTile(deletingCells[i]);
        // }
        tile.delTile();
        // for (let i=0; i<movingCells.length; i++) {
        //   tile.createTile(movingCells[i], movingCells[i].value);
        // }
        for (let y=0; y<grid.size; y++) {
          for (let x=0; x<grid.size; x++) {
            if (grid.cells[y][x] !== null) {
              tile.createTile({posX: x, posY: y}, grid.cells[y][x].value);
            }
          }
        }
        tile.createTile(randomCell, randomCell.value);
        grid.updataCell('fill', randomCell, randomCell.value);
      }
      console.log(grid.cells);
    }
  }
})