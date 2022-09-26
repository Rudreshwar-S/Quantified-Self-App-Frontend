<script>
    export default {
    methods: {
        goto_dash() {
            this.$router.push("/login");
        },
        goto_registration() {
            this.$router.push("/registration");
        }
    },
    beforeMount(){
        if(localStorage.getItem('Auth')){
            this.$router.push('/dashboard')
        }
    }
}
</script>
<template >
    <h2 class="para">Welcome to Quantified Self App</h2>
    <div class="btn1">
        <Button @click="goto_dash">Login</Button>
    </div>
    <div class="sign_up">
        <h5 class="para2">Don't have an account?</h5>
        <div class="btn2">
            <Button label="Sign Up" class="p-button-link" @click="goto_registration"/>
        </div>
    </div>
</template>
<style>
    .para{
        text-align: center;
    }
    .sign_up{
        position: absolute;
        top: 80%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
    .btn1{
        position: absolute;
        top: 40%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
    /* .btn2{
        color: skyblue;
    } */
    /* .btn2{
        position: absolute;
        top: 80%;
    } */
</style>