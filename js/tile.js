function Tile () {
}
Tile.prototype.container = document.getElementsByClassName('container')[0];

// 根据randomCell创建瓦片
Tile.prototype.createTile = function (position, value) {
  var newTile   = document.createElement('div');

  newTile.innerHTML = value;
  newTile.classList.add('tile');
  newTile.style.top = (position.posY * 120) + 'px';
  newTile.style.left = (position.posX * 120) + 'px';

  this.container.appendChild(newTile);
}
// 移除当前瓦片对象
Tile.prototype.delTile = function (position) {
  var tiles = document.getElementsByClassName('tile');
  var top = (position.posY * 120) + 'px';
  var left = (position.posX * 120) + 'px';

  for (let i=0; i<tiles.length; i++) {
    if (tiles[i].style.top === top && tiles[i].style.left === left) {
      this.container.removeChild(tiles[i]);
    }
  }
}