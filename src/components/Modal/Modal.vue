<template>
     <transition name="modal">
        <div class="modal__mask" >
          <div class="modal__wrapper" >
            <div class="modal__container" v-click-outside="handleOutsideClick">
              <div class="modal__close" @click="$emit('close')">x</div>
              <div class="modal__header">
                <slot name="header">
                  default header
                </slot>
              </div>

              <div class="modal__body">
                <slot name="body">
                  default body
                </slot>
              </div>

              <div class="modal__footer">
                <slot name="footer">
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Modal extends Vue {
  // refactor hack
  clickCounter = 0

  handleOutsideClick () {
    console.log('clicked outside')
    if (this.clickCounter > 0) {
      this.$emit('close')
      this.clickCounter = 0
    }
    this.clickCounter++
  }

  escapeHandler (e: KeyboardEvent) {
    if (e.key === 'Escape') { this.$emit('close') }
  }

  created () {
    document.addEventListener('keydown', this.escapeHandler)
  }

  beforeDestroy () {
    document.removeEventListener('keydown', this.escapeHandler)
  }
}
</script>

<style lang="scss" scoped>
.modal {
    &__mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
        transition: opacity 0.3s ease;
    }

    &__wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    &__container {
        width: 300px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
        font-family: Helvetica, Arial, sans-serif;
        position: relative;
    }

    &__close {
        position: absolute;
        right: 20px;
        cursor: pointer;
    }

    &__body {
        margin: 20px 0;
    }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  transform: scale(1.1);
}
</style>
