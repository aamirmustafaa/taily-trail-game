var floorPos_y;
var gameChar_x;
var gameChar_y;
let cameraPosX = 0;

// Sound variables
var jumpSound;
var fallSound;
var victorySound;
var gameMusic;
var coinSound;
var hasPreviouslyWon = false;

//image variables
let img; //game title image
let isVisible = true; //to track image visibility


// character animation variables
var isLeft = false;
var isRight = false;
var isFalling = false;
var isPlummeting = false;
var characterColorIndex = 0;
var characterColors = [[255, 0, 0],   // Red color  
];
var isPoweredUp = false;
var collectedCoins = 0;
var characterSize = 1;
var animationTimer = 0;
var isInvincible = false;
var invincibleTimer = 0;

// animation variables
var walkingFrame = 0;
var walkingTimer = 0;
var facingLeft = false;
var isWalking = false;

var lives;
var gameOver = false;
var startX = 512;
var startY;

var barriers = [];
var flagpole;
var clouds = [];
var mountains = [];
var canyons = [];
var collectables = [];
var platforms = [];
var trees_x = [];
var enemies = [];
var blocks = [];
var heartCollectables = [];


function preload() {
    
    // Loaded sound files
    jumpSound = loadSound('music/jump.m4a');
    fallSound = loadSound('music/falling to canyon.m4a');
    victorySound = loadSound('music/Happy Fanfare.wav');
    gameMusic = loadSound('music/backgrounds.m4a');  
    coinSound = loadSound('music/coins collect sound copy.m4a');
    //loaded image files
    img=loadImage('images/Asset 4.png')
}
   

function setup() {
    createCanvas(1024, 576);
    floorPos_y = height * 3 / 4;
    startY = floorPos_y;
    gameChar_x = startX;
    gameChar_y = startY;
    lives = 3;
    startGame();
    
    
    // Start playing background music and loop it
    gameMusic.loop();


    setTimeout(() => {
        // set the flag to false after 2 seconds
        isVisible = false;
      }, 2000); // 2000 milliseconds = 2 seconds
    }
    


