<template>
  <div>
    <form @submit.prevent="filterInfo" class="main__filter">
      <input
          class="filter__input"
          type="text"
          v-model="filterText"
      />
      <Button type="submit">Найти</Button>
    </form>
    <div class="main__tbl">
      <Table
        :loading="loading"
      >
        <template v-slot:heading>
            <tr>
                <th class="tbl__heading" v-for="(heading, i) in headings" :key="i" @click="sortTable(heading.type)">
                  {{heading.value}}
                  <span class="tbl__sort" :class="descSort ? 'desc-sort' : 'asc-sort'"></span>
                </th>
            </tr>
        </template>
        <template v-slot:data>
            <tr v-for="(user, i) in paginatedData" :key="`row: ${i}`" @click="showModal(user)">
                <td v-html="user.fullname"></td>
                <td v-html="user.uname"></td>
                <td v-html="user.company"></td>
                <td v-html="user.email"></td>
                <td v-html="user.address.state"></td>
            </tr>
        </template>
        <template v-slot:pagination>
          <div class="tbl__pagination">
            <Pagination
              :currentPage="pagination.pageNumber"
              :totalItems="info.length"
              :pageSize="pagination.size"
              @pageChange="pagination.pageNumber = $event"
            />
          </div>
        </template>
      </Table>
    </div>
    <div class="main__btn" v-if="btnState.visible">
      <Button
        @click="getInfo"
        :primary="true"
        :loading="btnState.loading"
      >
        Показать пользователей
      </Button>
    </div>
    <modal v-if="modal.show" @close="modal.show = false">
      <template v-slot:header>
        <h3>Инфа о юзере</h3>
      </template>
      <template v-slot:body>
        <div>
          <span>Имя: {{modal.data.fullname}}</span>
          <br>
          <span>Адрес: {{modal.data.address.city}},
            {{modal.data.address.state}},
            {{modal.data.address.streetAddress}},
            {{modal.data.address.zip}}
          </span>
        </div>
      </template>
    </modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { mapState } from 'vuex'
import store from '@/store/index'

import Button from '@/components/Button/Button.vue'
import Table from '@/components/Table/Table.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import Modal from '@/components/Modal/Modal.vue'

const initialState = {
  heading: [
    { value: 'фамилия и имя', type: 'fullname' },
    { value: 'юзернейм', type: 'uname' },
    { value: 'компания', type: 'company' },
    { value: 'почта', type: 'email' },
    { value: 'штат', type: 'address?state' }
  ]
}

@Component({
  components: {
    Button,
    Table,
    Pagination,
    Modal
  },
  computed: {
    ...mapState(['table'])
  }
})
export default class MainView extends Vue {
  loading = true
  btnState = {
    loading: false,
    visible: true
  }

  pagination = {
    size: 10,
    pageNumber: 0
  }

  table: any
  info = []
  modal = {
    data: {},
    show: false
  }

  get headings () {
    return initialState.heading
  }

  filterText = ''

  filterInfo () {
    console.log('filter info', this.filterText)
    if (!this.filterText || this.info.length === 0) {
      this.info = this.table.info
      return
    }

    this.info = this.info.filter((val: any) => {
      return val.fullname.indexOf(this.filterText) > -1 ||
        val.uname.indexOf(this.filterText) > -1 ||
        val.company.indexOf(this.filterText) > -1 ||
        val.email.indexOf(this.filterText) > -1 ||
        val.address.state.indexOf(this.filterText) > -1
    })
  }

  sorting = true
  get descSort () {
    return this.sorting
  }

  sortTable (type: string) {
    // TO DO: refactor this hack
    if (type.includes('?')) {
      const [firstType, secondType] = type.split('?')
      this.hackAddrStateSort(firstType, secondType)
      return
    }

    if (this.sorting) {
      // desc sorting
      this.info.sort((a: any, b: any) => {
        if (a[type] > b[type]) {
          return 1
        }
        if (a[type] < b[type]) {
          return -1
        }

        return 0
      })
    } else {
      // asc sorting
      this.info.sort((a: any, b: any) => {
        if (a[type] > b[type]) {
          return -1
        }
        if (a[type] < b[type]) {
          return 1
        }

        return 0
      })
    }

    this.sorting = !this.sorting
  }

  // TO DO: !!REFACTOR THIS METHOD!!
  hackAddrStateSort (first: string, second: string) {
    if (this.sorting) {
      // desc sorting
      this.info.sort((a: any, b: any) => {
        if (a[first][second] > b[first][second]) {
          return 1
        }
        if (a[first][second] < b[first][second]) {
          return -1
        }

        return 0
      })
    } else {
      // asc sorting
      this.info.sort((a: any, b: any) => {
        if (a[first][second] > b[first][second]) {
          return -1
        }
        if (a[first][second] < b[first][second]) {
          return 1
        }

        return 0
      })
    }

    this.sorting = !this.sorting
  }

  getInfo () {
    this.btnState.loading = true
    store
      .dispatch('table/fetchInfo')
      .then(() => {
        this.loading = false
        this.btnState = {
          loading: false,
          visible: false
        }
        this.pagination.pageNumber = 1
        this.info = this.table.info
        console.log('fetched')
      })
  }

  // TO DO: modal logic to vuex
  showModal (user: object) {
    this.modal = {
      data: user,
      show: true
    }
  }

  get paginatedData () {
    const start = (this.pagination.pageNumber - 1) * this.pagination.size
    const end = start + this.pagination.size

    return this.info.slice(start, end)
  }
}
</script>

<style lang="scss" scoped>
.main {
  &__filter {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;
  }
}

.tbl {
  &__pagination {
    margin-top: 1rem;
  }

  &__heading {
    position: relative;
    cursor: pointer;

    &:hover {
      .desc-sort::after {
        content: "↓";
        position: absolute;
        right: 0.5em;
      }

      .asc-sort::after {
        content: "↑";
        position: absolute;
        right: 0.5em;
      }
    }
  }
}
</style>
