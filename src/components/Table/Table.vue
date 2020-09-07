<template>
    <div>
        <table style="width:100%">
            <slot name="heading" />
            <template v-if="loading">
                <tr v-for="(mock, i) in 5" :key="i">
                    <td><SkeletonBox /></td>
                    <td><SkeletonBox /></td>
                    <td><SkeletonBox /></td>
                    <td><SkeletonBox /></td>
                    <td><SkeletonBox /></td>
                </tr>
            </template>
            <slot name="data" />
        </table>
        <slot name="pagination" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import SkeletonBox from '../SkeletonBox/SkeletonBox.vue'

@Component({
  components: {
    SkeletonBox
  }
})
export default class Table extends Vue {
    @Prop() private loading!: boolean
}
</script>

<style lang="scss" scoped>
 table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
}

table {
    border-spacing: 5px;
}

th, td {
    padding: 10px;
}
</style>
