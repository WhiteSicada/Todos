<template>
  <div></div>
</template>

<script>
import { mapActions} from 'vuex'
export default {
  created() {
    this['Kika/clearTodos']()
    this['auth/destroyToken']().then((response) => {
      this.$toast.global.successful("Successfully Logged Out");
      this.$router.push({ path: "/" });
    });
  },
  methods : {
    ...mapActions(['Kika/clearTodos','auth/destroyToken'])
  }
};
</script>

<style>
</style>