
    // Create anchor element.
    function readTextFile(file) {
        var rawFile = new XMLHttpRequest();
        var allText; // var declared in readTextFile scope
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status == 0) {
                    allText = rawFile.responseText;
                }
            }
        }
        rawFile.send(null);
        return allText; // here you can return the data filled in above
    }
    var text = readTextFile("scripts/songs.txt");

    var text = readTextFile("scripts/songs.txt");
    text = text.split("\n");
    function newLink() {
    var num = Math.round(Math.random() * text.length);
    //var a = document.getElementById("FunLink");
    // Set the title.

    // Set the href property.
    //a.setAttribut(href,text[num]); 
    //a.href = text[num];
    return text[num];
    var a = document.getElementById("player")
    a.setAttribute("src", "https://www.youtube.com/embed/" + text[num] + "?start=0&controls=0&autoplay=1&enablejsapi=1");
    // Append the anchor element to the body. 
}

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
let active = true;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: newLink(),
        playerVars: {
            autoplay: 1,
            start:0,
            'enablejsapi':1,
          'playsinline': 1
        },
        events:{
            'onStateChange': onPlayerStateChange
        }
      });
    }
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            document.getElementById("title").innerHTML = player.getVideoData().title;
        }
    }
var lowVol = true;
var s = true;
function changeSrc() {
    player = player.loadVideoById(newLink());
    window.setTimeout(toStart(), 1000);
    if (s) {
    showTime();
    lowerVolume();
    s = !s;
    }
    if (active) {
        toggle();
    }
 }
function toStart(){
    player.seekTo(0,true);
}
function pause(){
    player.pauseVideo();
  }
function play(){
    player.playVideo();
  }
function lowerVolume() {
    if (lowVol == true) {
        player.setVolume(10);
    } else {
        player.setVolume(100);
    }
    lowVol = !lowVol;
}
  function toggle() {
    let toggle = document.querySelector('.toggle')
    active = !active
    if (active) {
        toggle.classList.remove('active');
        document.getElementById("durationMeasure").style.backgroundColor = "rgba(255, 0, 0, 0.5)";
        reset_animation();
        document.getElementById("anim").style.animationName = "moving_logo, return_back_anim";
        pause();
    } else {
        toggle.classList.add('active');
        document.getElementById("durationMeasure").style.backgroundColor = "rgba(255, 0, 0, 1)";
        document.getElementById("anim").style.animationTimingFunction = "none, none";
        reset_animation();
        document.getElementById("anim").style.animationName = "moving_logo, go_to_scale";
        document.getElementById("anim").style.animationFillMode = "infinite, 1";
        play();
    }
}
function reset_animation() {
    var el = document.getElementById('anim');
    el.style.animation = 'none, none';
    el.offsetHeight; /* trigger reflow */
    el.style.animation = null; 
  }

addEventListener('animationiteration', function() {
    
});

function showTime() { 
    //player = document.getElementById("player");
    var num = player.getDuration();
    var some = player.getCurrentTime();
    var some = ((num - some)/(10));
    var scale = 6000 / num;
    var num = Math.round(some * scale);
    document.getElementById("durationMeasure").style.height = num + "px";
    window.setTimeout(showTime, 1000);
}