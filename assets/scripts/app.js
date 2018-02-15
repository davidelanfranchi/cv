// App

var App = (function () {

  var log = false,

      animationEvent = whichAnimationEvent(),

      loadingEl = document.querySelector('.loading'),
      sidebarEl = document.querySelector('.sidebar'),
      leftVerticalColumn = document.querySelector('.left-vertical-column');


  var throttle_time = Date.now();

  var _onScroll = function (){

    if ((throttle_time + 10 - Date.now()) < 0) {

      if (log) { console.log('_onScroll') }

      var pos = window.pageYOffset,
          bottom = (window.innerHeight + window.pageYOffset ) >= document.body.offsetHeight;


      if (pos < 400 || bottom) {
        leftVerticalColumn.classList.remove("-is-visible");
      }else{
        leftVerticalColumn.classList.add("-is-visible");
      }

      throttle_time = Date.now();
    }
   
  };


  _introAnimation = function(){
    if (log) { console.log('_introAnimation') }

    
    document.body.classList.add('animation-step-1');
    onetime(sidebarEl, animationEvent, step2);

    function step2(){
      if (log) { console.log('_introAnimation step2') }

      loadingEl.remove();

      document.body.classList.remove('animation-step-1');
      document.body.classList.add('animation-step-2');
      setTimeout(function(){
        onetime(sidebarEl, animationEvent, step3);
      },1) 

    }

    function step3(){
      if (log) { console.log('_introAnimation step3') }

      document.body.classList.remove('animation-step-2');
      document.body.classList.add('animation-step-3');

    }

  }


  var init = function () {

    window.addEventListener('scroll', _onScroll);

    _introAnimation();

  };
  
  return {
    init: init
  };

})();



//https://davidwalsh.name/css-animation-callback

function whichAnimationEvent(){
  var t;
  var el = document.createElement('fakeelement');
  var animations = {
    'transition':'animationend',
    'OTransition':'oAnimationEnd',
    'MozTransition':'animationend',
    'WebkitTransition':'webkitAnimationEnd'
  }

  for(t in animations){
    if( el.style[t] !== undefined ){
        return animations[t];
    }
  }
}

//https://www.sitepoint.com/create-one-time-events-javascript/

function onetime(node, type, callback) {

  // create event
  node.addEventListener(type, function(e) {
    // remove event
    e.target.removeEventListener(e.type, arguments.callee);
    // call handler
    return callback(e);
  });

}