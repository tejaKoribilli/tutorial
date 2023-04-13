import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class moneyManager extends Component {
  state = {
    historyList: [],
    title: '',
    amount: '',
    type: 'Income',
    income: 0,
    expenses: 0,
  }

  deleteHistory = (id, type, income, expenses, amount) => {
    this.setState(prevState => ({
      historyList: prevState.historyList.filter(each => id !== each.id),
    }))

    const numAmount = parseInt(amount)

    if (type === 'Income') {
      this.setState(prevState => ({income: prevState.income - numAmount}))
    } else {
      this.setState(prevState => ({expenses: prevState.expenses - numAmount}))
    }
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  addTransactionTohistory = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const newHistory = {
      id: uuidv4(),
      title,
      amount,
      type,
    }

    this.setState(prevState => ({
      historyList: [...prevState.historyList, newHistory],
      title: '',
      amount: '',
      type: '',
    }))

    const numAmount = parseInt(amount)

    if (type === 'Income') {
      this.setState(prevState => ({income: prevState.income + numAmount}))
    } else {
      this.setState(prevState => ({expenses: prevState.expenses + numAmount}))
    }
  }

  render() {
    const {historyList, title, amount, type, income, expenses} = this.state

    return (
      <div className="bg-container">
        <div className="top-container">
          <h1 className="richard-name">Hi, Richard</h1>
          <p className="top-container-msg">
            welcome back to your
            <span className="money-manager">Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          transactionTypeOptions={transactionTypeOptions}
          income={income}
          expenses={expenses}
        />
        <div className="bottom-container">
          <div className="add-transaction-container">
            <h1 className="add-transaction-heading">Add Transaction</h1>
            <form
              className="form-container"
              onSubmit={this.addTransactionTohistory}
            >
              <label htmlFor="title" className="label-text">
                TITLE
              </label>
              <input
                id="title"
                className="input-feild"
                placeholder="TITLE"
                type="text"
                value={title}
                onChange={this.onChangeTitle}
              />

              <label htmlFor="amount" className="label-text">
                AMOUNT
              </label>
              <input
                id="amount"
                className="input-feild"
                placeholder="AMOUNT"
                type="text"
                value={amount}
                onChange={this.onChangeAmount}
              />

              <label htmlFor="type" className="label-text">
                TYPE
              </label>
              <select
                id="type"
                className="input-feild"
                value={type}
                onChange={this.onChangeType}
              >
                <option value="Income" selected>
                  Income
                </option>
                <option value="Expenses">Expenses</option>
              </select>

              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
          </div>

          <div className="history-container">
            <h1 className="history-heading">History</h1>
            <div className="column-name-container">
              <p className="column-name title-column">Title</p>
              <p className="column-name amount-column">Amount</p>
              <p className="column-name type-column">Type</p>
            </div>
            <ul className="list-container">
              {historyList.map(eachTransaction => (
                <TransactionItem
                  eachTransaction={eachTransaction}
                  key={eachTransaction.id}
                  deleteHistory={this.deleteHistory}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default moneyManager
