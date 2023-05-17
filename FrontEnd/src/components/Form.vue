<template>
    <div>
        <form class="min-height-81vh" @submit.prevent="submitForm()">
            <div class="form-col col p-5 form-container rounded">
                <h1 class="text-center">{{ pageName }}</h1>
                <div class="form-group mt-2 col-md-12">
                    <label class="mb-1" for="username">Username</label>
                    <input
                        type="email"
                        class="form-control"
                        id="username"
                        placeholder="Username"
                        v-model="userPayload.username"
                    />
                </div>
                <div class="form-group mt-2 col-md-12">
                    <label class="mb-1" for="inputPassword4">Password</label>
                    <input
                        type="password"
                        class="form-control"
                        id="inputPassword4"
                        placeholder="Password"
                        v-model="userPayload.password"
                    />
                </div>
                <div
                    v-if="pageName === `Register`"
                    class="form-group mt-2 col-md-12"
                >
                    <label class="mb-1" for="inputPassword4"
                        >Confirm Password</label
                    >
                    <input
                        type="password"
                        class="form-control"
                        id="inputPassword4"
                        placeholder="Confirm Password"
                        v-model="confirmPassword"
                    />
                </div>
                <div
                    v-if="pageName === `Register`"
                    class="form-group mt-2 col-md-12"
                >
                    <label class="mb-1" for="inputAddress">Age</label>
                    <input
                        type="number"
                        class="form-control"
                        id="age"
                        placeholder="age"
                        v-model="userPayload.age"
                    />
                </div>
                <div class="col-md-12 d-flex justify-content-end mt-4 gap-4">
                    <button
                        type="submit"
                        class="btn btn-primary mb-3 mt-2 text-white"
                    >
                        {{ pageName }}
                    </button>

                    <button
                        v-if="pageName === `Login`"
                        type="submit"
                        class="btn btn-primary mb-3 mt-2 text-white"
                        @click.prevent="$router.push('/register')"

                    >
                        register
                    </button>
                    <button
                        v-if="pageName === `Login`"
                        type="submit"
                        class="btn btn-primary mb-3 mt-2 text-white"
                        @click.prevent="$router.push('/')"

                    >
                        View Data
                    </button>
                    <button
                        v-if="pageName === `Register`"
                        type="submit"
                        class="btn btn-primary mb-3 mt-2 text-white"
                        @click.prevent="$router.push('/login')"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import { mapActions } from "pinia"
import { useUserStore } from "../stores/counter"
import Swal from "sweetalert2"
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer)
        toast.addEventListener("mouseleave", Swal.resumeTimer)
    },
})
export default {
    props: ["pageName"],
    data() {
        return {
            userPayload: {
                username: "",
                password: "",
                age: "",
            },
            confirmPassword: "",
        }
    },
    methods: {
        ...mapActions(useUserStore, ["login", "register"]),
        submitForm() {
            if (this.pageName === "Register") {
                if (this.userPayload.password === this.confirmPassword && this.userPayload.username) {
                    this.register(this.userPayload)
                } else {
                    Toast.fire({
                        icon: "error",
                        title: "Confirm password not same with the password or the input is still empty",
                    })
                }
            } else if (this.pageName === "Login"){
                this.login(this.userPayload)
            }
        },
    },
}
</script>
<style scoped>
.form-container {
    width: 500px;
    min-height: 300px;
    background-color: #99b4d1;
    border: 2px;
    border-color: gray;
}
</style>
