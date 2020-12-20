<template>
  <div>
    <div>
      <register />
    </div>
  </div>
</template>

<script>
import register from "@/components/auth/register"
export default {
  components : {
    register
  },
  middleware: ['alreadyauthenticated']
}
</script>

<style>

</style>
