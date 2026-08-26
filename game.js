// ======================================================
// JAMPU
// STICKMAN ADVENTURE
// ======================================================


// ======================================================
// CANVAS
// ======================================================

const canvas =
    document.getElementById("gameCanvas");

const ctx =
    canvas.getContext("2d");


// ======================================================
// GAME SETTINGS
// ======================================================

const gravity = 0.6;

const playerSpeed = 5;

const jumpPower = 13;


// ======================================================
// GAME VARIABLES
// ======================================================

let currentLevel = 1;

let score = 0;

let coinCount = 0;

let lives = 3;

// ======================================================
// LEVEL UNLOCK SYSTEM
// ======================================================


let unlockedLevels =
    JSON.parse(
        localStorage.getItem(
            "jampuUnlockedLevels"
        )
    )
    ||
    {
        1:true,
        2:false,
        3:false
    };


let gameTime = 0;

let gameRunning = false;

let paused = false;

let gameOver = false;

let levelComplete = false;

let gameWon = false;


// ======================================================
// REVIVE SYSTEM
// ======================================================

// 每一次完整游戏只能使用一次广告复活

let reviveUsed = false;

let adPlaying = false;


// ======================================================
// LEVEL DATA
// ======================================================

const levels = {


// ======================================================
// LEVEL 1
// ======================================================

1: {

    worldWidth: 5000,

    theme: "day",

    platforms: [

        { x: 0, y: 540, width: 1200, height: 60 },

        { x: 250, y: 450, width: 180, height: 25 },

        { x: 520, y: 380, width: 180, height: 25 },

        { x: 800, y: 450, width: 180, height: 25 },

        { x: 1100, y: 500, width: 250, height: 40 },

        { x: 1450, y: 420, width: 180, height: 25 },

        { x: 1750, y: 340, width: 180, height: 25 },

        { x: 2050, y: 470, width: 220, height: 25 },

        { x: 2400, y: 390, width: 180, height: 25 },

        { x: 2700, y: 310, width: 180, height: 25 },

        { x: 3050, y: 500, width: 250, height: 40 },

        { x: 3400, y: 420, width: 180, height: 25 },

        { x: 3700, y: 350, width: 200, height: 25 },

        { x: 4050, y: 470, width: 220, height: 25 },

        { x: 4400, y: 380, width: 200, height: 25 },

        { x: 4750, y: 500, width: 250, height: 40 }

    ],


    coins: [

        { x: 320, y: 410 },

        { x: 590, y: 340 },

        { x: 870, y: 410 },

        { x: 1200, y: 460 },

        { x: 1510, y: 380 },

        { x: 1810, y: 300 },

        { x: 2150, y: 430 },

        { x: 2460, y: 350 },

        { x: 2760, y: 270 },

        { x: 3170, y: 460 },

        { x: 3470, y: 380 },

        { x: 3780, y: 310 },

        { x: 4170, y: 430 },

        { x: 4500, y: 340 }

    ],


    enemies: [

        {
            x: 700,
            y: 340,
            width: 40,
            height: 40,
            velocityX: 2,
            startX: 520,
            endX: 660
        },

        {
            x: 1250,
            y: 460,
            width: 40,
            height: 40,
            velocityX: 2,
            startX: 1100,
            endX: 1310
        },

        {
            x: 1800,
            y: 300,
            width: 40,
            height: 40,
            velocityX: 2,
            startX: 1750,
            endX: 1890
        },

        {
            x: 2450,
            y: 350,
            width: 40,
            height: 40,
            velocityX: 2,
            startX: 2400,
            endX: 2540
        },

        {
            x: 3500,
            y: 380,
            width: 40,
            height: 40,
            velocityX: 2,
            startX: 3400,
            endX: 3540
        },

        {
            x: 4100,
            y: 430,
            width: 40,
            height: 40,
            velocityX: 2,
            startX: 4050,
            endX: 4230
        }

    ],


    goal: {

        x: 4900,

        y: 400,

        width: 40,

        height: 100
    }

},


// ======================================================
// LEVEL 2
// ======================================================

2: {

    worldWidth: 6000,

    theme: "night",

   jumpPads: [

    {
        x: 1350,
        y: 500,
        width: 80,
        height: 20,
        power: 24
    },

    {
        x:3200,
        y:500,
        width:80,
        height:20,
        power:24
    }

],



    platforms: [

        { x: 0, y: 540, width: 600, height: 60 },

        { x: 700, y: 450, width: 150, height: 25 },

        { x: 950, y: 360, width: 150, height: 25 },

        { x: 1200, y: 450, width: 130, height: 25 },

        { x: 1450, y: 330, width: 150, height: 25 },

        { x: 1700, y: 250, width: 150, height: 25 },

        { x: 1950, y: 380, width: 160, height: 25 },

        { x: 2250, y: 470, width: 150, height: 25 },

        { x: 2500, y: 350, width: 140, height: 25 },

        { x: 2750, y: 270, width: 150, height: 25 },

        { x: 3050, y: 420, width: 140, height: 25 },

        { x: 3300, y: 320, width: 150, height: 25 },

        { x: 3600, y: 240, width: 150, height: 25 },

        { x: 3900, y: 370, width: 160, height: 25 },

        { x: 4200, y: 470, width: 150, height: 25 },

        { x: 4450, y: 350, width: 150, height: 25 },

        { x: 4700, y: 270, width: 150, height: 25 },

        { x: 5000, y: 400, width: 180, height: 25 },

        { x: 5300, y: 500, width: 700, height: 40 }

    ],


    coins: [

        { x: 760, y: 410 },

        { x: 1010, y: 320 },

        { x: 1260, y: 410 },

        { x: 1510, y: 290 },

        { x: 1760, y: 210 },

        { x: 2010, y: 340 },

        { x: 2310, y: 430 },

        { x: 2560, y: 310 },

        { x: 2810, y: 230 },

        { x: 3110, y: 380 },

        { x: 3360, y: 280 },

        { x: 3660, y: 200 },

        { x: 3960, y: 330 },

        { x: 4260, y: 430 },

        { x: 4510, y: 310 },

        { x: 4760, y: 230 },

        { x: 5070, y: 360 }

    ],


    enemies: [

        {
            x: 450,
            y: 500,
            width: 40,
            height: 40,
            velocityX: 2,
            startX: 300,
            endX: 540
        },

        {
            x: 730,
            y: 410,
            width: 40,
            height: 40,
            velocityX: 2,
            startX: 700,
            endX: 810
        },

        {
            x: 980,
            y: 320,
            width: 40,
            height: 40,
            velocityX: 2,
            startX: 950,
            endX: 1060
        },

        {
            x: 1460,
            y: 290,
            width: 40,
            height: 40,
            velocityX: 2,
            startX: 1450,
            endX: 1560
        },

        {
            x: 1730,
            y: 210,
            width: 40,
            height: 40,
            velocityX: 2,
            startX: 1700,
            endX: 1810
        },

        {
            x: 2280,
            y: 430,
            width: 40,
            height: 40,
            velocityX: 2,
            startX: 2250,
            endX: 2360
        },

        {
            x: 2780,
            y: 230,
            width: 40,
            height: 40,
            velocityX: 2,
            startX: 2750,
            endX: 2860
        },

        {
            x: 3330,
            y: 280,
            width: 40,
            height: 40,
            velocityX: 2,
            startX: 3300,
            endX: 3410
        },

        {
            x: 3630,
            y: 200,
            width: 40,
            height: 40,
            velocityX: 2,
            startX: 3600,
            endX: 3710
        },

        {
            x: 4230,
            y: 430,
            width: 40,
            height: 40,
            velocityX: 2,
            startX: 4200,
            endX: 4310
        },

        {
            x: 4730,
            y: 230,
            width: 40,
            height: 40,
            velocityX: 2,
            startX: 4700,
            endX: 4810
        }

    ],


    goal: {

        x: 5500,

        y: 400,

        width: 40,

        height: 100
    }

},


// ======================================================
// LEVEL 3
// ======================================================

3: {

    worldWidth: 5200,

    theme: "volcano",

    rocks:[
    {
        x:1200,
        y:-100,
        size:40,
        speed:5
    },

    {
        x:2600,
        y:-300,
        size:50,
        speed:6
    },

    {
        x:3800,
        y:-200,
        size:45,
        speed:5
    }
],

     jumpPads: [

    {
        x:1950,
        y:500,
        width:80,
        height:20,
        power:24
    },

    {
         x:3000,
        y:500,
        width:80,
        height:20,
        power:26
    }

],

    platforms:[


        // START
        {
            x:0,
            y:540,
            width:700,
            height:60
        },


        // 1
        {
            x:850,
            y:460,
            width:180,
            height:25
        },


        // 2
        {
            x:1150,
            y:380,
            width:180,
            height:25
        },


        // 3
        {
            x:1450,
            y:300,
            width:180,
            height:25
        },


        // 4
        {
            x:1750,
            y:420,
            width:220,
            height:25
        },


        // 5
        {
            x:2100,
            y:340,
            width:180,
            height:25
        },


        // 6
        {
            x:2400,
            y:250,
            width:180,
            height:25
        },


        // 7
        {
            x:2750,
            y:400,
            width:220,
            height:25
        },


        // 8
        {
            x:3150,
            y:320,
            width:180,
            height:25
        },


        // 9
        {
            x:3500,
            y:220,
            width:180,
            height:25
        },


        // 10
        {
            x:3900,
            y:350,
            width:220,
            height:25
        },


        // final area
        {
            x:4400,
            y:500,
            width:600,
            height:40
        }


    ],



    goal:{

        x:4800,

        y:400,

        width:40,

        height:100

    },


    lava:{

        y:600,

        height:100

    }


}

};


