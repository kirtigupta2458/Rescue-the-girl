var PLAY =1
var END =0
var INTRO=2
var WIN=3

var gameState = INTRO
var tool;
var Safetytool=0

function  preload(){

  bgImg = loadImage("bg.jpg")
  brushImg=loadImage("brushKnife.png")
  keyChainImg = loadImage("keyChain.png")
  knifeImg = loadImage("knife.png")
  pepperImg = loadImage("peppergun.png")
  ringImg=loadImage("ringknife.png")
  stungunImg=loadImage("stungun.png")

  girlImg= loadAnimation("girl1.png","girl2.png","girl3.png","girl4.png")

  houseImg = loadImage("house.jpg")
  playImg = loadImage("play.png")

bb1 = loadImage("bb1.png")
bb2 = loadImage("bb2.png")
bb3 = loadImage("bb3.png")
bb4 = loadImage("bb4.png")
bb5 = loadImage("bb5.png")

gameOverImg = loadImage("gameOver.png") 
restartImg= loadImage("restart.png")
}

function setup(){
 canvas = createCanvas(windowWidth-50,windowHeight-50)

 bg1 = createSprite(0,windowHeight/2,10,10)
 bg1.addImage(bgImg)
 bg1.scale = 2.5

 girl = createSprite(200,windowHeight-200,20,50)
 girl.addAnimation("girl",girlImg)
 girl.scale = 0.5

 girl.setCollider("rectangle",0,0,200,300)

 ground= createSprite((windowWidth*5/2),windowHeight-75,windowWidth*6,10)
 ground.visible = false;

 house= createSprite(windowWidth/2,windowHeight/2,10,10)
 house.addImage(houseImg)
 house.scale = 3

 

 gameOver = createSprite(windowWidth/2,windowHeight/2-150);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(windowWidth/2,windowHeight/2);
  restart.addImage(restartImg);

  play = createSprite(windowWidth/2,windowHeight/1.25);
  play.addImage(playImg);

  gameOver.scale = 1;
  restart.scale =2;



 toolsGroup = new Group();
 bbGroup = new Group();



}

function draw(){
  background("black")
  drawSprites()
  
   
  if(gameState===INTRO){
    girl.visible=false
    gameOver.visible = false;
    restart.visible = false;
    house.visible=false
    play.visible = true
    bg1.visible=true
    textSize(100)
    fill("white")
    textAlign(CENTER)
    text("Rescue The Girl",windowWidth/2,150)

    textSize(50)
    text("Help the girl reach Safely at home.",windowWidth/2,windowHeight/4)
    text("Help her to collect 50 safety tools to reach her destination.",windowWidth/2,windowHeight/4+100)
    text("You can use your arrow keys and space bar to control the player",windowWidth/2,windowHeight/4+200)


    if(mousePressedOver(play)){
      gameState=PLAY;
    }

    }





  else if(gameState === PLAY){
     
    textSize(30)
    fill("white")
    text("Safety tools : "+Safetytool,30,50)
    girl.visible=true
    gameOver.visible = false;
    restart.visible = false;
    house.visible=false
    play.visible = false
    bg1.visible=true
    if(keyDown("right")){
      girl.x = girl.x + 10
    }

    if(keyDown("left")){
      girl.x = girl.x - 10
    }

    if(keyDown("space")&& girl.y>812){
      girl.velocityY= -28
    }

   

    girl.velocityY=girl.velocityY+1;
    console.log(house.x)
    
    
    bg1.velocityX=-7
    if(bg1.x<-1000)
    {bg1.x=0}

    if(toolsGroup.isTouching(girl)){
      toolsGroup[0].destroy();
      Safetytool+=1
    }
    
    
    safetytools();
    
    badboy();

    if(bbGroup.isTouching(girl)){
      gameState = END
    }

    else if(Safetytool===50){
      gameState = WIN
    }

  
  }


 else if(gameState === WIN){
    
    girl.visible=false
    gameOver.visible = false;
    restart.visible = true;
    house.visible=true
    play.visible = false
    bg1.visible=false
   
    
    textSize(100)
    fill("white")
    textAlign(CENTER)
    text("You Succeeded !!! ",windowWidth/2,150)
    textSize(70)
    text("What if this girl was one of your relative ? ",windowWidth/2,300)

    bg1.velocityX = 0;
    girl.velocityY= 0;
    bbGroup.destroyEach()
    toolsGroup.destroyEach()
    bbGroup.setLifetimeEach(-1)
    toolsGroup.setLifetimeEach(-1)

    if(mousePressedOver(restart)){
      reset();
    }

  }


  else if(gameState === END){
    girl.visible=false
  
    restart.visible = true;
    house.visible=false
    play.visible = false
    bg1.visible=true
    
    textSize(100)
    fill("white")
    textAlign(CENTER)
    text("Game Over !!!",windowWidth/2,250)

    bg1.velocityX = 0;
    girl.velocityY= 0;
    bbGroup.setVelocityXEach(0)
    toolsGroup.setVelocityXEach(0)
    bbGroup.setLifetimeEach(-1)
    toolsGroup.setLifetimeEach(-1)

    if(mousePressedOver(restart)){
      reset();
    }

  }





 



 
  girl.collide(ground);
}

function reset(){
  gameState = INTRO
  gameOver.visible = false;
  restart.visible = false;

  bbGroup.destroyEach()
  toolsGroup.destroyEach()
  Safetytool = 0
}


function safetytools(){

  if(frameCount%120===0){
    tool = createSprite(windowWidth,random(450,600),100,100)
    tool.velocityX = -7
     
   
    var rand = Math.round(random(1,6))
    
    switch(rand){
      case 1: tool.addImage(brushImg)
      break;
      case 2: tool.addImage(keyChainImg)
      break;
      case 3: tool.addImage(knifeImg)
      break;
      case 4: tool.addImage(pepperImg)
      break;
      case 5: tool.addImage(ringImg)
      break;
      case 6: tool.addImage(stungunImg)
      break;
      deafult:break;
    }
  
    tool.scale = 0.3;
    toolsGroup.add(tool)
    tool.lifetime = windowWidth/3
   
   
  }

 
}

function badboy(){
  if(frameCount%150===0){
    bb = createSprite(windowWidth,windowHeight-200,100,100)
    bb.velocityX =  -7
    bb.debug=false
    bb.setCollider("rectangle",0,0,170,300)

   
    var rand = Math.round(random(1,5))
    
    switch(rand){
      case 1: bb.addImage(bb1)
      break;
      case 2: bb.addImage(bb2)
      break;
      case 3: bb.addImage(bb3)
      break;
      case 4: bb.addImage(bb4)
      break;
      case 5: bb.addImage(bb5)
     
      break;
     
      deafult:break;
    }
  
    bb.scale = 0.5;
    bbGroup.add(bb)
    bb.lifetime = windowWidth/5
   
   
  }
 
}
