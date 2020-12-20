<template>
  <div>
    <div>
      <login />
    </div>
  </div>
</template>

<script>
import login from "@/components/auth/login"
export default {
  components : {
    login
  },
  middleware: ['alreadyauthenticated']
}
</script>

<style>

</style>
