import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const LinearChart = props => {
  const {quarterCommitCount} = props
  //   console.log(quarterCommitCount)
  const data = quarterCommitCount
  const options = {
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Grid line color
        },
        ticks: {
          color: '#ffffff', // X-axis label color
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Grid line color
        },
        ticks: {
          color: '#ffffff', // Y-axis label color
        },
      },
    },
  }
  return (
    <ResponsiveContainer>
      <LineChart
        data={data}
        width={330}
        height={300}
        margin={{
          top: 5,
          right: 100,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type=""
          dataKey="commits"
          // label="Commits per repo"
          stroke="rgba(59, 130, 246, 1)"
          strokeWidth={2}
          dot={{fill: '#3B82F6', r: 3}}
          activeDot={{r: 8}}
          options={options}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LinearChart
