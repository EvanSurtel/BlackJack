'use strict';

const btnNew = document.querySelector('.btn--new');
const btnHit = document.querySelector('.btn--hit');
const btnStand = document.querySelector('.btn--stand');
const btnBet = document.querySelector('.btn--bet');

var numberPlayers = 1;
let you = {you:true, deck:[], sum:0, aceCount:0, deckString:"your-cards"};
let dealer = {you:false, deck:[], sum:0, aceCount:0, deckString:"dealer-cards"};

let hiddenImg = document.createElement("img");
hiddenImg.src = "./cards/BACK.png";
hiddenImg.id = "dealer-hidden-card"

let deck;

let yourMoney = 100;
var yourBet = 0;
let standing = false;

let roundOutcome = "";
let endBet = 0;
let able = false;
let ableToBet = true;


var canHit = true; //if yourSum is less taht 21 you can still hit
startGame();

function startGame(){
    
    standing = false;
    
    document.getElementById('your-cards').textContent = "";
    document.getElementById('dealer-cards').textContent = ""; 
            
            
        
    
    display();
    
    buildDeck();
    shuffle();
    console.log(deck);
    
    for(let i = 0; i < (numberPlayers*2+2) ; i++) {
        
        if(i == numberPlayers) {
            
            handCard(dealer);
            
        }else if(i == (numberPlayers*2+1 )){
            
            handCard(dealer);
            
        }else{
            
            handCard(you);
            
        }
    
    }
    if(you.sum===21){
        roundResult();
    }
    
};


function buildDeck() {
    let values = ["A", "2", "3", "4","5","6","7","8","9", "10", "J","Q","K"];
    let suits = ["D", "H","S","C"];
    you.deck = [];
    dealer.deck = [];
    you.aceCount = 0;
    dealer.aceCount = 0;
    deck = [];
    you.sum = 0;
    dealer.sum = 0;

        for(let i = 0; i<values.length;i++) {
            for(let j = 0; j<suits.length; j++){
                deck.push(values[i] + ["-"] + suits[j]);


            }
        }
       
        
};




function shuffle() {
    for(let i = 0; i<deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }

   
    
};

function handCard(person){
    let card = deck.pop();
    if(card[0] === 'A') person.aceCount += 1;
    person.deck.push(card);
    person.sum += getValue(card);
    if(person.you == false){
        if(person.deck.length == 2) {
            hiddenImg.src = "./cards/BACK.png";
            document.getElementById("dealer-cards").append(hiddenImg);
            return;
        };
    };
    if(person.sum > 21){
        if(person.aceCount>0){
            person.sum -= 10;
            person.aceCount -= 1;
        };
    };
    let cardImg = document.createElement("img");    
    cardImg.src = "./cards/" + card + ".png";
    document.getElementById(person.deckString).append(cardImg);

    console.log(person);
};

function getValue(card){
    let data = card.split("-");//split [value-suit] into [value, suit]
    let value = data[0];
    if(isNaN(value)){
        if(value == "A"){
            return 11;
        }
        return 10;
    }
    
    return parseInt(value);

};


btnHit.addEventListener('click', function(){
    if(standing == true){
        return;
    }
    if(you.sum > 20){
        return;
    }else{
        handCard(you);

        if(you.sum > 20){
            roundResult();
        }
    }
    console.log("y",you.sum);
   
});





btnStand.addEventListener('click', function(){
    if(standing == true) {
        return;
    }
    standing = true;
    if(you.sum>20){
        return;
    }
    let card =  dealer.deck[dealer.deck.length-1];
    document.getElementById("dealer-hidden-card").src = "./cards/" + card + ".png";
    roundResult();


});

btnBet.addEventListener('click', 
    function(){
        if(ableToBet){
        
        
        yourBet = Number(document.querySelector('.bet').value);
        if (yourBet < 1){
            return;
        }
        yourMoney -= yourBet;
        ableToBet = false;
        startGame();
        }
});

btnNew.addEventListener('click', 
    function(){
        if(able){
        yourBet = 0;
        endBet = 0;
        able = false;
        ableToBet = true;
        display();
        }
});


function roundResult(){
    
    if(you.sum>21){

        
        roundOutcome = "lost";
        
        endBet = 0;
        display();
        
        
    }else if(you.sum === 21){
        endBet =  1.5*yourBet;          
        yourMoney += endBet;
        roundOutcome = "won";
        display();  
        
    }
    else{
        if(dealer.sum<17){
            while(dealer.sum<17) handCard(dealer);    
        }

        if(dealer.sum>21){    
            endBet =  2*yourBet;          
            yourMoney += endBet;
            roundOutcome = "won"; 
            display();     
        }else if(you.sum>dealer.sum){
            endBet =  2*yourBet;          
            yourMoney += endBet;               
            roundOutcome = "won"; 
            display();
        }else{
            endBet = 0;          
            roundOutcome = "lost";
            display();
        }
    }
    
    able = true;
    console.log("y", you.sum);
    console.log("d", dealer.sum);
    
};

function display(){
   document.getElementById("round-text").innerText = "YOUR BET: " +yourBet + "\n" +"YOUR RETURN: "+endBet + "\n" +"YOUR BALANCE: "+yourMoney;
};
    
