
import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import EventDetailView from '../views/event/EventDetailView.vue'
import EventEditView from '@/views/event/EventEditView.vue'
import EventRegisterView from '@/views/event/EventRegisterView.vue'
import EventLayoutView from '@/views/event/EventLayoutView.vue'
import NProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'
import  NetworkErrorView  from '@/views/NetworkErrorView.vue';
import  NotFoundView  from '@/views/NotFoundView.vue';
import AddEventView from '@/views/EventFormView.vue';
import OrganizerView from "@/views/OrganizerView.vue";
import AddOrganizerView from "@/views/OrganizerFormView.vue";
import OrganizerLayoutView from "@/views/organizer/OrganizerLayoutView.vue";
import {useOrganizationStore} from "@/stores/organization";
import OrganizerService from "@/services/OrganizerService";
import OrganizerDetailView from "@/views/organizer/OrganizerDetailView.vue";
import OrganizerEditView from "@/views/organizer/OrganizerEditView.vue";
import OrganizerRegisterView from "@/views/organizer/OrganizerRegisterView.vue";
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: (route) => ({ page: parseInt((route.query?.page as string) || '1') })
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/add-event',
      name: 'add-event',
      component: AddEventView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/event/:id',
      name: 'event-layout',
      component: EventLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id: number = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return EventService.getEventById(id)
          .then((response) => {
            // need to set up the data for the component
            eventStore.setEvent(response.data)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resource',
                params: { resource: 'event' }
              }
            } else {
              return { name: 'network-error' }
            }
          })
      },
      children: [
        {
          path: '',
          name: 'event-detail',
          component: EventDetailView
        },
        {
          path: 'edit',
          name: 'event-edit',

          component: EventEditView
        },
        {
          path: 'register',
          name: 'event-register',
          component: EventRegisterView
        }
      ]
    },{
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView      
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
    },
    {
      path: '/organizer',
      name: 'organizer-list',
      component: OrganizerView,
      props: (route) => ({ page: parseInt((route.query?.page as string) || '1') })
    },
    {
      path: '/add-organization',
      name: 'add-organization',
      component: AddOrganizerView
    },
    {
      path: '/organizer/:id',
      name: 'organization-layout',
      component: OrganizerLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id: number = parseInt(to.params.id as string)
        const organizationStore = useOrganizationStore()
        return OrganizerService.getOrganizerById(id)
            .then((response) => {
              // need to set up the data for the component
              organizationStore.setOrganization(response.data)
            })
            .catch((error) => {
              if (error.response && error.response.status === 404) {
                return {
                  name: '404-resource',
                  params: { resource: 'organizer' }
                }
              } else {
                return { name: 'network-error' }
              }
            })
      },
      children: [
        {
          path: '',
          name: 'organizer-detail',
          component: OrganizerDetailView
        },
        {
          path: 'edit-organization',
          name: 'organizer-edit',

          component: OrganizerEditView
        },
        {
          path: 'register-organization',
          name: 'organizer-register',
          component: OrganizerRegisterView
        }
      ]
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
