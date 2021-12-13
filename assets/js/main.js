const startGame = {
  numberCol: 10,
  numberRow: 10,

  firstShip: [],
  secondShip: [],
  thirdShip: [],
  allPlaceShip: [],
  allReserveShip: [],
  defineNumberShip: 1,

  defineShips: function () {
    let reservePlace = 0;
    // console.log(this.defineNumberShips + " Number ships");
    const lengt = +this.defineNumberShip;
    let cloneLength = 0;
    for (let i = 0; i <= +this.defineNumberShip - 1; i++) {
      switch (i) {
        case 0:
          reservePlace = 4;
          break;
        case 1:
        case 2:
          reservePlace = 3;
          break;
        case 3:
        case 4:
        case 5:
          reservePlace = 2;
          break;
        default:
          reservePlace = 1;
          break;
      }
      // cloneLength++;
      const colRow = this.verticalHorizontal();
      if (colRow == 1) {
        const positionX = Math.floor(
          Math.random() * (this.numberCol - reservePlace)
        );
        const positionY = Math.floor(Math.random() * this.numberRow);
        var resultTo = this.putShips(positionX, positionY, "x", reservePlace);
      } else {
        const positionX = Math.floor(Math.random() * this.numberCol);
        const positionY = Math.floor(
          Math.random() * (this.numberRow - reservePlace)
        );
        var resultTo = this.putShips(positionX, positionY, "y", reservePlace);
      }
      if (resultTo === false) {
        i--;
      }
      // if(i!==0)
      // model.findShip(this.allPlaceShip);
    }
  },
  verticalHorizontal: function () {
    return Math.round(Math.random() * 100) % 2;
  },
  isPlaced: function (x, y, flag, reservePlace) {
    if (flag === "x") {
      if (reservePlace != 4) {
        if (reservePlace === 1) {
          if (this.allReserveShip.includes(x + "" + y)) return true;
        }
        if (reservePlace === 2) {
          if (this.allReserveShip.includes(x + "" + y)) return true;
          if (this.allReserveShip.includes(+x + 1 + "" + y)) return true;
        }
        if (reservePlace === 3) {
          if (this.allReserveShip.includes(x + "" + y)) return true;
          if (this.allReserveShip.includes(+x + 1 + "" + y)) return true;
          if (this.allReserveShip.includes(+x + 2 + "" + y)) return true;
        }
      }
    } else {
      if (reservePlace != 4) {
        if (reservePlace === 1) {
          if (this.allReserveShip.includes(x + "" + y)) return true;
        }
        if (reservePlace === 2) {
          if (this.allReserveShip.includes(x + "" + y)) return true;
          if (this.allReserveShip.includes(x + "" + (+y + 1))) return true;
        }
        if (reservePlace === 3) {
          if (this.allReserveShip.includes(x + "" + y)) return true;
          if (this.allReserveShip.includes(x + "" + (+y + 1))) return true;
          if (this.allReserveShip.includes(x + "" + (+y + 2))) return true;
        }
      }
    }
  },
  putShips: function (x, y, flag, reservePlace) {
    let startXY = [];
    const boll = this.isPlaced(x, y, flag, reservePlace);
    if (boll) return false;
    // for 1 block
    if (reservePlace === 1) {
      this.allReserveShip.push(x + "" + y);
      this.allReserveShip.push(+x - 1 + "" + y);
      this.allReserveShip.push(+x - 1 + "" + (+y + 1));
      this.allReserveShip.push(+x - 1 + "" + (+y - 1));

      this.allReserveShip.push(+x + 1 + "" + y);
      this.allReserveShip.push(+x + 1 + "" + (+y + 1));
      this.allReserveShip.push(+x + 1 + "" + (+y - 1));

      this.allReserveShip.push(x + "" + (+y + 1));
      this.allReserveShip.push(x + "" + (+y - 1));
      startXY.push(x + "" + y);
      this.putArrShip(startXY);
      return true;
    }
    // end

    if (flag === "x") {
      for (let i = 0; i < reservePlace; i++) {
        if (i === 0) {
          this.allReserveShip.push(+x - 1 + "" + y);
          this.allReserveShip.push(+x - 1 + "" + (+y + 1));
          this.allReserveShip.push(+x - 1 + "" + (+y - 1));
          this.allReserveShip.push(x + "" + (+y - 1));
          this.allReserveShip.push(x + "" + (+y + 1));
        }
        if (i === reservePlace - 1) {
          this.allReserveShip.push(+x + 1 + "" + y);
          this.allReserveShip.push(+x + 1 + "" + (+y + 1));
          this.allReserveShip.push(+x + 1 + "" + (+y - 1));
        }
        startXY.push(x + "" + y);
        this.allReserveShip.push(x + "" + y);
        this.allReserveShip.push(x + "" + (+y - 1));
        this.allReserveShip.push(x + "" + (+y + 1));
        x++;
      }
      this.putArrShip(startXY);
      return true;
    } else {
      for (let i = 0; i < reservePlace; i++) {
        if (i === 0) {
          this.allReserveShip.push(+x + 1 + "" + y);
          this.allReserveShip.push(+x - 1 + "" + y);
          this.allReserveShip.push(x + "" + (+y - 1));
          this.allReserveShip.push(+x + 1 + "" + (+y - 1));
          this.allReserveShip.push(+x - 1 + "" + (+y - 1));
        }
        if (i === reservePlace - 1) {
          this.allReserveShip.push(x + "" + (+y + 1));
          this.allReserveShip.push(+x - 1 + "" + (+y + 1));
          this.allReserveShip.push(+x + 1 + "" + (+y + 1));
        }
        startXY.push(x + "" + y);
        this.allReserveShip.push(x + "" + y);
        this.allReserveShip.push(+x + 1 + "" + y);
        this.allReserveShip.push(+x - 1 + "" + y);
        y++;
      }
      this.putArrShip(startXY);
      return true;
    }
  },
  putArrShip: function (...arr) {
    let mainShip = [];

    for (const item of arr) {
      mainShip.push(item);
    }
    this.allPlaceShip.push(mainShip);
    // model.copyAllPlaceShip.push(mainShip);
    // console.log(this.allPlaceShip);
  },
};
const model = {
  counterHits: 0,
  counterShip: 0,
  allShip: [],
  copyAllPlaceShip:[],
  isMassage:false,
  shipRemove: function () {
    const ship = this.allShip;
    for (const id of ship) {
      const td = document.getElementById(id);
      td.textContent = "";
      td.style.backgroundColor = "rgb(207 255 254)";
    }
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const id = i + "" + j;
        const element = document.getElementById(id);
        element.textContent = "";
        element.style.backgroundColor = "rgb(207 255 254)";
      }
    }

    // tr.textContent='';
    // tr.style.backgroundColor='rgb(0, 233, 248)';
  },
  findShip: function (ships) {
    let ship = ships;
    for (const arr of ship) {
      for (const id of arr) {
        for (const index of id) {
          const td = document.getElementById(index);
          td.textContent = id.length;
        }
      }
    }
  },
  findShipTemp: function () {
    for (const id of startGame.allReserveShip) {
      if (id >= 0 && id % 10 <= 9 && Math.floor(id / 10) <= 9) {
        const td = document.getElementById(id);
        if (td) {
          td.textContent = "x";
        }
      }
    }
  },
  placeShip: function () {
    for (let i = 0; i < startGame.allPlaceShip.length; i++) {
      for (const index of startGame.allPlaceShip[i]) {
        for (const id of index) {
          this.allShip.push(id);
        }
      }
    }
    // console.log("all ship" + this.allShip);
  },
  updateHits: function () {
    const span = document.querySelector(".counterHits");
    span.textContent = this.counterHits;
  },
  updateShip: function () {
    //  const lengthAllPlaceShip=startGame.allPlaceShip.length;
    let counter = 0;
    for (const indexArr of startGame.allPlaceShip) {
      for (const id of indexArr) {
        if (id.length) counter++;
      }
    }
    const numberShips = document.querySelector(".numberShip");
    numberShips.textContent = counter;
    if (counter === 0) {
      if(this.isMassage==false){
      alert("Усі кораблі потоплено. Вітаю!!!");
        this.isMassage=true;
      this.playAgain();
      }
    }
  },
  isHit: function (id, e) {
    const lengthAllPlaceShip = startGame.allPlaceShip[0];
    for (let i = 0; i < startGame.allPlaceShip.length; i++) {
      for (let j = 0; j < startGame.allPlaceShip[i].length; j++) {
        if (startGame.allPlaceShip[i][j].length) {
          if (startGame.allPlaceShip[i][j].includes(id)) {
            startGame.allPlaceShip[i][j].splice( startGame.allPlaceShip[i][j].indexOf(id),1);
            e.target.style.backgroundColor = "yellow";
            e.target.textContent = "hit";
            e.target.style.transition='1.5s';
            if(startGame.allPlaceShip[i][j].length==0){
              model.isSunk(i,j);
            }
            return;
          }
        }
      }
    }
    e.target.textContent = "miss";
     e.target.style.backgroundColor=' #00ff00';
    e.target.style.transition='2s';
    // e.target.style.backgroundColor = "red";
  },
  playAgain: function () {
    const bnt = document.getElementById("reset");
    bnt.textContent = "Нова гра";
    
    bnt.classList.remove("reset");
    bnt.classList.add("newGame");
  },
  newGame: function () {
    startGame.allPlaceShip = [];
    this.allShip = [];
    startGame.allReserveShip = [];
    copyAllPlaceShip=[];
    const td = document.getElementsByClassName("field");
    this.counterHits=0;
    // for (const item of td) {
    //   if(item.classList.contains('miss')){
    //     item.classList.remove('miss');
    //   }
    // }
  },
  isSunk:function(i,j){
    for(const key of model.copyAllPlaceShip[i][j]){
      const id=document.getElementById(key);
      id.style.backgroundColor='rgb(248, 153, 37)';
      id.style.transition='2s';
    }
  },
  copyPlaceShip:function(){
    this.copyAllPlaceShip=JSON.parse(JSON.stringify(startGame.allPlaceShip));
  }
};