function startGame() {
    // Define the barriers
    barriers = [
        {
            x_pos: 2550,      // Position of the first barrier
            isOpen: false,    // Track if barrier should be open
            height: 200,      // Height of the barrier
            requiresCoins: true, // This barrier requires coins to open
            showText: true    // Show the text for this barrier
        },
        {
            x_pos: -2450,     // Position of the second barrier
            isOpen: false,    // Always closed
            height: 200,      // Height of the barrier
            requiresCoins: false, // This barrier doesn't require coins
            showText: false   // Don't show any text
        }
    ];
    
    // Add flagpole
    flagpole = {
        x_pos: 2800,      // position of the flagpole
        isReached: false, // Track if player reached the flag
        animationTimer: 0.6 // For flag waving animation
    };
    
    // Add enemies
    enemies = [
        {
            x_pos: 670,
            y_pos: 432,
            startX: 670,
            range: 200,
            speed: 2,
            direction: 1
        },
        {
            x_pos: 1600,
            y_pos: 432,
            startX: 1550,
            range: 500,
            speed: 3,
            direction: 1
        },
        
        {
            x_pos: -600,
            y_pos: 432,
            startX: -600,
            range: 200,
            speed: 2,
            direction: 1
        },
    ];
    
    
     trees_x = [-2370, -1640, -1370, -570, -370, -170, 30, 850, 1210, 1900, 2100, 2350, 3200];
     clouds = [
        { x_pos: 150, y_pos: 80 },
        { x_pos: 280, y_pos: 150 },
        { x_pos: 400, y_pos: 80 },
        { x_pos: 650, y_pos: 100 },
        { x_pos: 780, y_pos: 150 },
        { x_pos: 1150, y_pos: 80 },
        { x_pos: 1280, y_pos: 150 },
        { x_pos: 1400, y_pos: 80 },
        { x_pos: 1550, y_pos: 100 },
        { x_pos: 1700, y_pos: 150 },
        { x_pos: 1970, y_pos: 150 },
        { x_pos: 2090, y_pos: 80 },
        { x_pos: 2200, y_pos: 150 },
        { x_pos: -150, y_pos: 80 },
        { x_pos: -280, y_pos: 150 },
        { x_pos: -400, y_pos: 80 },
        { x_pos: -650, y_pos: 100 },
        { x_pos: -780, y_pos: 150 },
        { x_pos: -1150, y_pos: 80 },
        { x_pos: -1280, y_pos: 150 },
        { x_pos: -1400, y_pos: 80 },
        { x_pos: -1550, y_pos: 100 },
        { x_pos: -1700, y_pos: 150 },
        { x_pos: -1970, y_pos: 150 },
        { x_pos: -2090, y_pos: 80 },
        { x_pos: -2200, y_pos: 150 },
    ];
     mountains = [
        { x_pos: 250, y_pos: 432, width: 250, height: 232 },
        { x_pos: 550, y_pos: 432, width: 250, height: 232 },
        { x_pos: 400, y_pos: 432, width: 250, height: 232 },
        { x_pos: 1550, y_pos: 432, width: 250, height: 232 },
        { x_pos: 1250, y_pos: 432, width: 250, height: 232 },
        { x_pos: 1400, y_pos: 432, width: 250, height: 232 },
        { x_pos: -2300, y_pos: 432, width: 250, height: 232 },
        { x_pos: -2000, y_pos: 432, width: 250, height: 232 },
        { x_pos: -2150, y_pos: 432, width: 250, height: 232 },
        { x_pos: -1200, y_pos: 432, width: 250, height: 232 },
        { x_pos: -900, y_pos: 432, width: 250, height: 232 },
        { x_pos: -1050, y_pos: 432, width: 250, height: 232 },
    ];
     canyons = [
        { x_pos: 100, width: 80 },
        { x_pos: 900, width: 100 },
        { x_pos: 1100, width: 90 },
        { x_pos: 1970, width: 70 },
        { x_pos: 2400, width: 350 },
        { x_pos: -100, width: 80 },
        { x_pos: -1570, width: 100 },
    ];
     collectables = [
        { x_pos: 240, y_pos: 410, size: 40, isFound: false },
        { x_pos: 305, y_pos: 410, size: 40, isFound: false },
        { x_pos: 370, y_pos: 410, size: 40, isFound: false },
        { x_pos: 690, y_pos: 410, size: 40, isFound: false },
        { x_pos: 770, y_pos: 410, size: 40, isFound: false },
        { x_pos: 935, y_pos: 340, size: 40, isFound: false },
        { x_pos: 1045, y_pos: 410, size: 40, isFound: false },
        { x_pos: 1370, y_pos: 410, size: 40, isFound: false },
        { x_pos: 1590, y_pos: 410, size: 40, isFound: false },
        { x_pos: 1670, y_pos: 410, size: 40, isFound: false },
        { x_pos: 1870, y_pos: 410, size: 40, isFound: false },
        { x_pos: 1675, y_pos: 320, size: 40, isFound: false },
        { x_pos: 2170, y_pos: 410, size: 40, isFound: false },
        { x_pos: 2235, y_pos: 410, size: 40, isFound: false },
        { x_pos:   250, y_pos: 280, size: 40, isFound: false },
        { x_pos: -120, y_pos: 410, size: 40, isFound: false },
        { x_pos: -240, y_pos: 410, size: 40, isFound: false },
        { x_pos: -310, y_pos: 410, size: 40, isFound: false },
        { x_pos: -470, y_pos: 410, size: 40, isFound: false },
        { x_pos: -610, y_pos: 410, size: 40, isFound: false },
        { x_pos: -750, y_pos: 410, size: 40, isFound: false },
        { x_pos: -875, y_pos: 410, size: 40, isFound: false },
        { x_pos: -980, y_pos: 410, size: 40, isFound: false },
        { x_pos: -1080, y_pos: 410, size: 40, isFound: false },
        { x_pos: -1260, y_pos: 410, size: 40, isFound: false },
        { x_pos: -1720, y_pos: 295, size: 40, isFound: false },
        { x_pos: -1620, y_pos: 410, size: 40, isFound: false },
        { x_pos: -2030, y_pos: 410, size: 40, isFound: false },
        //the ones adding again
        { x_pos:   100 +   40, y_pos: floorPos_y - 90, size: 40, isFound: false },
        { x_pos:   1400 +   70, y_pos: floorPos_y - 150, size: 40, isFound: false },
        { x_pos:  1090 +   60, y_pos: floorPos_y - 90, size: 40, isFound: false },
        { x_pos:  1970 +   35, y_pos: floorPos_y - 90, size: 40, isFound: false },
        { x_pos:  2300 +  175, y_pos: floorPos_y - 70, size: 40, isFound: false },
        { x_pos:  -100 +   40, y_pos: floorPos_y - 90, size: 40, isFound: false },
        { x_pos: -1590 +   70, y_pos: floorPos_y - 90, size: 40, isFound: false }
    ];

    heartCollectables = [
        { x_pos: 1525, y_pos: 270, size: 30, isFound: false },
    ]
    
    blocks = [
        {
            x_pos: 110,  // Canyon position + offset to center
            y_pos: floorPos_y - 70,  // 100 pixels above floor
            width: 70,
            height: 30
        },
        {
            x_pos: 1490,
            y_pos: floorPos_y - 125,
            width: 70,
            height: 30
        },
        {
            x_pos: 1350,
            y_pos: floorPos_y - 85,
            width: 70,
            height: 30
        },
        {
            x_pos:  220,
            y_pos: floorPos_y - 130,
            width: 70,
            height: 30
        },
        {
            x_pos: 1650, 
            y_pos: floorPos_y - 90,
            width: 70,
            height: 30
        },
        {
            x_pos: -95,
            y_pos: floorPos_y - 70,
            width: 70,
            height: 30
        },
        {
            x_pos: -1560,
            y_pos: floorPos_y - 70,
            width: 70,
            height: 30
        },
        {
            x_pos: -1750,
            y_pos: floorPos_y - 115,
            width: 70,
            height: 30
        },
        {
            x_pos: -1895,
            y_pos: floorPos_y - 70,
            width: 70,
            height: 30
        }
    ]
    platforms = [
        {
            x_pos: 2520,
            y_pos: 430,
            width: 100,
            height: 12,
            isMoving: false,  // Start as static
            startX: 2520,
            range: 220,
            speed: 1,
            direction: 1,
            activated: false  // New property to track if movement is activated
        }
        
    ]
}

