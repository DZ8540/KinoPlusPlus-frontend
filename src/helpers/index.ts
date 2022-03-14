// * Types
import type { AxiosResponse } from 'axios'
// * Types

export function checkQuery(query: AxiosResponse): void {
  if ((query.data.status != 200) && !query.data.body)
    throw new Error('Error from checkQuery helper!')
}