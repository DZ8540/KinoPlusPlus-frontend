<script lang="ts" setup>
// * Types
import type { Video } from '@/contracts/video'
// * Types

import State from './index'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { DEFAULT_ACTOR } from '@/config/actor'

// * Components
import Button from '@/components/Button.vue'
import List from '@/components/List/List.vue'
import Icon from '@/components/Icon/Icon.vue'
import Link from '@/components/Link/Link.vue'
import RoomCard from '@/components/RoomCard.vue'
import Accordion from '@/components/Accordion.vue'
import Preloader from '@/components/Preloader.vue'
import Slider from '@/components/Slider/Slider.vue'
import ActorCardMini from '@/components/ActorCardMini/ActorCardMini.vue'
// * Components

const state = new State()
const route = useRoute()

const slug: Video['slug'] = route.params.slug as string

onMounted(async () => {
  state.getItem(slug)

  state.setActors([
    { ...DEFAULT_ACTOR }, { ...DEFAULT_ACTOR }, { ...DEFAULT_ACTOR }, 
    { ...DEFAULT_ACTOR }, { ...DEFAULT_ACTOR }, { ...DEFAULT_ACTOR }, 
    { ...DEFAULT_ACTOR }, { ...DEFAULT_ACTOR }, { ...DEFAULT_ACTOR }, 
    { ...DEFAULT_ACTOR }
  ])
})
</script>

