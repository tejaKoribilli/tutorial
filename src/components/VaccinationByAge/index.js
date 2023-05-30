// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAge} = props

  return (
    <>
      <PieChart width={1000} height={300}>
        <Pie
          cx="70%"
          cy="40%"
          data={vaccinationByAge}
          startAngle={0}
          endAngle={360}
          innerRadius="0%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name={vaccinationByAge[0].age} fill=" #2d87bb" />
          <Cell name={vaccinationByAge[1].age} fill="#a3df9f" />
          <Cell name={vaccinationByAge[2].age} fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="middle"
          align="middle"
        />
      </PieChart>
    </>
  )
}

export default VaccinationByAge
