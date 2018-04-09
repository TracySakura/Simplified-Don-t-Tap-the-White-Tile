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
        var blacks = document.getElementsByClassName('black');
        addBlackClick(blacks);
        var whites = document.getElementsByClassName('white');
        addWhiteClick(whites);
    }else{
        con.style.top = top + 'px';
    }
}
//create a new row with one black cell before the first row
function createRow(){
    var con = document.getElementById('con');
    var newRow = document.createElement('div');
    newRow.className = 'row';
    var blackPosition = Math.floor(Math.random()*4);
    for(var i=0;i<4;i++){
        var newDiv = document.createElement('div');
        newDiv.className = 'cell';
        if(i == blackPosition){
            newDiv.className += ' black';
        }
        newRow.appendChild(newDiv);
    }
    con.insertBefore(newRow, con.firstChild);
}
//delete the last row
function deleteRow(){
    var con = document.getElementById('con');
    var lastChild = con.lastElementChild;
    con.removeChild(lastChild);
}
//check if the last row contains black cell
function isBlackBottom(){
    var con = document.getElementById('con');
    var lastRowCells = con.lastElementChild.children;
    for(var i=0;i<lastRowCells.length;i++){
        if(lastRowCells[i].className.indexOf('black')!=-1){
            return true;
        }
    }
    return false;
}
//game over
function fail(){
    clearInterval(timeid);
    alert('game over!\nscore: '+score);
}
//click on the black cell
function removeBlack(){
    score += 1;
    this.className = 'cell white';
    this.removeEventListener('click', removeBlack);
    this.addEventListener('click', fail);
}
function addBlackClick(blacks){
    for(var i=0;i<blacks.length;i++){
        blacks[i].addEventListener('click',removeBlack);
    }
}
function addWhiteClick(whites){
    for(var i=0;i<whites.length;i++){
        whites[i].addEventListener('click',fail);
    }
}
//init
var speed = 1;
var score = 0;
var blacks = document.getElementsByClassName('black');
addBlackClick(blacks);
var whites = document.getElementsByClassName('white');
addWhiteClick(whites);
var timeid = window.setInterval(update, 10);