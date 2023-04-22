class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1); 
        this.updateDisplay()
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        this.updateDisplay()
    }
    compute(){
        let computation;
        let previousNum = parseFloat(this.previousOperand)
        let currentNum = parseFloat(this.currentOperand)
        if(isNaN(previousNum) || isNaN(currentNum)) return
        switch(this.operation){
            case '+':
                computation = previousNum + currentNum
                break;
            
            case '-':
                computation = previousNum - currentNum
                break;
            
            case '*':
                computation = previousNum * currentNum
                break;
            
            case '/':
                computation = previousNum / currentNum
                break;
            
            default:
                break;
        }
        this.previousOperand = ''
        this.operation = undefined
        this.currentOperand = computation;

    }
    appendNumber(number){   
        if(this.currentOperand.includes('.') && number === '.'){
            return
        }
        else{
            this.currentOperand = this.currentOperand.toString()+number;
        }
    }
    
    chooseOperation(operation){
        if(this.currentOperand === ''){
            return
        }
        if(this.previousOperand !== ''){
            this.compute()
        }
    
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''    

    }

    getDisplayNumber(number){

        const numberStr = number.toString();
        const integerDigits = parseFloat(numberStr.split('.')[0])
        const decimalDigits = numberStr.split('.')[1]

        let integerDisplay

        if(isNaN(integerDigits)){
            integerDisplay=''
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en-IN',{maximumFractionDigits:0})
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }
        else{
            return integerDisplay
        }
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else{
            this.previousOperandTextElement.innerText = ''
        }
    }
    
}

const operationButtons = document.querySelectorAll('[data-operation]')
const numberButtons = document.querySelectorAll('[data-numbers]')
const deleteButton = document.querySelector('[data-delete]')
const acButton = document.querySelector('[data-ac]')
const equalsButton = document.querySelector('[data-equals]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})

operationButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click',()=>{
        calculator.compute()
        calculator.updateDisplay();
})
acButton.addEventListener('click',()=>{
    calculator.clear()
})

deleteButton.addEventListener('click',()=>{
    calculator.delete()
})
