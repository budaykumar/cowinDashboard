import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {VaccinationByAgeDetails} = props

  return (
    <div className="vaccAgeCon">
      <h1>Vaccination by Age</h1>
      <PieChart width={1000} height={300}>
        <Pie
          data={VaccinationByAgeDetails}
          cx="50%"
          cy="30%"
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64C2A6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
