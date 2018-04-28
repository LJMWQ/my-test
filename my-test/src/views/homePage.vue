<template>
    <div>
        <div class="login-wrap" v-show="showLogin">
            <h3>登录</h3>
            <h3 v-show="nickName" @click="logout">logout</h3>
            <h3 @click="other">other</h3>
            <p v-show="errorTip">{{tip}}</p>
            <input type="text" placeholder="请输入用户名" v-model="userName">
            <input type="password" placeholder="请输入密码" v-model="passWord">
            <button v-on:click="login">登录</button>
            <span v-on:click="ToRegister">没有账号？马上注册</span>
        </div>

        <div class="register-wrap" v-show="showRegister">
            <h3>注册</h3>
            <p v-show="errorTip">{{tip}}</p>
            <input type="text" placeholder="请输入用户名" v-model="newUsername">
            <input type="password" placeholder="请输入密码" v-model="newPassword">
            <button v-on:click="register">注册</button>
            <span v-on:click="ToLogin">已有账号？马上登录</span>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'homePage',
     data () {
         return {
            showLogin: true,
            showRegister: false,
            errorTip: false,
            tip: '帐号或密码错误',
            userName: '',
            passWord: '',
            newUsername: '',
            newPassword: '',
            nickName: false
        }
    },
    methods: {
        // v-model="username"实现数据双向数据绑定 
        login: function () {
            console.log(this.userName, "**", this.passWord, "here");
            if (!this.userName || !this.passWord) {
                this.errorTip = true;
                return;
            }
            axios.get('/users/login', {
                params: {
                    userName: this.userName,
                    password: this.password
                }
            })
            .then((response) => {
                console.log(response, 'user res');
                let res = response.data;
                if (res.status == '0') {
                    // res.status == '0'代表请求成功
                    this.nickName = true
                    this.errorTip = false;
                } else {
                    // 提示错误
                    this.errorTip = true;
                }
            })
        },
        logout: function () {
            axios.get('/users/logout').then((response) => {
                let res = response.data;
                if (res.status == '0') {
                    console.log(res, 'rere');
                } else {
                    console.log('没成功');
                }
            }).catch((err) => {
                console.log('error', err);
            })
        },
        other: function () {
            axios.get('/users/other').then((response) => {
                let res = response.data;
                console.log(res, 'other');
                if (res.status == '0') {
                    console.log(res, 'rere');
                } else {
                    console.log('没成功');
                }
            }).catch((err) => {
                console.log('error', err);
            })
        },
        ToRegister: function () {

        },
        register: function () {

        },
        ToLogin: function () {

        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.login-wrap {
    text-align:center;
}
input {
    display:block; 
    width:250px; 
    height:40px; 
    line-height:40px; 
    margin:0 auto; 
    margin-bottom: 10px; 
    outline:none; 
    border:1px solid #888; 
    padding:10px; 
    box-sizing:border-box;
}
p {
    color:red;
}
button {
    display:block; 
    width:250px; 
    height:40px; 
    line-height: 40px; 
    margin:0 auto; 
    border:none; 
    background-color:#41b883; 
    color:#fff; font-size:16px; 
    margin-bottom:5px;
}
span {
    cursor:pointer;
}
span:hover {
    color:#41b883;
}
</style>
