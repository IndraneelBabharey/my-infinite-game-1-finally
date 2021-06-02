var gameState = "play"
var END = 0

var bg,bg_image;
var cap,cap_image;
var player_anima,player,player_image,jump_anima;
var ground;

var flame,flame_anima,obstaclesGroup
var bin_image
var rand
var car_image
var gameOver_sound,gameOver,gameOver_img
var restart,restart_img


var plane,planeGroup,plane_sound,plane_image,player_img2

function preload(){
  
  gameOver_sound = loadSound("gameover.mp3")
  gameOver_img = loadImage("gameover.png")
  
  restart_img = loadImage("restartimg.png")
  
  car_image = loadAnimation("car crash.png")
  
  bin_image = loadAnimation("bin.png")
  
  bg_image = loadImage("bg road.jpg")
  
  flame_anima = loadAnimation("spike.png")
  
  plane_image = loadImage("plane.png")
  
  player_image = loadAnimation("run1.png","run2.png","run3.png","run4.png","run5.png","run6.png")
  
  player_img2 = loadAnimation("run1.png")
  
  jump_anima = loadAnimation("jump1.png","jump2.png","jump3.png")
  
  
 
}


function setup(){
  
  
  
  createCanvas(550,500)
  bg = createSprite(250,200)
  bg.addImage(bg_image)
  bg.scale = 1.6
  bg.velocityX = -3
  
  player = createSprite(70,355)
  //player.addImage(player_image)
  player.addAnimation("running",player_image);
  player.addAnimation("jumping",jump_anima)
  player.addAnimation("collided",player_img2)
  player.debug = false
  player.setCollider("circle",0,0,50)
  
  ground = createSprite(275,450,550,20);
  ground.visible = false
  ground.velocityX = -3
 
  gameOver = createSprite(265,193)
  gameOver.addImage(gameOver_img)
  gameOver.scale = 2
  
  restart = createSprite(265,280)
  restart.addImage(restart_img)
  restart.scale = 0.5
  
 obstaclesGroup = createGroup()
  planeGroup = createGroup()
  
  score = 0
}


function draw(){
  
  
  background(0)
   
  
  if(bg.x < 100){
    bg.x = bg.width/2
      } 
  
  if(gameState === "play"){
    
    gameOver.visible = false
    restart.visible = false
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
     
  if(ground.x < 0){
    ground.x = ground.width/2
  }
  if(keyDown ( UP_ARROW)&& player.y > 150){
   jump()
  }
   if(player.isTouching(ground)){
    run()
  }
   player.velocityY = player.velocityY + 0.8
    
     spawnObstacles()
  spawnPlanes()
    
    if(obstaclesGroup.isTouching(player)){
      gameState = "end"
    }
    
    if(planeGroup.isTouching(player)){
      gameState = "end"
    }
  }
 else if(gameState === "end"){
   
   
   gameOver.visible = true
   restart.visible = true
    player.changeAnimation("collided",player_img2)
   
   bg.velocityX = 0
   ground.velocityX = 0
   player.velocityY = 0
   obstaclesGroup.setLifetimeEach(-1)
   planeGroup.setLifetimeEach(-1)
  
 
   obstaclesGroup.setVelocityXEach(0)
   planeGroup.setVelocityXEach(0)
   
   
   if(mousePressedOver(restart)){
     reset()
   }
   
   
         
         }
  
  
 
  player.collide(ground);
  
  
  text("X"+mouseX+","+"Y"+mouseY,mouseX,mouseY);
  drawSprites()
  
  textSize(20)
  stroke("black")
  text("Score: "+ score, 400,50);
  
 
  
   textSize(30)
  strokeWeight(8)
  stroke("black")
  textFont("alloy ink")
 // text("Press space to start!!",145,108)
}


function jump(){ player.changeAnimation("jumping",jump_anima); player.velocityY = -10
}

function run(){ player.changeAnimation("running",player_image)
              }


function spawnPlanes(){
  if(frameCount % 200 === 0){
    plane = createSprite(400,random(30,70),5,5)
    plane.addImage(plane_image)
    plane.scale = 0.5
    plane.rotation= 10
    plane.velocityX = -8
    plane.lifetime = 100
    
    
    planeGroup.add(plane)
  }
  
}



function spawnObstacles(){
  if(frameCount % 100=== 0){
    flame= createSprite(500,410,20,30)
    flame.scale= 0.3
    flame.velocityX = -6
   // flame.addAnimation("burn",flame_anima)
  //  console.log("hi")
    flame.lifetime = 100
    
    
 // flame.setCollider("rectangle",0,0,flame.width,flame.height);
 // flame.debug = true
    
    
    rand = Math.round(random(1,3))
    switch(rand){
      case 1: flame.addAnimation("burn",flame_anima)
        break;
        case 2: flame.addAnimation("bin_running",bin_image)
        break;
        case 3: flame.addAnimation("broken",car_image)
        break;
        default:break;
        
         }
    
    
    obstaclesGroup.add(flame)
    
    
    
  }
}


function reset(){
  gameState =  "play"
  gameOver.visible = false
  restart.visible = false
  obstaclesGroup.destroyEach()
  planeGroup.destroyEach()
  player.changeAnimation("running",player_image)
  score = 0
  bg.velocityX = -3
}