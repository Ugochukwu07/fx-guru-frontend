export function generateNumbers(num, rate) {
    const result = { above: [], below: [] };

    for (let i = 0; i < 16; i++) {
        const randomRate = Math.random() * rate/100;
        const isPositive = Math.random() > 0.5;

        let generatedNumber = isPositive ? num + (num * randomRate) : num - (num * randomRate);

        generatedNumber = Number(generatedNumber.toFixed(3));

        const roundedRate = Math.round(Math.abs(randomRate) * 100000) / 100000;

        if (generatedNumber > num) {
            if(result.above.length < 4){
                result.above.push({ number: generatedNumber, rate: roundedRate });
            }
        } else {
            if(result.below.length < 4){
                result.below.push({ number: generatedNumber, rate: roundedRate });
            }
        }
    }

    return result;
}

export function toSignificantFigures(number, significantFigures) {
    const parsedNumber = parseFloat(number);
    if (isNaN(parsedNumber)) {
        console.error('Invalid number:', number);
        return NaN;
    }

    const fixedNotation = parsedNumber.toExponential(significantFigures - 1);
    return parseFloat(fixedNotation);
}

export function generateNumber(num, rate){
    const randomRate = Math.random() * rate/100;
    const isPositive = Math.random() > 0.5;

    let generatedNumber = isPositive ? num + (num * randomRate) : num - (num * randomRate);

    generatedNumber = Number(generatedNumber.toFixed(3));

    const roundedRate = Math.round(randomRate * 100000) / 100000;

    return { number: generatedNumber, rate: roundedRate , isPositive: isPositive};
}


export function currentProfit(rate, amount, time, timeRemaining) {
    // Check for invalid input values
    if (isNaN(rate) || isNaN(amount) || isNaN(time) || isNaN(timeRemaining)) {
        throw new Error('Invalid input values. Please provide valid numbers.');
    }

    // Get the current time in milliseconds
    const currentTime = new Date()
    const current_time = currentTime.getTime();
    const new_time = new Date().setSeconds(currentTime.getSeconds() + time);

    // console.log(currentTime, new_time);
    // Calculate the elapsed time in seconds
    const elapsedTimeInSeconds = (new_time - current_time) / 1000;

    // Ensure timeRemaining is not 0 to avoid division by zero
    if (timeRemaining === 0) {
        timeRemaining = elapsedTimeInSeconds;
    }
    // console.log(elapsedTimeInSeconds, timeRemaining);
    const profit = ((rate / 100) * amount * elapsedTimeInSeconds) / timeRemaining;
    
    // Ensure the result is a number with 3 decimal places
    const roundedProfit = Number(profit.toFixed(3));

    return roundedProfit;
}

// export function currentProfit(rate, amount, time, timeRemaining) {
//     // Check for invalid input values
//     if (isNaN(rate) || isNaN(amount) || isNaN(time) || isNaN(timeRemaining)) {
//         throw new Error('Invalid input values. Please provide valid numbers.');
//     }

//     // Ensure timeRemaining is not 0 to avoid division by zero
//     if (timeRemaining === 0) {
//         timeRemaining = time;
//     }

//     const profit = (((rate / 100) * amount * time) + amount) / timeRemaining;
    
//     // Ensure the result is a number with 3 decimal places
//     const roundedProfit = Number(profit.toFixed(3));

//     return roundedProfit;
// }

  