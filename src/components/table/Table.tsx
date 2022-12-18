import React, { useState, useEffect, useCallback } from 'react'
import { Table } from 'antd'
import type { TableProps } from 'antd/es/table'
import { Launch, launchFilters } from '../../interfaces/launches.interface'
import {
  useGetPastLaunches,
  useGetUpcomingLaunches,
} from '../../hooks/launches/useGetLaunches'
import { CustomTableProps } from '../../interfaces/props.interface'
import LaunchDetails from '../launchDetails/LaunchDetails'
import { PAGE_SIZE } from '../../constants/constants'
import type { SorterResult } from 'antd/es/table/interface'
import { columns } from './Columns'
import { favoriteLaunchesVar } from '../../apollo/State'
import { useReactiveVar } from '@apollo/client'

const CustomTable: React.FC<CustomTableProps> = ({ selectionType }) => {
  const favoriteLaunches = useReactiveVar(favoriteLaunchesVar)
  const [sort, setSort] = useState<string>('')
  const [filter, setFilter] = useState<launchFilters>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const pastLaunches = useGetPastLaunches(
    PAGE_SIZE,
    (pageIndex - 1) * PAGE_SIZE,
    sort,
    filter
  )
  const upcomingLaunches = useGetUpcomingLaunches(PAGE_SIZE, sort, filter)
  useEffect(() => {
    setIsLoading(
      selectionType === 'past' ? pastLaunches.loading : upcomingLaunches.loading
    )
  }, [pastLaunches.loading, upcomingLaunches.loading, selectionType])

  useEffect(() => {
    setPageIndex(1)
    setSort('')
    setFilter({})
  }, [selectionType])

  const persistFavoriteLaunches = useCallback(() => {
    localStorage.setItem('favoriteLaunches', JSON.stringify(favoriteLaunches))
  }, [favoriteLaunches])

  useEffect(() => {
    persistFavoriteLaunches()
  })

  const onChange: TableProps<Launch>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra)
    const { order, field } = sorter as SorterResult<Launch>
    if (field)
      setSort(
        order === 'ascend' ? `${field}` : order === 'descend' ? `!${field}` : ''
      )
    let newFilters = Object.fromEntries(
      Object.entries(filters)
        .filter(([_, v]) => v != null)
        .map(([k, v]) => [
          k.split('.').length > 1 ? k.split('.')[1] : k,
          v?.join('|'),
        ])
    )
    // https://github.com/SpaceXLand/api/issues/237
    // Due to this issue launch_success can't be filtered on backend as true === 'true' will always evaluate to false to empty launches will be sent back
    // And I launch_success field in find can't take boolean value but expects string value
    // in this case launch_success filter will work per page on frontend as I request page by page from backend
    delete newFilters.launch_success
    setFilter(newFilters)
  }
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
      // Favorites prioritization also occurs on page basis as find option in the api doesn't work with ID too.
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
      pagination={{
        pageSize: PAGE_SIZE,
        current: pageIndex,
        total:
          selectionType === 'past'
            ? pastLaunches?.data?.launchesPastResult.result.totalCount
            : PAGE_SIZE,
        showSizeChanger: false,
        onChange: (page) => {
          setPageIndex(page)
        },
      }}
    />
  )
}

export default CustomTable
