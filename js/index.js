/****************************************/
/*** Game Class and its dependencies ***/
/****************************************/
var dice1 = document.getElementById("dice1")
var dice2 = document.getElementById("dice2")

function Game(score) {
  var self = this

  this.startGame = function(){

    self.playerNumber = 0 //number of player => 0 or 1
    self.players = [new Player(0), new Player(1)]
    self.score = score
  }

  this.rollDice = function(){
    const vals = [(Math.floor(Math.random() * 6) + 1), (Math.floor(Math.random() * 6) + 1)]

    // setting the images
    dice1.src = './assets/dice-' + (vals[0]) + ".png"
    dice2.src = './assets/dice-' + (vals[1]) + ".png"

    // logic of game
    const sumRolls = vals[0] + vals[1]
    if (vals[0] === 1 || vals[1] === 1){
      // game over
      self.changeTurn()
    }else{
      self.players[self.playerNumber].addCurrentPoint(sumRolls)
    }
  }

  this.hold = function(){
    self.playes[self.playerNumber].addSumPoint()
    if (!self.checkPoints())
      self.changeTurn()
  }

  /* */
  this.checkPoints = function(){
    for (let i=0; i<self.players; i++){
      if (players[i].getSumPoint() >= self.score){
        alert("player" + i + "wins")
        return 1
      }
    }
  }

  this.changeTurn = function(){
    self.playerNumber = (self.playerNumber + 1) % 2
  }

}

/*****************************************/
/*** Player Class and its dependencies ***/
/*****************************************/
var currentPointCompos = [
  document.getElementById("player-0-currentpoint"),
  document.getElementById("player-1-currentpoint")
]

var sumPointCompos = [
  document.getElementById("player-0-sumpoint"),
  document.getElementById("player-1-sumpoint")
]

function Player(playerNumber){
  var self = this
  this.playerNumber = playerNumber
  this.currentPoint = 0
  this.sumPoint = 0

  this.addCurrentPoint = function(val){
    if (val === -1)
      self.currentPoint = 0
    else
      self.currentPoint += val

    console.log(self.currentPoint);
    currentPointCompos[self.playerNumber].innerHTML = self.currentPoint
  }
  this.addSumPoint = function (){
    self.sumPoint += self.currentpoint

    self.addCurrentPoint(-1)

    sumPointCompos[self.playerNumber].innerHTML = self.sumPoint
  }

  this.getCurrentPoint = function(val){
    return self.currentPoint
  }
  this.getSumPoint = function(val){
    return self.sumPoint
  }
}

/****************************************/
/*** index Class and its dependencies ***/
/****************************************/
var game = new Game(100)

// assgining functions
var newGameBtn =  document.getElementById("new-game-btn")
newGameBtn.onclick = game.startGame

var rollDiceBtn =  document.getElementById("roll-dice-btn")
rollDiceBtn.onclick = game.rollDice

var holdBtn =  document.getElementById("hold-btn")
holdBtn.onclick = game.hold
