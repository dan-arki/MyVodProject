<!-- <script setup>
import btnPrimary from "../../components/ui/btnPrimary";
</script> -->

<template>
  <section class="min-h-screen flex justify-center items-center">
    <div
      class="w-full max-w-sm flex flex-col justify-center items-center gap-6"
    >
      <NuxtLink to="/">
        <img src="/logoMyVod.svg" alt="" />
      </NuxtLink>
      <div class="bg-white p-8 w-full rounded-2xl shadow-xl">
        <p class="text-textBlack text-center text-3xl font-bold mb-6">
          Connexion
        </p>
        <form @submit.prevent="login" class="w-full">
          <input
            class="w-full mb-5 p-3 border bg-white border-gray-300 rounded-2xl text-gray-700"
            v-model="username"
            type="text"
            placeholder="Pseudo"
            aria-label="Pseudo"
          />
          <input
            class="w-full mb-5 p-3 border bg-white border-gray-300 rounded-2xl text-gray-700"
            v-model="password"
            type="password"
            placeholder="Password"
            aria-label="Password"
          />
          <!-- Bouton Primaire component -->
          <UiBtnPrimary :btnText="'Continuer'" size="medium"></UiBtnPrimary>
        </form>
        <div class="flex gap-1 justify-center mt-5">
          <span class="font-bold text-xs text-textBlack"
            >Pas encore de compte ?</span
          >
          <NuxtLink
            to="/register"
            class="text-blue400 font-bold text-xs hover:underline"
            >S'inscrire</NuxtLink
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const response = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      });
      const data = await response.json();
      console.log(data);
      this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
