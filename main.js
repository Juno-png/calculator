let operator = '';
let previousValue = '';
let currentValue = '';

document.addEventListener("DOMContentLoaded", function(){
    // Store all components on HTML into main.js
    let clear = document.querySelector('#clear-btn');
    let equal = document.querySelector('.equal');
    let decimal = document.querySelector('.decimal');

    let numbers = document.querySelectorAll('.number');
    let operators = document.querySelectorAll('.operator');

    let previousNum = document.querySelector('.previous');
    let currentNum = document.querySelector('.current');

    numbers.forEach((number) => number.addEventListener('click', function(e){
        getNumber(e.target.textContent)
        currentNum.textContent = currentValue;
    }));

    operators.forEach((op) => op.addEventListener('click', function(e){
        getOperator(e.target.textContent)
        previousNum.textContent = previousValue + ' ' + operator;
        currentNum.textContent = currentValue;
    }))

    clear.addEventListener('click', function(){
        previousValue = '';
        currentValue = '';
        operator = '';
        previousNum.textContent = currentValue;
        currentNum.textContent = currentValue;
    })

    equal.addEventListener('click', function(){
        if(currentValue != '' && previousValue != ''){
            calculate()
            previousNum.textContent = '';
            if(previousValue.length <= 5){
                currentNum.textContent = previousValue;
            } else {
                currentNum.textContent = previousValue.slice(0,5) + '...';
            }
        }
    })

    decimal.addEventListener('click', function(){
        addDecimal();
    })
});

function getNumber(num){
    if(currentValue.length <=5){
    currentValue += num;
    }
}

function getOperator(op){
    operator = op;
    previousValue = currentValue;
    currentValue = '';
}

function calculate(){
    previousValue = Number(previousValue)
    currentValue = Number(currentValue);

    if(operator === '+'){
        previousValue += currentValue;
    } else if (operator === '-'){
        previousValue -+ currentValue;
    } else if (operator === 'x'){
        previousValue *= currentValue;
    } else {
        previousValue /= currentValue;
    }

    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = currentValue.toString();
}

function roundNumber(num){
    return Math.round(num * 1000) / 1000;
}

function addDecimal(){
    if(!currentValue.includes('.')){
        currentValue += '.';
    }
}