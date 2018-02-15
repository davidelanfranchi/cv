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