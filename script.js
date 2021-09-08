const numElements = document.getElementsByClassName('num')
const opsElements = document.getElementsByClassName('ops')
const equalElement = document.getElementById('equal')
const clearElement = document.getElementById('clear')
const signElement = document.getElementById('sign')
const percentElement = document.getElementById('percent')
const prevElement = document.getElementById('prev')
const currElement = document.getElementById('curr')

class Calculator {
	constructor(prevElement, currElement) {
		this.prevElement = prevElement
		this.currElement = currElement
		this.clear()
	}

	clear() {
		this.prevOperand = ''
		this.currOperand = '0'
		this.operation = undefined
		// Computed equation indicator
		this.complete = false
	}

	appendNumber(num) {
		// Reset operand after completed equation
		if(this.complete === true) {
			this.currOperand = ''
			this.complete = false
		}
		// Limit operand to 9 digits
		if(this.currOperand.includes('.')) {
			if(this.currOperand.length === 10) return
			// Limits operand to one decimal
			if(num === '.') return
		} else {
			if(this.currOperand.length === 9) return
		}
		// Replaces default zero with operand
		if(this.currElement.innerText === '0') {
			this.currOperand = num.toString()
		} else {
			// append num to current operand string
			this.currOperand = this.currOperand.toString() + num.toString()
		}
	}

	chooseOperation(ops) {
		// Requires current operand to not be empty
		if(this.currOperand === '') return
		// Compute result if there are two operands
		if(this.prevOperand !== '') {
			this.compute()
		}
		this.prevOperand = this.currOperand
		this.currOperand = ''
		this.operation = ops
	}

	sign() {
		this.currOperand = '-' + this.currOperand.toString()
	}

	percent() {
		this.currOperand = (parseFloat(this.currOperand))/100
	}

	compute() {
		let result
		// Convert string to number
		const prev = parseFloat(this.prevOperand)
		const curr = parseFloat(this.currOperand)
		// Make sure operands are numbers
		if(isNaN(prev) || isNaN(curr)) return
		switch(this.operation) {
			case '+':
				result = prev + curr
				break
			case '-':
				result = prev - curr
				break
			case 'x':
				result = prev * curr
				break
			case '÷':
				result = prev / curr
				break
			default:
				return
		}
		let resStr = result.toString()
		// Check if result is too long
		if(resStr.length > 10) {
			resStr = this.capResult(resStr)
		}
		this.prevOperand = ''
		this.currOperand = resStr
		this.operation = undefined
		// Equation completed
		this.complete = true
	}

	// Update display elements
	updateDisplay() {
		this.prevElement.innerText = this.prevOperand
		this.currElement.innerText = this.currOperand
	}

	// Limits result to 9 digits
	capResult(res) {
		if(res.includes('.')) {
			const dec = res.indexOf('.')
			const wholeNums = res.substring(0,dec)
			const decNums = 9 - (wholeNums.length)
			if (decNums < 0) {
				return 'Error...'
			}else {
				res = (parseFloat(res)).toFixed(decNums)
				return res.toString()
			}
		} else {
			return 'Error...'
		}
	}
}

const calculator = new Calculator(prevElement, currElement)

// Convert HTML collection to array
Array.from(numElements).forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText)
		calculator.updateDisplay()
	})
})

// Convert HTML collection to array
Array.from(opsElements).forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText)
		calculator.updateDisplay()
	})
})

clearElement.addEventListener('click', () => {
	calculator.clear()
	calculator.updateDisplay()
})

equalElement.addEventListener('click', () => {
	calculator.compute()
	calculator.updateDisplay()
})

signElement.addEventListener('click', () => {
	calculator.sign()
	calculator.updateDisplay()
})

percentElement.addEventListener('click', () => {
	calculator.percent()
	calculator.updateDisplay()
})

