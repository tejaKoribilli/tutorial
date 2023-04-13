// Write your code here
import './index.css'

const TransactionItem = props => {
  const {eachTransaction, deleteHistory} = props
  const {id, title, amount, type, income, expenses} = eachTransaction

  const onDeleteTransaction = () => {
    deleteHistory(id, type, income, expenses, amount)
  }

  return (
    <li className="list-item">
      <p className="column-ele">{title}</p>
      <p className="column-ele">{amount}</p>
      <p className="column-ele">{type}</p>
      <button
        type="button"
        className="delete-btn"
        onClick={onDeleteTransaction}
        data-testid="delete"
      >
        <img
          alt="delete"
          className="delete-image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
        />
      </button>
    </li>
  )
}

export default TransactionItem
