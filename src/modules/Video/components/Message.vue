<script lang="ts" setup>
// * Types
import type { PropType, Ref } from 'vue'
import type { ParsedUser } from '@/contracts/user'
import type { UpdateCommentData } from '@/contracts/event'
import type { VideoComment, ParsedVideoComment } from '@/contracts/video'
// * Types

import { ref } from 'vue'
import { EventsNames } from '@/config/event'
import { RoutesNames } from '@/config/router'
import { parseComment, parseUser } from '@/helpers'
import { useUserData } from '@/store/userDataStore'
import { VIDEO_COMMENTS_DESCRIPTION_MAX_LENGTH, VIDEO_COMMENTS_DESCRIPTION_MIN_LENGTH } from '@/config/video'

// * Components
import Link from '@/components/Link.vue'
import Button from '@/components/Button.vue'
import Textarea from '@/components/Textarea.vue'
// * Components

const userData = useUserData()
const emit = defineEmits({
  [EventsNames.UPDATE_COMMENT]: ({ description, id }: UpdateCommentData) => {
    if (description && id) {
      return true
    }
    
    return false
  },
  [EventsNames.DELETE_COMMENT]: (id: VideoComment['id']) => {
    if (!id)
      return false

    return true
  },
})
const props = defineProps({
  item: {
    type: Object as PropType<VideoComment>,
    required: true,
  }
})

const user: ParsedUser = parseUser(props.item.user!)
const item: ParsedVideoComment = parseComment(props.item)

const isEditMode: Ref<boolean> = ref(false)

const commentText: Ref<string> = ref(item.description)
const commentTextError: Ref<string> = ref('')

function isShowFooter(): boolean {
  const currentUser: ParsedUser | null = userData.user

  if (!currentUser)
    return false

  if (currentUser.id != item.userId)
    return false

  return true
}

function toggleEditMode(action: boolean): void {
  isEditMode.value = action

  if (!action)
    commentText.value = item.description
}

function deleteComment(): void {
  emit(EventsNames.DELETE_COMMENT, item.id)
}

async function updateComment(): Promise<void> {
  if (commentText.value.length < VIDEO_COMMENTS_DESCRIPTION_MIN_LENGTH) {
    commentTextError.value = `Your comment must be more ${VIDEO_COMMENTS_DESCRIPTION_MIN_LENGTH} symbols!`
    return
  } else if (commentText.value.length > VIDEO_COMMENTS_DESCRIPTION_MAX_LENGTH) {
    commentTextError.value = `Your comment must be less ${VIDEO_COMMENTS_DESCRIPTION_MAX_LENGTH} symbols!`
    return
  }

  item.description = commentText.value
  emit(EventsNames.UPDATE_COMMENT, { 
    id: item.id,
    description: commentText.value,
  })
  toggleEditMode(false)
}
</script>

<template>
  <div class="Message">
    <div class="Message__header">
      <div>
        <img :src="user.avatar" :alt="user.nickname" class="Message__avatar">
      </div>

      <div class="Message__user">
        <Link :to="{ name: RoutesNames.USER, params: { id: user.id } }" class="Message__name">{{ user.nickname }}</Link>
        <span class="Message__time Font Font__mini Font__regular">At {{ item.time }}</span>
      </div>
    </div>

    <div class="Message__body">
      <p v-if="!isEditMode" class="Message__text Font Font__regular Font__text">{{ item.description }}</p>

      <Textarea v-else :max-symbols="VIDEO_COMMENTS_DESCRIPTION_MAX_LENGTH">
      
        <template #default="{ textareaClassNames, rows }">
          <textarea v-model="commentText" :class="textareaClassNames" :rows="rows"></textarea>
        </template>
      
        <template #error>{{ commentTextError }}</template>

        <template #length>{{ commentText.length }}</template>

      </Textarea>
    </div>

    <div v-if="isShowFooter()" class="Message__footer">
      <Button @click="deleteComment" type="button">Delete</Button>

      <Button v-if="!isEditMode" @click="toggleEditMode(true)" type="button">Edit</Button>
      <Button v-else @click="toggleEditMode(false)" type="button">Cancel</Button>

      <Button v-if="isEditMode" @click="updateComment" type="button">Submit</Button>
    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/variables'

.Message
  &__header
    display: flex
    margin-bottom: 20px
  &__body 
    .Textarea
      width: 100%
  &__footer
    display: flex
    justify-content: flex-end
    margin-top: 20px
    *
      margin-left: 20px
  &__avatar
    width: 50px
    height: 50px
    border-radius: 50%
    object-fit: cover
  &__user
    margin-left: 20px
    display: flex
    flex-direction: column
  &__notice
    margin: 40px 0 !important
  &__noticeText
    color: $red !important
    text-align: center
  &__me
    padding-right: 20px 
    .Font
      text-align: right
    .Message
      &__header
        justify-content: flex-end
      &__user
        margin-right: 20px
</style>