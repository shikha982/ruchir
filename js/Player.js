class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank=0;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      rank:this.rank
    });
  }

  static getPlayerInfo(){
    console.log("getplayersinformation")
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
  getFinishedPlayers(){
    console.log("getfinished players")
    database.ref('finishedPlayers').on('value',(data)=>{
      finishedPlayers = data.val();
    })

  }
  static updateFinishedPlayers(){
    console.log("update fininshed players")
    database.ref('/').update({
      finishedPlayers : finishedPlayers + 1
    });
    this.rank += 1;
  }
}
