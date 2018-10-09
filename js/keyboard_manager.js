function eventPreventDefault (event) {
  // 针对69版本以上Chrome的默认行为禁用
  if (event.cancelable) {
    // 判断默认行为是否已经被禁用
    if (!event.defaultPrevented) {
      event.preventDefault();
    }
  }
}

function KeyboardManager () {
  this.events = {};
  this.start = {};
  this.timer = {};
  this.end = {};
  this.listen();
}
// 添加事件监听
KeyboardManager.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
}
// 触发监听事件
KeyboardManager.prototype.emit = function (event, data) {
  var callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function (callback) {
      callback(data);
    })
  }
}
KeyboardManager.prototype.listen = function () {
  var container = document.getElementById('container');
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
    if (!modifier && mapped !== undefined) {
      eventPreventDefault(event);
      that.emit("move", mapped);
    }
  })

  container.addEventListener('touchstart', function (event) {
    // 之后需对兼容性进行升级
    that.start.x = event.touches[0].clientX;
    that.start.y = event.touches[0].clientY;
    eventPreventDefault(event);
  })
  container.addEventListener('touchmove', function (event) {
    eventPreventDefault(event);
  })
  container.addEventListener('touchend', function (event) {
    // 手指都离开屏幕之后，touches和targetTouches中将不会再有值，changedTouches还会有一个值，
    // 此值为最后一个离开屏幕的手指的接触点。
    that.end.x = event.changedTouches[0].clientX;
    that.end.y = event.changedTouches[0].clientY;
    var y = parseInt(that.start.y - that.end.y);
    var x = parseInt(that.end.x - that.start.x);

    if (x !== 0) {
      var tanVal = y / x;
      //Touch Left
      if ((x < 0 && y < 0 && tanVal < 1) || (x < 0 && y > 0 && tanVal > -1)) {
        that.emit("touch", 0);
      }
      // Touch Right
      if ((x > 0 && y < 0 && tanVal > -1) || (x > 0 && y > 0 && tanVal < 1)) {
        that.emit("touch", 2);
      }
      // Touch Up
      if ((x < 0 && y > 0 && tanVal < -1) || (x > 0 && y > 0 && tanVal > 1)) {
        that.emit("touch", 1);
      }
      // Touch Down
      if ((x < 0 && y < 0 && tanVal > 1) || (x > 0 && y < 0 && tanVal < -1)) {
        that.emit("touch", 3);
      }
    } else {
      if (y < 0) {// Touch Up
        that.emit("touch", 1);
      }
      if (y > 0){// Touch Down
        that.emit("touch", 3);
      }
    }
    eventPreventDefault(event);
  })
}