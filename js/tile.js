function Tile (position, value) {
  this.position = position;
  this.value    = value;
}
Tile.prototype.container = document.getElementsByClassName('container')[0];

// 根据randomCell创建瓦片
Tile.prototype.createTile = function () {
  var newTile   = document.createElement('div');

  newTile.innerHTML = this.value;
  newTile.classList.add('tile');
  newTile.style.top = (this.position.posY * 120) + 'px';
  newTile.style.left = (this.position.posX * 120) + 'px';

  this.container.appendChild(newTile);
}
// 移除当前瓦片对象
Tile.prototype.delTile = function () {
  var tiles = document.getElementsByClassName('tile');
  var top = (this.position.posY * 120) + 'px';
  var left = (this.position.posX * 120) + 'px';

  for (let i=0; i<tiles.length; i++) {
    if (tiles[i].style.top === top && tiles[i].style.left === left) {
      this.container.removeChild(tiles[i]);
    }
  }
}