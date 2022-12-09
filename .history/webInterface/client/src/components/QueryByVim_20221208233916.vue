<template>
  <div class="posts">
    <h1>Query By Vim</h1>
    <form v-on:submit="queryByVim">
      <input id="inputBox" type="text" v-model="input.vim" placeholder="Enter Vim to Query">
      <br>
      <input type="submit" value="Query">
      <br>
      <br>
      <span v-if="input">
        <b>{{ input.data }}</b>
      </span>
      <br>
    </form>

    <el-table :data="tableData" :header-cell-style="{textAlign: 'center'}" id="myTable" :default-sort="{ prop: 'date', order: 'descending' }" >
      <el-table-column prop="date" label="Timestamp" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="Name" sortable width="180">
      </el-table-column>
      <el-table-column prop="milage" label="Milage">
      </el-table-column>
    </el-table>
  </div>


</template>
  
<style>
  #tableColumn{
    
  }
  #myTable{
    justify-content: center;
    margin-left: 20vw;
    width: 50vw;
    margin-top: 10px;
  }
  #inputBox{
    margin-bottom: 2vh;
  }
  
</style>
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
          this.input.data = `Queried Successfull` + `\n`+ 
          `Vin: ${apiData.vin}, Make: ${apiData.make}, Model: ${apiData.model}, Year: ${apiData.year} `;
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
  