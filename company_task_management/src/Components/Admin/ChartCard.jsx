import React from "react"
import PropTypes from "prop-types"
import { Card, CardContent, Typography } from "@mui/material"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
  Tooltip,
} from "recharts"

function ChartCard({ name, value, color }) {
  // Determine the start and end range
  const calculateRange = (val) => {
    if (val <= 100) {
      return { start: 0, end: 100 }
    } else if (val <= 1000) {
      return { start: 100, end: 1000 }
    } else if (val <= 10000) {
      return { start: 1000, end: 10000 }
    } else if (val <= 100000) {
      return { start: 10000, end: 100000 }
    } else {
      const end = Math.ceil(val / 1000000) * 1000000
      return { start: 200, end }
    }
  }

  const { end } = calculateRange(value)

  // Prepare chart data
  const chartData = [
    { name, value },
    { name: "Remaining", value: end - value },
  ]

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" textAlign="center">
          {name}
        </Typography>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? color : "#f0f0f0"}
                />
              ))}
              <Label
                value={value}
                position="center"
                fill={color}
                style={{ fontSize: "24px" }}
              />
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} out of ${end}`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

ChartCard.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
}

export default ChartCard