// ======================================================
// CURRENT LEVEL OBJECTS
// ======================================================

let platforms = [];

let coins = [];

let enemies = [];

let jumpPads = [];

let goal = null;

let worldWidth = 5000;

let lava = null;

// ======================================================
// PLAYER
// ======================================================

const player = {

    x: 100,

    y: 400,

    width: 40,

    height: 60,

    velocityX: 0,

    velocityY: 0,

    onGround: false,

    direction: 1

};


// ======================================================
// CAMERA
// ======================================================

const camera = {

    x: 0,

    width: canvas.width,

    followOffset: 400

};


// ======================================================
// KEYS
// ======================================================

const keys = {};


// ======================================================
// DOM
// ======================================================

const startScreen =
    document.getElementById("startScreen");

const gameScreen =
    document.getElementById("gameScreen");

const gameOverScreen =
    document.getElementById("gameOverScreen");

const levelCompleteScreen =
    document.getElementById("levelCompleteScreen");

const adScreen =
    document.getElementById("adScreen");

const reviveScreen =
    document.getElementById("reviveScreen");

const levelIntroScreen =
    document.getElementById("levelIntroScreen");


const startButton =
    document.getElementById("startButton");

const restartButton =
    document.getElementById("restartButton");

const mainMenuButton =
    document.getElementById("mainMenuButton");

const nextLevelButton =
    document.getElementById("nextLevelButton");

const completeMenuButton =
    document.getElementById("completeMenuButton");

const reviveButton =
    document.getElementById("reviveButton");


const scoreDisplay =
    document.getElementById("scoreDisplay");

const coinDisplay =
    document.getElementById("coinDisplay");

const levelDisplay =
    document.getElementById("levelDisplay");

const livesDisplay =
    document.getElementById("livesDisplay");

const finalScore =
    document.getElementById("finalScore");

const levelScore =
    document.getElementById("levelScore");

const adCountdown =
    document.getElementById("adCountdown");


    // ======================================================
// MAIN MENU DOM
// ======================================================


const levelSelectScreen =
    document.getElementById(
        "levelSelectScreen"
    );


const levelSelectButton =
    document.getElementById(
        "levelSelectButton"
    );


const level1Button =
    document.getElementById(
        "level1Button"
    );


const level2Button =
    document.getElementById(
        "level2Button"
    );


const level3Button =
    document.getElementById(
        "level3Button"
    );


const backMenuButton =
    document.getElementById(
        "backMenuButton"
    );



// ======================================================
// KEYBOARD
// ======================================================

document.addEventListener(
    "keydown",
    function(event) {

        keys[event.code] = true;


        if (
            event.code === "Space" ||
            event.code === "ArrowUp" ||
            event.code === "ArrowDown" ||
            event.code === "ArrowLeft" ||
            event.code === "ArrowRight"
        ) {

            event.preventDefault();
        }


        if (
            event.code === "Escape" &&
            gameRunning &&
            !gameOver &&
            !levelComplete
        ) {

            paused = !paused;
        }

    }
);


