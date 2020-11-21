var dog, happyDog;
var dog_img, happyDog_img;
var database;
var foodS, foodStock;

function preload()
{
  dog_img = loadImage("images/dogImg.png");
  happyDog_img = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(800, 800)

  dog = createSprite(400, 450, 30, 30);
  dog.addImage(dog_img);
  dog.scale = 0.3;

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
}

function draw() {  
  background("green");

  //Feed
  if(keyWentDown(UP_ARROW)){
    //writeStock(foodS);
    dog.addImage(happyDog_img);
  }

  drawSprites();
  
  text("Press UP_ARROW Key To Feed The Dog", 300, 100);
  fill("white");
  textSize(100);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }
  
  database.ref("/").update({
    Food: x
  })
}