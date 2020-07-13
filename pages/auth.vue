<template>
  <section>
    <b-jumbotron header="Sign In">
      <hr class="my-4">
      <b-button variant="primary" to="/">More Info</b-button>
      <b-button variant="success" to="/register">Sign Up</b-button>
    </b-jumbotron>

    <section class="container">
      <b-form @submit.prevent="onSubmit">
        <b-form-group
          id="input-name"
          label="Name"
          label-for="input-name"
          description="Enter your name in chat"
        >
          <b-form-input
            id="input-name"
            v-model="form.name"
            type="text"
            required
            placeholder="Name"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-email"
          label="Email address:"
          label-for="input-email"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-email"
            v-model="form.email"
            type="email"
            required
            placeholder="Email"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </section>
  </section>
</template>

<script>
  import axios from 'axios';
  export default {
    layout: 'main',
    data() {
      return {
        form: {
          name: '',
          email: ''
        }
      }
    },
    methods: {
      async onSubmit() {
        try {
          const {name, email} = this.form;
          const url = window.location.host;
          const user = await axios.get(`http://${url.replace('8000', '3000')}/users`);

          const existUser = user.data.find(item => {
            if (item.name === name && item.email === email) {
              return true;
            }
          })

          if (existUser) {
            this.form = {
              name: '',
              email: ''
            }

           this.$cookies.set('access-token', existUser.id);
            this.$store.commit('login');
            this.$router.push('/chat')
        }

        } catch(e) {
          this.$router.push('/auth')
        }
      }
    }
  }
</script>