document.addEventListener(
    "keyup",
    function(event) {

        keys[event.code] = false;

    }
);


// ======================================================
// LOAD LEVEL
// ======================================================

function loadLevel(levelNumber) {

    const level =
        levels[levelNumber];


    if (!level) {
        return;
    }


    worldWidth =
        level.worldWidth;


    platforms =
        level.platforms.map(
            platform => ({
                ...platform
            })
        );


    coins =
    level.coins
    ? level.coins.map(
        coin => ({

            ...coin,

            radius:13,

            collected:false

        })
    )
    :
    [];

    enemies =
    level.enemies
    ?
    level.enemies.map(
        enemy => ({

            ...enemy,

            alive:true

        })
    )
    :
    [];
    
    jumpPads =
    level.jumpPads
    ? level.jumpPads.map(
        pad => ({
            ...pad
        })
    )
    : [];

    fallingRocks =
    level.rocks
    ?
    level.rocks.map(
        rock=>({
        ...rock
    }))
    :
    [];


    goal = {

        ...level.goal,

        reached: false

    };

    // LOAD JUMP PADS

    jumpPads =
        level.jumpPads || [];


    // LOAD LAVA

    lava =
        level.lava || null;


    resetPlayer();

    camera.x = 0;

    updateUI();

    drawFrame();
}

function checkJumpPads() {


    for (
        const pad of jumpPads
    ) {


        const collision =

            player.x + player.width >
            pad.x &&

            player.x <
            pad.x + pad.width &&

            player.y + player.height >
            pad.y &&

            player.y + player.height <
            pad.y + pad.height + 20;


        if(collision){


            player.velocityY =
                -pad.power;


            player.onGround = false;


        }

    }

}


// ======================================================
// RESET PLAYER
// ======================================================

function resetPlayer() {

    player.x = 100;

    player.y = 400;

    player.velocityX = 0;

    player.velocityY = 0;

    player.onGround = false;

    player.direction = 1;


    for (
        const key in keys
    ) {

        keys[key] = false;

    }
}


// ======================================================
// UI
// ======================================================

function updateUI() {

    scoreDisplay.textContent =
        String(score).padStart(6, "0");


    coinDisplay.textContent =
        coinCount;


    levelDisplay.textContent =
        currentLevel;


    if (lives === 3) {

        livesDisplay.textContent =
            "❤️ ❤️ ❤️";

    }

    else if (lives === 2) {

        livesDisplay.textContent =
            "❤️ ❤️";

    }

    else if (lives === 1) {

        livesDisplay.textContent =
            "❤️";

    }

    else {

        livesDisplay.textContent =
            "💀";

    }
}

// ======================================================
// START SELECTED LEVEL
// ======================================================


function startLevel(level){


    currentLevel = level;


    score = 0;

    coinCount = 0;

    lives = 3;


    gameTime = 0;


    gameRunning = true;

    paused = false;

    gameOver = false;

    levelComplete = false;


    loadLevel(
        level
    );



    startScreen.classList.add(
        "hidden"
    );


    levelSelectScreen.classList.add(
        "hidden"
    );


    gameScreen.classList.remove(
        "hidden"
    );



    showLevelIntro(
        level,

        function(){

            requestAnimationFrame(
                gameLoop
            );

        }

    );


    updateUI();

}


// ======================================================
// START GAME
// ======================================================

function startGame() {

    score = 0;

    coinCount = 0;

    lives = 3;

    currentLevel = 1;

    gameTime = 0;

    gameRunning = true;

    paused = false;

    gameOver = false;

    levelComplete = false;

    gameWon = false;

    reviveUsed = false;

    lives = 3;

    adPlaying = false;


    loadLevel(1);


    startScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");

    gameOverScreen.classList.add("hidden");

    levelCompleteScreen.classList.add("hidden");

    adScreen.classList.add("hidden");

    reviveScreen.classList.add("hidden");


    updateUI();


    requestAnimationFrame(gameLoop);
}


// ======================================================
// RESTART CURRENT LEVEL
// ======================================================

function restartGame() {

    gameTime = 0;

    gameRunning = true;

    paused = false;

    gameOver = false;

    levelComplete = false;

    gameWon = false;

    adPlaying = false;


    // Try Again = completely new attempt

    lives = 3;

    reviveUsed = false;


    loadLevel(currentLevel);


    gameOverScreen.classList.add("hidden");

    levelCompleteScreen.classList.add("hidden");

    adScreen.classList.add("hidden");

    reviveScreen.classList.add("hidden");


    gameScreen.classList.remove("hidden");


    updateUI();


    requestAnimationFrame(gameLoop);
}


// ======================================================
// NEXT LEVEL
// ======================================================

function nextLevel() {

    if (
        currentLevel >=
        Object.keys(levels).length
    ) {

        return;
    }


    // ==============================================
    // MOVE TO NEXT LEVEL
    // ==============================================

    currentLevel++;


    gameTime = 0;

    gameRunning = false;

    paused = false;

    gameOver = false;

    levelComplete = false;

    gameWon = false;


    // ==============================================
    // NEW LEVEL = RESET LIVES TO 3
    // ==============================================

    lives = 3;


    // ==============================================
    // RESET REVIVE FOR NEW LEVEL
    // ==============================================

    reviveUsed = false;


    levelCompleteScreen.classList.add(
        "hidden"
    );

    gameScreen.classList.remove(
        "hidden"
    );


    // ==============================================
    // LOAD NEXT LEVEL
    // ==============================================

    loadLevel(
        currentLevel
    );


    updateUI();


    // ==============================================
    // LEVEL INTRO
    // ==============================================

    showLevelIntro(
        currentLevel,
        function() {

            gameRunning = true;

            updateUI();

            requestAnimationFrame(
                gameLoop
            );

        }
    );
}


// ======================================================
// MAIN MENU
// ======================================================

