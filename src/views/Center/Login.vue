<template>
    <div>
        账号：<input type="text" v-model="mobile" /><br />
        密码：<input type="password" v-model="newPasswd" /><br />
        <button @click="hand()">登录</button>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            mobile: '',
            newPasswd: '',
        };
    },
    methods: {
        hand() {
            axios
                .post('/api/v1/login', {
                    mobile: this.mobile,
                    password: this.newPasswd,
                })
                .then(ret => console.log(ret.data));
        },
    },
};
</script>
