function localStorageManager () {
  window.fakeStorage = {};
  this.gameState = "gameState";
  this.bestScore = "bestScore";
  this.storageManager = window.localStorage ? window.localStorage : window.fakeStorage;

  this.setBestScore(0);
}
localStorageManager.prototype.getGameState = function () {
  var gameState = JSON.parse(this.storageManager.getItem(this.gameState));
  return gameState;
}
localStorageManager.prototype.setGameState = function (value) {
  var gameState = JSON.stringify(value);
  this.storageManager.setItem(this.gameState, gameState);
}
localStorageManager.prototype.getBestScore = function () {
  var bestScore = this.storageManager.getItem(this.bestScore);
  return bestScore;
}
localStorageManager.prototype.setBestScore = function (value) {
  var bestScore = this.storageManager.getItem(this.bestScore);
  if (!bestScore) {
    this.storageManager.setItem(this.bestScore, value);
  }
  if (value > bestScore) {
    this.storageManager.setItem(this.bestScore, value);
  }
}