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

    <el-table :data="tableData" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
      <el-table-column prop="date" label="Timestamp" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="Name" sortable width="180">
      </el-table-column>
      <el-table-column prop="milage" label="Milage">
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
      },
      tableData: []
    };
  },

  methods: {
    async queryByVim() {
      this.tableData = [];
      if (!this.input.vim) {
        let response = 'Please enter a Vim to query for.';
        this.input.data = response;
      } else {
        const apiResponse = await PostsService.queryByVim(this.input.vim);
        let apiData = apiResponse.data;
        if (apiData != "The car with vin 12 does not exist") {
          let record_length = apiData.timeStamp.length;
          for (let i = 0; i < record_length; i++) {
            let data = {
              date: apiData.timeStamp[i],
              name: apiData.ownerFirstName[i] + " " + apiData.ownerLastName[i],
              milage: apiData.milage[i]
            }
            this.tableData.push(data);
          }
          this.input.data = `Car with vin ${apiData.vin} is queried successfully`;
        } else {
          this.input.data = apiData;
        }
      }
    },
    formatter(row, column) {
      return row.address;
    }
  }
};
</script>
  