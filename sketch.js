var john1_animation,john1;
var backgroundImage,stone,stone_image,back;
var tree,tree_image;
var invisibleground;
var play = 1 ;
var END = 0 ;
var start=2;
var gameState = start;
var score = 0 ;

var gameOver, restart;

var obstaclesGroup;

var checkpoint,die,jump;

var john1_animation1;

var gameOver,restart;
var gameOverImage,restartImage;


var titleImage,playImage,developerImage;
var title,play,developer;
var blackScreenImage,blackScreen;


localStorage["HighestScore"]= 0;


function preload(){
  john1_animation=loadAnimation("john 1.png","john 2.png");
  john1_animation1=loadAnimation("john 1.png")
  backgroundImage=loadImage("background.jpg");
  tree_image=loadImage("tree.png");
  stone_image=loadImage("stone.png");
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  blackScreenImage=loadImage("black screen.png");

  checkpoint=loadSound("checkpoint.mp3");
  die=loadSound("die.mp3");
  jump=loadSound("jump.mp3");

titleImage=loadImage("Running John.png");
playImage=loadImage("playButton.png");
developerImage=loadImage("developed by sagnik.png");

}

function setup() {
  createCanvas(600,400);
  blackScreen=createSprite(400,200,50,50);
  blackScreen.addImage(blackScreenImage);
  blackScreen.visible=false;
  back=createSprite(400, 200, 50, 50);
  back.addImage(backgroundImage);
  back.visible=false;




 
  gameOver =  createSprite(300,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.6;


  restart = createSprite(300,250);
  restart.addImage(restartImage);
  restart.scale=0.5;

  title=createSprite(300,100);
  title.addImage(titleImage);
  title.scale=0.8;
  title.visible=false;
  
  developer=createSprite(300,200);
  developer.addImage(developerImage);
  developer.scale=0.25;
  developer.visible=false;

  play=createSprite(300,300);
  play.addImage(playImage)
  play.scale=0.3;
  play.visible=false;



  john1=createSprite(40,350,20,20);
  john1.addAnimation("running",john1_animation);
  john1.addAnimation("stop",john1_animation1);
  //john1.debug=true;
  john1.setCollider("rectangle",0,0,10,john1.height);

  invisibleground=createSprite(300,390,600,5)
  invisibleground.visible=false;

  obstaclesGroup=new Group();

score = 0;
}


function draw() {
  background(255,255,255); 



john1.collide(invisibleground);

console.log(john1.y);

if(gameState===start){
  title.visible=true;
  developer.visible=true;
  play.visible=true;
  john1.visible=false;
  gameOver.visible=false;
  restart.visible=false;
  blackScreen.visible=true;

  if(mousePressedOver(play)){
    gameState=play;
    title.visible=false;
    developer.visible=false;
    play.visible=false;
    john1.visible=true;
    back.visible=true;


  }
}

if(gameState===play){
  score=score+Math.round(getFrameRate()/60);
  if(back.x<0){
    back.x=400
  }
  if(keyDown(UP_ARROW) && john1.y>=342){
    john1.velocityY=-17;
  jump.play();

  }
  john1.velocityY=john1.velocityY+0.8;
  spawnObstacles();
  back.velocityX=-(5+3*score/100);

  if(john1.isTouching(obstaclesGroup)){
    gameState=END
    die.play();


  }
  if(score%100===0 && score>0){
    checkpoint.play();
  }
  gameOver.visible=false;
  restart.visible=false;
}


if(gameState===END){
back.velocityX=0;
john1.changeAnimation("stop",john1_animation1);
obstaclesGroup.setVelocityXEach(0);
obstaclesGroup.setLifetimeEach(-1);

gameOver.visible=true;
  restart.visible=true;

  if(mousePressedOver(restart)){
gameState=play;
score=0;
john1.changeAnimation("running",john1_animation);

obstaclesGroup.destroyEach();
  }
}


  drawSprites();
  textSize(20);
  fill ("red");
  text("score "+score,450,50) ;
  
  
}
function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var obstacles = createSprite(600,370,40,10);
   // tree.x = randomNumber(280,320);
   var rand = Math.round (random(1,2))
   if(rand===1){
    obstacles.addImage(tree_image);
    obstacles.scale = 0.5;
   }
   else if (rand===2){
     obstacles.y=380;
     obstacles.addImage(stone_image)
     obstacles.scale=.05;
   }
    
    obstacles.velocityX = -(3 + score/100);
    
     //assign lifetime to the variable
    obstacles.lifetime = 200;
    
    //adjust the depth
    //cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //add each cloud to the group
   obstaclesGroup.add(obstacles);
  }
}