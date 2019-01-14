import React from 'react'

export class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      waitingForOperand: false,
      operand: null
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
    } else if (value === '*') {
      this.setState({operand: '*', waitingForOperand: true})
    } else if (value === '+') {
      this.setState({operand: '+', waitingForOperand: true})
    } else if (value === '-') {
      this.setState({operand: '-', waitingForOperand: true})
    } else if (value === '/') {
      this.setState({operand: '/', waitingForOperand: true})
    } else if (value === 'all-clear') {
      this.setState({ value: '', operand: null, waitingForOperand: false });
    }
  }

  handleDigit(digit) {
    this.setState({value: this.state.value + digit})
  }

  render() {
    return <>
      <div className="calculator">
        <input type="text" className="calculator-screen" value="0" disabled />

        <div className="calculator-keys">
          <button type="button" onClick={this.pressButton} className="operator" value="+">+</button>
          <button type="button" onClick={this.pressButton} className="operator" value="-">-</button>
          <button type="button" onClick={this.pressButton} className="operator" value="*">*</button>
          <button type="button" onClick={this.pressButton} className="operator" value="/">/</button>

          <button type="button" onClick={this.pressButton} value="7">7</button>
          <button type="button" onClick={this.pressButton} value="8">8</button>
          <button type="button" onClick={this.pressButton} value="7">9</button>

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