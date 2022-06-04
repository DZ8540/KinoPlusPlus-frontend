<script lang="ts" setup>
// * Types
import type { PropType, Ref } from 'vue'
import type { VideoComment } from '@/contracts/video'
// * Types

import { ref } from 'vue'
import { EventsNames } from '@/config/event'
import { useUserData } from '@/store/userDataStore'
import { VIDEO_COMMENTS_DESCRIPTION_MIN_LENGTH, VIDEO_COMMENTS_DESCRIPTION_MAX_LENGTH } from '@/config/video'

// * Components
import Message from './Message.vue'
import Button from '@/components/Button.vue'
import Textarea from '@/components/Textarea.vue'
// * Components

const userData = useUserData()
const emit = defineEmits([EventsNames.SEND_COMMENT, EventsNames.UPDATE_COMMENT, EventsNames.DELETE_COMMENT])
const props = defineProps({
  comments: {
    type: Array as PropType<VideoComment[]>,
    required: true,
  },
})

const commentText: Ref<string> = ref('')
const commentTextError: Ref<string> = ref('')

function validate(): boolean {
  if (commentText.value.length < VIDEO_COMMENTS_DESCRIPTION_MIN_LENGTH) {
    commentTextError.value = `Your comment must be more ${VIDEO_COMMENTS_DESCRIPTION_MIN_LENGTH} symbols!`
    return false
  } else if (commentText.value.length > VIDEO_COMMENTS_DESCRIPTION_MAX_LENGTH) {
    commentTextError.value = `Your comment must be less ${VIDEO_COMMENTS_DESCRIPTION_MAX_LENGTH} symbols!`
    return false
  }

  return true
}

async function sendComment(): Promise<void> {
  if (!validate()) return
  
  emit(EventsNames.SEND_COMMENT, commentText.value)
  commentText.value = ''
}
</script>

<template>
  <div class="Comments">

    <h1 v-if="props.comments.length" class="Comments__title Font Font__bold Font__title">
      <slot>Comments</slot>
    </h1>

    <div v-if="userData.user" class="Box mb">
      <!-- <div class="Rating mb" data-name="Rating component">
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

      </div> -->

      <Textarea :max-symbols="VIDEO_COMMENTS_DESCRIPTION_MAX_LENGTH">

        <template #default="{ textareaClassNames, rows }">
          <textarea :class="textareaClassNames" :rows="rows" v-model="commentText" placeholder="Your comment"></textarea>
        </template>

        <template #error>{{ commentTextError }}</template>

        <template #length>{{ commentText.length }}</template>
        
      </Textarea>

      <Button @click="sendComment" class="Comments__btn" type="button">Send</Button>
    </div>

    <div v-for="item of props.comments" :key="item.id" class="Box mb">

      <Message
        :item="item"
        @delete-comment="(id) => $emit(EventsNames.DELETE_COMMENT, id)" 
        @update-comment="(data) => $emit(EventsNames.UPDATE_COMMENT, data)" 
      />

    </div>

  </div>
</template>

<style lang="sass">
@import '@/assets/sass/variables'

.Comments
  &__title
    margin-bottom: 30px !important
  &__btn
    margin-top: 30px
    float: right
</style>