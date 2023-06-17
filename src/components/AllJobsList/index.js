import JobsCard from '../JobsCard'

import './index.css'

const AllJobsList = props => {
  const {jobsList} = props

  return (
    <>
      <ul className="renderAllJobsList-container">
        {jobsList.map(each => (
          <JobsCard each={each} key={each.id} />
        ))}
      </ul>
    </>
  )
}

export default AllJobsList
