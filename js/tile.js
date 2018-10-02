function Tile () {
}
Tile.prototype.container = document.getElementById('container');
Tile.prototype.scoreTile = document.getElementById('score');
// 根据randomCell创建瓦片
Tile.prototype.createTile = function (position, value) {
  var newTile   = document.createElement('div');

  newTile.innerHTML = value;
  newTile.classList.add('tile');
  newTile.style.top = (position.posY * 120) + 'px';
  newTile.style.left = (position.posX * 120) + 'px';
  this.container.appendChild(newTile);
}
// 移除当前瓦片
Tile.prototype.delTile = function () {
  while (this.container.hasChildNodes()) {
    this.container.removeChild(this.container.firstChild);
  }
}