function drawGameCharacter() {
    push();
    translate(gameChar_x, gameChar_y);
    scale(characterSize * 0.7);
    
    if (isPoweredUp) {
        fill('orange');
    } else {
        fill(characterColors[characterColorIndex]);
    }
    
    if (facingLeft) {
        // Left-facing character
        rect(-12, -25, 12, 20);
        
        stroke(255, 224, 189);
        strokeWeight(4);
        if (isWalking && !isFalling && !isPlummeting) {
            if (walkingFrame == 0) {
                line(-8, -17, -16, -8);
            } else if (walkingFrame == 1) {
                line(-8, -17, -12, -21);
            } else if (walkingFrame == 2) {
                line(-8, -17, -4, -25);
            } else {
                line(-8, -17, -12, -21);
            }
        } else if (isFalling || isPlummeting) {
            line(-8, -17, -16, -13);
        } else {
            line(-8, -17, -16, -8);
        }
        noStroke();
        
        // Draw left leg with animation
        fill(0);
        if (isWalking && !isFalling && !isPlummeting) {
            if (walkingFrame == 0) {
                rect(-10, -5, 6, 12);
            } else if (walkingFrame == 1) {
                rect(-11, -5, 6, 10);
            } else if (walkingFrame == 2) {
                rect(-10, -5, 6, 12);
            } else {
                rect(-8, -5, 6, 14);
            }
        } else if (isFalling || isPlummeting) {
            rect(-11, -5, 6, 8);
        } else {
            rect(-10, -5, 6, 12);
        }
        
        // Left profile head and features
        fill(255, 224, 189);
        ellipse(-6, -38, 16, 20);
        
        stroke(0);
        strokeWeight(1.5);
        line(-11, -43, -7, -43);
        noStroke();
        
        fill(0);
        ellipse(-9, -40, 2.5, 2.5);
        
        stroke(0);
        strokeWeight(1);
        line(-12, -35, -10, -35);
        noStroke();
        
    } else {
        // Right-facing character
        rect(0, -25, 12, 20);
        
        stroke(255, 224, 189);
        strokeWeight(4);
        if (isWalking && !isFalling && !isPlummeting) {
            if (walkingFrame == 0) {
                line(8, -17, 16, -8);
            } else if (walkingFrame == 1) {
                line(8, -17, 12, -21);
            } else if (walkingFrame == 2) {
                line(8, -17, 4, -25);
            } else {
                line(8, -17, 12, -21);
            }
        } else if (isFalling || isPlummeting) {
            line(8, -17, 16, -13);
        } else {
            line(8, -17, 16, -8);
        }
        noStroke();
        
        // Draw right leg with animation
        fill(0);
        if (isWalking && !isFalling && !isPlummeting) {
            if (walkingFrame == 0) {
                rect(4, -5, 6, 12);
            } else if (walkingFrame == 1) {
                rect(5, -5, 6, 14);
            } else if (walkingFrame == 2) {
                rect(4, -5, 6, 12);
            } else {
                rect(2, -5, 6, 10);
            }
        } else if (isFalling || isPlummeting) {
            rect(5, -5, 6, 8);
        } else {
            rect(4, -5, 6, 12);
        }
        
        // Right profile head and features   
        fill(255, 224, 189);
        ellipse(6, -38, 16, 20);
        
        stroke(0);
        strokeWeight(1.5);
        line(7, -43, 11, -43);
        noStroke();
        
        fill(0);
        ellipse(9, -40, 2.5, 2.5);
        
        stroke(0);
        strokeWeight(1);
        line(10, -35, 12, -35);
        noStroke();
    }
    
    pop();
}

function drawClouds() {            
    for (var i = 0; i < clouds.length; i++) {
        var cloud = clouds[i];
        fill(255);
        ellipse(cloud.x_pos, cloud.y_pos, 80, 80);
        ellipse(cloud.x_pos - 30, cloud.y_pos, 60, 60);
        ellipse(cloud.x_pos + 30, cloud.y_pos, 60, 60);
    }
}

