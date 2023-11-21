export default function generateNumbers(num, rate) {
    const result = { above: [], below: [] };

    for (let i = 0; i < 16; i++) {
        const randomRate = Math.random() * rate/100;
        const isPositive = Math.random() > 0.5;

        let generatedNumber = isPositive ? num + (num * randomRate) : num - (num * randomRate);

        generatedNumber = Number(generatedNumber.toFixed(3));

        const roundedRate = Math.round(randomRate * 100000) / 100000;

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

  