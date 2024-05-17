<script setup>
import { useRoute } from "vue-router";
</script>

<template>
  <UiHeader></UiHeader>
  <section v-if="media != null" class="flex h-full mt-32 justify-evenly mx-12">
    <div
      class="gap-[94px] items-start flex-col [@media(min-width:1188px)]:flex-row w-full flex"
    >
      <div class="ga.5 flex-col items-start flex-1 min-w-0 flex">
        <UiTag></UiTag>
        <div class="gap-2.5 flex-row justify-center items-start p-2.5 flex">
          <div class="gap-2.5 flex-col items-start p-2.5 flex">
            <div class="w-[280px] h-[441px] relative rounded-xl">
              <img
                :src="media.photo_url"
                alt=""
                class="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div class="flex flex-col gap-1">
              <h3 class="text-white font-semibold">Catégorie(s) :</h3>
              <span
                v-for="categorie in media.categories"
                class="text-neutral text-left w-full h-[21px]"
              >
                {{ categorie.categorie.title }}</span
              >

              <div class="flex flex-col">
                <h3 class="text-white font-semibold">Durée :</h3>
                <span class="text-neutral text-left w-full h-[21px]">
                  {{ media.duration }} min</span
                >
              </div>
            </div>
          </div>
          <div class="gap-8 flex-col items-start p-2.5 flex">
            <div
              class="gap-2.5 flex-row justify-between items-center w-full flex"
            >
              <h2 class="text-5xl font-bold text-[#eaeff5] text-left">
                {{ media.title }}
              </h2>

              <!-- Rating stars -->
              <div
                class="gap-1.5 flex-row w-40 justify-end items-start flex"
              ></div>
              <!-- Rating stars -->
            </div>
            <div class="gap-4 flex-row items-center w-full flex">
              <UiBtnPrimary :btnText="'Watchlist'" size="medium"></UiBtnPrimary>
              <UiBtnSecondary
                :btnText="'Déjà vu'"
                size="medium"
              ></UiBtnSecondary>
            </div>
            <div class="2608853 gap-2.5 flex-col items-start w-full py-6 flex">
              <div class="2608844 gap-[9px] flex-col items-start flex">
                <span
                  class="description text-lg font-semibold text-[#eaeff5] text-left w-full h-[21px]"
                  >Description
                </span>
                <span
                  class="loremIpsumDolorSitAmetConsecteturAdipiscingElitSedDoEiusmodTemporIncididuntUtLaboreEtDoloreMagnaAliquaUtEnimAdMinimVeniamQuisNostrudExercitation text-[#78889b] text-left w-[432px]"
                  >{{ media.description }}
                </span>
              </div>
              <div class="gap-2.5 flex-col items-start w-full flex">
                <span
                  class="text-lg font-semibold text-[#eaeff5] text-left w-full h-[21px]"
                  >Réalisateur</span
                >
                <span class="text-[#78889b] text-left w-full">{{
                  media.director
                }}</span>
              </div>
            </div>
            <div
              class="gap-2.5 items-start flex"
              v-for="(platform, index) in media.platforms"
              :key="index"
            >
              <img
                :src="platform.platform.logo_url"
                class="platform relative object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="gap-2 flex flex-col items-center p-2.5">
        <div class="gap-2.5 flex flex-col items-start">
          <div class="gap-2.5 flex flex-col items-start">
            <span
              class="text-lg font-semibold text-[#eaeff5] text-left w-full h-[21px]"
              >Acteurs</span
            >
          </div>
          <div
            v-for="actor in media.actor"
            class="gap-6 flex flex-row lg:w-80 flex-wrap md:w-full items-start py-2.5"
          >
            <UiActorCol :actor="actor"></UiActorCol>
          </div>
        </div>
        <div class="gap-2.5 flex flex-col items-start py-2.5">
          <div class="gap-2.5 flex flex-col items-start w-full">
            <span
              class="text-lg font-semibold text-[#eaeff5] text-left w-full h-[21px]"
              >Bande annonce</span
            >
            <iframe
              class="w-full h-full object-cover rounded-lg"
              :src="getYoutubeEmbededUrl(media.trailer_url)"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-else>
    <div class="flex justify-center items-center h-screen">
      <UiLoader></UiLoader>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // posters: [],
      media: null,
    };
  },

  mounted() {
    this.getPosterById();
  },

  methods: {
    async getPosterById() {
      const id = useRoute().params.populars;
      try {
        const response = await fetch(`http://localhost:3333/media/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        this.media = data;
      } catch (error) {
        console.log(error);
      }
    },
    getYoutubeEmbededUrl(url) {
      const videoId = url.split("v=")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    },
  },
};
</script>

<style scoped>
.platform {
  width: 80px;
  height: 30px;
  object-fit: contain;
}
</style>