const dynamic = {
  putUpdating: function () {
    const input = document.getElementsByTagName("input")[0].value;
    if (input <= 0) {
      alert("Введіть коректні данні, кораблів не може бути 0 або менше");
    } else if (input > 10) {
      alert("Максимальне допустиме значення кораблів 10");
    } else {
      startGame.defineNumberShip = input;
      model.shipRemove(startGame.allPlaceShip);
      model.newGame();

      startGame.defineShips();
      model.placeShip();
      model.updateShip();
      model.isMassage=false;
      // model.copyAllPlaceShip=startGame.allPlaceShip;
      // console.log(model.copyAllPlaceShip);
      // model.findShip(startGame.allPlaceShip);
      model.copyAllPlaceShip=[];
      model.copyPlaceShip();
      model.counterHits=0;
      model.updateHits();


      // model.findShipTemp();
      // console.log(startGame.allPlaceShip);
    }
  },
  onClick: function (e) {
    if (e.target.textCotent !== "miss" && e.target.textContent !== "hit") {
      model.counterHits++;
      model.updateHits();
      model.isHit(e.target.id, e);
      model.updateShip();
      
    }
  },

  renewNumberShip: function () {
    const btn = document.querySelector(".changeNumberShip");
    btn.addEventListener("click", this.putUpdating);
  },
  makeReset: function () {
    const input = document.getElementsByTagName("input")[0].value;
    
      startGame.defineNumberShip = input;
      model.shipRemove(startGame.allPlaceShip);
      model.newGame();

      startGame.defineShips();
      model.placeShip();
      model.updateShip();

      model.copyAllPlaceShip=startGame.allPlaceShip;
      // console.log(model.copyAllPlaceShip);
      // model.findShip(startGame.allPlaceShip);
      model.copyAllPlaceShip=[];
      model.copyPlaceShip();
      model.isMassage=false;
      model.counterHits=0;
      model.updateHits();


      // model.findShipTemp();
      // console.log(startGame.allPlaceShip);
    
  },
  doBlockLink: function () {
    const td = document.getElementsByClassName("field");
    for (const item of td) {
      item.addEventListener("click", this.onClick);
    }
  },

  clickBtnNewGame: function () {
    const bt = document.querySelector(".reset");
    bt.addEventListener("click", this.makeReset);
  },
};




//steck
console.log(model.copyAllPlaceShip);
startGame.defineShips();
model.placeShip();
model.updateShip();
model.copyPlaceShip();


// for beginner start
// model.findShip(startGame.allPlaceShip);
// model.findShipTemp();
//end;

// start події динамічні
dynamic.renewNumberShip();
dynamic.doBlockLink();
dynamic.clickBtnNewGame();
//end
