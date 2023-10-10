import type { OrganizerItem } from '@/type'
import { defineStore } from 'pinia'
export const useOrganizationStore = defineStore('organization', {
    state: () => ({
        organizer: null as OrganizerItem | null
    }),
    actions: {
        setOrganization(organizer: OrganizerItem) {
            this.organizer = organizer
        }
    }
})
