<template>
  <section>
    <b-jumbotron header="Chat">
      <p>welcome to open chat</p>
      <hr class="my-4">
      <b-button variant="primary" to="/">More Info</b-button>
    </b-jumbotron>
    <section class="container container-block">
      <div class="row">
        <div class="users col-4">
          <Users/>
        </div>
        <div class="messages col-8">
          <div class="messages__block" v-if="messages.length">
            <div>
              <b-list-group-item class="messages__item" v-for="msg in messages" :key="msg.id">
                <div class="messages__item-user">{{msg.user.name}} {{msg.time}}</div>
                <div class="messages__item-msg">{{msg.message}}</div>
              </b-list-group-item>
            </div>
          </div>
          <b-alert v-else show variant="warning">No messages yet</b-alert>
          <div class="messages__input">
            <b-form @submit.prevent="onSubmit">
              <b-input-group>
                <b-form-input autofocus v-model="mainInput" placeholder="Enter something"></b-form-input>
                <b-input-group-append>
                  <b-button type="submit" variant="success">Send</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form>
          </div>
        </div>
      </div>
    </section>

  </section>
</template>

<script>
  import Users from "../components/Users";
  import { mapState } from 'vuex';
  import axios from 'axios';
  import {uuid} from "uuidv4";
  export default {
    layout: 'main',
    name: 'chat',
    components: {
      Users
    },
    data() {
      return {
        mainInput: '',
        time: new Date().toLocaleTimeString(),
        currentUser: null,
      }
    },
    methods: {
      async onSubmit() {
        if (this.mainInput) {
          const url = window.location.host;
          const response = await axios.post(`http://${url.replace('8000', '3000')}/messages`, {
            id: uuid(),
            message: this.mainInput,
            user: this.currentUser,
            time: this.time,
          });

          const user = await axios.get(`http://${url.replace('8000', '3000')}/users/` + this.currentUser.id);

          await axios.patch(`http://${url.replace('8000', '3000')}/users/` + this.currentUser.id, {
            countMessages: user.data.countMessages + 1
          })

          this.mainInput = '';
        }
      },
    },
    computed: {
      ...mapState({
        messages: state => state.messages,
        users: state => state.users,
      }),
    },
    async mounted() {
      await this.$store.dispatch('getMessages');
      await this.$store.dispatch('getUsers');

      const userId = await this.$cookies.get('access-token');
      if (userId) {
        this.currentUser = await this.users.find(item => item.id === userId);
      }

      setInterval(() => {
        this.$store.dispatch('getMessages');
        this.$store.dispatch('getUsers');
      }, 3000);
    }
  }
</script>

<style>
  .messages__item-user {
    font-weight: bold;
  }

  .messages__item-msg {
    font-style: italic;
  }

  .messages__block {
    max-height: 400px;
    overflow-y: scroll;
  }

  .messages__item {
    margin-bottom: 1rem;
    border-top-width: 1px !important;
  }

  .container-block {
    padding: 2rem;
  }
</style>
