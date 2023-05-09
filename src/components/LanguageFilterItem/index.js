// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguage, activeTabChange, isactive} = props
  const {language, id} = eachLanguage
  const tabClassname = isactive ? 'active-tab' : 'inactive-tab'

  const onChangeTab = () => {
    activeTabChange(id)
  }

  return (
    <li onClick={onChangeTab}>
      <button className={tabClassname} type="button">
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