function goToMainMenu() {

    gameRunning = false;

    paused = false;

    gameOver = false;

    levelComplete = false;

    gameWon = false;

    adPlaying = false;


    currentLevel = 1;

    score = 0;

    coinCount = 0;

    lives = 3;

    gameTime = 0;

    reviveUsed = false;


    loadLevel(1);


    gameScreen.classList.add("hidden");

    gameOverScreen.classList.add("hidden");

    levelCompleteScreen.classList.add("hidden");

    adScreen.classList.add("hidden");

    reviveScreen.classList.add("hidden");

    levelIntroScreen.classList.add("hidden");


    startScreen.classList.remove("hidden");


    updateUI();

    drawFrame();
}


// ======================================================
// BUTTONS
// ======================================================

startButton.addEventListener(
    "click",
    function() {

        startButton.disabled = true;

        startScreen.classList.add("hidden");

        gameScreen.classList.remove("hidden");


        showLevelIntro(
            1,
            function() {

                startLevel(1);

                startButton.disabled = false;

            }
        );

    }
);


restartButton.addEventListener(
    "click",
    restartGame
);


mainMenuButton.addEventListener(
    "click",
    goToMainMenu
);


completeMenuButton.addEventListener(
    "click",
    goToMainMenu
);


nextLevelButton.addEventListener(
    "click",
    nextLevel
);

// ======================================================
// LEVEL SELECT BUTTONS
// ======================================================


levelSelectButton.addEventListener(
"click",

function(){


    startScreen.classList.add(
        "hidden"
    );


    levelSelectScreen.classList.remove(
        "hidden"
    );


    updateLevelButtons();


}

);



backMenuButton.addEventListener(
"click",

function(){


    levelSelectScreen.classList.add(
        "hidden"
    );


    startScreen.classList.remove(
        "hidden"
    );


}

);

// ======================================================
// UPDATE LEVEL BUTTONS
// ======================================================


function updateLevelButtons(){



if(
    unlockedLevels[1]
){

    level1Button.textContent =
    "🌳 LEVEL 1 ✅";

}



if(
    unlockedLevels[2]
){

    level2Button.textContent =
    "🌙 LEVEL 2 🔓";

}

else{

    level2Button.textContent =
    "🌙 LEVEL 2 🔒";

}





if(
    unlockedLevels[3]
){

    level3Button.textContent =
    "🌋 LEVEL 3 🔓";

}

else{

    level3Button.textContent =
    "🌋 LEVEL 3 🔒";

}



}

level1Button.onclick =
function(){

    startLevel(1);

};



level2Button.onclick =
function(){


if(
    unlockedLevels[2]
){

    startLevel(2);

}

else{

alert(
"Complete Level 1 First!"
);

}


};




level3Button.onclick =
function(){


if(
    unlockedLevels[3]
){

    startLevel(3);

}

else{

alert(
"Complete Level 2 First!"
);

}


};


// ======================================================
// WATCH AD BUTTON
// ======================================================

reviveButton.addEventListener(
    "click",
    function() {

        startRewardAd();

    }
);


// ======================================================
// PLAYER UPDATE
// ======================================================

function updatePlayer() {

    player.velocityX = 0;


    if (
        keys["ArrowLeft"] ||
        keys["KeyA"]
    ) {

        player.velocityX =
            -playerSpeed;

        player.direction = -1;
    }


    if (
        keys["ArrowRight"] ||
        keys["KeyD"]
    ) {

        player.velocityX =
            playerSpeed;

        player.direction = 1;
    }


    player.x +=
        player.velocityX;


    if (player.x < 0) {

        player.x = 0;
    }


    if (
        player.x +
        player.width >
        worldWidth
    ) {

        player.x =
            worldWidth -
            player.width;
    }


    const previousY =
        player.y;


    player.velocityY +=
        gravity;


    player.y +=
        player.velocityY;


    player.onGround = false;


    // ==================================================
    // PLATFORM COLLISION
    // ==================================================

    for (
        const platform of platforms
    ) {

        const playerLeft =
            player.x;

        const playerRight =
            player.x +
            player.width;

        const playerTop =
            player.y;

        const playerBottom =
            player.y +
            player.height;


        const previousTop =
            previousY;

        const previousBottom =
            previousY +
            player.height;


        const platformLeft =
            platform.x;

        const platformRight =
            platform.x +
            platform.width;

        const platformTop =
            platform.y;

        const platformBottom =
            platform.y +
            platform.height;


        const horizontal =
            playerRight >
            platformLeft &&
            playerLeft <
            platformRight;


        if (!horizontal) {

            continue;
        }


        // LAND

        if (
            player.velocityY >= 0 &&
            previousBottom <= platformTop &&
            playerBottom >= platformTop
        ) {

            player.y =
                platformTop -
                player.height;

            player.velocityY = 0;

            player.onGround = true;

            continue;
        }


        // HIT FROM BELOW

        if (
            player.velocityY < 0 &&
            previousTop >= platformBottom &&
            playerTop <= platformBottom
        ) {

            player.y =
                platformBottom;

            player.velocityY = 0;
        }
    }


    // ==================================================
    // JUMP
    // ==================================================

    if (
        (
            keys["Space"] ||
            keys["ArrowUp"] ||
            keys["KeyW"]
        ) &&
        player.onGround
    ) {

        player.velocityY =
            -jumpPower;

        player.onGround = false;
    }


    // ==================================================
    // FALL
    // ==================================================

    if (
        player.y >
        canvas.height + 200
    ) {

        loseLife();
    }
}


// ======================================================
// ENEMIES
// ======================================================

function updateEnemies() {

    for (
        const enemy of enemies
    ) {

        if (!enemy.alive) {
            continue;
        }


        enemy.x +=
            enemy.velocityX;


        if (
            enemy.x <=
            enemy.startX
        ) {

            enemy.x =
                enemy.startX;

            enemy.velocityX =
                Math.abs(
                    enemy.velocityX
                );
        }


        if (
            enemy.x +
            enemy.width >=
            enemy.endX
        ) {

            enemy.x =
                enemy.endX -
                enemy.width;

            enemy.velocityX =
                -Math.abs(
                    enemy.velocityX
                );
        }
    }
}


// ======================================================
// ENEMY COLLISION
// ======================================================

function checkEnemyCollision() {

    for (
        const enemy of enemies
    ) {

        if (!enemy.alive) {
            continue;
        }


        const collision =

            player.x +
            player.width >
            enemy.x &&

            player.x <
            enemy.x +
            enemy.width &&

            player.y +
            player.height >
            enemy.y &&

            player.y <
            enemy.y +
            enemy.height;


        if (!collision) {
            continue;
        }


        const previousBottom =
            player.y +
            player.height -
            player.velocityY;


        // JUMP ON ENEMY

        if (
            player.velocityY > 0 &&
            previousBottom <= enemy.y
        ) {

            enemy.alive = false;

            score += 200;

            player.velocityY =
                -jumpPower * 0.6;

        }

        else {

            loseLife();

        }
    }
}


