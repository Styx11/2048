function Tile () {
}
Tile.prototype.container = document.getElementById('container');
Tile.prototype.scoreTile = document.getElementById('score');
Tile.prototype.bestTile  = document.getElementById('best');
Tile.prototype.newGame   = document.getElementById('game-newGame');
// 根据randomCell创建瓦片
Tile.prototype.createTile = function (position, value) {
  var newTile   = document.createElement('div');
  var tileClass = 'tile-position-' + position.posY + '-' + position.posX;

  newTile.innerHTML = value;
  newTile.className = 'tile ' + tileClass;
  this.container.appendChild(newTile);
}
// 移除当前瓦片
Tile.prototype.delTile = function (oldPosition, newPosition) {
  var that = this;
  if (!oldPosition || !newPosition) {
    while (this.container.hasChildNodes()) {
      this.container.removeChild(this.container.firstChild);
    }
    return;
  }
  var oldClass = 'tile tile-position-' + oldPosition.posY + '-' + oldPosition.posX;
  var newClass = 'tile tile-position-' + newPosition.posY + '-' + newPosition.posX;
  var oldNodes = this.container.childNodes;
  oldNodes.forEach(function (item, index) {
    if (item.className === oldClass) {
      item.className = newClass;
      setTimeout(function () {
        console.log(item);
        that.createTile(newPosition, newPosition.value);
        that.container.removeChild(that.container.childNodes[index]);
      }, 400)
    }
  })
}