function drawMountains() {
    for (var i = 0; i < mountains.length; i++) {
        var mountain = mountains[i];
        fill(150, 75, 0);
        triangle(
            mountain.x_pos,
            mountain.y_pos,
            mountain.x_pos + mountain.width / 2,
            mountain.y_pos - mountain.height,
            mountain.x_pos + mountain.width,
            mountain.y_pos
        );
        fill(100, 50, 12);
        triangle(
            mountain.x_pos + mountain.width / 10,
            mountain.y_pos,
            mountain.x_pos + mountain.width / 2,
            mountain.y_pos - mountain.height,
            mountain.x_pos + (mountain.width * 9) / 10,
            mountain.y_pos
        );
    }
}
function drawTrees() {
    for (var i = 0; i < trees_x.length; i++) {
      var x = trees_x[i];
      
      // Tree trunk - brown rectangle
      fill(139, 69, 19); // Brown color
      rect(x, floorPos_y - 40, 20, 40);
      
      // Bottom triangle - with shading
      // Left side (lighter green)
      fill(34, 139, 34); // Brighter green color
      triangle(
        x - 30, floorPos_y - 40, // Left point
        x + 10, floorPos_y - 110, // Top point
        x + 10, floorPos_y - 40 // Bottom middle point
      );
      
      // Right side (darker green for shading)
      fill(25, 100, 25); // Darker green for shadow
      triangle(
        x + 10, floorPos_y - 110, // Top point
        x + 10, floorPos_y - 40, // Bottom middle point
        x + 50, floorPos_y - 40 // Right point
      );
      
      // Top triangle - with shading
      // Left side (lighter green)
      fill(34, 139, 34); // Brighter green color
      triangle(
        x - 20, floorPos_y - 80, // Left point
        x + 10, floorPos_y - 140, // Top point
        x + 40, floorPos_y - 80 // Bottom middle point
      );
      
      // Right side (darker green for shading)
      fill(25, 100, 25); // Darker green for shadow
      triangle(
        x + 10, floorPos_y - 140, // Top point
        x + 25, floorPos_y - 80, // Bottom middle point
        x + 40, floorPos_y - 80 // Right point
      );
    }
  }
function drawCanyons() {
    for (var i = 0; i < canyons.length; i++) {
        var canyon = canyons[i];
        fill(100, 155, 255);
        rect(canyon.x_pos, floorPos_y, canyon.width, height - floorPos_y);
    }
}
function drawBlocks() {
    for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i];
        // Draw block
        fill(169, 169, 169); 
        rect(block.x_pos, block.y_pos, block.width , block.height, );
        
        // Add visual details
        fill('grey'); // Darker brown
        rect(block.x_pos, block.y_pos + block.height - 3, block.width, 5);
        
        // Add brick pattern details
        fill(120, 60, 20);
        rect(block.x_pos + 5, block.y_pos + 3, block.width/2 - 7, 10);
        rect(block.x_pos + block.width/2 + 2, block.y_pos + 3, block.width/2 - 7, 10);
        rect(block.x_pos + 5, block.y_pos + block.height/2, block.width - 10, 10.5);
    }
}

function drawBarriers() {
    for (var i = 0; i < barriers.length; i++) {
        var barrier = barriers[i];
        
        // Draw the barrier with transparency
        fill(150, 75, 0, 0); // Adding alpha value of 0 for transparency
        rect(barrier.x_pos, floorPos_y - barrier.height, 20, barrier.height);
        
        // Only show warning text for the main barrier that requires coins
        if (!barrier.isOpen && barrier.showText) {
            textSize(20);
            textAlign(CENTER);
            fill(255);
            stroke(0);
            strokeWeight(2);
            text("Collect all 35 coins", barrier.x_pos + 10, floorPos_y - barrier.height - 40);;
            text("to pass!", barrier.x_pos + 10, floorPos_y - barrier.height - 15);
            noStroke();
        }
    }
}

function drawFlagpole() {
    push();
    
    // Draw flagpole stem
    stroke(100);
    strokeWeight(4);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 338);
    
    // Create a waving effect for the flag
    let waveOffset = sin(flagpole.animationTimer) * 2;
    
    if (flagpole.isReached) {
        // Triangular flag with a 3D-like effect
        noStroke();
        
        // Shadow effect
        fill(150, 0, 0, 100);
        beginShape();
        vertex(flagpole.x_pos + waveOffset + 4, floorPos_y - 340);
        vertex(flagpole.x_pos + waveOffset + 55, floorPos_y - 320);
        vertex(flagpole.x_pos + waveOffset + 4, floorPos_y - 300);
        endShape(CLOSE);
        
        // Main flag
        fill(255, 0, 0);
        beginShape();
        vertex(flagpole.x_pos + waveOffset +4, floorPos_y - 340);
        vertex(flagpole.x_pos + waveOffset + 50, floorPos_y - 320);
        vertex(flagpole.x_pos + waveOffset + 4, floorPos_y - 300);
        endShape(CLOSE);
        
        // Highlight effect
        fill(255, 100, 100, 150);
        beginShape();
        vertex(flagpole.x_pos + waveOffset+4, floorPos_y - 340);
        vertex(flagpole.x_pos + waveOffset + 25, floorPos_y - 320);
        vertex(flagpole.x_pos + waveOffset+4, floorPos_y - 300);
        endShape(CLOSE);
    } else {
        // Static flag when not reached
        fill('red');
        triangle(
            flagpole.x_pos, floorPos_y - 30, 
            flagpole.x_pos + 50, floorPos_y - 50, 
            flagpole.x_pos, floorPos_y - 70
        );
    }
    
    // Increment animation timer for waving effect
    flagpole.animationTimer += 0.03;
    
    pop();
}

