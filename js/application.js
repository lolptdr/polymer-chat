(function() {
  'use strict';

  var uuid, avatar, color, cat;

  // Assign a uuid made of a random cat and a random color
  var randomColor = function() {   
    var colors = ['navy', 'slate', 'olive', 'moss', 'chocolate', 'buttercup', 'maroon', 'cerise', 'plum', 'orchid'];   
    return colors[(Math.random() * colors.length) >>> 0];
  };
  var randomCat = function() {   
    var cats = ['tabby', 'bengal', 'persian', 'mainecoon', 'ragdoll', 'sphynx', 'siamese', 'korat', 'japanesebobtail', 'abyssinian', 'scottishfold'];           
    return cats[(Math.random() * cats.length) >>> 0];        
  }; 
  color = randomColor();
  cat = randomCat();
  uuid = color + '-' + cat;
  avatar = 'images/' + cat + '.jpg';
  function showNewest() {
    var chatDiv = document.querySelector('.chat-list');
    chatDiv.scrollTop = chatDiv.scrollHeight;
  }

  // Polymer UI and UX
  var template = document.querySelector('template[is=auto-binding]');
  
  template.channel = 'polymer-chat';
  template.uuid = uuid;
  template.avatar = avatar;
  template.color = color;

  template.items = [
    {icon: 'cloud', title: 'PubNub'},
    {icon: 'polymer', title: 'Polymer'},
    {icon: 'favorite', title: 'Love'}
  ];

  template.checkKey = function(e) {
    if(e.keyCode === 13 || e.charCode === 13) {
        template.publish();
    }
  };

  template.sendMyMessage = function(e) {
    template.publish();
  };

  // PubNub Realtime Chat

  template.publish = function() {
    if(!template.input) return;

    template.$.pub.message = {
      uuid: uuid,
      avatar: avatar,
      color: color,
      text: template.input,
      timestamp: Date.now()
    };

    template.$.pub.publish();
    template.input = '';
  };

  template.subscribeCallback = function(e) {
    template.aync(showNewest);
  };

})();

