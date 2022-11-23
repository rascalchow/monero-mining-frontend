import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
import moment from 'moment'
import DataTable from '@components/data-table'
import { getDeviceList } from './store/action'
export const columns = [
  {
    name: 'Device',
    minWidth: '180px',
    sortable: true,
    cell: (row) => row.userKey,
  },
  {
    name: 'Status',
    minWidth: '220px',
    sortable: true,
    cell: (row) => row.status,
  },
  {
    name: 'Installed at',
    minWidth: '220px',
    sortable: true,
    cell: (row) => moment(row.installedAt).format('YYYY/MM/DD - HH:mm::SS'),
  },

  {
    name: 'Uninstalled at',
    minWidth: '220px',
    sortable: true,
    cell: (row) => row.uninstalledAt,
  },
]

const DeviceListCard = () => {
  const dispatch = useDispatch()
  const deviceList = useSelector(
    (state) => state.dashboard.publisher.deviceList,
  )
  useEffect(() => {
    dispatch(getDeviceList())
  }, [])
  return (
    <Card>
      <CardHeader>
        <CardTitle>Installed Devices</CardTitle>
      </CardHeader>
      <CardBody>
        <DataTable
          data={deviceList.data}
          columns={columns}
          isLoading={deviceList.isLoading}
        />
      </CardBody>
    </Card>
  )
}

export default DeviceListCard