function drawCoinUI() {
    var coinX = width - 50;
    var coinY = 30;
    var coinSize = 30;
    
    push();
    translate(coinX, coinY);
    
    // Add rotation animation matching the collectables
    rotate(animationTimer * 0.5);
    
    // Draw star shape that matches the collectables
    fill(255, 215, 0); // Gold color
    beginShape();
    // 5-pointed star
    for (let j = 0; j < 5; j++) {
        // Outer points
        let angle = TWO_PI / 5 * j - PI/2;
        let x1 = cos(angle) * coinSize/2;
        let y1 = sin(angle) * coinSize/2;
        vertex(x1, y1);
        
        // Inner points
        angle += TWO_PI / 10;
        let x2 = cos(angle) * coinSize/4;
        let y2 = sin(angle) * coinSize/4;
        vertex(x2, y2);
    }
    endShape(CLOSE);
    
    // Add shining effect to match collectables
    fill(255, 255, 200, 150 + sin(animationTimer * 2) * 100);
    beginShape();
    for (let j = 0; j < 5; j++) {
        let angle = TWO_PI / 5 * j - PI/2;
        let x = cos(angle) * coinSize/3;
        let y = sin(angle) * coinSize/3;
        vertex(x, y);
    }
    endShape(CLOSE);
    
    // Reset rotation for text
    resetMatrix();
    
    // Position text next to the star instead of overlapping
    fill(0);
    textSize(16);
    textAlign(LEFT, CENTER);
    text(collectedCoins, coinX + 20, coinY);
   
    
    pop();
}
function drawCollectables() {
    for (var i = 0; i < collectables.length; i++) {
        var collectable = collectables[i];
        if (!collectable.isFound) {
            var hoverOffset = sin(animationTimer + i) * 5;
            
            // Draw star-shaped collectables instead of coins
            push();
            translate(collectable.x_pos, collectable.y_pos + hoverOffset);
            
            // Add rotation animation
            rotate(animationTimer * 0.5);
            
            // Draw diamond shape
            fill(255, 215, 0); // Gold color
            beginShape();
            // 5-pointed star
            for (let j = 0; j < 5; j++) {
                // Outer points
                let angle = TWO_PI / 5 * j - PI/2;
                let x1 = cos(angle) * collectable.size/2;
                let y1 = sin(angle) * collectable.size/2;
                vertex(x1, y1);
                
                // Inner points
                angle += TWO_PI / 10;
                let x2 = cos(angle) * collectable.size/4;
                let y2 = sin(angle) * collectable.size/4;
                vertex(x2, y2);
            }
            endShape(CLOSE);
            
            // Add shining effect
            fill(255, 255, 200, 150 + sin(animationTimer * 2) * 100);
            beginShape();
            for (let j = 0; j < 5; j++) {
                let angle = TWO_PI / 5 * j - PI/2;
                let x = cos(angle) * collectable.size/3;
                let y = sin(angle) * collectable.size/3;
                vertex(x, y);
            }
            endShape(CLOSE);
            
            pop();
            
            checkCollectable(collectable);
        }
    }
}

function drawHeartCollectables() {
    for (var i = 0; i < heartCollectables.length; i++) {
        var heartCollectable = heartCollectables[i];
        if (!heartCollectable.isFound) {
            var hoverOffset = sin(animationTimer + i) * 5;
            
            push();
            translate(heartCollectable.x_pos, heartCollectable.y_pos + hoverOffset);
            
            // Draw pulsing heart
            fill(255, 0, 0, 200 + sin(animationTimer * 2) * 55); // Pulsing red color
            heart(0, 0, heartCollectable.size);
            
            pop();
            
            checkHeartCollectable(heartCollectable);
        }
    }
}

