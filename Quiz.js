class Quiz{
  constructor(){}

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
          contestant = new Contestant();
          var contestantCountRef = await database.ref('contestantCount').once("value");
          if(contestantCountRef.exists()){
            contestantCount = contestantCountRef.val();
            contestant.getCount();
          }
          question = new Question()
          question.display();
        }

      }

      play(){
        question.Hide();
        textSize(30);
        text("Results of the quiz", 120, 100)
        Contestant.getContestantInfo();
       
        if(allContestants !== undefined){
          var correctAns= 2
          var display_position = 130;
          for(var plr in allContestants){
            if (correctAns === allContestants[plr].index)
              fill("green")
            else
            fill("red");;
            display_position+=20;
            textSize(15);
            text(allContestants[plr].name + ": " + allContestants[plr].answer, 120,display_position)
          }
        }
}
}

