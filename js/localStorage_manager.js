if (!window.localStorage) {
  window.localStorage = {
    getItem: function (sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
      return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
    },
    key: function (nKeyId) {
      return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
    },
    setItem: function (sKey, sValue) {
      if(!sKey) { return; }
      document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
      this.length = document.cookie.match(/\=/g).length;
    },
    length: 0,
    removeItem: function (sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) { return; }
      document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      this.length--;
    },
    hasOwnProperty: function (sKey) {
      return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }
  };
  window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
}

function localStorageManager () {
  this.gameState = "gameState";
  this.gameScore = 'gameScore';
  this.bestScore = "bestScore";
  this.storageManager = window.localStorage;

  this.setBestScore(0);
}
localStorageManager.prototype.getGameState = function (item) {
  var gameState = JSON.parse(this.storageManager.getItem(this[item]));
  return gameState ? gameState : 0;
}
localStorageManager.prototype.setGameState = function (item, value) {
  var gameState = JSON.stringify(value);
  this.storageManager.setItem(this[item], gameState);
}
localStorageManager.prototype.clearGameState = function () {
  this.storageManager.removeItem(this.gameState);
  this.storageManager.removeItem(this.gameScore);
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