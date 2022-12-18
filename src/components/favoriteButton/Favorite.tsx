import React, { useState } from 'react'
import { StarOutlined, StarFilled } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { FavoriteButtonProps } from '../../interfaces/props.interface'
import { favoriteLaunchesVar } from '../../apollo/State'
import { useReactiveVar } from '@apollo/client'

const Favorite: React.FC<FavoriteButtonProps> = ({ id }) => {
  const favoriteLaunches = useReactiveVar(favoriteLaunchesVar)
  const [openTip, setOpenTip] = useState<boolean>(false)
  return (
    <Tooltip
      title={
        favoriteLaunches.includes(id)
          ? 'Remove from favorites'
          : 'Add to favorites'
      }
      placement="left"
      open={openTip}
    >
      {favoriteLaunches.includes(id) ? (
        <StarFilled
          style={{ color: 'yellow', cursor: 'pointer' }}
          onClick={() => {
            favoriteLaunches.splice(favoriteLaunches.indexOf(id), 1)
            favoriteLaunchesVar([...favoriteLaunches])
          }}
          onMouseEnter={() => {
            setOpenTip(true)
          }}
          onMouseLeave={() => {
            setOpenTip(false)
          }}
          onMouseDown={() => {
            setOpenTip(false)
          }}
        />
      ) : (
        <StarOutlined
          style={{ cursor: 'pointer' }}
          onClick={() => {
            favoriteLaunchesVar([...favoriteLaunches, id])
          }}
          onMouseEnter={() => {
            setOpenTip(true)
          }}
          onMouseLeave={() => {
            setOpenTip(false)
          }}
          onMouseDown={() => {
            setOpenTip(false)
          }}
        />
      )}
    </Tooltip>
  )
}

export default Favorite
