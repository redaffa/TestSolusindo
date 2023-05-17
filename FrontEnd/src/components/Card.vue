<template >
           <div class="container col-md-3">
            <div class="card" style="width: 18rem">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg" class="card-img-top" />
                <div class="card-body">
                    <p class="card-text">
                        Name : {{ user.username }}
                    </p>
                </div>
            </div>

        </div>
</template>
<script>
export default {
    props:['user']
}
</script>
<style scoped>
    .container {
    background-color: white;
}
</style>