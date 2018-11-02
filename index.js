const nerds = require('nerds');


// grabs random harry potter character
// grabs random star wars character

// transforms them into fighting characters
// - add on an `attack` value
// - add on a `health` value

// copy and paste that random number function from mdn

// write a function that accepts two characters
// and has one attack the other
// and vice versa

// check their health
// run until there is one survivor


let harryPotterArray = nerds.resolve('Harry Potter').asArray();
let starWarsArray = nerds.resolve('Star Wars').asArray();

for (let i=0; i<harryPotterArray.length; i++) {
    let hpCharacter = harryPotterArray[i];
    let swCharacter = starWarsArray[i];
    // console.log(swCharacter);
    console.log(`${hpCharacter.first} ${hpCharacter.last} punches ${swCharacter.name} in the neck.`);
}