function drawPlatforms() {
    for (var i = 0; i < platforms.length; i++) {
        var platform = platforms[i];
        
        if (collectedCoins >= collectables.length && !platform.activated) {
            platform.isMoving = true;
            platform.activated = true;
        }
        
        // Update position if platform is moving
        if (platform.isMoving) {
            // Move platform
            platform.x_pos += platform.speed * platform.direction;
            
            // Check if platform should change direction
            if (platform.x_pos > platform.startX + platform.range / 2 || 
                platform.x_pos < platform.startX - platform.range / 2) {
                platform.direction *= -1;
            }
        }
        
        // Draw platform
        fill(139, 69, 19); // Brown color
        rect(platform.x_pos, platform.y_pos, platform.width, platform.height);
        
        // Add visual details
        fill(101, 67, 33); // Darker brown
        rect(platform.x_pos, platform.y_pos + platform.height - 5, platform.width, 5);
        
        // Add visual indicator of platform state
        if (!platform.activated) {
            // Draw lock symbol when platform is static
            fill(150);
            rect(platform.x_pos + platform.width/2 - 10, platform.y_pos - 15, 20, 15);
            rect(platform.x_pos + platform.width/2 - 7, platform.y_pos - 20, 14, 5);
        } else {
            // Draw movement arrows when platform is active
            fill(255, 200, 0);
            // Left arrow
            triangle(
                platform.x_pos + 10,
                platform.y_pos + platform.height/2,
                platform.x_pos + 20,
                platform.y_pos + 5,
                platform.x_pos + 20,
                platform.y_pos + platform.height - 5
            );
            // Right arrow
            triangle(
                platform.x_pos + platform.width - 10,
                platform.y_pos + platform.height/2,
                platform.x_pos + platform.width - 20,
                platform.y_pos + 5,
                platform.x_pos + platform.width - 20,
                platform.y_pos + platform.height - 5
            );
        }
    }
}


function drawEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        var enemy = enemies[i];
        // Update enemy position
        enemy.x_pos += enemy.speed * enemy.direction;
        
        // Check if enemy should change direction
        if (enemy.x_pos > enemy.startX + enemy.range / 2 || 
            enemy.x_pos < enemy.startX - enemy.range / 2) {
            enemy.direction *= -1;
        }
        
        // Draw enemy
        push();
        fill(255, 0, 0);
        ellipse(enemy.x_pos, enemy.y_pos - 25, 40, 40); // Enemy body
        
        // Draw eyes based on direction
        fill(255);
        if (enemy.direction == 1) {
            ellipse(enemy.x_pos + 10, enemy.y_pos - 30, 15, 15);
            fill(0);
            ellipse(enemy.x_pos + 12, enemy.y_pos - 30, 5, 5);
        } else {
            ellipse(enemy.x_pos - 10, enemy.y_pos - 30, 15, 15);
            fill(0);
            ellipse(enemy.x_pos - 12, enemy.y_pos - 30, 5, 5);
        }
        
        // Draw legs
        strokeWeight(4);
        stroke(0);
        line(enemy.x_pos - 15, enemy.y_pos - 5, enemy.x_pos - 15, enemy.y_pos);
        line(enemy.x_pos + 15, enemy.y_pos - 5, enemy.x_pos + 15, enemy.y_pos);
        pop();
        
        // Check for collision with character
        checkEnemyContact(enemy);
    };
}

function checkEnemyContact(enemy) {
    // Calculate distance between character and enemy
    let distX = abs(gameChar_x - enemy.x_pos);
    let distY = abs(gameChar_y - (enemy.y_pos - 20));
    
    // If the character is close enough to the enemy
    if (distX < 25 && distY < 40 && !gameOver) {
        // Reduce a life and provide brief invincibility
        if (!isInvincible) {
            lives--;
            isInvincible = true;
            
            // Flash character and provide temporary invincibility
            setTimeout(function() {
                isInvincible = false;
            }, 2000); // 2 seconds of invincibility
            
            if (lives <= 0) {
                gameOver = true;
                gameMusic.stop();
            }
        }
    }
}

function checkFlagpole() {
    if (!flagpole.isReached && abs(gameChar_x - flagpole.x_pos) < 10) {
        flagpole.isReached = true;
        victorySound.play();
    }
}

