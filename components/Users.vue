<template>
  <div>
    <b-list-group>
      <b-list-group-item
        v-for="user in users"
        :key="user.id"
        class="d-flex justify-content-between align-items-center">
        {{user.name}}
        <b-badge variant="primary" pill>{{user.countMessages}}</b-badge>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    computed: {
      ...mapState({
        users: state => state.users
      })
    },
    mounted() {
      this.$store.dispatch('getUsers');
    }
  }
</script>
