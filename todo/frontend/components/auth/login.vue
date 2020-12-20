<template>
  <div>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <b-form @submit.stop.prevent="handleSubmit(login)">
        <validation-provider name="Username" :rules="{ required: true, min: 3 }" v-slot="validationContext">
          <b-form-group id="example-input-group-1" label="Username" label-for="example-input-1">
            <b-form-input id="example-input-1" name="example-input-1" v-model="username" :state="getValidationState(validationContext)"></b-form-input>
            <b-form-invalid-feedback id="input-1-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <validation-provider name="Password" :rules="{ required: true }" v-slot="validationContext">
          <b-form-group id="example-input-group-2" label="Password" label-for="example-input-2">
            <b-form-input id="example-input-2" name="example-input-2" type="password" v-model="password" :state="getValidationState(validationContext)"></b-form-input>
            <b-form-invalid-feedback id="input-2-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <button type="submit" class="btn btn-dark btn-lg btn-block" :disabled="loading">
          <div class="lds-ring-container" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
          Sign In
        </button>
        <p class="forgot-password text-right mt-2 mb-4">
          <nuxt-link :to="{name: 'ForgotPassword'}">Forgot password ?</nuxt-link>
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
      password: "",
      loading : false,
    };
  },
  methods: {
    ...mapActions('auth',[
        'retrieveToken'
    ]),
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    login() {
      this.loading = true;
      this.$store
        .dispatch("auth/retrieveToken", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          this.loading = false;
          this.$toast.global.successful("Successfully Logged In");
          this.$store.dispatch("auth/setUser");
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          this.loading = false;
          this.$toast.global.my_error(error); //Using custom toast
        });
    },
  },
};
</script>