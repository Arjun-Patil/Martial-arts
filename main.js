var x = document.getElementById("myCanvas");
var ctx = x.getContext("2d");

function loadImage (src,callback){
  var img = new Image();
  img.src = src;
  img.onload = function(){
      callback(img); 
  }
}

function imagePath(frameNumber,animation){
  return animation + "/"+frameNumber + ".png";
}

let frames = {
  idle : [1,2,3,4,5,6,7,8],
  kick : [1,2,3,4,5,6,7],
  punch : [1,2,3,4,5,6,7]
}

function loadImages (callback){
  let images={idle:[], kick:[], punch:[]} ;
  let imageToLoad = 0;
  ["idle","kick","punch"].forEach(function (animation){
    let animationFrames = frames[animation];
    imageToLoad += animationFrames.length;

    animationFrames.forEach(function (frameNumber){
      let path = imagePath(frameNumber, animation);

      loadImage(path,function (image){
        images[animation][frameNumber - 1] = image;
        imageToLoad -= 1 ;
        if(imageToLoad === 0){
          callback(images);
        }
      })
    })
  })
}

function animate(ctx,images,animation, callback){
  images[animation].forEach(function(image,index){
    setTimeout(function(){
      ctx.clearRect(0,0,800,800);
      ctx.drawImage(image,0,0,800,800);
    }, index*100);
  })

  setTimeout(callback,images[animation].length *100);
}

loadImages(function(images){

  let queuesAnimation = [];


  function aux(){
    let selectedAnimation;

    if (queuesAnimation.length === 0)
      selectedAnimation = "idle";
    else
      selectedAnimation = queuesAnimation.shift();
    animate (ctx,images,selectedAnimation,aux)
  }

  aux();

  document.getElementById("kick").onclick=function(){
      queuesAnimation.push("kick");
      var crash=new Audio("sounds/KICK.mp3")
      crash.play();
  }

  document.getElementById("punch").onclick=function(){
    queuesAnimation.push("punch");
    var crash=new Audio("sounds/PUNCH.mp3")
    crash.play();
}

  document.addEventListener("keyup",function(event){
    const key = event.key;

    if(key === "ArrowLeft"){
      queuesAnimation.push("kick");
      var crash=new Audio("sounds/KICK.mp3")
      crash.play();

    }

    if(key === "ArrowRight"){
      queuesAnimation.push("punch");
      var crash=new Audio("sounds/PUNCH.mp3")
      crash.play();

    }
  })
  

});