<template>
  <img src="@/assets/Img/franchiseBg.png" class="registerBg actorBg bg"
    uk-scrollspy="cls: uk-animation-fade; delay: 700" alt="">

  <div class="uk-container" uk-scrollspy="cls: uk-animation-scale-down; delay: 100">

    <Preloader v-if="state.isLoaded.value" />
    <div v-else class="content">
      <div class="mb" uk-grid>
        <div class="uk-width-1-3@s">

          <div class="Box Box__lite Box__avatar mb">
            <img class="Box__bg" :src="state.item.posterForUser" alt="">
          </div>

          <div class="Box">
            <List v-slot="{ classNames }">

              <li :class="classNames">
                <span class="List__text Font Font__text Font__regular">Age limit: {{ state.item.ageLimit }}</span>
              </li>
              
              <li :class="classNames">
                <span class="List__text Font Font__text Font__regular">Released: {{ state.item.releasedForUser }}</span>
              </li>
              
              <li :class="classNames">
                <span class="List__text Font Font__text Font__regular">Duration: {{ state.item.duration }}</span>
              </li>
              
              <li :class="classNames">
                <span class="List__text Font Font__text Font__regular">Open rooms count: 2</span>
              </li>
              
              <li :class="classNames">
                <span class="List__text Font Font__text Font__regular">Country: {{ state.item.country }}</span>
              </li>
              
              <li :class="classNames">
                <span class="List__text Font Font__text Font__regular">Director: <a href="#" class="Link Font Font__text Font__regular transition">Director Name</a></span>
              </li>
              
              <li :class="classNames">
                <span class="List__text Font Font__text Font__regular">
                  Genres:
                  <Link v-for="genre in state.displayGenres" :to="{ name: 'genre', params: { slug: genre.slug } }">{{ genre.name }}</Link>
                </span>
              </li>
              
              <li :class="classNames">
                <span class="List__text Font Font__text Font__regular">IMDB rating: {{ state.item.rating }}</span>
              </li>

            </List>
          </div>

        </div>

        <div class="uk-width-2-3@s">

          <div class="Box mb video__box">
            <h1 class="Font Font__bold Font__title mb">{{ state.item.name }}</h1>

            <p class="Font Font__regular Font__text">{{ state.item.description }}</p>

            <div class="video__lists">
              <button class="video__laterList">
                <Icon type="CLOCK" />
              </button>
              <button class="video__wishList">
                <Icon type="HEART" />
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
              <li class="Slider__li" v-for="item in state.actors">
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
              <img :src="state.item.firstImageForUser" class="Box__bg" alt="">
            </div>
          </div>

          <div>
            <div class="Box Box__lite">
              <img :src="state.item.secondImageForUser" class="Box__bg" alt="">
            </div>
          </div>

          <div>
            <div class="Box Box__lite">
              <img :src="state.item.thirdImageForUser" class="Box__bg" alt="">
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

            <li v-for="item in 3" :class="classNames">
              <RoomCard :video="state.item" />
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
      </div>

      <div class="Comments">

        <h1 class="Comments__title Font Font__bold Font__title">Comments</h1>

        <div class="Box mb">
          <div class="Rating mb" data-name="Rating component">
            <input type="hidden" name="" data-id="input" value="">

            <button class="Rating__star" data-value="5">
              <i class="Font__text Icon Icon__star Rating__icon Rating__icon--default"></i>
              <i class="Font__text Icon Icon__star--solid Rating__icon Rating__icon--active"></i>
            </button>

            <button class="Rating__star" data-value="4">
              <i class="Font__text Icon Icon__star Rating__icon Rating__icon--default"></i>
              <i class="Font__text Icon Icon__star--solid Rating__icon Rating__icon--active"></i>
            </button>

            <button class="Rating__star" data-value="3">
              <i class="Font__text Icon Icon__star Rating__icon Rating__icon--default"></i>
              <i class="Font__text Icon Icon__star--solid Rating__icon Rating__icon--active"></i>
            </button>

            <button class="Rating__star" data-value="2">
              <i class="Font__text Icon Icon__star Rating__icon Rating__icon--default"></i>
              <i class="Font__text Icon Icon__star--solid Rating__icon Rating__icon--active"></i>
            </button>

            <button class="Rating__star" data-value="1">
              <i class="Font__text Icon Icon__star Rating__icon Rating__icon--default"></i>
              <i class="Font__text Icon Icon__star--solid Rating__icon Rating__icon--active"></i>
            </button>

          </div>

          <div class="Textarea">
            <textarea class="Textarea__textarea transition Font Font__regular Font__text" name="" id="" rows="8"
              placeholder="Your comment"></textarea>
            <div class="Textarea__info">
              <span
                class="Textarea__error transition Textarea__error--active Font Font__regular Font__text Font__error">Text
                error</span>
              <span class="Font Font__regular Font__mini Textarea__symbols">0/256</span>
            </div>
          </div>

          <button class="Comments__btn Button Font Font__bold Font__text transition">Send</button>
        </div>

        <div class="Box mb">

          <div class="Message">
            <div class="Message__header">
              <div>
                <img src="<%= require('/Src/Img/actor.jpg') %>" class="Message__avatar" alt="">
              </div>

              <div class="Message__user">
                <a href="profile.html" class="Message__name Font Font__text Font__regular Link transition">Jensen
                  Ackles</a>
                <span class="Message__time Font Font__mini Font__regular">At 16:04</span>
              </div>
            </div>

            <div class="Message__footer">
              <p class="Message__text Font Font__regular Font__text">Значимость этих проблем настолько очевидна, что
                современная методология разработки обеспечивает широкому кругу (специалистов) участие в формировании новых
                предложений. Внезапно, представители современных социальных резервов, которые представляют собой яркий
                пример континентально-европейского типа политической культуры, будут описаны максимально подробно.
                Банальные, но неопровержимые выводы, а также действия представителей оппозиции будут преданы
                социально-демократической анафеме.</p>
            </div>
          </div>

        </div>

        <div class="Box mb">

          <div class="Message">
            <div class="Message__header">
              <div>
                <img src="<%= require('/Src/Img/actor.jpg') %>" class="Message__avatar" alt="">
              </div>

              <div class="Message__user">
                <a href="profile.html" class="Message__name Font Font__text Font__regular Link transition">Jensen
                  Ackles</a>
                <span class="Message__time Font Font__mini Font__regular">At 16:04</span>
              </div>
            </div>

            <div class="Message__footer">
              <p class="Message__text Font Font__regular Font__text">Значимость этих проблем настолько очевидна, что
                современная методология разработки обеспечивает широкому кругу (специалистов) участие в формировании новых
                предложений. Внезапно, представители современных социальных резервов, которые представляют собой яркий
                пример континентально-европейского типа политической культуры, будут описаны максимально подробно.
                Банальные, но неопровержимые выводы, а также действия представителей оппозиции будут преданы
                социально-демократической анафеме.</p>
            </div>
          </div>

        </div>

        <div class="Box mb">

          <div class="Message">
            <div class="Message__header">
              <div>
                <img src="<%= require('/Src/Img/actor.jpg') %>" class="Message__avatar" alt="">
              </div>

              <div class="Message__user">
                <a href="profile.html" class="Message__name Font Font__text Font__regular Link transition">Jensen
                  Ackles</a>
                <span class="Message__time Font Font__mini Font__regular">At 16:04</span>
              </div>
            </div>

            <div class="Message__footer">
              <p class="Message__text Font Font__regular Font__text">Значимость этих проблем настолько очевидна, что
                современная методология разработки обеспечивает широкому кругу (специалистов) участие в формировании новых
                предложений. Внезапно, представители современных социальных резервов, которые представляют собой яркий
                пример континентально-европейского типа политической культуры, будут описаны максимально подробно.
                Банальные, но неопровержимые выводы, а также действия представителей оппозиции будут преданы
                социально-демократической анафеме.</p>
            </div>
          </div>

        </div>

        <div class="Box mb">

          <div class="Message">
            <div class="Message__header">
              <div>
                <img src="<%= require('/Src/Img/actor.jpg') %>" class="Message__avatar" alt="">
              </div>

              <div class="Message__user">
                <a href="profile.html" class="Message__name Font Font__text Font__regular Link transition">Jensen
                  Ackles</a>
                <span class="Message__time Font Font__mini Font__regular">At 16:04</span>
              </div>
            </div>

            <div class="Message__footer">
              <p class="Message__text Font Font__regular Font__text">Значимость этих проблем настолько очевидна, что
                современная методология разработки обеспечивает широкому кругу (специалистов) участие в формировании новых
                предложений. Внезапно, представители современных социальных резервов, которые представляют собой яркий
                пример континентально-европейского типа политической культуры, будут описаны максимально подробно.
                Банальные, но неопровержимые выводы, а также действия представителей оппозиции будут преданы
                социально-демократической анафеме.</p>
            </div>
          </div>

        </div>

      </div> -->
    </div>

  </div>
</template>

<style lang="sass" scoped></style>