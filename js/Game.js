class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];

    passedFinish = false;
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getFinishedPlayers();
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null && passedFinish !== true){
      
      player.distance +=10
      player.update();
    }

    if(player.distance >= 500 && passedFinish == false){
      console.log("calling update finished players")
 //     gameState = 2;
 Player.updateFinishedPlayers();
 player.rank=finishedPlayers;
 player.update();
 passedFinish=true;
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }


  displayRank(){
    console.log("display rank")
    camera.position.x=0;
    camera.position.y=0;
    imageMode(CENTER)
    Player.getPlayerInfo();
    image(gold,400,-10,250,300)
    image(silver,100,displayHeight/6,250,300)
    image(bronze,700,displayHeight/6,250,300)
    textAlign(CENTER)
    textSize(30)
    for(var plr in allPlayers){
      if(allPlayers[plr].rank==1){
        text("1st:"+allPlayers[plr].name,500,displayHeight/2.4)
      }
      else
      if(allPlayers[plr].rank==2){
        text("2nd:"+allPlayers[plr].name,220,displayHeight/1.6)
      }
      else
      if(allPlayers[plr].rank==3){
        text("3rd:"+allPlayers[plr].name,820,displayHeight/1.6)
      }
      else
      text("Honourable Mention"+allPlayers[plr].name,550,225);
    }
  }
}
