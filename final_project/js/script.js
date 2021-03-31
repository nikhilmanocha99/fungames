var scores, roundscores, activeplayer, gameplaying;

init()




document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gameplaying) {

        //1) random no. from 1-6 
      var dice = Math.floor(Math.random() * 6) + 1;
      //2) display the random no.
      var dicedom = document.querySelector('.dice');
      dicedom.style.display = 'block';
      dicedom.src = 'dice-' + dice + '.png';

      if(dice !== 1) {
          //add score
          roundscores += dice;
          document.querySelector('#current-' + activeplayer).textContent = roundscores;
      }
      else{
          //next player
          next_player()

      }
    }
      
});


document.querySelector('.btn-hold').addEventListener('click', function() {
   if(gameplaying) {
    scores[activeplayer]+=roundscores;

    document.querySelector('#score-' + activeplayer).textContent = scores[activeplayer];
    if(scores[activeplayer]>=100){
        gameplaying = false;
        document.querySelector('#name-' + activeplayer).textContent = 'WINNER!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activeplayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activeplayer + '-panel').classList.remove('active');

    }
    else{
        next_player()
    }

   }
});

function next_player() {
    roundscores = 0; 
     //next player
     activeplayer === 0 ? activeplayer = 1 : activeplayer = 0;
     document.getElementById('current-0').textContent = '0';
     document.getElementById('current-1').textContent = '0';
     document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active')
     
     document.querySelector('.dice').style.display = 'none';

 }

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activeplayer = 0;
    roundscores = 0;
    gameplaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player-1';
    document.querySelector('#name-1').textContent = 'Player-2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}



//document.querySelector('#current-' + activeplayer).textContent = dice;
//document.querySelector('#current-' + activeplayer).innerHTML = '<em>' + dice + '</em>';