// ======================================================
// COINS
// ======================================================

function checkCoinCollection() {

    for (
        const coin of coins
    ) {

        if (coin.collected) {
            continue;
        }


        const centerX =
            player.x +
            player.width / 2;

        const centerY =
            player.y +
            player.height / 2;


        const dx =
            centerX -
            coin.x;

        const dy =
            centerY -
            coin.y;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if (
            distance <
            coin.radius + 25
        ) {

            coin.collected = true;

            coinCount++;

            score += 100;
        }
    }
}


// ======================================================
// GOAL
// ======================================================

function checkGoal() {

    if (goal.reached) {
        return;
    }


    const collision =

        player.x +
        player.width >
        goal.x &&

        player.x <
        goal.x +
        goal.width &&

        player.y +
        player.height >
        goal.y &&

        player.y <
        goal.y +
        goal.height;


    if (collision) {

        goal.reached = true;

        showLevelComplete();
    }
}

// ======================================================
// LEVEL COMPLETE
// ======================================================

function showLevelComplete() {

    gameRunning = false;

    levelComplete = true;

    // UNLOCK NEXT LEVEL

    if(
        currentLevel <
        Object.keys(levels).length
    ){

    unlockedLevels[currentLevel + 1] = true;

    localStorage.setItem(
        "jampuUnlockedLevels",
        JSON.stringify(
            unlockedLevels
        )
    );
    }

    levelScore.textContent =
        String(score).padStart(
            6,
            "0"
        );


    levelCompleteScreen.classList.remove(
        "hidden"
    );


    if (
        currentLevel >=
        Object.keys(levels).length
    ) {

        gameWon = true;

        nextLevelButton.style.display =
            "none";

    }

    else {

        gameWon = false;

        nextLevelButton.style.display =
            "block";
    }
}


// ======================================================
// LOSE LIFE
// ======================================================

function loseLife() {

    if (
        !gameRunning ||
        gameOver ||
        levelComplete ||
        adPlaying
    ) {

        return;
    }


    lives--;


    updateUI();


    // ==================================================
    // STILL HAS LIVES
    // ==================================================

    if (lives > 0) {

        resetPlayer();

        return;
    }


    // ==================================================
    // GAME OVER
    // ==================================================

    lives = 0;

    gameRunning = false;

    gameOver = true;


    finalScore.textContent =
        String(score).padStart(
            6,
            "0"
        );


    gameOverScreen.classList.remove(
        "hidden"
    );


    // ==================================================
    // REVIVE BUTTON
    // ==================================================

    if (reviveUsed) {

        reviveButton.style.display =
            "none";

    }

    else {

        reviveButton.style.display =
            "block";
    }
}


// ======================================================
// WATCH AD / REVIVE
// ======================================================

function startRewardAd() {

    if (
        reviveUsed ||
        adPlaying ||
        !gameOver
    ) {

        return;
    }


    adPlaying = true;


    gameOverScreen.classList.add(
        "hidden"
    );


    adScreen.classList.remove(
        "hidden"
    );


    let seconds = 5;


    adCountdown.textContent =
        seconds;


    const timer =
        setInterval(
            function() {

                seconds--;


                adCountdown.textContent =
                    seconds;


                if (seconds <= 0) {

                    clearInterval(timer);

                    finishRewardAd();

                }

            },
            1000
        );
}


// ======================================================
// FINISH AD
// ======================================================

function finishRewardAd() {

    adPlaying = false;

    reviveUsed = true;


    adScreen.classList.add(
        "hidden"
    );


    reviveScreen.classList.remove(
        "hidden"
    );


    // Give player ONE life

    lives = 1;

    gameOver = false;

    levelComplete = false;

    paused = false;


    updateUI();


    // Reload current level

    loadLevel(
        currentLevel
    );


    setTimeout(
        function() {

            reviveScreen.classList.add(
                "hidden"
            );


            gameRunning = true;


            updateUI();


            requestAnimationFrame(
                gameLoop
            );

        },
        1200
    );
}


// ======================================================
// CAMERA
// ======================================================

function updateCamera() {

    camera.x =
        player.x -
        camera.followOffset;


    if (camera.x < 0) {

        camera.x = 0;
    }


    if (
        camera.x +
        camera.width >
        worldWidth
    ) {

        camera.x =
            worldWidth -
            camera.width;
    }
}


// ======================================================
// BACKGROUND
// ======================================================

function drawBackground() {

    const level =
        levels[currentLevel];


    // ==================================================
    // DAY
    // ==================================================

    if (
        level.theme === "day"
    ) {

        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                0,
                canvas.height
            );


        gradient.addColorStop(
            0,
            "#4facfe"
        );


        gradient.addColorStop(
            1,
            "#d9f2ff"
        );


        ctx.fillStyle =
            gradient;


        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        drawDayMountains();


        drawCloud(
            300,
            100,
            1
        );


        drawCloud(
            850,
            140,
            0.8
        );


        drawCloud(
            1500,
            90,
            1.1
        );


        drawCloud(
            2500,
            130,
            0.9
        );

    }


    // ==================================================
// NIGHT
// ==================================================

else if(
    level.theme === "night"
){

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            canvas.height
        );


    gradient.addColorStop(
        0,
        "#0d1330"
    );


    gradient.addColorStop(
        1,
        "#26345f"
    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    drawStars();

    drawMoon();

    drawNightMountains();

}


// ==================================================
// VOLCANO
// ==================================================

else if(
    level.theme === "volcano"
){


    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            canvas.height
        );


    gradient.addColorStop(
        0,
        "#ff7043"
    );


    gradient.addColorStop(
        0.45,
        "#c2410c"
    );


    gradient.addColorStop(
        1,
        "#3b0a00"
    );

    ctx.fillStyle =
        gradient;


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    drawVolcanoMountains();

    drawVolcanoGlow();

    drawAshParticles();

    drawSmoke();

}
}

// ======================================================
// VOLCANO LIGHT GLOW
// ======================================================

