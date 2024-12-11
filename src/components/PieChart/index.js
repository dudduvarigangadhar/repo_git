// import React from 'react'
import {PieChart, Pie, ResponsiveContainer, Cell, Legend} from 'recharts'

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28']
const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  'purple',
  'Pink',
  'Orange',
  'red',
]

export default function Piechart(props) {
  const legend = props
  const data = legend.languages
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          startAngle={0}
          endAngle={360}
          // labelLine={false}
          // label={renderCustomizedLabel}
          innerRadius="40%" // Adjust for the size of the hole
          outerRadius="70%" // Adjust for the thickness
          // fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={data.name + data.value}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Legend
          iconType="square"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
