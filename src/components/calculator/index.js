import React from 'react'

export class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '0',
      waitingForOperand: false,
      operator: null,
      operand: null,
      history: []
    }
  }

  pressButton = (e) => {
    let value = e.target.value;
    console.log('Target:', e.target);
    // If the button is a digit...
    if (Number.isInteger(parseInt(value))) {
      this.handleDigit(value);
    } else if (value === '=') {
      console.log('Equals!!!');
      let { value, operator, operand } = this.state;
      if (this.state.operand === null && this.state.operator === null) {
        this.setState({ value: this.state.value });
      } else {
        let calcStr = `${operand} ${operator} ${value}`;
        let calculation = eval(calcStr);
        this.setState({
          value: calculation,
          waitingForOperand: false,
          operator: null,
          operand: null,
          history: [...this.state.history, `${calcStr} = ${calculation}`]
        })
      }
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

  handleOperator(operator) {
    if (this.state.operand !== null) {
      return false;
    } else {
      this.setState({operator: operator, operand: this.state.value, waitingForOperand: true})
    }
  }

  handleDigit(digit) {
    if (this.state.waitingForOperand) {
      this.setState({value: String(digit), waitingForOperand: false})
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
          <button type="button" onClick={this.pressButton} className="operator" value="-">-</button>
          <button type="button" onClick={this.pressButton} className="operator" value="*">*</button>
          <button type="button" onClick={this.pressButton} className="operator" value="/">/</button>

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
      </div>
      <pre>{JSON.stringify(this.state)}</pre>
    </>
  }
}