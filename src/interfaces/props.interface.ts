import { CSSProperties } from 'react'

export interface CustomTableProps {
  selectionType: string
}

export interface LaunchDetailsProps {
  launchId: string
  style?: CSSProperties | undefined
}

export interface FavoriteButtonProps {
  id: string
}
