let currentNum = '';
let previousNum = '';
let operator = '';

document.addEventListener("DOMContentLoaded", function(){

    window.addEventListener('keydown', handleKeys);

    const currentDisplayNum = document.querySelector('.current');
    const previousDisplayNum = document.querySelector('.previous');

    const equal = document.querySelector('.equal');

    equal.addEventListener('click', () => {
        if (currentNum != '' && previousNum != '') {
            calculate();
        }
    });

    const decimal = document.querySelector('.decimal');

    decimal.addEventListener('click', () => {
        addDecimal();
    });

    const clear = document.querySelector('.clear');

    clear.addEventListener('click', clearDisplay);

    const deleteButton = document.querySelector('.delete');

    deleteButton.addEventListener('click', handleDelete);

    const numberButtons = document.querySelectorAll('.number');

    numberButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            handleNumber(e.target.textContent);
        });
    });

    const operators = document.querySelectorAll('.operator');

    operators.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            handleOperator(e.target.textContent);
        });
    });

    function handleNumber(number) {
        if(previousNum !== '' && currentNum != '' && operator === '') {
            previousNum = ''
            currentDisplayNum.textContent = currentNum
        }
        if(currentNum.length <= 10) {
            currentNum += number;
            currentDisplayNum.textContent = currentNum;
        }
    }

    function handleOperator(op) {
        if(previousNum === '') {
            previousNum = currentNum;
            operatorCheck(op)
        } else if (currentNum === '') {
            operatorCheck(op)
        } else {
            calculate()
            operator = op;
            currentDisplayNum.textContent = '';
            previousDisplayNum.textContent = previousNum + ' ' + operator;
        }
    }

    function operatorCheck(text) {
        operator = text;
        previousDisplayNum.textContent = previousNum + ' ' + operator;
        currentDisplayNum.textContent = '';
        currentNum = '';
    }

    function calculate() {
        previousNum = Number(previousNum);
        currentNum = Number(currentNum);
    
        if (operator === '+') {
            previousNum += currentNum;
        } else if (operator === '-') {
            previousNum -= currentNum;
        } else if (operator === 'x') {
            previousNum *= currentNum;
        } else if (operator === '/') {
            if(currentNum <= 0) {
               previousNum = 'Error, can\'t divide by 0';
               previousDisplayNum.textContent = '';
               currentDisplayNum.textContent = previousNum;
               operator = '';
               return; 
            }
            previousNum /= currentNum;
        }
        previousNum = roundNumber(previousNum);
        previousNum = previousNum.toString();
        displayResult();
    }

    function roundNumber(num) {
        return Math.round(num * 1000) / 1000;
    }

    function displayResult() {
        if (previousNum.length <= 10) {
            currentDisplayNum.textContent = previousNum;
        } else {
            currentDisplayNum.textContent = previousNum.slice(0, 10) + '...';
        }
        previousDisplayNum.textContent = '';
        operator = '';
        currentNum = '';
    }

    function clearDisplay() {
        currentNum = '';
        previousNum = '';
        operator = '';
        currentDisplayNum.textContent = '';
        previousDisplayNum.textContent = '';
    }

    function addDecimal() {
        if (!currentNum.includes('.')) {
            currentNum += '.'
            currentDisplayNum.textContent = currentNum;
        }
    }

    function handleKeys(e) {
        e.preventDefault()
        if (e.key >= 0 && e.key <= 9) {
            handleNumber(e.key)
        }
        if (e.key === 'Enter' || (e.key === '=' && currentNum != '' && previousNum != '')) {
            calculate();
        }
        if (e.key === '+' || e.key === '-' || e.key === '/') {
            handleOperator(e.key);
        }
        if (e.key === '*') {
            handleOperator('x');
        }
        if (e.key === '.') {
            addDecimal();
        }
        if (e.key === 'Backspace') {
            handleDelete();
        }
        if (e.key === 'Delete' || e.key === 'Escape')
            clearDisplay();

    }

    function handleDelete() {
        if(currentNum != '') {
            currentNum = currentNum.slice(0, -1);
            currentDisplayNum.textContent = currentNum;
            if (currentNum === '') {
                currentDisplayNum.textContent = '';
            }
        }
        if (currentNum === '' && previousNum !== '' && operator === '') {
            previousNum = previousNum.slice(0, -1);
            currentDisplayNum.textContent = previousNum;
        }
    }


});