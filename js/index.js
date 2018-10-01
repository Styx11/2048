var grid = new Grid(4);
grid.initGrid();

console.log(grid.availableCells());
console.log(grid.availableCellInline({posX: 1, posY: 0, value: 2}, 3, 'col'));

randomCell = grid.randomCells();
var tile1 = new Tile(randomCell, randomCell.value);
tile1.createTile();
grid.updataCell('fill', randomCell, randomCell.value);
console.log(grid.cells);

window.onload = function () {
  document.addEventListener('click', function () {
    tile.delTile();
  })
}