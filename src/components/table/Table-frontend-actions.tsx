import React, { useState, useEffect, useCallback } from 'react'
import { Table } from 'antd'
import type { TableProps } from 'antd/es/table'
import { Launch } from '../../interfaces/launches.interface'
import {
  useGetPastLaunches,
  useGetUpcomingLaunches,
} from '../../hooks/launches/useGetLaunches'
import { CustomTableProps } from '../../interfaces/props.interface'
import LaunchDetails from '../launchDetails/LaunchDetails'
import { columns } from './Columns'
import { favoriteLaunchesVar } from '../../apollo/State'
import { useReactiveVar } from '@apollo/client'

const onChange: TableProps<Launch>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log('params', pagination, filters, sorter, extra)
}

const CustomTable: React.FC<CustomTableProps> = ({ selectionType }) => {
  const favoriteLaunches = useReactiveVar(favoriteLaunchesVar)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const pastLaunches = useGetPastLaunches()
  const upcomingLaunches = useGetUpcomingLaunches()
  useEffect(() => {
    setIsLoading(
      selectionType === 'past' ? pastLaunches.loading : upcomingLaunches.loading
    )
  }, [pastLaunches.loading, upcomingLaunches.loading, selectionType])

  const persistFavoriteLaunches = useCallback(() => {
    localStorage.setItem('favoriteLaunches', JSON.stringify(favoriteLaunches))
  }, [favoriteLaunches])

  useEffect(() => {
    persistFavoriteLaunches()
  })

  return (
    <Table
      key={selectionType}
      loading={isLoading}
      rowKey={(record) => record.id || record.mission_name}
      columns={
        selectionType === 'past'
          ? columns
          : columns.filter((column) => column.key !== 'launch_success')
      }
      dataSource={
        selectionType === 'past'
          ? pastLaunches?.data
            ? [...pastLaunches?.data?.launchesPastResult.data].sort((a, b) =>
                favoriteLaunches.includes(a.id) &&
                !favoriteLaunches.includes(b.id)
                  ? -1
                  : !favoriteLaunches.includes(a.id) &&
                    favoriteLaunches.includes(b.id)
                  ? 1
                  : 0
              )
            : []
          : upcomingLaunches?.data
          ? [...upcomingLaunches?.data?.launchesUpcoming].sort((a, b) =>
              favoriteLaunches.includes(a.mission_name) &&
              !favoriteLaunches.includes(b.mission_name)
                ? -1
                : !favoriteLaunches.includes(a.mission_name) &&
                  favoriteLaunches.includes(b.mission_name)
                ? 1
                : 0
            )
          : []
      }
      onChange={onChange}
      expandable={{
        expandedRowRender: (record) => (
          <LaunchDetails
            launchId={record.id || record.mission_name}
            style={{ margin: 0 }}
          />
        ),
      }}
    />
  )
}

export default CustomTable
