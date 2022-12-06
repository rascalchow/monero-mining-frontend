import { useEffect, useState } from 'react'
import StatsWithAreaChart from '@components/widgets/stats/StatsWithAreaChart'
import { kFormatter } from '@utils'
import { useProfileInfoCtx } from './profileInfoContext'

const LiveTimeStatic = ({ name, icon, color, type }) => {
  const { liveTime } = useProfileInfoCtx()
  if (liveTime.liveTimeStaticInfo) {
    return (
      <StatsWithAreaChart
        icon={icon}
        color={color}
        stats={kFormatter(liveTime?.liveTimeStaticInfo[type]?.count).toString()}
        statTitle={name}
        series={[
          {
            name: 'Live Time',
            data: liveTime?.liveTimeStaticInfo[type]?.data,
          },
        ]}
        type="area"
      />
    )
  }
  return null
}

export default LiveTimeStatic
