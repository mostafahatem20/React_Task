export interface Rocket {
  rocket_name: string
  rocket_type: string
}

export interface Launch {
  id: string
  rocket: Rocket
  mission_name: string
  launch_date_local: string
  launch_success: boolean | null
}

export interface launchFilters {
  launch_success?: string
  rocket_name?: string
  rocket_type?: string
}

export interface links {
  wikipedia: string | null
  article_link: string | null
  flickr_images: string[]
}
export interface rocketDetails {
  description: string | null
  wikipedia: string | null
}
export interface launchDetails {
  details: string | null
  links: links
  rocket: {
    rocket: rocketDetails
  }
}
