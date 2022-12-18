import type { ColumnsType } from 'antd/es/table'
import { Launch } from '../../interfaces/launches.interface'
import moment from 'moment'
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import { Tooltip } from 'antd'
import Favorite from '../favoriteButton/Favorite'

export const columns: ColumnsType<Launch> = [
  {
    title: 'Mission Name',
    dataIndex: 'mission_name',
    key: 'mission_name',
  },
  {
    title: 'Rocket Name',
    dataIndex: ['rocket', 'rocket_name'],
    key: 'rocket.rocket_name',
    filters: [
      {
        text: 'Falcon 9',
        value: 'Falcon 9',
      },
      {
        text: 'Falcon 1',
        value: 'Falcon 1',
      },
      {
        text: 'Falcon Heavy',
        value: 'Falcon Heavy',
      },
    ],
    onFilter: (value, { rocket: { rocket_name } }) => rocket_name === value,
    filterSearch: true,
  },
  {
    title: 'Rocket Type',
    dataIndex: ['rocket', 'rocket_type'],
    key: 'rocket.rocket_type',
    filters: [
      {
        text: 'v1.1',
        value: 'v1.1',
      },
      {
        text: 'FT',
        value: 'FT',
      },
      {
        text: 'v1.0',
        value: 'v1.0',
      },
      {
        text: 'Merlin A',
        value: 'Merlin A',
      },
      {
        text: 'Merlin C',
        value: 'Merlin C',
      },
    ],
    onFilter: (value, { rocket: { rocket_type } }) => rocket_type === value,
    filterSearch: true,
  },

  {
    title: 'Launch Date',
    dataIndex: 'launch_date_local',
    key: 'launch_date_local',
    render: (launchDate) => moment(launchDate).format('lll'),
    sorter: (a, b) => moment(a.launch_date_local).diff(b.launch_date_local),
  },
  {
    title: 'Launch Success',
    dataIndex: 'launch_success',
    key: 'launch_success',
    render: (launchSuccess) =>
      launchSuccess ? (
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      ) : (
        <Tooltip
          title={launchSuccess === null ? 'Not defined' : 'Launch failed'}
          placement="top"
        >
          <CloseCircleTwoTone twoToneColor="#FF0000" />
        </Tooltip>
      ),
    align: 'center',
    filters: [
      {
        text: 'Succeeded',
        value: true,
      },
      {
        text: 'Failed',
        value: false,
      },
    ],
    onFilter: (value, { launch_success }) => launch_success === value,
    filterSearch: true,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, { id, mission_name }) => <Favorite id={id || mission_name} />,
    align: 'center',
  },
]
