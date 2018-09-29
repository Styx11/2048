var grid = new Grid(4);
grid.initGrid();
console.log(grid.cells);
console.log(grid.availableCells());
console.log(grid.availableCellInline({posX: 1, posY: 0}, 3, 'col'));