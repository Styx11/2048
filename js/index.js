var grid = new Grid(4);
grid.initGrid();
var randomCell = grid.randomCells();
console.log(grid.cells);
console.log(grid.availableCells());
console.log(grid.availableCellInline({posX: 1, posY: 0}, 3, 'col'));

var tile = new Tile(randomCell, 2);
tile.createTile();
grid.updataCell('fill', randomCell);
console.log(grid.cells);