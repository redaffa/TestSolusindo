<template>
    <h1 class="text-center">View Data</h1>
    <div
        class="outside-container d-flex justify-content-center align-items-center form-row row gap-3"
    >
    <Card v-for="(user) in usersDataArray" :user="user"/>
    </div>
    <div class="d-flex justify-content-end">
        <button class="btn-primary btn d-flex justify-content-end" @click.prevent="this.$router.push(`/login`)">
        Back to Login
    </button>
    </div>
    
</template>
<script>
import { mapState,mapActions } from 'pinia';
import { useUserStore } from '../stores/counter';
import Card from "../components/Card.vue"
export default {
    computed:{
        ...mapState(useUserStore,['usersDataArray'])
    },
    methods:{
        ...mapActions(useUserStore,['fetchAllUsers'])
    },
    created(){
        this.fetchAllUsers()
    },
    components:{
        Card
    }
}
</script>
<style scoped>
.outside-container {
    width: 100%;
    min-height: 100vh;
}

</style>
