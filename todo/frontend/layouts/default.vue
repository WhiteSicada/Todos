<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand>NavBar</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item>
              <b-nav pills>
                <nuxt-link class="nav-item-settings" to="/">Home</nuxt-link>
              </b-nav>
            </b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-navbar-nav>
              <b-nav-item v-if="!loggedIn">
                <nuxt-link class="nav-item-settings" :to="{ name: 'Login'}">Login</nuxt-link>
              </b-nav-item>
              <b-nav-item v-if="!loggedIn">
                <nuxt-link class="nav-item-settings" :to="{ name: 'Register'}">Register</nuxt-link>
              </b-nav-item>
              <b-nav-item v-if="loggedIn">
                <b-nav pills>
                  <b-nav-item><nuxt-link class="nav-item-settings" :to="{ name: 'todo'}">Todos</nuxt-link></b-nav-item>
                  <b-nav-item><nuxt-link class="nav-item-settings" :to="{ name: 'About'}">About</nuxt-link></b-nav-item>
                  <b-nav-item><nuxt-link class="nav-item-settings" :to="{ name: 'Logout'}">Logout</nuxt-link></b-nav-item>

                  <b-dropdown size="sm" toggle-class="text-decoration-none" no-caret right>
                    <template v-slot:button-content>
                      <b-avatar icon="people-fill" class="nav-dropdown" size="1.7em"></b-avatar>
                    </template>
                    <b-dropdown-header>Welcome !</b-dropdown-header>
                    <b-dropdown-item><nuxt-link class="dropdown-item-settings" :to="{ name: 'Logout'}"><b-avatar icon="people-fill" class="nav-dropdown" size="1.7em"></b-avatar>My Profile</nuxt-link></b-dropdown-item>
                    <b-dropdown-item><nuxt-link class="dropdown-item-settings" :to="{ name: 'Logout'}">My Notifications</nuxt-link></b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item><nuxt-link class="dropdown-item-settings" :to="{ name: 'Logout'}">Logout</nuxt-link></b-dropdown-item>
                  </b-dropdown>

                </b-nav>
              </b-nav-item>
            </b-navbar-nav>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>





    <div class="container">
      <transition
        name="router-animation"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
      >
        <Nuxt />
      </transition>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  data(){
    return {
      imageSetter: {
        blank: false, width: 50, height: 50, class: 'm1', background : 'red',
      }
    }
  },
  computed: {
    ...mapGetters("auth", ["loggedIn"]),
  },
  mounted() {
    if (window.localStorage.getItem("token")) {
      this.$store.commit(
        "auth/retrieveToken",
        window.localStorage.getItem("token")
      );
    }
  },
};
</script>




<style lang="scss">
.container {
  margin: 150px auto;
  max-width: 600px;
  font-size: 24px;
}
.flex-center {
  display: flex;
  justify-content: center;
}

.nav-item-settings {
  text-decoration: none;
  color: white;

  padding: 5px;
  &:hover {
    text-decoration: none;
    color: white;
    border-bottom: 1px solid white;
  }
}

.nav-dropdown{
  background: #343A40;
}

.dropdown-item-settings{
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: none;
    color: black;
  }
}
// css of spinner

.lds-ring-container {
  position: absolute;
  right: 50%;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 30px;
  height: 30px;
  // margin: 8px;
  border: 3px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
