// 1. Deposite some money.
// 2. Determine number of lines to bet on.
// 3. Collect a bet amount.
// 4. Spin the slot machine.
// 5. Determine winnings
// 6. Continue the game

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
};



const deposit = () => {
    while(true){
    const depositeAmt = prompt("Enter a Deposite amount: ");
    const numberDepositAmt = parseFloat(depositeAmt);

    if(isNaN(numberDepositAmt) || numberDepositAmt <= 0){
        console.log("Invalid deposite. Try again!!");
    }else{
        return numberDepositAmt;
    }
    }   
}

const getNumberOfLines = () => {
    while(true){
    const lines = prompt("Enter number of lines to bet on (1-3): ");
    const numberOfLines = parseInt(lines);

    if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
        console.log("Invalid number of lines. Try again!!");
    }else{
        return numberOfLines; 
    }
    }   
};

const getBet = (balance, lines) => {
    while(true){
        const bet = prompt("Enter bet amount per line: ");
        const numberBet = parseFloat(bet);
    
        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines ){
            console.log("Invalid bet amount. Try again!!");
        }else{
            return numberBet; 
        }
        }  
};

const spin = () => {
    const symbols = [];
     for(const [symbol, count] of Object.entries(SYMBOL_COUNT)){
        for(i = 0; i < count; i++){
            symbols.push(symbol);
        }
     }

     const reels = [];
     for(let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols] 
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbols = reelSymbols[randomIndex];
            reels[i].push(selectedSymbols);
            reelSymbols.splice(randomIndex, 1)
        }
     }

     return reels;
};

const transpose = (reels) => {
    const rows = []
    for(let i = 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printRows = (rows) => {
    for(const row of rows){
        let rowString = ""
        for(const[i, symbol] of row.entries()){
            rowString += symbol
            if(i != row.length - 1){
                rowString += ' | ';
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
       
    for(let row = 0;  row < lines; row++){
        const symbols = rows[row];
        let allSame = true;
         
        for(const symbol of symbols){
             if(symbol != symbols[0]){
                allSame = false;
                break;
             }
        }
        if (allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
};

const game = () => {
    let balance = deposit();

    while(true){
        console.log("You have a banalce of $ "+ balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance,numberOfLines);
        balance -= bet * numberOfLines;
        const reel = spin();
        const rows = transpose(reel);
        printRows(rows);
        const winnings = getWinnings(rows,bet,numberOfLines);
        balance += winnings;
        console.log("You Won, $ "+ winnings.toString());

        if (balance <= 0){
            console.log("Opps! you ran out of money");
        }

        const playAgain = prompt("Do you want to play again ( y/n )?")

        if(playAgain != 'y') break;
    }
};

game();
