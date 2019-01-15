import React from 'react'

import JSONTree from 'react-json-tree'

export class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '0',
      waitingForOperand: false,
      operator: null,
      operand: null,
      history: [],
      showingResult: false
    }
  }

  pressButton = (e) => { // This function handle all button clicks events.
    let value = e.target.value;
    console.log('Target:', e.target);
    if (Number.isInteger(parseInt(value))) { // If the button is a digit...
      this.handleDigit(value); // Pass the digit to the handleDigit() function.
    } else if (value === '=') { // If it is the equal button...
      let { value, operator, operand } = this.state; // Get values from state
      this.calculate(operand, operator, value);
    } else if (value === '*') {
      this.handleOperator('*')
    } else if (value === '+') {
      this.handleOperator('+')
    } else if (value === '-') {
      this.handleOperator('-')
    } else if (value === '/') {
      this.handleOperator('/')
    } else if (value === 'all-clear') {
      this.setState({ value: '0', operand: null, waitingForOperand: false, operator: null });
    } else if (value === '.') {
      if (this.state.value.indexOf('.') !== -1) {
        return false;
      } else {
        this.setState({ value: this.state.value + '.' });
      }
    }
  }

  calculate(operand, operator, value) {
    if (this.state.operand === null && this.state.operator === null) { // No operator/operand are set...
      this.setState({ value: this.state.value }); // Keep the value the same
    } else { // Otherwise...
      let calcStr = `${operand} ${operator} ${value}`;
      let calculation = String(eval(calcStr));
      this.setState({
        value: calculation,
        waitingForOperand: false,
        operator: null,
        operand: null,
        history: [...this.state.history, `${calcStr} = ${calculation}`],
        showingResult: true
      })
    }
  }

  handleOperator(operator) {
    if (this.state.operator !== null && this.state.waitingForOperand === true) {
      console.log(1)
      return false;
    } else if (this.state.operator !== null && this.state.waitingForOperand === false) {
      console.log(2)
      this.setState({
        waitingForOperand: true,
        operand: eval(`${this.state.operand} ${this.state.operator} ${this.state.value}`)
      })
    } else {
      console.log(3)
      this.setState({operator: operator, operand: this.state.value, waitingForOperand: true})
    }
  }

  handleDigit(digit) {
    if (this.state.waitingForOperand || this.state.showingResult === true) {
      this.setState({value: String(digit), waitingForOperand: false, showingResult: false})
    } else {
      if (this.state.value.indexOf('0') === -1) {
        this.setState({ value: this.state.value + String(digit) })
      } else {
        this.setState({ value: this.state.value.substr(1) + String(digit) })
      }
    }
  }

  render() {
    return <>
      <div className="calculator">
        <input type="text" className="calculator-screen" value={this.state.value} disabled />

        <div className="calculator-keys">
          <button type="button" className={this.state.operator === '+' ? 'selected operator' : 'operator'} onClick={this.pressButton} value="+">+</button>
          <button type="button" onClick={this.pressButton} className={this.state.operator === '-' ? 'selected operator' : 'operator'} value="-">-</button>
          <button type="button" onClick={this.pressButton} className={this.state.operator === '*' ? 'selected operator' : 'operator'} value="*">*</button>
          <button type="button" onClick={this.pressButton} className={this.state.operator === '/' ? 'selected operator' : 'operator'} value="/">/</button>

          <button type="button" onClick={this.pressButton} value="7">7</button>
          <button type="button" onClick={this.pressButton} value="8">8</button>
          <button type="button" onClick={this.pressButton} value="9">9</button>

          <button type="button" onClick={this.pressButton} value="4">4</button>
          <button type="button" onClick={this.pressButton} value="5">5</button>
          <button type="button" onClick={this.pressButton} value="6">6</button>

          <button type="button" onClick={this.pressButton} value="1">1</button>
          <button type="button" onClick={this.pressButton} value="2">2</button>
          <button type="button" onClick={this.pressButton} value="3">3</button>

          <button type="button" onClick={this.pressButton} value="0">0</button>
          <button type="button" onClick={this.pressButton} className="decimal" value=".">.</button>
          <button type="button" onClick={this.pressButton} className="all-clear" value="all-clear">AC</button>

          <button className="equal-sign" onClick={this.pressButton} value="=">=</button>

        </div>
        <JSONTree data={this.state} style={{fontSize: '12pt'}} />
      </div>
    </>
  }
}