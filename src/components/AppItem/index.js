// Write your code here
import './index.css'

const AppItem = props => {
  const {eachApp} = props

  return (
    <li className="app-list-item">
      <img src={eachApp.imageUrl} className="app-image" alt={eachApp.appName} />
      <p className="app-name">{eachApp.appName}</p>
    </li>
  )
}

export default AppItem
