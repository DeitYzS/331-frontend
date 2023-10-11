<template>
<div>
    <h1>Create an event</h1>

    <form @submit.prevent="saveEvent">

    <BaseInput
        v-model="event.category"
        type="text"
        label="Category"
    />

    <h3>Name & descirb your event</h3>

    <BaseInput
        v-model="event.title"
        type="text"
        label="Title"
    />

    <label>Description</label>

      <BaseInput
        v-model="event.description"
        type="text"
        placeholder="Description"
        class="field"
      />

      <h3>Where is your event?</h3>

      <label>Location</label>

      <BaseInput
        v-model="event.location"
        type="text"
        placeholder="Location"
        class="field"
      />

      <h3>Who is your organizer?</h3>
      <label>Select an Organizer</label>
      <BaseSelect
				label="Organizer"
				v-model="event.organizer!.id"
				:options="organizers"
				:key-extractor="(x) => x.id"
				:value-extractor="(x) => x.id"
				:text-extractor="(x) => x.name" 
        />

      <h3>The image of the Event</h3>
      <ImageUpload 
        v-model="event.images" 
      />  

      <button type="submit" class="bg-amber-500">Submit</button>
    </form>

   <pre>{{ event }}</pre>
</div>

</template>

<script setup lang="ts">
import type {EventItem, OrganizerItem} from "@/type";
import EventService from "@/services/EventService";
import { ref } from 'vue'
import { useRouter} from "vue-router";
import { useMessageStore } from '@/stores/message'
import BaseInput from "@/components/BaseInput.vue";
import OrganizerService from "@/services/OrganizerService";
import type {AxiosResponse } from "axios";
import BaseSelect from "@/components/BaseSelect.vue";
import ImageUpload from "@/components/ImageUpload.vue";


const store = useMessageStore()
const router = useRouter()
const organizers = ref<OrganizerItem[]>([])

OrganizerService.getOrganizersBy()
    .then((response: AxiosResponse<OrganizerItem[]>) => {
      organizers.value = response.data
    })
    .catch(() => {
      router.push({ name: 'network-error' })
})

const event =ref<EventItem> ({
  category: ' ',
  date: ' ',
  description: ' ',
  id: 0,
  location: ' ',
  organizer: {
    id: 0,
    name: ' ',
    address: ' ',
    images: [],
    roles: []
  },
  time: ' ',
  title: ' ',
  images: []
})



function  saveEvent() {
  EventService.saveEvent(event.value)
      .then((res) => {
        console.log(res.data)
        router.push({
          name: 'event-detail',
          params: { id: res.data.id }
        }) . catch(() => {
          router.push({ name: 'network-error' })
        })

        store.updateMessage('You are successfully add a new event for' + res.data.title)
        setTimeout(() => {
          store.resetMessage()
        }, 3000)
      })
}

</script>
