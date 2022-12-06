<template>
    <el-form :model="abc" :rules="rules" ref="abc" label-width="100px" class="demo-ruleForm">
  <el-form-item label="活动名称" prop="name">
    <el-input v-model="abc.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="活动时间" required>
    <el-col :span="11">
      <el-form-item prop="date1">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="date2">
        <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item label="即时配送" prop="delivery">
    <el-switch v-model="ruleForm.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="活动性质" prop="type">
    <el-checkbox-group v-model="ruleForm.type">
      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
      <el-checkbox label="地推活动" name="type"></el-checkbox>
      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="特殊资源" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="活动形式" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('abc')">立即创建</el-button>
    <el-button @click="resetForm('abc')">重置</el-button>
  </el-form-item>
</el-form>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
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
    }
  }
}
</script>
<!-- <template>
    <div class="register">
        <h1>Register your account</h1>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="register-ruleForm"
            label-position="right">

            <el-form-item label="Identity" prop="identity">
                <el-select v-model="registerData.identity" placeholder="Select your identity">
                    <el-option label="Patient" value="Patient"></el-option>
                    <el-option label="Hospital" value="Hospital"></el-option>
                    <el-option label="Insurence" value="Insurence"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="Username" prop="name">
                <el-input v-model="registerData.name"></el-input>
            </el-form-item>

            <el-form-item label="Password" prop="password">
                <el-input v-model="registerData.password"></el-input>
            </el-form-item>

            <el-form-item label="certify code" prop="code">
                <el-input v-model="registerData.code"></el-input>
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
      <style>
      .login{
  
      }
    </style> -->
<!-- <script>
import PostsService from "@/services/apiService";

export default {
    name: "Register_response",
    data() {
        return {
            registerData: {
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
</script>  -->
