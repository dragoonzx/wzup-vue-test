<template>
<div>
    <span
        :style="{ height, width: computedWidth }"
        class="skeleton-box"
    />
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SkeletonBox extends Vue {
    maxWidth = 100;
    minWidth = 100;
    height = '1em';
    width = null;

    get computedWidth () {
      return this.width || `${Math.floor((Math.random() * (this.maxWidth - this.minWidth)) + this.minWidth)}%`
    }
}
</script>

<style lang="scss" scoped>
.skeleton-box {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  overflow: hidden;
  background-color: #DDDBDD;
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(#fff, 0) 0,
      rgba(#fff, 0.2) 20%,
      rgba(#fff, 0.5) 60%,
      rgba(#fff, 0)
    );
    animation: shimmer 5s infinite;
    content: '';
  }
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>
