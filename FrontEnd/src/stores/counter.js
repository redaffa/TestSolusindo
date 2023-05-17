import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios"
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
export const useUserStore = defineStore('user', {
  state:()=>({
    usersDataArray : []
  }),
  getters:{},
  actions:{
    async register(payload){
      try {
        const {data} = await axios({
          method:"post",
          url:"http://localhost:3000/userRegister",
          data: payload
        })
        this.router.push("/login")
        Toast.fire({
          icon: "success",
          title: "Succesful Register",
      })
      } catch (err) {
        console.log(err)
      }
    },
    async login(payload){
      try {
        const {data} = await axios({
          method:"post",
          url:"http://localhost:3000/userLogin",
          data: payload
        })
        console.log(data)
        localStorage.setItem("access_token",data.access_token)
        this.router.push("/")
      } catch (err) {
        console.log(err)
      }
    },
    async fetchAllUsers(){
      try {
        const {data} = await axios({
          method:"get",
          url:"http://localhost:3000/user"
        })
        this.usersDataArray = data
      } catch (err) {
        console.log(err)
      }
    }
  }
})
