  export type List = ContinueMovie[]

  export interface ContinueMovie {
    _id: string
    userId: string
    movieId: string
    name: string
    poster: string
    slug: string
    currentEpisode: string
    quality: string
    language: string
    year: string
    listType: string
    totalUploadEpisodes: number
    clickedEpisode: number
    process: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  