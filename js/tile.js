function Tile (position, value) {
  this.position = position,
  this.value = value
}
Tile.prototype.createTile = function () {
  var posX = this.position.posX;
  var posY = this.position.posY;
  var tile = document.createElement('div');
  var container = document.getElementsByClassName('container')[0];
  tile.innerHTML = this.value;
  tile.className = 'object';
  container.appendChild(tile);
}