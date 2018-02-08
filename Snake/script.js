//<<<<<<<<<<All variables>>>>>>>>>>>>>
var snakeX = 2;
var snakeY = 2;

var height = 28; //table height
var width = 38; //table length

var interval = 100;
var increment = 4;

//game variables
var length = 0; //snake length

var tailX = [snakeX]; //array tailX
var tailY = [snakeY];

var fX; //fruit x
var fY; //fruit y

var running = false;
var gameOver = false;

var direction = -1;

var score = 0;


//temporary direction
var tempDirection = direction;





//<<<<<functions>>>>>




function run(){
  createMap();
  createSnake();
  makeFruit();
  t = setInterval(gameLoop, interval);
}







//makes table  and wall

function createMap()
{
    document.write("<table>");

    for( var y = 0; y < height; y++)
    {
        document.write("<tr>");
        for( var x = 0; x < width; x++)

        {
            if(x == 0 || x == width -1 || y == 0 || y == height -1)
              {
                document.write("<td class='wall' id='"+ x + "-" + y +"'></td>");

            }

            else

            {
                document.write("<td class='blank' id='"+ x + "-" + y +"'></td>");
            }
        }
        document.write("</tr>");
    }

    document.write("</table>");

}





function set(x,y,value){
    if(x != null && y != null)
        get(x,y).setAttribute("class", value);
}







function createSnake()

{
    set(snakeX, snakeY, "snake");
}



function get(x,y){
    return document.getElementById(x+"-"+y);
}




function rand(min,max){
    return Math.floor(Math.random() * (max - min) + min);
}



function getType(x,y){
    return get(x,y).getAttribute("class");
}




function makeFruit(){
    var found = false;
    while(!found && (length < (width-2)*(height-2)+1)){
        var fruitX = rand(1,width-1);
        var fruitY = rand(1,height-1);
        if(getType(fruitX, fruitY) == "blank")
            found = true;
    }

    set(fruitX, fruitY, "fruit");
    fX = fruitX;
    fY = fruitY;
}





window.addEventListener("keydown", function key(event)

{
  var key = event.keyCode;

// up = 0, down = -1, left = 1, right = 2
    if(direction != -1 && key == 38)
        tempDirection = 0;

    else if(direction != 0 && key == 40)
        tempDirection = -1;

    else if(direction != 2 && key == 37)
        tempDirection = 1;

    else if(direction != 1 && key == 39)
        tempDirection = 2;

    if(!running)
        running = true;
    else if(key == 32)
        running = false;
});




function update()

{

    direction = tempDirection;

    set(fX, fY, "fruit");

    updateTail();


    set(tailX[length], tailY[length], "blank");

    //snakes direction update
    if(direction == 0)
        snakeY--;
    else if(direction == -1)
        snakeY++;
    else if(direction == 1)
        snakeX--;
    else if(direction == 2)
        snakeX++;


    set(snakeX, snakeY, "snake"); //snake head

    //for loop to check if you hit your self
    for(var i = tailX.length-1; i >=0; i--)
    {
        if(snakeX == tailX[i] && snakeY == tailY[i])

        {
            gameOver = true;
            break;
        }
    }

    //if to see if you hit wall
    if(snakeX == 0 || snakeX == width-1 || snakeY == 0 || snakeY == height-1)
    {
        gameOver = true;
    }

    //checks for collisions with fruit

    else if(snakeX == fX && snakeY == fY)
    {
        //adds 4 to the score
        score+=4;
        //makes a new fruit
        makeFruit();
        //adds the set increment to the length of the snake making it longer
        length+=increment;
    }

    //score update
    document.getElementById("score").innerHTML = "Score: "+ score;
}




function gameLoop()
{
    if(running && !gameOver)
    {
        update();
    }

    else if(gameOver)
    {
        clearInterval(t);
        location.reload();
    }
}




function updateTail()
  {
    for(var i = length; i > 0; i--){
        tailX[i] = tailX[i-1];
        tailY[i] = tailY[i-1];
    }

    tailX[0] = snakeX;
    tailY[0] = snakeY;
}

run();
