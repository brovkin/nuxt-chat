<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-navbar-brand to="/" exact>Message app</b-navbar-brand>
        <template v-if="isAuth">
          <b-nav-item to="/chat">Chat</b-nav-item>
          <b-nav-item @click="logout" >Log out</b-nav-item>
        </template>
        <template v-else>
          <b-nav-item to="/register">Registration</b-nav-item>
          <b-nav-item to="/auth">Auth</b-nav-item>
        </template>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'Navbar',
    computed: {
      ...mapState(['isAuth'])
    },
    methods: {
      logout() {
        this.$cookies.remove('access-token');
        this.$store.commit('logout');
        this.$router.push('/');
      }
    }
  }
</script>
