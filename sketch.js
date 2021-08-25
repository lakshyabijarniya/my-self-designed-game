var boy, boyImg;
var food, foodImg;
var obstacle, obstacleImg;
var eatingsound;
var gameoversound;
var restart, restartImg;
var gameOver, gameOverImg;
var bgImg;
var ground;
var gameState = "PLAY";
var dead, deadImg;
var idel, idelImg;
var poisonousPlant, posisonousPlantImages;
var score = 0;
var lifes = 3;

function preload() {
    bgImg = loadImage("images/background.jpg");

    boyImg = loadAnimation("boy/Run (1).png", "boy/Run (2).png", "boy/Run (3).png", "boy/Run (4).png", "boy/Run (5).png", "boy/Run (6).png", "boy/Run (7).png", "boy/Run (8).png", "boy/Run (9).png", "boy/Run (10).png");

    foodImg = loadImage("images/food.png");

    obstacleImg = loadAnimation("obstacles/dragon1.png", "obstacles/dragon2.png", "obstacles/dragon3.png", "obstacles/dragon4.png", "obstacles/dragon5.png");

    restartImg = loadImage("icons/restart-icon.png");

    gameOverImg = loadImage("icons/game-over-icon.png");

    eatingsound = loadSound("food-eating-sound.mp3");

    gameoversound = loadSound("game-sound.mp3");

    posisonousPlantImages = loadImage("obstacles/poisonous-plant.png");
}

function setup() {
    createCanvas(displayWidth, displayHeight);
    ground = createSprite(displayWidth / 2, displayHeight - 40, displayWidth * displayWidth, 25);
    ground.visible = true;

    boy = createSprite(20, displayHeight - 60, 20, 20);
    boy.addAnimation("boy", boyImg);
    boy.scale = 0.2;
    boy.setCollider("rectangle", -130, 10, 200, 440);

    obGroup = new Group();
    frGroup = new Group();

    gameOver = createSprite(20, 300);
    gameOver.addImage("go", gameOverImg);
    gameOver.scale = 0.5;

    restart = createSprite(20, 430, 20, 20);
    restart.addImage("re", restartImg);
    restart.scale = 0.5;

}

function draw() {
    background(bgImg);
    textSize(40);
    strokeWeight(8);
    stroke("blue");
    fill("yellow")
    text("score :" + score, 20, 350);
    text("lifes :" + lifes, 20, 384 + 20);

    boy.collide(ground);
    spawnObstacle();
    spawndr();
    spawnFr();
    if (ground.x < 0) {
        ground.x = ground.width / 2;
    }

    if (gameState === "PLAY") {

        if (boy.isTouching(frGroup)) {
            score += 1;
            frGroup.destroyEach();
            eatingsound.play();
        }

        if (keyDown("SPACE") && boy.isTouching(ground)) {
            boy.velocityY = -15;
        }

        boy.velocityY += 0.5;


        if (boy.isTouching(obGroup)) {
            obGroup.destroyEach();
            lifes -= 1;
            // obGroup.destroyEach();
        }

        if (lifes <= 0) {
            gameState = "END";
            gameoversound.play();
        }
        gameOver.visible = false;
        restart.visible = false;
    }
    else if (gameState === "END") {
        background("red");
        boy.velocityY = 0;
        boy.visible = false;
        gameOver.visible = true;
        restart.visible = true;
        textSize(40);
        strokeWeight(4);
        stroke("blue");
        fill("green");
        obGroup.destroyEach();
        frGroup.destroyEach();
        obGroup.setLifetimeEach(-1);
        camera.x = displayWidth / 2;
        if (mousePressedOver(restart)) {
            gameState = "PLAY";
            score = 0;
            lifes = 3;
            boy.visible = true;
        }
    }

    camera.position.x = boy.x;
    drawSprites();
}

function spawnObstacle() {
    if (frameCount % 100 === 0) {
        var ob = createSprite(displayWidth + 50, displayHeight - 115, 20, 20);
        ob.addImage("po", posisonousPlantImages);
        ob.velocityX = -5;
        ob.scale = 0.5;
        obGroup.add(ob);
        ob.lifetime = 400;
    }
}

function spawndr() {
    if (frameCount % 200 === 0) {
        var drag = createSprite(displayWidth + 50, displayHeight - 300, 20, 20);
        drag.addAnimation("dragon", obstacleImg);
        drag.velocityX = -8;
        drag.scale = 0.5;
        obGroup.add(drag);
        drag.lifetime = 400;
    }
}

function spawnFr() {
    if (frameCount % 50 === 0) {
        var rand = Math.round(random(displayHeight / 2, displayHeight - 200));
        var fruit = createSprite(displayWidth + 50, rand, 20, 20);
        fruit.addImage(foodImg);
        fruit.velocityX = -4;
        fruit.scale = 0.1;
        fruit.lifetime = 400;
        frGroup.add(fruit);
    }
}