<script lang="ts" setup>
// * Types
import type { Ref } from 'vue'
import type { Actor } from '@/contracts/actor'
import type { Genre } from '@/contracts/genre'
import type { VideoComment } from '@/contracts/video'
import type { UpdateCommentData } from '@/contracts/event'
import type { Paginate, VideoCommentPayload } from '@/contracts/api'
import type { UnparsedVideo, Video, ListsActions } from '@/contracts/video'
// * Types

import UserService from '@/services/UserService'
import VideoService from '@/services/Video/VideoService'
import VideoCommentService from '@/services/Video/VideoCommentService'
import { useRoute } from 'vue-router'
import { parseVideo } from '@/helpers'
import { RoutesNames } from '@/config/router'
import { DEFAULT_VIDEO } from '@/config/video'
import { onMounted, reactive, ref } from 'vue'
import { DEFAULT_ACTOR } from '@/config/actor'
import { useInfiniteScroll } from '@vueuse/core'
import { useUserData } from '@/store/userDataStore'

// * Components
import List from '@/components/List.vue'
import Icon from '@/components/Icon.vue'
import Link from '@/components/Link.vue'
import Button from '@/components/Button.vue'
import Slider from '@/components/Slider.vue'
import RoomCard from '@/components/RoomCard.vue'
import Comments from '@/components/Comments.vue'
import Accordion from '@/components/Accordion.vue'
import Preloader from '@/components/Preloader.vue'
import ActorCardMini from '@/components/ActorCardMini.vue'
// * Components

const route = useRoute()
const userData = useUserData()

let item: Ref<Video> = ref({ ...DEFAULT_VIDEO })
const isLoaded: Ref<boolean> = ref(false)
const slug: Video['slug'] = route.params.slug as string
const displayGenres: Pick<Genre, "id" | "slug" | "name">[] = reactive([])
const actors: Actor[] = reactive([
  { ...DEFAULT_ACTOR }, { ...DEFAULT_ACTOR }, { ...DEFAULT_ACTOR }, 
  { ...DEFAULT_ACTOR }, { ...DEFAULT_ACTOR }, { ...DEFAULT_ACTOR }, 
  { ...DEFAULT_ACTOR }, { ...DEFAULT_ACTOR }, { ...DEFAULT_ACTOR }, 
  { ...DEFAULT_ACTOR }
])

let page: number = 1
let lastPage: number = 0
let limit: number = 8
const comments: VideoComment[] = reactive([])
const isCommentsLoaded: Ref<boolean> = ref(false)
const isShowShowMoreComments: Ref<boolean> = ref(true)

function parseGenres(): void {
  for (let i = 0; i < item.value.genres!.length; i++) {
    const currentGenre: (Pick<Genre, "id" | "slug" | "name">[])[number] = item.value.genres![i]
    const indexForConditionArrLength: number = i + 1

    if (indexForConditionArrLength < item.value.genres!.length) {
      const displayName: string = `${currentGenre.name}, `
      currentGenre.name = displayName
    }

    displayGenres.push(currentGenre)
  }
}

async function nextPage(): Promise<void> {
  if (page < lastPage) {
    page++
    addNewComments()
  }
}

async function addNewComments(): Promise<void> {
  try {
    const newComments: Paginate<VideoComment> = await VideoCommentService.getComments(item.value.id, { page, limit })

    lastPage = newComments.meta.lastPage
    comments.push(...newComments.data)

    if (page >= lastPage)
      isShowShowMoreComments.value = false
  } catch (_err: any) {}
}

async function wishlistAction(): Promise<void> {
  const wishlistStatus: boolean = item.value.wishlistStatus
  const action: ListsActions = wishlistStatus ? 'delete' : 'add'

  try {
    await UserService.wishlistAction(item.value.id, action)
    item.value.wishlistStatus = !wishlistStatus
  } catch (err: any) {}
}

