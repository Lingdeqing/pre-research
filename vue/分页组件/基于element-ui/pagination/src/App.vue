<template>
  <div>
    <Pagination 
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      :total="total"
    />
    <p>
      当前页数
      <input type="text" v-model="currentPage" />
    </p>
    <p>
      总条数
      <input type="text" v-model="total" />
    </p>
    <p>
      单页条数
      <input type="text" v-model="pageSize" />
    </p>
  </div>
</template>

<script>
import Pagination from './components/Pagination.vue'

export default {
  name: 'app',
  data(){
    return {
      pageSize: 10,
      currentPage: 5,
      total: 100
    }
  },
  components: {
    Pagination
  }
}
</script>
