const nerds = require('nerds');
const {spawn} = require('child_process');

// ======================================================
// Game configuration
// ======================================================
const MAX_POWER = 100;
const MAX_HEALTH = 300;
const MIN_HEALTH = 100;

const PAIN_SOUNDS = [
    'owwwchee',
    'oof',
    `it's only a flesh wound`,
    'you punk. that hurt',
    'argh',
    'i need a beer',
    'ow my spleen',
    'uuuuggggh'
];

const CROAK_SOUND = 'oh no i am dead';

// ======================================================

// grabs random harry potter character
function getRandomHarryPotter() {
    let harryPotterArray = nerds.resolve('Harry Potter').asArray();
    let hpCharacter = harryPotterArray[0];
    hpCharacter.name = `${hpCharacter.first} ${hpCharacter.last}`;
    return hpCharacter;
}
// grabs random star wars character
function getRandomStarWars() {
    let starWarsArray = nerds.resolve('Star Wars').asArray();
    return starWarsArray[0];
}

// copy and paste that random number function from mdn
function getRandomInt(max=100, min=50) {
    return Math.floor(Math.random() * (max - min) + min);
    // return Math.floor(Math.random() * Math.floor(max));
}

// transforms them into fighting characters
function makeFighter(character){
    character.power = getRandomInt(MAX_POWER);
    // - add on an `attack` value
    character.health = getRandomInt(MAX_HEALTH, MIN_HEALTH);
    // - add on a `health` value

    // character.isMale = () => character.gender === 'Male';
    character.isFemale = () => character.gender === 'Female';

    character.yell = (what) => {
        let voice;
        if (character.isFemale()) {
            voice = 'Victoria';
        } else {
            voice = 'Alex';
        }        
        spawn('say', ['-v', voice, what]);
    }

    character.attack = (enemy) => {
        let howMuch = getRandomInt(character.power, character.power/3);
        enemy.health = enemy.health - howMuch;
        // spawn('say', ['owwwwwchee']);
        enemy.yell(PAIN_SOUNDS[getRandomInt(PAIN_SOUNDS.length+1, 0)]);
        character.lastDamage = howMuch;
    };

    character.isAlive = () => {
        let stillKicking = character.health > 0;
        if (!stillKicking) {
            // spawn('say', ['oh no i am dead']);
            setTimeout(() => {
                character.yell(CROAK_SOUND);
            }, 1500);
        }
        return stillKicking;
    };

    return character;
}


// write a function that accepts two characters
// and has one attack the other
// and vice versa

function battle(f1, f2) {
    console.log('================================');
    console.log(`${f1.name}: ${f1.health}`);
    console.log(`${f2.name}: ${f2.health}`);
    console.log('--------------------------------');
    f1.attack(f2);
    console.log(`${f1.name} attacks ${f2.name} for ${f1.lastDamage} damage!`);
    console.log('================================');
    
}

function toTheDeath() {
    let sw = makeFighter(getRandomStarWars());
    let hp = makeFighter(getRandomHarryPotter());
    let fighters = [sw, hp];
    let battleInterval = setInterval(() => {
        [sw, hp] = [hp, sw]; // swaps the items in the array.
        battle(sw, hp);
        if (!sw.isAlive() || !hp.isAlive()) {
            clearInterval(battleInterval);
        }
    }, 1500);
    // run until there is one survivor
}

toTheDeath();


module.exports = {
    getRandomHarryPotter,
    getRandomStarWars,
    makeFighter,
    toTheDeath
}