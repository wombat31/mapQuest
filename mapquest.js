//CONSTANTS
map = [
    "ABBBBBBBBBBBBBBBBBBBBBBBC",
    "D.......................E",
    "D..ABC...RST............E",
    "D..D.E..................E",
    "D..FGH....X.............E",
    "D.......................E",
    "D.....ABC...............E",
    "D.....D.E...............E",
    "D.....FGH...............E",
    "D.......................E",
    "D.......................E",
    "D.......................E",
    "D.......................E",
    "D.......................E",
    "FGGGGGGGGGGGGGGGGGGGGGGGH"]

var CANVAS_WIDTH = 450;
var CANVAS_HEIGHT = 300;
var TILESIZE = 30;
    

//SETUP
var canvas = document.createElement('canvas');
var c = canvas.getContext('2d');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
document.body.appendChild(canvas);
var archieX = 200;
var archieY = 130;
var mapX = 0;
var mapY = 0;
var leftKeyPressed = false;
var rightKeyPressed = false;
var upKeyPressed = false;
var downKeyPressed = false;

var mapImage = new Image();
mapImage.src = 'images/backgroundTiles.png';
var archieImage = new Image();
archieImage.src = 'images/archie16x16.png';

window.addEventListener('load',start);

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

function start(){
    window.requestAnimationFrame(mainLoop);
}
var tileX;
var tileY;

function mapConverter(tileRef){
    switch(tileRef){
        case "A":
            tileX = 0;
            tileY = 0;
            break;
        case "B":
            tileX = 30;
            tileY = 0;
            break;
        case "C":
            tileX = 60;
            tileY = 0;
            break;
        case "X":
            tileX = 90;
            tileY = 0;
            break;
        case "R":
            tileX = 120;
            tileY = 0;
            break;
        case "S":
            tileX = 150;
            tileY = 0;
            break;
        case "T":
            tileX = 180;
            tileY = 0;
            break;
        case "D":
            tileX = 0;
            tileY = 30;
            break;
        case ".":
            tileX = 30;
            tileY = 30;
            break;
        case "E":
            tileX = 60;
            tileY = 30;
            break;
        case "F":
            tileX = 0;
            tileY = 60;
            break;
        case "G":
            tileX = 30;
            tileY = 60;
            break;
        case "H":
            tileX = 60;
            tileY = 60;
            break;
        
        default:
            tileX = 30;
            tileY = 30;
    }
}

//MAIN LOOP
function mainLoop(){
    update();
    draw();
    window.requestAnimationFrame(mainLoop);
}


//PLAYER INPUT
function onKeyDown(event){
    if(event.keyCode === 37){
        leftKeyPressed = true;
    } else if(event.keyCode === 39) {
        rightKeyPressed = true;
    } else if(event.keyCode === 38){
        upKeyPressed = true;
    } else if(event.keyCode === 40){
        downKeyPressed = true;
    }
}

function onKeyUp(event){
    if(event.keyCode === 37){
        leftKeyPressed = false;
    } else if(event.keyCode === 39){
        rightKeyPressed = false;
    } else if(event.keyCode === 38){
        upKeyPressed = false;
    } else if(event.keyCode === 40){
        downKeyPressed = false;
    }
}


//UPDATING
function update(){
    if(leftKeyPressed && upKeyPressed){
        if(archieX > 100 && archieY > 100){
            archieX -= 1;
            archieY -= 1;
        } else {
            mapX += 1;
            mapY += 1;
        }
        
    } else if (rightKeyPressed && upKeyPressed){
        if(archieX < 250 && archieY > 100){
            archieX += 1;
            archieY -= 1;
        } else {
            mapX -= 1;
            mapY += 1;
        }
        
    } else if (leftKeyPressed && downKeyPressed)  {
        if(archieX > 100 && archieY < 200){
            archieX -= 1;
            archieY += 1;
        } else {
            mapX += 1;
            mapY -= 1;
        }
        
    } else if (rightKeyPressed && downKeyPressed)  {
        if(archieX < 250 && archieY < 200){
            archieX += 1;
            archieY += 1;
        } else {
            mapX -= 1;
            mapY -= 1;
        }
        
    } else if(leftKeyPressed){
        if(archieX > 100){
            archieX -= 1;
        } else {
            mapX += 1;
        }
        
    } else if (rightKeyPressed){
        if(archieX < 350){
            archieX += 1;
        } else {
            mapX -= 1;
        }
        
    } else if (upKeyPressed){
        if (archieY > 100){
            archieY -= 1;
        } else {
            mapY += 1;
        }
        
    } else if (downKeyPressed){
        if (archieY < 200){
            archieY += 1;
        } else {
            mapY -= 1;
        }
        
    }
    
}


//DRAWING
function draw(){
    
    c.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    //draw the background
    
    for(i=0;i<map.length;i++){
        //console.log("map length: " + map.length);
        var mapRow = map[i];
        var mapRowArray = mapRow.split("");
        for(x=0;x<mapRowArray.length;x++){
            //console.log("mapRowArray: "+ mapRowArray.length);
            mapConverter(mapRowArray[x]);
            c.drawImage(mapImage,tileX,tileY,TILESIZE,TILESIZE,(x*30)+mapX,(i*30)+mapY,TILESIZE,TILESIZE);

        }
    }
    //draw Archie
    c.drawImage(archieImage,16,16,16,16,archieX,archieY,16,16);
    //c.drawImage(mapImage,0,0);
    //c.drawImage(mapImage,i*30,x*30,TILESIZE,TILESIZE,tileX,tileY,TILESIZE,TILESIZE);
    //console.log("Im in here");
}