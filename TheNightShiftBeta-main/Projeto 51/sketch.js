var bg, doorRight, doorLeft, michael, bonnie, chica, freddy, foxy, goldenFreddy, shock;
var bgImg, doorRightImg, doorLeftImg, michaelR, michaelL, michaelShootingR, michaelShootingL, bonnieImg, chicaImg, freddyImg, foxyImg, goldenFreddyImg;
var edgesGroup, bonnieGroup, chicaGroup, freddyGroup, foxyGroup, shockGroup;
var gameState, life;d
var bluebubble,redbubble;
var bubbleImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;
var pontos = 0

function preload() {
  blueBubbleImg = loadImage("assets/waterBubble.png")
  redBubbleImg = loadImage("assets/redbubble.png")
  bgImg = loadImage("assets/ground.jpeg");
  michaelR = loadImage("assets/michaelRight.png");
  michaelL = loadImage("assets/michaelLeft.png");
  michaelShootingR = loadImage("assets/michaelShootingRight.png");
  michaelShootingL = loadImage("assets/michaelShootingLeft.png");
  doorRightImg = loadImage("assets/doorRight.png");
  doorLeftImg = loadImage("assets/doorLeft.png");
  bonnieImg = loadImage("assets/bonnie.png");
  chicaImg = loadImage("assets/chica.png");
  freddyImg = loadImage("assets/freddy.png");
  foxyImg = loadImage("assets/foxy.png");
  goldenFreddyImg = loadImage("assets/goldenFreddy.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  bg = bgImg;
  gameState = "phase1";
  life = 3;

  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup(); 
  michael = createSprite(width/2, height/2, 20, 20);
  michael.addImage("michael", michaelR);
  michael.scale = 0.7;
  michael.setCollider("rectangle", 0, 0, 200, 270, 0);
  michael.debug = false;

  bonnie = createSprite(width/4-200, height/2+175, 20, 20);
  bonnie.addImage("bonnie", bonnieImg);
  bonnie.scale = 0.2;

  chica = createSprite(width-300, height/2-130, 20, 20);
  chica.addImage("chica", chicaImg);
  chica.scale = 0.2;

  freddy = createSprite(width-300, height/2+175, 20, 20);
  freddy.addImage("freddy", freddyImg);
  freddy.scale = 0.2;

  foxy = createSprite(width/4-200, height/2-130, 20, 20);
  foxy.addImage("foxy", foxyImg);
  foxy.scale = 0.185;

  goldenFreddy = createSprite(width/2+300, height/2, 30, 30); 
  goldenFreddy.addImage("goldenFreddy", goldenFreddyImg);
  goldenFreddy.scale = 0.4;

  doorRight = createSprite(width, height/2, 30, 30);
  doorRight.addImage("doorRight", doorRightImg);
  doorRight.scale = 0.7;

  doorLeft = createSprite(0, height/2, 30, 30);
  doorLeft.addImage("doorLeft", doorLeftImg);
  doorLeft.scale = 0.7;
}

function draw() {
  background(bg);  
  michael.bounceOff(doorLeft);
  michael.bounceOff(doorRight);

  if (frameCount % 80 === 0) {
    drawblueBubble();
  }

  if (frameCount % 100 === 0) {
    drawredBubble();
  }

  

  if(keyIsDown(RIGHT_ARROW) && michael.x < width){
    michael.x += 5;
    michael.addImage("michael", michaelR);
  }
  if(keyIsDown(LEFT_ARROW) && michael.x > 0){
    michael.x -= 5;
    michael.addImage("michael", michaelL);
  }

  if(keyIsDown(UP_ARROW) && michael.y > 0){
    michael.y -= 5;
  }
  if(keyIsDown(DOWN_ARROW) && michael.y < height){
    michael.y += 5;
  }

  if(keyIsDown(32)){
    shootShock();
  }

  if(blueBubbleGroup.collide(shootShock)){
    handleBubbleCollision(blueBubbleGroup);
  }

  if(redBubbleGroup.collide(shootShock)){
    handleBubbleCollision(redBubbleGroup);
  }

  redBubbleGroup.depth = michael.depth+1
  waterGroup.depth = michael.depth+1
  drawSprites();

  textSize(25);
  fill("red");
  stroke("black");
  text("The Night Shift Mova-se com as setas e atire nos balões com ESPAÇO.", 0, height/6-80);
}

function shootShock() {
  shock = createSprite(michael.x, michael.y, 50, 20);
  shock.lifetime = 150;
  shock.shapeColor = "cyan";
   
  if(keyIsDown(RIGHT_ARROW)){
    shock.velocityX = 30;
    shock.velocityY = 0;
    shock.x = michael.x+20;
    michael.addImage("michael", michaelShootingR);
  }else if(keyIsDown(LEFT_ARROW)){
    shock.velocityX = -30;
    shock.velocityY = 0;
    shock.x = michael.x-20;
    michael.addImage("michael", michaelShootingL);
  }else if(keyIsDown(UP_ARROW)){
    shock.velocityX = 0;
    shock.velocityY = -30;
  }else if(keyIsDown(DOWN_ARROW)){
    shock.velocityX = 0;
    shock.velocityY = 30;
  }else{
    shock.velocityX = 30;
    shock.velocityY = 0;
    shock.x = michael.x+20;
    michael.addImage("michael", michaelShootingR);
  }
}

function drawblueBubble(){
  bluebubble = createSprite(800,random(20,780),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.1;
  bluebubble.velocityY = -8;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}
function drawredBubble(){
  redbubble = createSprite(800,random(20,780),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityY = -8;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}
