import React from 'react'

const Search = React.lazy(() =>
  import('./search').then(({ Search }) => ({ default: Search }))
)

export const Pages = {
  Search
}
