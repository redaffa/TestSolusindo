<template >
     <div class="d-flex justify-content-center align-items-center outside-container">
        <Form :pageName="pageName"/>
    </div>

</template>
<script>
import Form from '../components/Form.vue';
export default {
    components:{
        Form
    },
    data(){
        return{
            pageName:"Login"
        }
    }
}
</script>
<style scoped>
    .outside-container{
    min-height: 100vh;
    width: 100%;
}
</style>