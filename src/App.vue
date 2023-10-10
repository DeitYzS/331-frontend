<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const store = useMessageStore()
const { message } = storeToRefs(store)
const token =localStorage.getItem('token')
const user = localStorage.getItem('user')
if(token && user) {
  authStore.reload(token, JSON.parse(user))
} else {
  authStore.logout()
}

function logout() {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="max-h-screen leading-normal">
    <div id="flashMessage" v-if="message">
      <h4>{{ message }}</h4>
    </div>

    <nav>
      <nav class=" flex">

      <ul 
          v-if="!authStore.currentUserName"
          class=" flex navbar-nav ml-auto"
        >
        <li class="nav-item px-2">

        <ul>
          <li class=" nav-item px-2">
            <router-link to="/register" class="nav-link">
              <font-awesome-icon icon="user-plus"/> Sign Up 
            </router-link>
          </li>

          <li>
            <router-link to="/login" class="nav-link">
              <font-awesome-icon icon="sign-in"/> Login
            </router-link>
          </li>
        </ul>
       </li>
      </ul>

        <ul 
          v-if="authStore.currentUserName"
          class=" flex navbar-nav ml-auto"
        >
          <li class="nav-item px-2">
            <router-link to="/profile" class="nav-link">
              <font-awesome-icon icon="user" />
              {{ authStore.currentUserName }} |
            </router-link>
          </li>

          <li class="nav-item px-2">
            <a class="nav-link hover:cursor-pointer" @click="logout">
              <font-awesome-icon icon="sign-out-alt"></font-awesome-icon> Logout
            </a>
          </li>
        </ul>
      </nav>

      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link :to="{ name: 'about' }">About</router-link> |
        <router-link :to="{ name: 'organizer-list' }">Organizer</router-link> |
        <span v-if="authStore.isAdmin">
          <router-link :to="{ name: 'add-event' }">New Event</router-link> |
          <router-link :to="{ name: 'add-organization' }">New Organization</router-link>
        </span>
      </div> 
    </nav>

    
  </header>

  <RouterView />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}


.logo {
  display: block;
  margin: 0 auto 2rem;
}

h4 {
  font-size: 20px;
}

@keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation: yellowfade 3s ease-in-out;
}
</style>