async function laterListAction(): Promise<void> {
  const laterListStatus: boolean = item.value.laterListStatus
  const action: ListsActions = laterListStatus ? 'delete' : 'add'

  try {
    await UserService.laterListAction(item.value.id, action)
    item.value.laterListStatus = !laterListStatus
  } catch (err: any) {}
}

async function sendComment(description: string): Promise<void> {
  try {
    const newComment: VideoComment = await VideoCommentService.createComment({ 
      description,
      videoId: item.value.id,
    })

    comments.unshift(newComment)
  } catch (_err: any) {}
}

async function updateComment(data: UpdateCommentData): Promise<void> {
  const payload: Omit<VideoCommentPayload, 'userId'> = {
    videoId: item.value.id,
    description: data.description,
  }

  try {
    const { description }: VideoComment = await VideoCommentService.updateComment(data.id, payload)

    const index: number = comments.findIndex((comment: VideoComment) => comment.id == data.id)
    comments[index].description = description
  } catch (_err: any) {}
}

async function deleteComment(id: VideoComment['id']): Promise<void> {
  try {
    await VideoCommentService.deleteComment(id)

    const index: number = comments.findIndex((comment: VideoComment) => comment.id == id)
    comments.splice(index, 1)
  } catch (_err: any) {}
}

onMounted(async () => {
  useInfiniteScroll(window, nextPage, { distance: 10 })

  try {
    const unparsedVideo: UnparsedVideo = await VideoService.get(slug)
    item.value = parseVideo(unparsedVideo)

    parseGenres()
    isLoaded.value = true

    await addNewComments()
    isCommentsLoaded.value = true
  } catch (_err: any) {}
})
</script>

