<template>
  <div class="ScoreCard">
    <h1>Final Score</h1>
    <svg viewbox="0 0 200 200" width="200" height="200">
      <circle cx="100" cy="100" r="79.5775" fill="none" stroke-width="16" transform="rotate(-90,100,100)" stroke="#e0e0e0" stroke-dashoffset="0" stroke-dasharray="500, 500" />
      <circle cx="100" cy="100" r="79.5775" fill="none" stroke-width="16" transform="rotate(-90,100,100)" stroke="#81c784" :stroke-dashoffset="500 - (calculateFinalPercent * 5)" stroke-dasharray="500, 500" />
      <text x="50%" y="50%" dy="8" text-anchor="middle" font-size="24px">{{ calculateFinalPercent }}%</text>
      <text x="50%" y="50%" dy="8" text-anchor="middle" font-size="24px">{{ getNumPoints }} of {{ getNumQuestions }} questions correct.%</text>
    </svg>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'score-card',
  computed: {
    ...mapGetters(['calculateFinalPercent, getNumPoints, getNumQuestions']),
  },
})
export default class ScoreCard extends Vue {}
</script>

<style lang="scss">
.ScoreCard {
  align-items: center;
  background-color: #f5f5f5;
  border: 1px solid transparentize(#000000, 0.62);
  border-radius: 4px;
  bottom: 54px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 2px;
  overflow-y: auto;
  padding: 10px;
  position: absolute;
  right: 2px;
  top: 54px;
  &-container {
    height: 200px;
    width: 200px;
  }
}
</style>
