export * from './data'
export * from './naive'

export interface Pagination {
  category: string
  current_page: number
  has_next: boolean
  has_pre: boolean
  total_pages: number
}

export interface UserInfo {
  email: string
  password: string
}