function drawVolcanoGlow(){


    const gradient =
        ctx.createRadialGradient(

            canvas.width/2,
            canvas.height,

            50,

            canvas.width/2,
            canvas.height,

            500

        );


    gradient.addColorStop(
        0,
        "rgba(255,80,0,0.25)"
    );


    gradient.addColorStop(
        1,
        "rgba(255,0,0,0)"
    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(

        0,

        0,

        canvas.width,

        canvas.height

    );


}

// ======================================================
// ASH PARTICLES
// ======================================================


function drawAshParticles(){


    ctx.fillStyle =
        "rgba(200,200,200,0.4)";


    for(
        let i=0;
        i<60;
        i++
    ){


        let x =
            (
                i*97
                -
                camera.x*0.1
            )
            %
            canvas.width;



        let y =
            (
                i*53
                +
                gameTime*0.5
            )
            %
            350;



        ctx.beginPath();


        ctx.arc(

            x,

            y,

            2,

            0,

            Math.PI*2

        );


        ctx.fill();

    }


}

// ======================================================
// DAY MOUNTAINS
// ======================================================

function drawDayMountains() {

    const offset =
        camera.x * 0.25;


    ctx.fillStyle =
        "#91c7a2";


    for (
        let x = -1000;
        x < worldWidth;
        x += 700
    ) {

        const screenX =
            x - offset;


        ctx.beginPath();

        ctx.moveTo(
            screenX,
            540
        );

        ctx.lineTo(
            screenX + 300,
            280
        );

        ctx.lineTo(
            screenX + 600,
            540
        );

        ctx.closePath();

        ctx.fill();
    }
}


// ======================================================
// NIGHT MOUNTAINS
// ======================================================

function drawNightMountains() {

    const offset =
        camera.x * 0.2;


    ctx.fillStyle =
        "#151b39";


    for (
        let x = -1000;
        x < worldWidth;
        x += 700
    ) {

        const screenX =
            x - offset;


        ctx.beginPath();

        ctx.moveTo(
            screenX,
            540
        );

        ctx.lineTo(
            screenX + 300,
            300
        );

        ctx.lineTo(
            screenX + 600,
            540
        );

        ctx.closePath();

        ctx.fill();
    }
}

// ======================================================
// VOLCANO MOUNTAINS
// ======================================================

function drawVolcanoMountains(){


    const offset =
        camera.x * 0.25;


    ctx.fillStyle =
        "#4a1208";


    for(
        let x=-1000;
        x<worldWidth;
        x+=700
    ){

        const screenX =
            x-offset;


        ctx.beginPath();


        ctx.moveTo(
            screenX,
            540
        );


        ctx.lineTo(
            screenX+300,
            260
        );


        ctx.lineTo(
            screenX+600,
            540
        );


        ctx.closePath();


        ctx.fill();

    }

   ctx.fillStyle =
    "#7c2d12";

for(
 let x=-1000;
 x<worldWidth;
 x+=900
){

    const screenX =
        x-offset*0.5;


    ctx.beginPath();


    ctx.moveTo(
        screenX,
        540
    );


    ctx.lineTo(
        screenX+350,
        330
    );


    ctx.lineTo(
        screenX+700,
        540
    );


    ctx.fill();

}


}

// ======================================================
// VOLCANO SMOKE
// ======================================================

function drawSmoke(){


    ctx.fillStyle =
        "rgba(80,80,80,0.35)";


    for(
        let i=0;
        i<8;
        i++
    ){

        let x =
            i*180 -
            camera.x*0.15;


        let y =
            100+
            Math.sin(
                gameTime*0.02+i
            )*20;


        ctx.beginPath();


        ctx.arc(
            x,
            y,
            40,
            0,
            Math.PI*2
        );


        ctx.fill();

    }

}


// ======================================================
// STARS
// ======================================================

function drawStars() {

    ctx.fillStyle =
        "#ffffff";


    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const worldX =
            i * 83;


        const x =
            worldX -
            camera.x * 0.2;


        const y =
            35 +
            (i * 47) % 230;


        const size =
            1 +
            (i % 3);


        ctx.globalAlpha =
            0.5 +
            (
                Math.sin(
                    gameTime * 0.03 + i
                ) + 1
            ) * 0.25;


        ctx.fillRect(
            x,
            y,
            size,
            size
        );
    }


    ctx.globalAlpha = 1;
}


// ======================================================
// MOON
// ======================================================

