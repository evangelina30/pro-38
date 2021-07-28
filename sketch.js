var database;
var dog,sadDog,happyDog,garden,washroom;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;
var gameState,readState;

function preload(){
sadDog=loadImage("Images/Dog.png");
happyDog=loadImage("Images/happy dog.png");
garden=loadImage("Images/Garden.png");
washroom=loadImage("Images/Wash Room.png");
bedroom=loadImage("Images/Bed Room.png");
livingroom=loadImage("Images/Living Room.png")
milkBottle=loadImage('Images/Milk.png');
}

function setup() {
  database=firebase.database();
  createCanvas(400,500);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  //read game state from database
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
   
  dog=createSprite(200,400,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  
}

function draw() {
  
  
  writeStock(foodS);
   
  if(sfood==0){
    dog.addImage(happyDog);
    milkBottle.visilble=false;
  }else{
    dog.addImage(sadDog);
    milkBottle.visilble=true
  }
  if(gameState===1){
    dog.addImage(happyDog);
    dog.scale=0.175;
    dog.y=250;
  }

  if(gameState===2){
   dog.addImage(sadDog);
   dog.sacle=0.175;
   milkBottle.visilble=false;
   dog.y=250;
  }

  var bath = createButton("I want to take bath")
  bath.position(580,125);
  if(bath.mousePressed(function(){
    gameState=3;
    database.ref('/').update({'gameState':gameState});
  }));

  if(gameState===3){
   dog.addImage(washroom);
   dog.scale=1;
   milkBottle.visilble=false;
  }
  var sleep = createButton("I want to sleep!");
  sleep.position(710,125);
  if(sleep.mousePressed(function(){
    gameState=4;
    database.ref('/').update({'gameState':gameState});
  }))
  
  if(gameState===4){
    dog.addImage(bedroom);
    dog.scale=1;
    milkBottle.visilble=false;
  }

  var play = createButton("Play with me!")
  play.position(500,160);
  if(play.mousePressed(function(){
    gameState=5;
    database.ref('/').update({'gameState':gameState})
  }))

  if(gameState===5){
    dog.addImage(livingroom);
    dog.scale=1;
    milkBottle.visilble=false;
  }

  var PlayinGarden = createButton("Let's play in garden!")
  PlayinGarden.position(585,160);
  if(PlayinGarden.mousePressed(function(){
    gameState=6;
    database.ref('/').update({'gameState':gameState})
  }))

  if(gameState===6){
    dog.addImage(garden);
    dog.scale=1;
    milkBottle.visilble =false;
  }
  
   
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();

}
function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

 

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}
}