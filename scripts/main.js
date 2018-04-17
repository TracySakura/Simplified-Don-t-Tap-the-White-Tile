//move from top to bottom by speed every 10 ms
function update(){
    var con = document.getElementById('con');
    var top = window.getComputedStyle(con, null).getPropertyValue('top');
    top = parseInt(top) + speed;
    if(top >= 0){
        top = top - 100;
        createRow();
        con.style.top = top + 'px';
        deleteRow();
        if(isBlackBottom()){
            fail();
        }
    }else{
        con.style.top = top + 'px';
    }
}
//create a new row with all white row
function createAllWhiteRow(){
    var con = document.getElementById('con');
    var newRow = document.createElement('div');
    newRow.className = 'row';
    for(var i=0;i<4;i++){
        var newDiv = document.createElement('div');
        newDiv.className = 'tile';
        newDiv.addEventListener('click',fail);
        newRow.appendChild(newDiv);
    }
    con.appendChild(newRow);
}
//create a new row with one black tile before the first row
function createRow(){
    var con = document.getElementById('con');
    var newRow = document.createElement('div');
    newRow.className = 'row';
    var blackPosition = Math.floor(Math.random()*4);
    for(var i=0;i<4;i++){
        var newDiv = document.createElement('div');
        newDiv.className = 'tile';
        if(i == blackPosition){
            newDiv.className += ' black';
            newDiv.addEventListener('click',removeBlack);
        }else{
            newDiv.addEventListener('click',fail);
        }
        newRow.appendChild(newDiv);
    }
    var firstChild = con.children[0];
    con.insertBefore(newRow, firstChild);
}
//delete the last row
function deleteRow(){
    var con = document.getElementById('con');
    var lastChild = con.children[con.children.length-1];
    con.removeChild(lastChild);
}
//check if the last row contains black tile
function isBlackBottom(){
    var con = document.getElementById('con');
    var lastRowTiles = con.lastElementChild.children;
    for(var i=0;i<lastRowTiles.length;i++){
        if(lastRowTiles[i].className.indexOf('black')!=-1){
            return true;
        }
    }
    return false;
}
//game over
function fail(){
    clearInterval(timeid);
    alert('game over!\nscore: '+score);
    home();
}
//click on the mode botton
function selectMode(){
    var mode = document.getElementById('easy');
    mode.addEventListener('click',function(){
        speed = 1;
        begin();
    });
    mode = document.getElementById('medium');
    mode.addEventListener('click',function(){
        speed = 2;
        begin();
    }); 
    mode = document.getElementById('hard');
    mode.addEventListener('click', function(){
        speed = 3;
        begin();
    });
}
//click on the black tile
function removeBlack(){
    this.className = 'tile white';
    this.removeEventListener('click', removeBlack);
    this.addEventListener('click', fail);
    updateScore(score+1);
}
//update the score
function updateScore(s){
    score = s;
    scoreText = document.getElementById('score');
    scoreText.innerText = 'Score: ' + score;
}
//home page
function home(){
    updateScore(0);
    var main = document.getElementById('main');
    var home = document.createElement('div');
    home.id = 'home';
    home.appendChild(document.createElement('button'));
    home.appendChild(document.createElement('button'));
    home.appendChild(document.createElement('button'));
    var buttons = home.children;
    buttons[0].innerText = 'EASY';
    buttons[0].className = 'modeButton';
    buttons[0].id = 'easy';
    buttons[1].innerText = 'MEDIUM';
    buttons[1].className = 'modeButton';
    buttons[1].id = 'medium';
    buttons[2].innerText = 'HARD';
    buttons[2].className = 'modeButton';
    buttons[2].id = 'hard';
    var firstChild = main.children[0];
    main.replaceChild(home, firstChild);
    selectMode();
}
//game start
function begin(){
    var main = document.getElementById('main');
    var con = document.createElement('div');
    con.id = 'con';
    var firstChild = main.children[0];
    main.replaceChild(con, firstChild);
    //last 3 rows without black
    for(var i=0;i<3;i++){
        createAllWhiteRow();
    }
    //other rows
    for(var i=0;i<4;i++){
        createRow();
    }
    timeid = window.setInterval(update, 10);
}
//init
var speed = 1;
var score = 0;
var timeid = null;
home();