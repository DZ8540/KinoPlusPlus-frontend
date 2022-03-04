import instance from './instance'
import { ROUTES } from '@/config/api'
import type { AxiosResponse } from 'axios'
import type { Response } from '@/contracts/response'
import type { UnparsedVideo, Video } from '@/contracts/video'

export async function getVideo(slug: Video['slug']): Promise<AxiosResponse<Response<UnparsedVideo>>> {
  return await instance.post<Response<UnparsedVideo>>(ROUTES.video.item(slug))
}

export async function newest(): Promise<AxiosResponse<Response<UnparsedVideo[]>>> {
  return await instance.post<Response<UnparsedVideo[]>>(ROUTES.video.newest)
}

export async function popular(): Promise<AxiosResponse<Response<UnparsedVideo[]>>> {
  return await instance.post<Response<UnparsedVideo[]>>(ROUTES.video.popular)
}