<template>
    <form class="pagination" @submit.prevent="handleSubmit">
        <button
            class="button prev"
            type="button"
            aria-label="Previous"
            @click="prevPage"
            :disabled="currentPage <= 1"
        >
            <i class="icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M17 5.88L15.29 4 8 12l7.29 8L17 18.12 11.44 12z"
                        fillRule="evenodd"
                    />
                </svg>
            </i>
        </button>
        <span class="text pageText">Page:</span>
        <input
            class="input"
            type="number"
            v-model="inputVal"
            ref="pageInput"
        />
        <span class="text">of {{totalPages}}</span>
        <button
            class="button next"
            type="button"
            aria-label="Next"
            @click="nextPage"
            :disabled="currentPage >= totalPages"
        >
            <i class="icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8 5.88L9.71 4 17 12l-7.29 8L8 18.12 13.56 12z"
                        fillRule="evenodd"
                    />
                </svg>
            </i>
        </button>
    </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Pagination extends Vue {
  @Prop() private currentPage!: number;
  @Prop() private totalItems!: number;
  @Prop() private pageSize!: number;

  inputVal = '0';

  get totalPages () {
    // hack after fetch (need to refactor)
    if (this.currentPage === 1) {
      this.inputVal = '1'
    }
    // end of hack
    return Math.ceil(this.totalItems / this.pageSize)
  }

  prevPage () {
    console.log('clicked prev')
    if (this.currentPage > 1) {
      this.$emit('pageChange', this.currentPage - 1)
    }
    this.inputVal = (this.currentPage - 1).toString()
  }

  nextPage () {
    console.log('clicked next')
    if (this.currentPage < this.totalPages) {
      this.$emit('pageChange', this.currentPage + 1)
    }
    this.inputVal = (this.currentPage + 1).toString()
  }

  handleSubmit () {
    console.log('handle submit')
    let newVal = parseInt(this.inputVal, 10)

    if (newVal < 1) {
      newVal = 1
    }

    if (newVal > this.totalPages) {
      newVal = this.totalPages
    }

    this.$emit('pageChange', newVal)

    this.inputVal = newVal.toString();

    // Blur input on submit
    (this.$refs.pageInput as HTMLElement).blur()
  }
}
</script>

<style lang="scss" scoped>
//Refactor styles
$disabledOpacity: 0.5;

$transTimeBase: 250ms;
$easeBase: cubic-bezier(0.73, 0.09, 0.21, 0.96);

$spacingBase: 20px;
$spacingXs: $spacingBase / 4;
$spacingSm: $spacingBase / 2;
$spacingLg: $spacingBase * 2;
$spacingXl: $spacingBase * 3;
$spacingXxl: $spacingBase * 5;

$buttonColor: #888888;
$buttonBackground: transparent;
$buttonFocusShadowColor: #eeeeee;
$buttonHoverBackground: rgba(#2e2e2e, 0.08);
$buttonHoverColor: darken(#888888, 20%);
$buttonPadding: 8px;
$buttonRadius: 10px;

$inputTextColor: #2e2e2e;
$inputPlaceholderColor: #888888;
$inputOutlineColor: #eeeeee;
$inputSpacingX: $spacingSm;
$inputSpacingY: $spacingSm;
$inputRadius: 10px;

.button {
  display: inline-flex;
  padding: $buttonPadding;
  overflow: hidden;
  cursor: pointer;

  position: relative;

  background: $buttonBackground;
  border: none;
  border-radius: $buttonRadius;

  color: $buttonColor;
  font-weight: 600;
  text-decoration: none;

  transition: $transTimeBase $easeBase background-color,
  $transTimeBase $easeBase border-color, $transTimeBase $easeBase color,
  $transTimeBase $easeBase opacity;

  &:focus {
    outline: 0;
    box-shadow: 0 0 1px 3px $buttonFocusShadowColor;
  }

  &:active {
    box-shadow: none;
  }

  &:disabled {
    background: transparent;
    opacity: $disabledOpacity;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: rgba(#2e2e2e, 0.08);
    color: $buttonHoverColor;
  }

  &.textNegative {
    color: #ff421e;

    &:hover {
        color: #ff421e;
    }
  }
}

.icon {
  display: flex;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  fill: currentColor;

  svg {
  display: block;
  width: 100%;
  height: 100%;
  }
}

.input {
  width: 40px;
  max-width: 100%;
  padding: $inputSpacingY $inputSpacingX;

  background-color: #f4f4f4;
  border: 0;
  border-radius: $inputRadius;
  box-shadow: none; // remove native styles in Firefox

  color: $inputTextColor;
  font-weight: 600;
  text-align: center;

  &::placeholder {
    color: $inputPlaceholderColor;
    font-weight: 400;
    opacity: 1;
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 1px 3px $inputOutlineColor;
  }

  &:disabled {
    opacity: $disabledOpacity;
    cursor: not-allowed;
  }

  &[type="number"] {
    appearance: textfield;
  }
  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    appearance: none;
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
