<template>
  <div class="posts">
    <h1>Current State: All Key-Value Pairs in World State</h1>
    <button v-on:click="queryAll()">Query All Assets</button>

    <span v-if="reponse">
                <b>{{ reponse.data }}</b>
            </span>
   
  </div>
</template>

<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";

export default {
  name: "response",
  data() {
    return {
      response: {}
    };
  },
  
  methods: {
    async queryAll() {
      alert("IN CLient qa")
      this.response = null;
      const apiResponse = await PostsService.queryAll();
      this.response = apiResponse.data;
      alert(apiResponse);
      
    },
    async runSpinner() {
      this.$refs.Spinner.show();
    },
    async hideSpinner() {
      this.$refs.Spinner.hide();
    }
  }
};
</script>
