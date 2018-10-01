function KeyboardManager () {
  this.events = {};
  this.listen();
}
KeyboardManager.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
}
KeyboardManager.prototype.emit = function (event, data) {
  var callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function (callback) {
      callback(data);
    })
  }
}
KeyboardManager.prototype.listen = function () {
  var that = this;
  var map = {
    37: 0, //Left Arrow
    38: 1, //Up Arrow
    39: 2, //Right Arrow
    40: 3, //Down Arrow
    65: 0, //Button A
    87: 1, //Button W
    68: 2, //Button D
    83: 3  //Button S
  }

  document.addEventListener('keydown', function (event) {
    var modifier = event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
    var mapped = map[event.keyCode];
    if (!modifier) {
      event.preventDefault();
      that.emit("move", mapped);
    }
  })
}