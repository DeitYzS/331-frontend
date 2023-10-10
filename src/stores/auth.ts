import { defineStore } from "pinia";
import axios from "axios";
import type { AxiosInstance } from "axios";
import type { OrganizerItem } from "@/type";
import { remove } from "nprogress";

const apiClient: AxiosInstance = axios.create ({
    baseURL: import.meta.env.VITE_BACKEND_URL ,
    withCredentials: false ,
    headers: {
        Accept: 'application/json' ,
        'Content-Type': 'application/json'
    }
})

export const useAuthStore = defineStore('auth', {
 state: () => ({
    token: null as string | null ,
    user: null as OrganizerItem | null
 }),

 getters: {
    currentUserName() : string {
        return this.user?.name || ''
    },
    isAdmin() :boolean {
        return this.user?.roles.includes('ROLE_ADMIN') || false
    }

 },

 actions: {
    login(email: string, password: string) {
        return apiClient
            .post('/api/v1/auth/authenticate', {
                username: email,
                password: password
            })
            .then((res) => {
                this.token = res.data.access_token
                this.user = res.data.user
                localStorage.setItem('access_token', this.token as string)
                localStorage.setItem('user', JSON.stringify(this.user))
                axios.defaults.headers.common['Authorization'] = 'Bearer'+ this.token
                return res
            })
    },

    logout() {
        console.log('logout')
        this.token = null 
        this.user = null 
        localStorage.removeItem('user')
        localStorage.removeItem('access_token')
    },

    reload(token: string, user: OrganizerItem) {
        this.token = token
        this.user = user
    },
    
    register(
        email: string,
        password: string,
        username: string,
        firstname: string,
        lastname: string
      ) {
        return apiClient
          .post('/api/v1/auth/register', {
            username,
            email,
            password,
            firstname,
            lastname
          })
          .then((res) => {
            this.token = res.data.access_token
            console.log(res.data.user)
            this.user = {
                id: res.data.user.id,
                name: res.data.user.name,
                address: res.data.user.address,
                images: res.data.user.images,
                roles: res.data.user.roles
            } as unknown as OrganizerItem
            localStorage.setItem('access_token', this.token as string)
            localStorage.setItem('user', JSON.stringify(this.user))
            return res
          })
      }
    }
 }
)