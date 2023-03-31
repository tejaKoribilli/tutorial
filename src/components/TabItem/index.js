// Write your code here
import './index.css'

const TabItem = props => {
  const {eachTab, onChangeCategory, isActive} = props

  const tabClass = isActive ? 'list-active-item' : 'list-item'
  const lineClass = isActive ? 'active-line' : 'horizontal-line'

  const onChangeTabItem = () => {
    onChangeCategory(eachTab.tabId)
  }

  return (
    <li className={tabClass} onClick={onChangeTabItem}>
      <button type="button" className="list-btn">
        <p>{eachTab.displayText}</p>
        <hr className={lineClass} />
      </button>
    </li>
  )
}

export default TabItem
