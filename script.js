function add(a,b){
    a = Number(a)
    b = Number(b)
    return a + b
}

function subtract(a,b){
    return a - b
}

function divide(a, b){
    return a/b
}

function multiply(a,b){
    return a*b
}

function operate(operater,a,b){
    switch(operater){
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case 'x':
            return multiply(a,b)
        case '/':
            return divide(a,b)
    }
}

const expressionDisplay = document.querySelector('.expression-display')
const resultsDisplay = document.querySelector('.results-display')
let firstNumber = ''
let secondNumber = ''
let results;
let operator;
let expression = ''
let FirstOperatorPressed = false
let secondOperatorPressed = false
const minusButton = document.querySelector('#minus')
const PlusButton = document.querySelector('#plus')
const multiplyButton =  document.querySelector('#multiply')
const divideButton = document .querySelector('#divide')
const clearButton = document.querySelector('#clear')
const equalsButton = document.querySelector('button[value="equals"]')

let operatorsNodeList = document.querySelectorAll('.operators-container button')
let operatorsArr = Array.from(operatorsNodeList)
//function for reducing font-size of the expressionDisplay when the text is too long
function reduceFont(){
    if(expressionDisplay.textContent.length >=15){
        expressionDisplay.classList.add('reduce-font')
    }
    else{
        expressionDisplay.classList.remove('reduce-font')
    }
}
//function when an operator is clicked
function operatorLogic(e){
    //when the first math operator is clicked
    if(FirstOperatorPressed === false){
        if(e.target.value === 'minus'){
            expression += '-'
            expressionDisplay.textContent = expression
            operator = '-'
            FirstOperatorPressed = true
        }
        else if(e.target.value === 'plus'){
            operator = '+'
            expression += '+'
            expressionDisplay.textContent = expression
            FirstOperatorPressed = true
        }
        else if(e.target.value === 'multiply'){
            operator = 'x'
            expression += 'x'
            expressionDisplay.textContent = expression
            FirstOperatorPressed = true
        }else if(e.target.value ==='divide'){
            operator = '/'
            expression += '/'
            expressionDisplay.textContent = expression
            FirstOperatorPressed = true
        }
           
    }
    //when math operator is clicked for a second time
    else if(FirstOperatorPressed === true){
        let results = evaluateExpression()
        expression = results + e.target.textContent
        expressionDisplay.textContent = expression
        reduceFont()
        firstNumber = results.toString()
        secondNumber = ''
        //update the operator value because it is no longer the first value of the operator variable
        switch(e.target.value){
            case 'plus':
                operator = '+';
                break;
            case 'multiply':
                operator = 'x';
                break;
            case 'divide':
                operator = '/'
                break;
            case 'minus':
                operator = '-'
        }
    }

    //when the clear button is clicked
    if(e.target.value === 'clear'){
        FirstOperatorPressed = false;
        resultsDisplay.textContent = ''
        expressionDisplay.textContent = ''
        expression = ''
        firstNumber = ''
        secondNumber = ''
    }
}
// adding event listener to math operators
operatorsArr.forEach(operator => {
    operator.addEventListener('click',operatorLogic)
})

//adding event listeners to the number buttons except the equals buton
const numbersContainer = document.querySelectorAll('.numbers-container button')
numberButtons = [...numbersContainer]
numberButtons.forEach(button => {
    if(button.value !== 'equals'){
    button.addEventListener('click',captureInput)}
})

//function for changing the text on the expression display
function captureInput(e){
    if(e.target.value !== 'equals' && FirstOperatorPressed === false){
        expression += e.target.value
        expressionDisplay.textContent = expression
        reduceFont()
        firstNumber += e.target.value
        
    }
    else if(FirstOperatorPressed === true && e.target.value !== 'equals'){
        expression += e.target.value
        secondNumber += e.target.value
        expressionDisplay.textContent = expression
        reduceFont()
    }
    
    console.log('first: '+ firstNumber)
    console.log('second: '+secondNumber)
    console.log('first-len: ',firstNumber.length)
    console.log('second-len',secondNumber.length)
}

//function for when the equals sign is clicked
function evaluateExpression(){
    let results;
    //when equals sign is clicked and we have captured the first and second number
    if(firstNumber.length > 0 && secondNumber.length > 0){
        results = operate(operator,firstNumber,secondNumber)
        resultsDisplay.textContent = results
        return results
    }
}
//event listener for when the equals button is clicked
equalsButton.addEventListener('click',evaluateExpression)
