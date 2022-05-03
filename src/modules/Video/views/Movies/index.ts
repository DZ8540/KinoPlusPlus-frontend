// * Types
import type { AxiosResponse } from 'axios'
import type { Paginate } from '@/contracts/api'
import type { Response } from '@/contracts/response'
import type { MainPageGenre, UnparsedVideo } from '@/contracts/video'
// * Types

import Logger from '@/assets/vendor/Logger'
// import { checkQuery } from '@/helpers'
import { showOnMainPage } from '@/api/genre'
import { useUserData } from '@/store/userDataStore'
import { newest, popular, searchVideo } from '@/api/video'

const userData = useUserData()

export default class {
  public async getNewest(): Promise<UnparsedVideo[]> {
    try {
      const query: AxiosResponse<Response<UnparsedVideo[]>> = await newest(userData.user?.id)
      // checkQuery(query)

      return query.data.body!
    } catch (err: any) {
      throw Logger.error(err)
    }
  }

  public async getPopular(): Promise<UnparsedVideo[]> {
    try {
      const query: AxiosResponse<Response<UnparsedVideo[]>> = await popular(userData.user?.id)
      // checkQuery(query)
      
      return query.data.body!
    } catch (err: any) {
      throw Logger.error(err)
    }
  }

  public async getAllGenres(): Promise<MainPageGenre[]> {
    const genres: MainPageGenre[] = []

    try {
      const query = await showOnMainPage()

      for (const genre of query.data.body!) {
        const genreData: MainPageGenre = {
          title: genre.name,
          videos: [],
        }

        const videosQuery: AxiosResponse<Response<Paginate<UnparsedVideo>>> = await searchVideo({ genres: [ genre.id ], page: 1 }, userData.user?.id)
        // checkQuery(videosQuery)

        genreData.videos = videosQuery.data.body!.data
        genres.push(genreData)
      }

      return genres
    } catch (err: any) {
      throw Logger.error(err)
    }
  }
}