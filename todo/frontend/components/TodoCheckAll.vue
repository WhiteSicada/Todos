<template>
  <div>
    <label>
      <input type="checkbox" :checked="!anyRemaining" @change="allchecked" /> Check All
    </label>
  </div>
</template>

<script>
export default {
  computed : {
      anyRemaining(){
        return this.$store.getters['Kika/anyRemaining']
      }
    },
  methods: {
      allchecked(){
          this.$store.dispatch('Kika/checkAll', event.target.checked)
      }
  }
};
</script>

<style>
</style>