<template>
    <div class="UpdateCar">
        <h1>Input new information that you would like to change</h1>
        <el-form :model="updateData" :rules="rules" ref="updateData" label-width="100px" class="updateCar_page"
            label-position="right">

            <el-form-item label="Vin number" prop="vin">
                <el-input v-model="updateData.vin"></el-input>
            </el-form-item>

            <el-form-item label="Owner first name" prop="firstname">
                <el-input v-model="updateData.firstname"></el-input>
            </el-form-item>

            <el-form-item label="Owner Last name" prop="lastname">
                <el-input v-model="updateData.lastname"></el-input>
            </el-form-item>

            <el-form-item label="milage" prop="milage">
                <el-input v-model="updateData.milage"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('updateData')">Update</el-button>
                <el-button @click="resetForm('updateData')">Reset</el-button>
            </el-form-item>
            <br>
            <span v-if="registerReponse">
                <b>{{ registerReponse.data }}</b>
            </span>
            <br>
        </el-form>
    </div>
</template>

<script>
import PostsService from "@/services/apiService";

export default {
    name: "Update_response",
    data() {
        return {
            updateData: {
                firstname: '',
                lastname: '',
                vin: '',
                milage: ''
            },
            registerReponse: {
                data: ""
            },
            rules: {
                vin: [
                    { required: true, message: 'Please input your car vin', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.registerCar();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        async registerCar() {
            const apiResponse = await PostsService.updateCar(
                this.updateData.vin,
                this.updateData.firstname,
                this.updateData.lastname,
                this.updateData.milage
            );
            console.log(apiResponse);
            this.registerReponse = apiResponse;
        }
    }
}
</script> 
