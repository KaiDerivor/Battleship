const startGame = {
  numberCol: 7,
  numberRow: 7,
  
  firstShip:[],
  secondShip:[],
  thirdShip:[],
  allPlaceShip:[],
  allReserveShip:[],
  defineNumberShip:1,

  defineShips: function () {
    let reservePlace=0;
    console.log(this.defineNumberShips+' Number ships');
    const lengt=+this.defineNumberShip;
    let cloneLength=0;
    for(let i=0;i<= this.defineNumberShip;i++){
        if(cloneLength<lengt){
          switch (cloneLength) {
            case 0:
              reservePlace=4;
              break;
            case 1:case 2:
              reservePlace=3;
              break;
              case 3:case 4:case 5:
                reservePlace=2;
                break;
            default: reservePlace=1;
              break;
              
          }
          cloneLength++;
          const colRow = this.verticalHorizontal();
          if (colRow == 1) {
            const positionX = Math.floor(Math.random() * (this.numberCol - reservePlace));
            const positionY = Math.floor(Math.random() * this.numberRow);
            this.putShips(positionX, positionY, "x",reservePlace);
          } else {
            const positionX = Math.floor(Math.random() * (this.numberCol));
            const positionY = Math.floor(Math.random() * (this.numberRow-reservePlace));
            this.putShips(positionX, positionY, "y",reservePlace);
          }
        }
      }
     
  },
  verticalHorizontal: function () {
    return Math.round(Math.random() * 100) % 2;
  },
  putShips: function (x, y, flag,reservePlace) {
    let startXY = [];
    if (flag === "x") {
      for (let i = 0; i < reservePlace; i++) {
        x++;
        startXY.push(x + "" + y);
        
      }
    } else {
      for (let i = 0; i < reservePlace; i++) {
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
    this.allPlaceShip.push(mainShip);
    // console.log(this.allPlaceShip);
  }, 


};
const model = {
    counterHits:0,
    counterShip:0,
    allShip:[],
    shipRemove:function(){
      const ship=this.allShip;
      for (const id of ship) {
        const td=document.getElementById(id);
          td.textContent='';
          td.style.backgroundColor='rgb(117, 233, 248)';
        
      }
      const tr=document.getElementsByClassName('field');
      for (const id of tr) {
         id.textContent='';
       id.style.backgroundColor='rgb(117, 233, 248)';
      } 
    },
  findShip: function (ships) {
      let ship=ships;
      for (const arr of ship) {
        for (const id of arr) {
          for (const index of id) {
            const td=document.getElementById(index);
          td.textContent='x';
          }
      }
    }
  },
  placeShip:function(){
    for (let i=0;i<startGame.allPlaceShip.length;i++) {
        for (const index of startGame.allPlaceShip[i]) {
          for(const id of index){
             this.allShip.push(id);
          }
        }
    }
    console.log('all ship'+this.allShip);
    
  },
  updateHits:function(){
      const span=document.querySelector('.counterHits');
      span.textContent=this.counterHits;
  },
  updateShip:function(){
   //  const lengthAllPlaceShip=startGame.allPlaceShip.length;     
    let counter=0;
    for (const indexArr of startGame.allPlaceShip) {
       for (const id of indexArr) {
      if(id.length) counter++;
       }
    }
    const numberShips=document.querySelector('.numberShip');
    numberShips.textContent=counter;
    if(counter===0){
        alert('Усі кораблі потоплено. Вітаю!!!');
        this.playAgain();
    }
  },
  isHit:function(id,e){
    const lengthAllPlaceShip=startGame.allPlaceShip[0];     
    for (let i=0;i<startGame.allPlaceShip.length;i++) {
       for(let j=0;j<startGame.allPlaceShip[i].length;j++){
         if(startGame.allPlaceShip[i][j].length){
               if(startGame.allPlaceShip[i][j].includes(id)){
                  startGame.allPlaceShip[i][j].splice(startGame.allPlaceShip[i][j].indexOf(id),1);
                  e.target.style.backgroundColor='yellow';
                  e.target.textContent="hit";
                  return;
              
            }
          
        }
       }
     
    }
    e.target.textContent="miss";
    e.target.style.backgroundColor='green';
  },
  playAgain:function(){
      const bnt=document.querySelector('.reset');
      bnt.textContent='Нова гра';
      bnt.classList.remove('reset');
      bnt.classList.add('newGame');
      
  }
};
 function putUpdating(){
    const input= document.getElementsByTagName("input")[0].value;
    if(input<=0){
      alert('Введіть коректні данні, кораблів не може бути 0 або менше');
    } else if (input>10){
      alert('Максимальне допустиме значення кораблів 10');
    }else{
    startGame.defineNumberShip=input;
    model.shipRemove(startGame.allPlaceShip);
    startGame.allPlaceShip=[];
    model.allShip=[];
    startGame.defineShips();
    model.placeShip();
    model.updateShip();
    model.findShip(startGame.allPlaceShip);
    console.log(startGame.allPlaceShip); 
  }
 }







startGame.defineShips();
// startGame.defineShips();
// startGame.defineShips();

model.placeShip();
model.updateShip();
// for beginner start
model.findShip(startGame.allPlaceShip,true);
//end;
// alert(startGame.firstShip);
// alert(startGame.secondShip);
// alert(startGame.thirdShip);
// сама логіка подій start
function onClick(e){
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
//end
// start події динамічні
const btn=document.querySelector('.changeNumberShip');
 
btn.addEventListener('click',putUpdating);
//end
