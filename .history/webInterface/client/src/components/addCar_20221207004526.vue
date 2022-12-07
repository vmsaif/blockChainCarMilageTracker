<template>
    <div class="AddCar">
        <h1>Input Car Information to add car</h1>
        <el-form :model="registerData" :rules="rules" ref="registerData" label-width="100px" class="addCar_page"
            label-position="right">
            <el-form-item label="First name" prop="firstname">
                <el-input v-model="registerData.firstname"></el-input>
            </el-form-item>

            <el-form-item label="Last name" prop="lastname">
                <el-input v-model="registerData.lastname"></el-input>
            </el-form-item>

            <el-form-item label="Vin number" prop="vin">
                <el-input v-model="registerData.vin"></el-input>
            </el-form-item>
            <el-form-item label="Car make" prop="make">
                <el-input v-model="registerData.make"></el-input>
            </el-form-item>
            <el-form-item label="Car model" prop="model">
                <el-input v-model="registerData.model"></el-input>
            </el-form-item>
            <el-form-item label="Car year" prop="year">
                <el-input v-model="registerData.year"></el-input>
            </el-form-item>
            <el-form-item label="milage" prop="milage">
                <el-input v-model="registerData.milage"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('registerData')">Register</el-button>
                <el-button @click="resetForm('registerData')">Reset</el-button>
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
    name: "Register_response",
    data() {
        return {
            registerData: {
                firstname: '',
                lastname: '',
                vin: '',
                make: '',
                model: '',
                year: '',
                milage: ''
            },
            registerReponse: {
                data: ""
            },

            rules: {
                firstname: [
                    { required: true, message: 'Please input first name', trigger: 'blur' },
                ],
                lastname: [
                    { required: true, message: 'please select your last name', trigger: 'change' }
                ],
                vin: [
                    { required: true, message: 'Please input your car vin', trigger: 'blur' }
                ],
                make: [
                    { required: true, message: 'Please input your car make', trigger: 'blur' }
                ],
                model: [
                    { required: true, message: 'Please input your car make', trigger: 'blur' }
                ],
                year: [
                    { required: true, message: 'Please input your car year', trigger: 'blur' }
                ],
                milage: [
                    { required: true, message: 'Please input your car milage', trigger: 'blur' }
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
            const apiResponse = await PostsService.addCar(
                this.registerData.vin,
                this.registerData.make,
                this.registerData.model,
                this.registerData.year,
                this.registerData.milage,
                this.registerData.firstname,
                this.registerData.lastname


            );
            console.log(apiResponse);
            alert(apiResponse);
            this.registerReponse = apiResponse;
        }
    }
}
</script> 