function checkCanyons() {
    for (var i = 0; i < canyons.length; i++) {
        var canyon = canyons[i];
        if (
            gameChar_x > canyon.x_pos &&
            gameChar_x < canyon.x_pos + canyon.width &&
            gameChar_y >= floorPos_y
        ) {
            if (!isPlummeting) {
                fallSound.play();
            }
            isPlummeting = true;
        }
    }
}
function checkBlocks() {
    var isOnBlock = false;
    
    for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i];
        // Check if character is within the block's x bounds
        if (gameChar_x > block.x_pos  && 
            gameChar_x < block.x_pos + block.width ) {
            
            // Check if character is at the right height to land on block
            var blockTop = block.y_pos;
            
            if (gameChar_y >= blockTop -6  && 
                gameChar_y <= blockTop +5 && 
                !isPlummeting) {
                
                isOnBlock = true;
                gameChar_y = blockTop - 6;
                isFalling = false;
            }
        }
    }
    
    return isOnBlock;
}
function checkBarriers() {
    // Update barrier states based on coins collected
    for (var i = 0; i < barriers.length; i++) {
        var barrier = barriers[i];
        
        // Only update the barrier that requires coins
        if (barrier.requiresCoins) {
            barrier.isOpen = (collectedCoins >= collectables.length);
        }
        
        // Check collision with barriers if not open
        if (!barrier.isOpen) {
            // Define the barrier's collision bounds
            let barrierLeft = barrier.x_pos;
            let barrierRight = barrier.x_pos + 20;
            
            // Check if character is within the barrier's vertical bounds
            if (gameChar_y >= floorPos_y - barrier.height && gameChar_y <= floorPos_y) {
                // Coming from left side
                if (gameChar_x + 15 > barrierLeft && gameChar_x < barrierLeft) {
                    gameChar_x = barrierLeft - 15;
                    isRight = false;
                }
                // Coming from right side
                else if (gameChar_x - 15 < barrierRight && gameChar_x > barrierRight) {
                    gameChar_x = barrierRight + 15;
                    isLeft = false;
                }
            }
        }
    }
}
function checkCollectable(collectable) {
    var d = dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos + 5);
    if (d < 25 && !collectable.isFound) {
        collectable.isFound = true;
        collectedCoins++;
        characterSize += 0.02;
        characterColorIndex = (characterColorIndex + 1) % characterColors.length;
        isPoweredUp = true;
        
        // Play coin collection sound
        coinSound.play();
        
        setTimeout(function() {
            isPoweredUp = false;
        }, 200);
    }
}
function checkHeartCollectable(heartCollectable) {
    var d = dist(gameChar_x, gameChar_y, heartCollectable.x_pos, heartCollectable.y_pos + 5);
    if (d < 35 && !heartCollectable.isFound) {
        heartCollectable.isFound = true;
        lives++; // Increase lives when heart is collected
        coinSound.play(); // Reuse coin sound effect
        
        // Limit maximum lives to prevent infinite accumulation
        if (lives > 5) {
            lives = 5;
        }
    }
}

function checkPlatforms() {
    var isOnPlatform = false;
    
    for (var i = 0; i < platforms.length; i++) {
        var platform = platforms[i];
        // Check if character is within the platform's x bounds
        if (gameChar_x > platform.x_pos && 
            gameChar_x < platform.x_pos + platform.width ) {
            
            // Check if character is at the right height to land on platform
            var platformTop = platform.y_pos;
            
            if (gameChar_y >= platformTop - 7 && 
                gameChar_y <= platformTop + 5 && 
                !isPlummeting) {
                
                isOnPlatform = true;
                currentPlatform = platform;
                gameChar_y = platformTop-7;
                isFalling = false;
                
                // Move character with platform if it's moving
                if (platform.isMoving) {
                    gameChar_x += platform.speed * platform.direction;
                }
            }
        }
    }
    
    // If not on any platform and not at ground level, should be falling
    if (!isOnPlatform && gameChar_y < floorPos_y && !isPlummeting) {
        isFalling = true;
    }
    
    return isOnPlatform;
}


function drawLives() {
    var xPos = 30;
    var yPos = 30;
    
    for (var i = 0; i < lives; i++) {
        fill(255, 0, 0);
        heart(xPos, yPos, 15);
        xPos += 20;
    }
}

function heart(x, y, size) {
    beginShape();
    vertex(x, y);
    bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    endShape(CLOSE);
}

function characterDies() {
    lives--;
    if (lives <= 0) {
        gameOver = true;
        gameMusic.stop();  // Stop music when game is over
    } else {
        gameChar_x = startX;
        gameChar_y = startY;
        isPlummeting = false;
    }
}

function drawGameOver() {
    push();
    fill(0, 0, 0, 200);
    rect(0, 0, width, height);
    
    textSize(50);
    textAlign(CENTER, CENTER);
    fill(255);
    text('GAME OVER', width/2, height/2 - 50);
    
    // Add text displaying how many coins were collected
    textSize(30);
    text('Coins collected: ' + collectedCoins + ' / ' + collectables.length, width/2, height/2);
    
    textSize(30);
    text('Press SPACE to restart', width/2, height/2 + 50);
    pop();
}

function drawCongratulations() {
    let shimmer = 200; 

    for (let i = 0; i < height; i += 2) {
        let inter = map(i, 0, height, 0, 1);
        let c = lerpColor(color(0, 200, 0, 200), color(0, 100, 200, 200), inter);
        stroke(c);
        line(0, i, width, i);
    }

    for (let i = 0; i < 50; i++) {
        let x = random(width);
        let y = random(height);
        let size = random(2, 5);
        fill(255, 255, 0, shimmer);
        noStroke();
        ellipse(x, y, size, size);
    }

    textAlign(CENTER, CENTER);

    textSize(60);
    fill(0, 100);
    text('CONGRATULATIONS!', width / 2 + 3, height / 2 - 47);

    fill(255, 255, 0, shimmer);
    text('CONGRATULATIONS!', width / 2, height / 2 - 50);

    textSize(30);
    fill(255);
    text('You collected all ' + collectables.length + ' coins!', width / 2, height / 2);

    text('Press SPACE to play again', width / 2, height / 2 + 50);
}


