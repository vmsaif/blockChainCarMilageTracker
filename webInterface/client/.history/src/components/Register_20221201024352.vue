<template>
    <div class="register">
        <h1>Register your account</h1>
        <el-form :model="Form" :rules="rules" ref="ruleForm" label-width="100px" class="register-ruleForm"
            label-position="right">
            <el-form-item label="Identity" prop="identity">
                <el-select v-model="ruleForm.identity" placeholder="Select your identity">
                    <el-option label="Patient" value="Patient"></el-option>
                    <el-option label="Hospital" value="Hospital"></el-option>
                    <el-option label="Insurence" value="Insurence"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="Username" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="Password" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>

            <el-form-item label="certify code" prop="code">
                <el-input v-model="ruleForm.code"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">Register</el-button>
                <el-button @click="resetForm('ruleForm')">Reset</el-button>
            </el-form-item>
            <br>
            <span v-if="registerReponse">
                <b>{{ registerReponse.data }}</b>
            </span>
            <br>
        </el-form>
    </div>
</template>
      <!-- <style>
      .login{
  
      }
    </style> -->
<script>
import PostsService from "@/services/apiService";

export default {
    name: "Register_response",
    data() {
        return {
            ruleForm: {
                name: '',
                password: '',
                identity: '',
                code: ''
            }, 
            registerReponse: {
                data: ""
            },

            rules: {
                name: [
                    { required: true, message: 'Please input username', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                identity: [
                    { required: true, message: 'please select your identity', trigger: 'change' }
                ],
                password: [
                    { required: true, message: 'Please input username', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: 'Please input your code', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        async registerUser(){
            const apiResponse = await PostsService.registerUser(
                this.regi
            )
        },
        async registerUser(){
            console.log(this.registerData.identity);
            // const apiResponse = await PostsService.registerUser(
            //     this.registerData.identity,
            //     this.registerData.name,
            //     this.registerData.password,
            //     this.registerData.code
            // );

        }
    }
}
</script>