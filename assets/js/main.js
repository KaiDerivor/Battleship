const startGame = {
  numberCol: 7,
  numberRow: 7,
  firstShip: [],
  secondShip: [],
  thirdShip: [],

  defineShips: function () {
    const colRow = this.verticalHorizontal();
    if (colRow == 1) {
      const positionX = Math.floor(Math.random() * (this.numberCol - 3));
      const positionY = Math.floor(Math.random() * this.numberRow);
      this.putShips(positionX, positionY, "x");
    } else {
      const positionX = Math.floor(Math.random() * (this.numberCol));
      const positionY = Math.floor(Math.random() * (this.numberRow-3));
      this.putShips(positionX, positionY, "y");
    }
  },
  verticalHorizontal: function () {
    return Math.round(Math.random() * 100) % 2;
  },
  putShips: function (x, y, flag) {
    let startXY = [];
    if (flag === "x") {
      for (let i = 0; i < 3; i++) {
        x++;
        startXY.push(x + "" + y);
      }
    } else {
      for (let i = 0; i < 3; i++) {
        y++;
        startXY.push(x + "" + y);
      }
    }
    this.putArrShip(startXY);
  },
  putArrShip: function (...arr) {
    let mainShip = [];

    for (const item of arr) {
      mainShip.push(item);
    }
    if (this.firstShip.length <= 0) {
      this.firstShip = mainShip;
    } else if (this.secondShip.length <= 0) {
      this.secondShip = mainShip;
    } else {
      this.thirdShip = mainShip;
    }
  },
};
const model = {
    counterHits:0,
    counterShip:0,
    allShip:[],
  findShip: function (ships) {
      let ship=[];
      ship=ships['0'];
      for (const id of ship) {
        const td=document.getElementById(id);
        td.textContent='x';
      }
  },
  placeShip:function(){
    for (const xy of startGame.firstShip[0]) {
        this.allShip.push(xy);
    }
    for (const xy of startGame.secondShip[0]) {
        this.allShip.push(xy);
    }for (const xy of startGame.thirdShip[0]) {
        this.allShip.push(xy);
    }
  },
  updateHits:function(){
      const span=document.querySelector('.counterHits');
      span.textContent=this.counterHits;
  },
  updateShip:function(){
    let counter=Math.ceil((this.allShip.length)/3);
     
    const numberShips=document.querySelector('.numberShip');
    numberShips.textContent=counter;
    if(counter===0){
        alert('Усі кораблі потоплено. Вітаю!!!');
        this.playAgain();
    }
  },
  isHit:function(id,e){
    if(this.allShip.includes(id)){
        this.allShip.splice(this.allShip.indexOf(id),1);
        e.target.style.backgroundColor='yellow';
        e.target.textContent="hit";
    } else{
        e.target.textContent="miss";
        e.target.style.backgroundColor='green';
    }
  },
  playAgain:function(){
      const bnt=document.querySelector('.reset');
      bnt.textContent='Нова гра';
      bnt.classList.remove('reset');
      bnt.classList.add('newGame');
      
  }
};
// let num=[];
startGame.defineShips();
startGame.defineShips();
startGame.defineShips();

model.placeShip();
model.updateShip();
// for beginner start
// model.findShip(startGame.firstShip);
// model.findShip(startGame.secondShip);
// model.findShip(startGame.thirdShip);
//end

// alert(startGame.firstShip);
// alert(startGame.secondShip);
// alert(startGame.thirdShip);
function onClick(e){
// e.target.style.backgroundColor='red';
// e.target.textContent='1';
     if(e.target.textCotent!=='miss'&&e.target.textContent!=='hit'){
        model.counterHits++;
    model.updateHits();
    model.isHit(e.target.id,e);
    model.updateShip();
    }
}
const td=document.getElementsByClassName('field');

for (const item of td) {
    item.addEventListener('click',onClick)
}

