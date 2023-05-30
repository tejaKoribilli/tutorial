// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGender} = props

  return (
    <>
      <PieChart width={1000} height={300}>
        <Pie
          cx="70%"
          cy="40%"
          data={vaccinationByGender}
          startAngle={0}
          endAngle={180}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name={vaccinationByGender[0].gender} fill="#f54394" />
          <Cell name={vaccinationByGender[1].gender} fill="#5a8dee" />
          <Cell name={vaccinationByGender[2].gender} fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="middle"
          align="left"
        />
      </PieChart>
    </>
  )
}

export default VaccinationByGender
