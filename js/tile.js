function Tile (position, value) {
  this.position = position;
  this.value    = value;
}
Tile.prototype.container = document.getElementsByClassName('container')[0];
// 根据randomCell创建瓦片
Tile.prototype.createTile = function () {
  var newTile   = document.createElement('div');

  newTile.innerHTML = this.value;
  newTile.classList.add('object');
  newTile.style.top = (this.position.posY * 120) + 'px';
  newTile.style.left = (this.position.posX * 120) + 'px';

  this.container.appendChild(newTile);
}