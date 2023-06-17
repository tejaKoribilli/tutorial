import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroup = props => {
  const renderTypeOfEmployee = () => {
    const {empTypeList, addselectEmpTypeList} = props

    return (
      <div className="renderTypeOfEmployee-container">
        <h1 className="employee-type-heading">Type Of Employment</h1>
        <ul className="employeeType-list-container">
          {employmentTypesList.map(each => {
            const activeEmpType = empTypeList.includes(each.employmentTypeId)

            const onSelectEmpType = () => {
              addselectEmpTypeList(each.employmentTypeId)
            }

            return (
              <li
                key={each.employmentTypeId}
                className="employee-type-list-item"
              >
                <input
                  type="checkbox"
                  id={each.employmentTypeId}
                  onChange={onSelectEmpType}
                  checked={activeEmpType}
                />
                <label
                  htmlFor={each.employmentTypeId}
                  className="employee-type-label"
                >
                  {each.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const renderSalaryRange = () => {
    const {activeSalaryTab, selectSalaryRange} = props

    return (
      <div className="renderTypeOfEmployee-container">
        <h1 className="employee-type-heading">Salary Range</h1>
        <ul className="employeeType-list-container">
          {salaryRangesList.map(each => {
            const activeTab = activeSalaryTab === each.salaryRangeId

            const onSelectSalaryRange = () => {
              selectSalaryRange(each.salaryRangeId)
            }

            return (
              <li key={each.salaryRangeId} className="employee-type-list-item">
                <input
                  name="salaryRange"
                  type="radio"
                  id={each.salaryRangeId}
                  checked={activeTab}
                  onChange={onSelectSalaryRange}
                />
                <label
                  htmlFor={each.salaryRangeId}
                  className="employee-type-label"
                >
                  {each.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div>
      {renderTypeOfEmployee()}
      <hr />
      {renderSalaryRange()}
    </div>
  )
}

export default FilterGroup
