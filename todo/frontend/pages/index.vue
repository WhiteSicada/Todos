<template>
  <div>


<div>
  <b-card
    title="Card Title"
    img-src="https://demos.creative-tim.com/argon-dashboard-pro/assets/img/theme/img-1-1000x600.jpg"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </b-card-text>

    <b-button href="javascript:;" variant="primary">Go somewhere</b-button>
  </b-card>
</div>

<stats-card title="New users"
            type="gradient-orange"
            sub-title="2,356"
            icon="ni ni-chart-pie-35">

  <template slot="footer">
    <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
    <span class="text-nowrap">Since last month</span>
  </template>
</stats-card>











  </div>
</template>

<script>
export default {
  data() {
    return {
      modal3 : false
    };
  },
};
</script>

<style lang="scss">
</style>