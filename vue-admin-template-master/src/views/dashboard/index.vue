<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <card></card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import card from './card'

export default {
  name: 'Dashboard',
  components: {card},
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 20px;
  }
  &-text {
    line-height: 46px;
  }
}
</style>
