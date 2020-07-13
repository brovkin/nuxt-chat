<template>
  <section>
    <b-jumbotron header="Sign Up">
      <hr class="my-4">
      <b-button variant="primary" to="/">More Info</b-button>
      <b-button variant="success" to="/auth">Sign In</b-button>
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
  import { uuid } from 'uuidv4';
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
          const user = await axios.get('http://localhost:3000/users');

          const isExist = user.data.find(item => {
            if (item.name === name || item.email === email) {
              return true;
            }
          })

          if (isExist) return false;

          const response = await axios.post('http://localhost:3000/users', {
            id: uuid(),
            name,
            email,
            countMessages: 0
          });

          this.$router.push('/');

        } catch(e) {
          this.$router.push('/register');
        }
      }
    }
  }
</script>
