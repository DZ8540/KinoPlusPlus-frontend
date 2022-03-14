// * Types
import type { AxiosResponse } from 'axios'
import type { Paginate } from '@/contracts/api'
import type { Response } from '@/contracts/response'
import type { ApiSearchData, UnparsedVideo, Video } from '@/contracts/video'
// * Types

import instance from './instance'
import { ROUTES } from '@/config/api'

export async function getVideo(slug: Video['slug']): Promise<AxiosResponse<Response<UnparsedVideo>>> {
  return await instance.post<Response<UnparsedVideo>>(ROUTES.video.item(slug))
}

export async function newest(): Promise<AxiosResponse<Response<UnparsedVideo[]>>> {
  return await instance.post<Response<UnparsedVideo[]>>(ROUTES.video.newest)
}

export async function popular(): Promise<AxiosResponse<Response<UnparsedVideo[]>>> {
  return await instance.post<Response<UnparsedVideo[]>>(ROUTES.video.popular)
}

export async function searchVideo(data: ApiSearchData): Promise<AxiosResponse<Response<Paginate<UnparsedVideo>>>> {
  return await instance.post<Response<Paginate<UnparsedVideo>>>(ROUTES.video.search, data)
}