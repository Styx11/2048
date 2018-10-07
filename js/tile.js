function Tile () {
}
Tile.prototype.container = document.getElementById('container');
Tile.prototype.scoreTile = document.getElementById('score');
Tile.prototype.bestTile  = document.getElementById('best');
Tile.prototype.newGame   = document.getElementById('game-newGame');
// 根据randomCell创建瓦片
Tile.prototype.createTile = function (position, value) {
  var specialColors = {
    4: 'rgb(236, 224, 203)',
    8: 'rgb(233, 179, 129)',
    16: 'rgb(232, 153, 108)',
    32: 'rgb(231, 130, 103)',
    64: 'rgb(229, 103, 71)',
    128: 'rgb(219, 194, 119)',
    256: 'rgb(232, 204, 114)',
    512: '',
    1024: '',
    2048: ''
  }
  var newTile   = document.createElement('div');
  var tileClass = 'tile-position-' + position.posY + '-' + position.posX;

  newTile.innerHTML = value;
  newTile.className = 'tile ' + tileClass;
  if (specialColors[value]) {
    newTile.style.backgroundColor = specialColors[value];
    if (value >= 8) {
      newTile.style.color = 'rgb(248, 246, 242)';
    }
  }
  this.container.appendChild(newTile);
}
// 移除当前瓦片
Tile.prototype.delTile = function () {
    while (this.container.hasChildNodes()) {
      this.container.removeChild(this.container.firstChild);
    }
    return;
}
Tile.prototype.moveTile = function (oldPosition, newPosition) {
  var oldClass = 'tile tile-position-' + oldPosition.posY + '-' + oldPosition.posX;
  var newClass = 'tile tile-position-' + newPosition.posY + '-' + newPosition.posX;
  var oldNodes = this.container.childNodes;
  oldNodes.forEach(function (item) {
    if (item.className === oldClass) {
      item.className = newClass;
    }
  })
}