function drawMoon() {

    const x =
        850 -
        camera.x * 0.1;


    const y = 100;


    ctx.fillStyle =
        "#fff5b8";


    ctx.beginPath();

    ctx.arc(
        x,
        y,
        45,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle =
        "#0d1330";


    ctx.beginPath();

    ctx.arc(
        x + 18,
        y - 10,
        45,
        0,
        Math.PI * 2
    );

    ctx.fill();
}


// ======================================================
// CLOUD
// ======================================================

function drawCloud(
    worldX,
    worldY,
    scale
) {

    const x =
        worldX -
        camera.x * 0.5;


    ctx.fillStyle =
        "rgba(255,255,255,0.9)";


    ctx.beginPath();

    ctx.arc(
        x,
        worldY,
        25 * scale,
        0,
        Math.PI * 2
    );


    ctx.arc(
        x + 35 * scale,
        worldY - 15 * scale,
        35 * scale,
        0,
        Math.PI * 2
    );


    ctx.arc(
        x + 70 * scale,
        worldY,
        25 * scale,
        0,
        Math.PI * 2
    );


    ctx.fill();
}


// ======================================================
// PLAYER
// ======================================================

function drawPlayer() {

    const x =
        player.x -
        camera.x +
        player.width / 2;


    const y =
        player.y +
        player.height / 2;


    const moving =
        Math.abs(
            player.velocityX
        ) > 0.1;


    const jumping =
        !player.onGround;


    const run =
        moving && !jumping
            ? Math.sin(
                gameTime * 0.35
            )
            : 0;


    const night =
        currentLevel === 2;

    const volcano =
        currentLevel === 3;


    ctx.save();


    ctx.translate(
        x,
        y
    );


    if (
        player.direction < 0
    ) {

        ctx.scale(
            -1,
            1
        );
    }


    // ==================================================
    // WHITE GLOW IN LEVEL 2
    // ==================================================

   if (night || volcano) {


    ctx.shadowColor =
        volcano
        ? "#ff9900"
        : "#ffffff";


    ctx.shadowBlur =
        volcano
        ? 25
        : 18;


}

    if (volcano) {

    ctx.strokeStyle = "#ff7a18";
    ctx.fillStyle = "#2b1b16";

}
else if (night) {

    ctx.strokeStyle = "#ffffff";
    ctx.fillStyle = "#ffffff";

}
else {

    ctx.strokeStyle = "#222222";
    ctx.fillStyle = "#222222";

}

    ctx.lineWidth = 4;

    ctx.lineCap =
        "round";


    // ==================================================
    // ARMS
    // ==================================================

    ctx.beginPath();

    ctx.moveTo(
        -6,
        -5
    );

    ctx.lineTo(
        -13,
        4 + run * 5
    );

    ctx.lineTo(
        -15,
        14 + run * 5
    );

    ctx.stroke();


    ctx.beginPath();

    ctx.moveTo(
        6,
        -5
    );

    ctx.lineTo(
        13,
        4 - run * 5
    );

    ctx.lineTo(
        15,
        14 - run * 5
    );

    ctx.stroke();


    // ==================================================
    // LEGS
    // ==================================================

    if (
        !moving &&
        !jumping
    ) {

        ctx.beginPath();

        ctx.moveTo(
            -4,
            12
        );

        ctx.lineTo(
            -4,
            27
        );


        ctx.moveTo(
            4,
            12
        );

        ctx.lineTo(
            4,
            27
        );

        ctx.stroke();


        ctx.beginPath();

        ctx.moveTo(
            -4,
            27
        );

        ctx.lineTo(
            -10,
            27
        );


        ctx.moveTo(
            4,
            27
        );

        ctx.lineTo(
            10,
            27
        );

        ctx.stroke();

    }


    else if (jumping) {

        ctx.beginPath();

        ctx.moveTo(
            -4,
            12
        );

        ctx.lineTo(
            -10,
            24
        );


        ctx.moveTo(
            4,
            12
        );

        ctx.lineTo(
            10,
            24
        );

        ctx.stroke();

    }


    else {

        const swing =
            run * 9;


        ctx.beginPath();

        ctx.moveTo(
            -4,
            12
        );

        ctx.lineTo(
            -5 - swing,
            27
        );


        ctx.moveTo(
            4,
            12
        );

        ctx.lineTo(
            5 + swing,
            27
        );

        ctx.stroke();


        ctx.beginPath();

        ctx.moveTo(
            -5 - swing,
            27
        );

        ctx.lineTo(
            -10 - swing,
            27
        );


        ctx.moveTo(
            5 + swing,
            27
        );

        ctx.lineTo(
            10 + swing,
            27
        );

        ctx.stroke();
    }


    // ==================================================
    // BODY
    // ==================================================

    ctx.lineWidth = 5;


    ctx.beginPath();

    ctx.moveTo(
        0,
        -7
    );

    ctx.lineTo(
        0,
        13
    );

    ctx.stroke();


    // ==================================================
    // HEAD
    // ==================================================

    if(volcano){

    ctx.fillStyle = "#ffb000";

}
else if(night){

    ctx.fillStyle = "#ffffff";

}
else{

    ctx.fillStyle = "#222222";

}


    ctx.beginPath();

    ctx.arc(
        0,
        -17,
        9,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // ==================================================
    // EYE
    // ==================================================

    ctx.shadowBlur = 0;


    if(volcano){

    ctx.fillStyle = "#fff700";

}
else if(night){

    ctx.fillStyle = "#1e2340";

}
else{

    ctx.fillStyle = "#ffffff";

}


    if (
        moving ||
        jumping
    ) {

        ctx.beginPath();

        ctx.arc(
            4,
            -19,
            1.7,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }

    else {

        ctx.strokeStyle =
            night
                ? "#1e2340"
                : "#ffffff";


        ctx.lineWidth = 2;


        ctx.beginPath();

        ctx.moveTo(
            2.5,
            -19
        );

        ctx.lineTo(
            5.5,
            -19
        );

        ctx.stroke();
    }


    ctx.restore();
}


// ======================================================
// PLATFORMS
// ======================================================

function drawPlatforms() {

    const night =
        currentLevel === 2;


    for (
        const platform of platforms
    ) {

        const x =
            platform.x -
            camera.x;


        if (
            x + platform.width < 0 ||
            x > canvas.width
        ) {

            continue;
        }


        if (!night) {

            ctx.fillStyle =
                "#8b5a2b";


            ctx.fillRect(
                x,
                platform.y,
                platform.width,
                platform.height
            );


            ctx.fillStyle =
                "#38a169";


            ctx.fillRect(
                x,
                platform.y,
                platform.width,
                9
            );

        }

        else {

            ctx.fillStyle =
                "#4338ca";


            ctx.fillRect(
                x,
                platform.y,
                platform.width,
                platform.height
            );


            ctx.fillStyle =
                "#818cf8";


            ctx.fillRect(
                x,
                platform.y,
                platform.width,
                7
            );
        }
    }
}


// ======================================================
// COINS
// ======================================================

function drawCoins() {

    for (
        const coin of coins
    ) {

        if (
            coin.collected
        ) {

            continue;
        }


        const x =
            coin.x -
            camera.x;


        const float =
            Math.sin(
                gameTime * 0.08 +
                coin.x
            ) * 4;


        ctx.fillStyle =
            "rgba(255,215,0,0.25)";


        ctx.beginPath();

        ctx.arc(
            x,
            coin.y + float,
            20,
            0,
            Math.PI * 2
        );

        ctx.fill();


        ctx.fillStyle =
            "#ffd700";


        ctx.beginPath();

        ctx.arc(
            x,
            coin.y + float,
            coin.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();


        ctx.fillStyle =
            "#fff4a3";


        ctx.beginPath();

        ctx.arc(
            x - 4,
            coin.y + float - 4,
            4,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }
}


// ======================================================
// ENEMIES
// ======================================================

function drawEnemies() {

    for (
        const enemy of enemies
    ) {

        if (!enemy.alive) {

            continue;
        }


        const x =
            enemy.x -
            camera.x;


        const y =
            enemy.y;


        ctx.fillStyle =
            currentLevel === 2
                ? "#ef3f9d"
                : "#8b5cf6";


        ctx.beginPath();


        if (
            ctx.roundRect
        ) {

            ctx.roundRect(
                x,
                y,
                enemy.width,
                enemy.height,
                10
            );

        }

        else {

            ctx.rect(
                x,
                y,
                enemy.width,
                enemy.height
            );

        }


        ctx.fill();


        ctx.fillStyle =
            "#ffffff";


        ctx.beginPath();

        ctx.arc(
            x + 12,
            y + 14,
            7,
            0,
            Math.PI * 2
        );


        ctx.arc(
            x + 28,
            y + 14,
            7,
            0,
            Math.PI * 2
        );


        ctx.fill();


        ctx.fillStyle =
            "#111111";


        ctx.beginPath();

        ctx.arc(
            x + 12,
            y + 14,
            3,
            0,
            Math.PI * 2
        );


        ctx.arc(
            x + 28,
            y + 14,
            3,
            0,
            Math.PI * 2
        );


        ctx.fill();
    }
}


// ======================================================
// GOAL
// ======================================================

function drawGoal() {

    if (goal.reached) {

        return;
    }


    const x =
        goal.x -
        camera.x;


    ctx.fillStyle =
        "#555555";


    ctx.fillRect(
        x,
        goal.y,
        7,
        goal.height
    );


    ctx.fillStyle =
        "#ffd700";


    ctx.beginPath();

    ctx.arc(
        x + 3,
        goal.y,
        7,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle =
        currentLevel === 2
            ? "#22d3ee"
            : "#ef4444";


    ctx.beginPath();

    ctx.moveTo(
        x + 7,
        goal.y + 5
    );


    ctx.lineTo(
        x + 55,
        goal.y + 25
    );


    ctx.lineTo(
        x + 7,
        goal.y + 45
    );


    ctx.closePath();

    ctx.fill();
}


// ======================================================
// DRAW FRAME
// ======================================================

function drawFrame() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    drawBackground();

    drawLava();

    drawPlatforms();

    drawJumpPads(); 

    drawCoins();

    drawEnemies();

    drawGoal();

    drawPlayer();
}

function drawLava(){

    if(!lava){
        return;
    }


    const lavaY = lava.y;


    // ==============================
    // DARK RED BASE
    // ==============================

    const gradient =
        ctx.createLinearGradient(
            0,
            lavaY,
            0,
            canvas.height
        );


    gradient.addColorStop(
        0,
        "#ff4500"
    );


    gradient.addColorStop(
        0.4,
        "#d62800"
    );


    gradient.addColorStop(
        1,
        "#4a0900"
    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(
        0,
        lavaY,
        canvas.width,
        lava.height
    );



    // ==============================
    // MOVING LAVA WAVES
    // ==============================


    ctx.fillStyle =
        "#ffb000";


    for(
        let i = 0;
        i < canvas.width + 100;
        i += 80
    ){


        const wave =
            Math.sin(
                gameTime * 0.08 +
                i
            ) * 8;


        ctx.beginPath();


        ctx.arc(

            i,

            lavaY + wave,

            35,

            Math.PI,

            Math.PI * 2

        );


        ctx.fill();

    }



    // ==============================
    // BUBBLES
    // ==============================


    ctx.fillStyle =
        "#fff000";


    for(
        let i = 0;
        i < 20;
        i++
    ){


        const x =
            (i * 97) %
            canvas.width;


        const y =
            lavaY +
            30 +
            (
                Math.sin(
                    gameTime*0.05+i
                )*20
            );


        ctx.beginPath();


        ctx.arc(
            x,
            y,
            5 + (i%4),
            0,
            Math.PI*2
        );


        ctx.fill();

    }



    // ==============================
    // HEAT EFFECT
    // ==============================


    ctx.fillStyle =
        "rgba(255,100,0,0.25)";


    for(
        let i=0;
        i<10;
        i++
    ){

        ctx.beginPath();

        ctx.arc(

            i*120,

            lavaY-20+
            Math.sin(
                gameTime*0.1+i
            )*15,

            20,

            0,

            Math.PI*2

        );


        ctx.fill();

    }

}

// ======================================================
// JUMP PADS
// ======================================================

function drawJumpPads(){

    ctx.globalAlpha = 1;

    for(
        const pad of jumpPads
    ){

        const x =
            pad.x - camera.x;


       ctx.shadowColor =
            "#22ff88";


        ctx.shadowBlur =
            15;


        ctx.fillStyle =
         "#22c55e";


        ctx.fillRect(
            x,
            pad.y,
            pad.width,
            pad.height
        );


        // top line

        ctx.fillStyle =
            "#bbf7d0";


        ctx.fillRect(
            x,
            pad.y,
            pad.width,
            5
        );


        ctx.shadowBlur = 0;

    }

}

// ======================================================
// GAME LOOP
// ======================================================

function gameLoop() {

    if (!gameRunning) {

        drawFrame();

        return;
    }


    if (!paused) {

        gameTime++;


        updatePlayer();


        if (
            !gameOver &&
            !levelComplete &&
            !adPlaying
        ) {

            updateEnemies();

            checkCoinCollection();

            checkEnemyCollision();

            checkGoal();

            checkJumpPads();

            updateCamera();

            updateUI();
        }
    }


    drawFrame();


    requestAnimationFrame(
        gameLoop
    );
}


// ======================================================
// LEVEL INTRO
// ======================================================

function showLevelIntro(
    level,
    callback
) {

    const introScreen =
        document.getElementById(
            "levelIntroScreen"
        );


    const introLevel =
        document.getElementById(
            "introLevel"
        );


    const introSubtitle =
        document.getElementById(
            "introSubtitle"
        );


    if (!introScreen) {

        callback();

        return;
    }


    introLevel.textContent =
        "LEVEL " + level;


    if(level === 1){

    introSubtitle.textContent =
    "READY?";

    }

    else if(level === 2){

    introSubtitle.textContent =
    "NIGHT RUN";

    }

    else if(level === 3){

    introSubtitle.textContent =
    "VOLCANO ESCAPE";

    }


    introScreen.classList.remove(
        "hidden"
    );


    setTimeout(
        function() {

            introScreen.classList.add(
                "hidden"
            );


            callback();

        },
        1800
    );
}


// ======================================================
// INITIALIZE
// ======================================================

loadLevel(1);

updateUI();

drawFrame();