function draw() {
    animationTimer += 0.1;
    cameraPosX = gameChar_x - width / 2;
    
    // Update walking animation
    if (isLeft || isRight) {
        isWalking = true;
        walkingTimer += 1;
        if (walkingTimer > 5) {
            walkingFrame = (walkingFrame + 0.1) % 4;
            walkingTimer = 0;
        }
    } else {
        isWalking = false;
        walkingFrame = 0;
    }
    
    // Update facing direction
    if (isLeft) facingLeft = true;
    if (isRight) facingLeft = false;
    
    background(100, 155, 255);
    
    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, width, height - floorPos_y);
    
    push();
    translate(-cameraPosX, 0);

    drawClouds();
    drawMountains();
    drawTrees();
    drawCanyons();
    drawCollectables();
    drawBarriers();
    drawFlagpole();
    drawEnemies();
    drawPlatforms();
    drawBlocks();
    drawHeartCollectables();

    if (!gameOver) {
        checkCanyons();
        checkFlagpole();
        checkBarriers();

        if (isPlummeting) {
            gameChar_y += 10;
            if (gameChar_y > height + 100) {
                characterDies();
            }
        }

        // Only draw character if not flashing during invincibility
        if (!isInvincible || (invincibleTimer % 10 < 5)) {
            drawGameCharacter();
        }
        
        if (isInvincible) {
            invincibleTimer++;
        }

        if (!isPlummeting) {
            let isOnPlatform = checkPlatforms();
            let isOnBlock = checkBlocks();
            
            if (gameChar_y < floorPos_y && !isOnPlatform && !isOnBlock) {
                gameChar_y += 2;
                isFalling = true;
            } else if (!isOnPlatform && !isOnBlock) {
                
                isFalling = false;
            }
        }

        if (isLeft && !isPlummeting) {
            gameChar_x -= 5;
        }
        if (isRight && !isPlummeting) {
            gameChar_x += 5;
        }

        if (isVisible) {
            image(img, 350, 145, 380, 200);
          }
    }
    pop();

    drawLives();
    drawCoinUI();
    
    // Check for victory condition
    if (collectedCoins >= collectables.length && flagpole.isReached) {
        if (!hasPreviouslyWon) {
            victorySound.play();
            gameMusic.stop();
            hasPreviouslyWon = true;
        }
        drawCongratulations();
        gameOver = true;
    } else if (gameOver) {
        drawGameOver();
    }
}



function keyPressed() {
    // Handle game restart
    if (gameOver && keyCode == 32) {
        lives = 3;
        gameOver = false;
        collectedCoins = 0;
        gameChar_x = startX;
        gameChar_y = startY;
        isPlummeting = false;
        isInvincible = false;
        characterSize = 1;
        hasPreviouslyWon = false;
        flagpole.isReached = false;
        
        for (var i = 0; i < platforms.length; i++) {
            var platform = platforms[i];
            platform.x_pos = platform.startX;
            platform.direction = 1;
            platform.isMoving = false;
            platform.activated = false;
        }
        
        // Reset all collectables
        for (var i = 0; i < collectables.length; i++) {
            collectables[i].isFound = false;
        }
        
        // Reset all enemies
        for (var i = 0; i < enemies.length; i++) {
            var enemy = enemies[i];
            enemy.x_pos = enemy.startX;
            enemy.direction = 1;
        }
         // Reset heart collectables
         for (var i = 0; i < heartCollectables.length; i++) {
            heartCollectables[i].isFound = false;
        }
        // Reset all barriers
        for (var i = 0; i < barriers.length; i++) {
            if (barriers[i].requiresCoins) {
                barriers[i].isOpen = false;
            }
        }
        
        // Restart background music
        gameMusic.stop();
        gameMusic.loop();
        return;
    }
    
    // Handle game controls
    if (!isPlummeting && !gameOver) {
        if (keyCode == LEFT_ARROW) {
            isLeft = true;
        } else if (keyCode == RIGHT_ARROW) {
            isRight = true;
        } else if (keyCode == UP_ARROW && (!isFalling || checkPlatforms() || checkBlocks())) {
            gameChar_y -= 100;
            jumpSound.play();
        }
    }
}

function keyReleased() {
    if (keyCode == LEFT_ARROW) {
        isLeft = false;
    } else if (keyCode == RIGHT_ARROW) {
        isRight = false;
    } else if (keyCode == DOWN_ARROW) {
        isFalling = false;
    }
}

