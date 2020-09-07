<template>
    <button v-on="$listeners" :disabled="loading" class="btn" :class="btnClass">
        <template v-if="loading">
            <div class="loading-spinner" />
        </template>
        <template v-else>
            <slot />
        </template>
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Button extends Vue {
  @Prop() private primary!: boolean;
  @Prop() private loading!: boolean;

  get btnClass () {
    let className = ''

    if (this.primary) {
      className += 'btn-primary'
    }

    return className
  }
}
</script>

<style lang="scss" scoped>
.btn {
    cursor: pointer;
    max-width: 100%;
    max-height: 100%;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

    &.btn-primary {
        width: 200px;
        height: 50px;
        font-family: monospace;
        text-align: center;
        background: tomato;
        color: rgb(255, 255, 255);
        border-radius: 4px;
        border-color: tomato;
    }
}

.loading-spinner {
    pointer-events: none;
    width: 1.5em;
    height: 1.5em;
    border: 0.4em solid transparent;
    border-color: #eee;
    border-top-color: #3E67EC;
    border-radius: 50%;
    animation: loadingspin 1s linear infinite;
}

@keyframes loadingspin {
    100% {
        transform: rotate(360deg)
    }
}
</style>
