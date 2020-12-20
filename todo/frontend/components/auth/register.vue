<template>
  <div>
      <h3 class="flex-center">Sign Up</h3>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <b-form @submit.stop.prevent="handleSubmit(register)">
        <validation-provider name="Username" :rules="{ required: true, min: 3 }" v-slot="validationContext">
          <b-form-group id="example-input-group-1" label="Username" label-for="example-input-1">
            <b-form-input id="example-input-1" name="example-input-1" v-model="username" :state="getValidationState(validationContext)"></b-form-input>
            <b-form-invalid-feedback id="input-1-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <validation-provider name="Email" :rules="{ required: true, email : true }" v-slot="validationContext">
          <b-form-group id="example-input-group-2" label="Email" label-for="example-input-2">
            <b-form-input id="example-input-2" name="example-input-2" type="email" v-model="email" :state="getValidationState(validationContext)"></b-form-input>
            <b-form-invalid-feedback id="input-2-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <validation-provider name="Password" :rules="{ required: true }" v-slot="validationContext">
          <b-form-group id="example-input-group-3" label="Password" label-for="example-input-3">
            <b-form-input id="example-input-3" name="example-input-3" type="password" v-model="password" :state="getValidationState(validationContext)"></b-form-input>
            <b-form-invalid-feedback id="input-3-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
        <p class="forgot-password text-right mt-2 mb-4">
            Already registerated
          <nuxt-link :to="{name: 'Login'}">Sign In?</nuxt-link>
        </p>
      </b-form>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions} from 'vuex'
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions('auth',[
        'register'
    ]),
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    register() {
        this['auth/register']({
          username: this.username,
          email: this.email,
          password: this.password,
        }).then(response => {
            this.$toast.global.successful("Successfully Registrated !")
            this.$router.push({ path: "/Login" })
        });
    },
  },
};
</script>