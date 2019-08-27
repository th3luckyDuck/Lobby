
      (function () {

      AFRAME.registerComponent('syncclicks', {
      init: function() {
      var scene = document.querySelector('a-scene');
      var el = this.el;
      var self = this;
      this.sendEvent = () => {
      var event = {sender: scene.object3D.uuid, el: this.el.id, time: Date.now()}
      this.connection.instance.child('event').set(event);
      var altapp = document.querySelector('#scene').getAttribute('sync-system').app;
      var altauthor = document.querySelector('#scene').getAttribute('sync-system').author;
    };
    this.receiveEvent = snapshot => {
    var val = snapshot.val();
    if (val && val.el === this.el.id && scene.object3D.uuid !== val.sender) {
    this.el.onclick();
    }
    };
    altspace.utilities.sync.connect({appId: altapp, authorId: altauthor}).then(connection => {
    self.connection = connection;
    connection.instance.child('event').on('value', self.receiveEvent);
    el.addEventListener('click', self.sendEvent);
    });
    },
    remove: function() {
    this.el.removeEventListener('click', this.sendEvent);
    this.connection.instance.child('event').off('value', this.receiveEvent);
    }
    });
    }());