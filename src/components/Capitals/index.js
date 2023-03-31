import {Component} from 'react'
import './index.css'

const countryAndCapitalsList = [
  {
    id: 'NEW_DELHI',
    capitalDisplayText: 'New Delhi',
    country: 'India',
  },
  {
    id: 'LONDON',
    capitalDisplayText: 'London',
    country: 'United Kingdom',
  },
  {
    id: 'PARIS',
    capitalDisplayText: 'Paris',
    country: 'France',
  },
  {
    id: 'KATHMANDU',
    capitalDisplayText: 'Kathmandu',
    country: 'Nepal',
  },
  {
    id: 'HELSINKI',
    capitalDisplayText: 'Helsinki',
    country: 'Finland',
  },
]

// Write your code here

class Capitals extends Component {
  state = {country: 'India', selectedValue: 'NEW_DELHI'}

  onDropdownChange = event => {
    const dropDown = event.target.value

    const countryName = countryAndCapitalsList.filter(each =>
      each.id.includes(dropDown),
    )
    this.setState({
      country: countryName[0].country,
      selectedValue: countryName[0].id,
    })
  }

  render() {
    const {country, selectedValue} = this.state

    return (
      <div className="bg-container">
        <div className="main-container">
          <h1>Countries And Capitals</h1>
          <div className="label-dropdown">
            <select
              name="capitals"
              className="dropdown"
              value={selectedValue}
              onChange={this.onDropdownChange}
            >
              {countryAndCapitalsList.map(each => (
                <option key={each.id} value={each.id} id={each.id} selected>
                  {each.capitalDisplayText}
                </option>
              ))}
            </select>
            <p className="label-content">is capital of which country?</p>
          </div>
          <h1 className="country-name">{country}</h1>
        </div>
      </div>
    )
  }
}

export default Capitals