<template>
  <img src="@/assets/Img/franchiseBg.png" class="registerBg actorBg bg"
    uk-scrollspy="cls: uk-animation-fade; delay: 700" alt="">

  <div class="uk-container" uk-scrollspy="cls: uk-animation-scale-down; delay: 100">

    <Preloader v-if="!isLoaded" />
    <div v-else class="content">
      <div class="mb" uk-grid>
        <div class="uk-width-1-3@s">

          <div class="Box Box__lite Box__avatar mb">
            <img class="Box__bg" :src="item.poster" alt="">
          </div>

          <div class="Box">
            <List v-slot="{ classNames, textClassName }">

              <li :class="classNames">
                <span :class="textClassName" class="Font Font__text Font__regular">Age limit: {{ item.ageLimit }}</span>
              </li>
              
              <li :class="classNames">
                <span :class="textClassName" class="Font Font__text Font__regular">Released: {{ item.releasedForUser }}</span>
              </li>
              
              <li :class="classNames">
                <span :class="textClassName" class="Font Font__text Font__regular">Duration: {{ item.duration }}</span>
              </li>
              
              <li :class="classNames">
                <span :class="textClassName" class="Font Font__text Font__regular">Open rooms count: 2</span>
              </li>
              
              <li :class="classNames">
                <span :class="textClassName" class="Font Font__text Font__regular">Country: {{ item.country }}</span>
              </li>
              
              <li :class="classNames">
                <span :class="textClassName" class="Font Font__text Font__regular">Director: <a href="#" class="Link Font Font__text Font__regular transition">Director Name</a></span>
              </li>
              
              <li :class="classNames">
                <span :class="textClassName" class="Font Font__text Font__regular">
                  Genres:
                  <Link v-for="genre in displayGenres" :to="{ name: RoutesNames.GENRE, params: { slug: genre.slug } }">{{ genre.name }}</Link>
                </span>
              </li>
              
              <li :class="classNames">
                <span :class="textClassName" class="Font Font__text Font__regular">IMDB rating: {{ item.rating }}</span>
              </li>

            </List>
          </div>

        </div>

        <div class="uk-width-2-3@s">

          <div class="Box mb video__box">
            <h1 class="Font Font__bold Font__title mb">{{ item.name }}</h1>

            <p class="Font Font__regular Font__text">{{ item.description }}</p>

            <div v-if="userData.user" class="video__lists">
              <button @click="laterListAction" class="video__laterList">
                <Icon v-if="item.laterListStatus" type="CLOCK_SOLID" />
                <Icon v-else type="CLOCK" />
              </button>
              <button @click="wishlistAction" class="video__wishList">
                <Icon v-if="item.wishlistStatus" type="HEART_SOLID" />
                <Icon v-else type="HEART" />
              </button>
            </div>

            <div class="achievementBtns">
              <Button type="anchor">Create room</Button>
            </div>
          </div>

          <div class="Box">
            <h2 class="Font Font__bold Font__title achievementTitle">Actors</h2>

            <Slider 
              :items-count-view="6" 
              :items-count-small-view="4" 
              :items-count-mobile-view="3" 
              :is-with-show-more="false"
            >
              <li class="Slider__li" v-for="item in actors">
                <ActorCardMini :item="item" />
              </li>
            </Slider>
          </div>

        </div>
      </div>

      <div class="images mb">

        <div class="uk-child-width-1-3@s uk-grid-medium" uk-grid>
          <div>
            <div class="Box Box__lite">
              <img :src="item.firstImage" class="Box__bg" alt="">
            </div>
          </div>

          <div>
            <div class="Box Box__lite">
              <img :src="item.secondImage" class="Box__bg" alt="">
            </div>
          </div>

          <div>
            <div class="Box Box__lite">
              <img :src="item.thirdImage" class="Box__bg" alt="">
            </div>
          </div>
        </div>

      </div>

      <div class="trailer mb Box">
        <h1 class="Font Font__title Font__bold">Trailer</h1>

        <video src="" controls></video>
      </div>
      
      <Accordion class="mb">

        <template #title>Rooms</template>

        <template #content>
          <List v-slot="{ classNames }" without-dots>

            <li v-for="_ in 3" :class="classNames">
              <RoomCard :video="item" />
            </li>

          </List>
        </template>

      </Accordion>

      <!-- <div class="watching mb">
        <h1 class="watching__title Font Font__title Font__bold">With this movie is watching</h1>

        <div class="Slider">
          <div uk-slider>

            <div class="uk-position-relative">
              <div class="uk-slider-container">
                <ul class="uk-slider-items uk-child-width-1-4@m uk-child-width-1-3@s uk-child-width-1-2">

                  <li class="Slider__li">
                    <a href="video.html" class="Card">
                      <div class="Card__header">
                        <img src="<%= require('/Src/Img/film.png') %>" class="Card__img transition" alt="">

                        <span class="Card__later transition">
                          <i class="Icon Icon__clock Font__text Card__yellow"></i>
                        </span>

                        <div class="Card__right transition">
                          <span class="Card__wishlist">
                            <i class="Icon Icon__heart Font__text Card__yellow"></i>
                          </span>

                          <span class="Card__ageLimit Font Font__text Font__regular Card__yellow">+16</span>
                        </div>

                        <div class="Card__bottom transition">
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">8,9</span>
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">86 minutes</span>
                        </div>
                      </div>

                      <div class="Card__footer">
                        <span href="video.html" class="Link Card__name Font Font__text Font__regular transition">The last
                          witch hunter</span>
                      </div>
                    </a>
                  </li>

                  <li class="Slider__li">
                    <a href="video.html" class="Card">
                      <div class="Card__header">
                        <img src="<%= require('/Src/Img/film.png') %>" class="Card__img transition" alt="">

                        <span class="Card__later transition">
                          <i class="Icon Icon__clock Font__text Card__yellow"></i>
                        </span>

                        <div class="Card__right transition">
                          <span class="Card__wishlist">
                            <i class="Icon Icon__heart Font__text Card__yellow"></i>
                          </span>

                          <span class="Card__ageLimit Font Font__text Font__regular Card__yellow">+16</span>
                        </div>

                        <div class="Card__bottom transition">
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">8,9</span>
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">86 minutes</span>
                        </div>
                      </div>

                      <div class="Card__footer">
                        <span href="video.html" class="Link Card__name Font Font__text Font__regular transition">The last
                          witch hunter</span>
                      </div>
                    </a>
                  </li>

                  <li class="Slider__li">
                    <a href="video.html" class="Card">
                      <div class="Card__header">
                        <img src="<%= require('/Src/Img/film.png') %>" class="Card__img transition" alt="">

                        <span class="Card__later transition">
                          <i class="Icon Icon__clock Font__text Card__yellow"></i>
                        </span>

                        <div class="Card__right transition">
                          <span class="Card__wishlist">
                            <i class="Icon Icon__heart Font__text Card__yellow"></i>
                          </span>

                          <span class="Card__ageLimit Font Font__text Font__regular Card__yellow">+16</span>
                        </div>

                        <div class="Card__bottom transition">
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">8,9</span>
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">86 minutes</span>
                        </div>
                      </div>

                      <div class="Card__footer">
                        <span href="video.html" class="Link Card__name Font Font__text Font__regular transition">The last
                          witch hunter</span>
                      </div>
                    </a>
                  </li>

                  <li class="Slider__li">
                    <a href="video.html" class="Card">
                      <div class="Card__header">
                        <img src="<%= require('/Src/Img/film.png') %>" class="Card__img transition" alt="">

                        <span class="Card__later transition">
                          <i class="Icon Icon__clock Font__text Card__yellow"></i>
                        </span>

                        <div class="Card__right transition">
                          <span class="Card__wishlist">
                            <i class="Icon Icon__heart Font__text Card__yellow"></i>
                          </span>

                          <span class="Card__ageLimit Font Font__text Font__regular Card__yellow">+16</span>
                        </div>

                        <div class="Card__bottom transition">
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">8,9</span>
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">86 minutes</span>
                        </div>
                      </div>

                      <div class="Card__footer">
                        <span href="video.html" class="Link Card__name Font Font__text Font__regular transition">The last
                          witch hunter</span>
                      </div>
                    </a>
                  </li>

                  <li class="Slider__li">
                    <a href="video.html" class="Card">
                      <div class="Card__header">
                        <img src="<%= require('/Src/Img/film.png') %>" class="Card__img transition" alt="">

                        <span class="Card__later transition">
                          <i class="Icon Icon__clock Font__text Card__yellow"></i>
                        </span>

                        <div class="Card__right transition">
                          <span class="Card__wishlist">
                            <i class="Icon Icon__heart Font__text Card__yellow"></i>
                          </span>

                          <span class="Card__ageLimit Font Font__text Font__regular Card__yellow">+16</span>
                        </div>

                        <div class="Card__bottom transition">
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">8,9</span>
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">86 minutes</span>
                        </div>
                      </div>

                      <div class="Card__footer">
                        <span href="video.html" class="Link Card__name Font Font__text Font__regular transition">The last
                          witch hunter</span>
                      </div>
                    </a>
                  </li>

                  <li class="Slider__li">
                    <a href="video.html" class="Card">
                      <div class="Card__header">
                        <img src="<%= require('/Src/Img/film.png') %>" class="Card__img transition" alt="">

                        <span class="Card__later transition">
                          <i class="Icon Icon__clock Font__text Card__yellow"></i>
                        </span>

                        <div class="Card__right transition">
                          <span class="Card__wishlist">
                            <i class="Icon Icon__heart Font__text Card__yellow"></i>
                          </span>

                          <span class="Card__ageLimit Font Font__text Font__regular Card__yellow">+16</span>
                        </div>

                        <div class="Card__bottom transition">
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">8,9</span>
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">86 minutes</span>
                        </div>
                      </div>

                      <div class="Card__footer">
                        <span href="video.html" class="Link Card__name Font Font__text Font__regular transition">The last
                          witch hunter</span>
                      </div>
                    </a>
                  </li>

                  <li class="Slider__li">
                    <a href="video.html" class="Card">
                      <div class="Card__header">
                        <img src="<%= require('/Src/Img/film.png') %>" class="Card__img transition" alt="">

                        <span class="Card__later transition">
                          <i class="Icon Icon__clock Font__text Card__yellow"></i>
                        </span>

                        <div class="Card__right transition">
                          <span class="Card__wishlist">
                            <i class="Icon Icon__heart Font__text Card__yellow"></i>
                          </span>

                          <span class="Card__ageLimit Font Font__text Font__regular Card__yellow">+16</span>
                        </div>

                        <div class="Card__bottom transition">
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">8,9</span>
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">86 minutes</span>
                        </div>
                      </div>

                      <div class="Card__footer">
                        <span href="video.html" class="Link Card__name Font Font__text Font__regular transition">The last
                          witch hunter</span>
                      </div>
                    </a>
                  </li>

                  <li class="Slider__li">
                    <a href="video.html" class="Card">
                      <div class="Card__header">
                        <img src="<%= require('/Src/Img/film.png') %>" class="Card__img transition" alt="">

                        <span class="Card__later transition">
                          <i class="Icon Icon__clock Font__text Card__yellow"></i>
                        </span>

                        <div class="Card__right transition">
                          <span class="Card__wishlist">
                            <i class="Icon Icon__heart Font__text Card__yellow"></i>
                          </span>

                          <span class="Card__ageLimit Font Font__text Font__regular Card__yellow">+16</span>
                        </div>

                        <div class="Card__bottom transition">
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">8,9</span>
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">86 minutes</span>
                        </div>
                      </div>

                      <div class="Card__footer">
                        <span href="video.html" class="Link Card__name Font Font__text Font__regular transition">The last
                          witch hunter</span>
                      </div>
                    </a>
                  </li>

                  <li class="Slider__li">
                    <a href="video.html" class="Card">
                      <div class="Card__header">
                        <img src="<%= require('/Src/Img/film.png') %>" class="Card__img transition" alt="">

                        <span class="Card__later transition">
                          <i class="Icon Icon__clock Font__text Card__yellow"></i>
                        </span>

                        <div class="Card__right transition">
                          <span class="Card__wishlist">
                            <i class="Icon Icon__heart Font__text Card__yellow"></i>
                          </span>

                          <span class="Card__ageLimit Font Font__text Font__regular Card__yellow">+16</span>
                        </div>

                        <div class="Card__bottom transition">
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">8,9</span>
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">86 minutes</span>
                        </div>
                      </div>

                      <div class="Card__footer">
                        <span href="video.html" class="Link Card__name Font Font__text Font__regular transition">The last
                          witch hunter</span>
                      </div>
                    </a>
                  </li>

                  <li class="Slider__li">
                    <a href="video.html" class="Card">
                      <div class="Card__header">
                        <img src="<%= require('/Src/Img/film.png') %>" class="Card__img transition" alt="">

                        <span class="Card__later transition">
                          <i class="Icon Icon__clock Font__text Card__yellow"></i>
                        </span>

                        <div class="Card__right transition">
                          <span class="Card__wishlist">
                            <i class="Icon Icon__heart Font__text Card__yellow"></i>
                          </span>

                          <span class="Card__ageLimit Font Font__text Font__regular Card__yellow">+16</span>
                        </div>

                        <div class="Card__bottom transition">
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">8,9</span>
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">86 minutes</span>
                        </div>
                      </div>

                      <div class="Card__footer">
                        <span href="video.html" class="Link Card__name Font Font__text Font__regular transition">The last
                          witch hunter</span>
                      </div>
                    </a>
                  </li>

                  <li class="Slider__li">
                    <a href="video.html" class="Card">
                      <div class="Card__header">
                        <img src="<%= require('/Src/Img/film.png') %>" class="Card__img transition" alt="">

                        <span class="Card__later transition">
                          <i class="Icon Icon__clock Font__text Card__yellow"></i>
                        </span>

                        <div class="Card__right transition">
                          <span class="Card__wishlist">
                            <i class="Icon Icon__heart Font__text Card__yellow"></i>
                          </span>

                          <span class="Card__ageLimit Font Font__text Font__regular Card__yellow">+16</span>
                        </div>

                        <div class="Card__bottom transition">
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">8,9</span>
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">86 minutes</span>
                        </div>
                      </div>

                      <div class="Card__footer">
                        <span href="video.html" class="Link Card__name Font Font__text Font__regular transition">The last
                          witch hunter</span>
                      </div>
                    </a>
                  </li>

                  <li class="Slider__li">
                    <a href="video.html" class="Card">
                      <div class="Card__header">
                        <img src="<%= require('/Src/Img/film.png') %>" class="Card__img transition" alt="">

                        <span class="Card__later transition">
                          <i class="Icon Icon__clock Font__text Card__yellow"></i>
                        </span>

                        <div class="Card__right transition">
                          <span class="Card__wishlist">
                            <i class="Icon Icon__heart Font__text Card__yellow"></i>
                          </span>

                          <span class="Card__ageLimit Font Font__text Font__regular Card__yellow">+16</span>
                        </div>

                        <div class="Card__bottom transition">
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">8,9</span>
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">86 minutes</span>
                        </div>
                      </div>

                      <div class="Card__footer">
                        <span href="video.html" class="Link Card__name Font Font__text Font__regular transition">The last
                          witch hunter</span>
                      </div>
                    </a>
                  </li>

                  <li class="Slider__li">
                    <a href="video.html" class="Card">
                      <div class="Card__header">
                        <img src="<%= require('/Src/Img/film.png') %>" class="Card__img transition" alt="">

                        <span class="Card__later transition">
                          <i class="Icon Icon__clock Font__text Card__yellow"></i>
                        </span>

                        <div class="Card__right transition">
                          <span class="Card__wishlist">
                            <i class="Icon Icon__heart Font__text Card__yellow"></i>
                          </span>

                          <span class="Card__ageLimit Font Font__text Font__regular Card__yellow">+16</span>
                        </div>

                        <div class="Card__bottom transition">
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">8,9</span>
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">86 minutes</span>
                        </div>
                      </div>

                      <div class="Card__footer">
                        <span href="video.html" class="Link Card__name Font Font__text Font__regular transition">The last
                          witch hunter</span>
                      </div>
                    </a>
                  </li>

                  <li class="Slider__li">
                    <a href="video.html" class="Card">
                      <div class="Card__header">
                        <img src="<%= require('/Src/Img/film.png') %>" class="Card__img transition" alt="">

                        <span class="Card__later transition">
                          <i class="Icon Icon__clock Font__text Card__yellow"></i>
                        </span>

                        <div class="Card__right transition">
                          <span class="Card__wishlist">
                            <i class="Icon Icon__heart Font__text Card__yellow"></i>
                          </span>

                          <span class="Card__ageLimit Font Font__text Font__regular Card__yellow">+16</span>
                        </div>

                        <div class="Card__bottom transition">
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">8,9</span>
                          <span class="Card__attribute Font Font__regular Font__text Card__yellow">86 minutes</span>
                        </div>
                      </div>

                      <div class="Card__footer">
                        <span href="video.html" class="Link Card__name Font Font__text Font__regular transition">The last
                          witch hunter</span>
                      </div>
                    </a>
                  </li>

                </ul>
              </div>

              <div class="Slider__nav">
                <div class="franchiseActorsNav">
                  <a class="Button transition" href="#" uk-slider-item="previous"><i
                      class="Icon Icon__arrow transition"></i></a>
                  <a class="Button transition" href="#" uk-slider-item="next"><i
                      class="Icon Icon__arrow Icon__arrow__right transition"></i></a>
                </div>

                <button class="Button Font Font__bold Font__text transition">Show more</button>
              </div>
            </div>

          </div>
        </div>
      </div> -->

      <Preloader v-if="!isCommentsLoaded" />
      <Comments
        v-else 
        :comments="comments"
        @send-comment="sendComment" 
        @update-comment="updateComment" 
        @delete-comment="deleteComment" 
      />
    </div>

  </div>
</template>

<style lang="sass" scoped></style>