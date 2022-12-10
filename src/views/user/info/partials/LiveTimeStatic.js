import { useEffect, useState } from 'react'
import StatsWithAreaChart from '@components/widgets/stats/StatsWithAreaChart'
import { kFormatter } from '@utils'
import { useProfileInfoCtx } from '@context/user/profileInfoContext'

const LiveTimeStatic = ({ name, icon, color, type }) => {
  const { liveTime } = useProfileInfoCtx()
  console.log(liveTime)
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
