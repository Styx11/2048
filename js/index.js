var grid = new Grid(4);
grid.initGrid();
var randomCell = grid.randomCells();
console.log(grid.availableCells());
console.log(grid.availableCellInline({posX: 1, posY: 0, value: 2}, 3, 'col'));

var tile = new Tile(randomCell, randomCell.value);
tile.createTile();
grid.updataCell('fill', randomCell, randomCell.value);
console.log(grid.cells);