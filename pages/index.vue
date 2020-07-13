<template>

  <section>
    <b-jumbotron header="Welcome to chat">
      <hr class="my-4">
      <b-button v-if="isAuth" to="/chat">Go to chat</b-button>
      <b-button v-else to="/register">Go to register</b-button>

      <template v-if="isAuth">
        <h3>Our users:</h3>
        <Users/>
      </template>
    </b-jumbotron>
  </section>
</template>

<script>
import Users from "../components/Users";
import { mapState } from 'vuex';
export default {
  layout: 'main',
  components: {
    Users
  },
  computed: {
    ...mapState({
      isAuth: state => state.isAuth
    })
  },
}
</script>
