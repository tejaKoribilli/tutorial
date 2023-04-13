// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {transactionTypeOptions, income, expenses} = props

  const balanceAmount = income - expenses

  return (
    <div className="moneyDetails-container">
      <div className="transaction-container">
        <img
          className="transaction-icon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
        />
        <div className="transaction-info-container">
          <p className="transaction-type">Your Balance</p>
          <p className="transaction-amount" data-testid="balanceAmount">
            Rs {balanceAmount}
          </p>
        </div>
      </div>
      <div className="transaction-container income-container">
        <img
          className="transaction-icon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
        />
        <div className="transaction-info-container">
          <p className="transaction-type">Your Income</p>
          <p className="transaction-amount" data-testid="incomeAmount">
            Rs {income}
          </p>
        </div>
      </div>
      <div className="transaction-container expense-container">
        <img
          className="transaction-icon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
        />
        <div className="transaction-info-container">
          <p className="transaction-type">Your Expenses</p>
          <p className="transaction-amount" data-testid="expensesAmount">
            Rs {expenses}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
