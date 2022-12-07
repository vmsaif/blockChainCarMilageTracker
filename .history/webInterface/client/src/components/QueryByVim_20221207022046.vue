<template>
  <div class="posts">
    <h1>Query By Vim</h1>
    <form v-on:submit="queryByVim">
      <input type="text" v-model="input.vim" placeholder="Enter Vim to Query">
      <br>
      <input type="submit" value="Query">
      <br>
      <br>
      <span v-if="input">
        <b>{{ input.data }}</b>
      </span>
      <br>
    </form>

    <el-table
    :data="tableData"
    :default-sort = "{prop: 'date', order: 'descending'}"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="Date"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="Address"
      :formatter="formatter">
    </el-table-column>
  </el-table>
  </div>


</template>
  
<script>
import PostsService from "@/services/apiService";

export default {
  name: "response",
  data() {
    return {
      input: {
        data: ""
      }
    };
  },

  methods: {
    async queryByVim() {
      if (!this.input.vim) {
        let response = 'Please enter a Vim to query for.';
        this.input.data = response;
      } else {
        const apiResponse = await PostsService.queryByVim(this.input.vim);
        console.log(apiResponse);
        this.input = apiResponse;
      }
    },
    formatter(row,column){
      return row.address;
    }
  }
};
</script>
  