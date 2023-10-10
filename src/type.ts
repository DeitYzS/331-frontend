export interface EventItem {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  organizer: OrganizerItem
  images: string[]
}

export interface OrganizerItem {
  id: number
  name: string
  address: string
  images: string[]
  roles: string[]
}
