var dogImg, happyDogImg, dog, database, foodS, 
foodStock, canvas, lastFed, fedTime, foodObj, 
feed, addFood, foodObj, foodCount, input, milk,
 milkImg,readState,changeState,bedRoomImg,gardenImg
 ,washRoomImg,gameState;

function preload() {
  sadImg = loadImage("images/lazy.png")
  dogImg = loadImage('images/Dog.png');
  happyDogImg = loadImage('images/dogImg1.png');
  milkImg = loadImage('images/Milk.png');
  bedRoomImg = loadImage("images/Bed Room.png")
  gardernImg = loadImage("images/Garden.png")
  washRoomImg = loadImage("images/Wash Room.png")
}

function setup() {
  canvas = createCanvas(800, 400);
  database = firebase.database();

  dog = createSprite(650, 250);
  dog.scale = 0.3;
  dog.addImage(dogImg);

  milk = createSprite(565, 300);
  milk.addImage(milkImg);
  milk.scale = 0.1;
  milk.visible = false;
  milk.rotation = 55;
  
  foodObj = new Food();
  
  foodObj.start();

  addFood = createButton("Add food");
  addFood.position(370, 45);
  addFood.mousePressed(addFoods);

  

  feed = createButton("Feed your Dog");
  feed.position(450, 45);
  feed.mousePressed(feedDog);

  

  readState = database.ref('gameState')
  readState.on("value",function(data){
    gameState = data.val();
  });
}

function draw() {  

  background(46, 139, 87);
  currentTime = hour();
if(currentTime == (lastFed+1)){
  update("playing")
  foodObj.gardern();
}else if(currentTime == (lastFed+2)){
  update("sleeping")
  foodObj.bedroom()
}else if(currentTime > (lastFed+2)&& currentTime<=lastFed+4){
  update("bathing")
  foodObj.washroom()
}else{
  update("hungry")
  foodObj.display()
}
  

if(gameState!= "hungry"){
  feed.hide(); 
  addFood.hide();
  dog.remove();
}else{
  feed.show()
  addFood.show()
  dog.addImage(happyDogImg)
}




  drawSprites();

}

function feedDog() {
  foodObj.getFoodStock();
  foodObj.updateFedTime();

  if(foodCount === 0) {
    foodCount = 0;
    milk.visible = false;
    dog.addImage(dogImg);
  } else {
    foodObj.updateFoodStock(foodCount - 1);
    milk.visible = true;
    dog.addImage(happyDogImg);
  }
}

function addFoods() {
 foodObj.getFoodStock();

 foodObj.updateFoodStock(foodCount + 1); 
}
function update(state){
database.ref('/').update({
  gameState:state
});
}
