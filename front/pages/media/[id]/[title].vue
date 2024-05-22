<script setup>
import { useRoute } from "vue-router";
import { api } from "~/lib/api";
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
              <!-- Watchlist -->
              <UiBtnPrimary
                v-if="!isInWatchlist"
                :btnText="'Ajouter à la Watchlist'"
                size="medium"
                @click="addToWatchlist"
              ></UiBtnPrimary>
              <UiBtnPrimary
                v-if="isInWatchlist"
                :btnText="'Retirer de la Watchlist'"
                size="medium"
                @click="removeFromWatchlist"
              ></UiBtnPrimary>

              <!-- Déjà vu -->
              <UiBtnSecondary
                v-if="!isInAlreadyViewed"
                :btnText="'Ajouter à Déjà vu'"
                size="medium"
                @click="addToAlreadyViewed"
              ></UiBtnSecondary>
              <UiBtnSecondary
                v-if="isInAlreadyViewed"
                :btnText="'Retirer de Déjà vu'"
                size="medium"
                @click="removeFromAlreadyViewed"
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
            :key="actor.id"
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
      isInWatchlist: false,
      isInAlreadyViewed: false,
    };
  },

  async mounted() {
    await this.loadMedia();
    this.checkWatchlist();
    this.checkAlreadyViewed();
    // console.log(this.checkWatchlist);
  },

  methods: {
    async loadMedia() {
      const id = useRoute().params.id;
      try {
        const data = await api.getMedia(id);
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

    // Watchlist
    addToWatchlist() {
      api
        .addToWatchlist(this.media.id)
        .then((data) => {
          console.log(data);
          // alert("Media ajouté à la watchlist!");
          this.isInWatchlist = true;
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout à la watchlist:", error);
          alert("Erreur lors de l'ajout à la watchlist.");
        });
    },

    checkWatchlist() {
      api
        .checkWatchlist(this.media.id)
        .then((data) => {
          this.isInWatchlist = data.isInWatchlist;
        })

        .catch((error) =>
          console.error("Erreur lors de la vérification de la watchlist", error)
        );
    },

    removeFromWatchlist() {
      api
        .removeFromWatchlist(this.media.id)
        .then((data) => {
          console.log(data);
          // alert("Media retiré de la watchlist!");
          this.isInWatchlist = false;
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de la watchlist", error);
          alert("Erreur lors de la suppression de la watchlist");
        });
    },

    // Déjà vu
    addToAlreadyViewed() {
      api
        .addToAlreadyViewed(this.media.id)
        .then((data) => {
          console.log(data);
          // alert("Media ajouté à la liste de déjà vu!");
          this.isInAlreadyViewed = true;
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout à la liste de déjà vu", error);
          alert("Erreur lors de l'ajout à la liste de déjà vu");
        });
    },

    checkAlreadyViewed() {
      api
        .checkAlreadyViewed(this.media.id)
        .then((data) => {
          console.log(data);
          this.isInAlreadyViewed = data.isInAlreadyViewed;
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la vérification de la liste de déjà vu",
            error
          );
        });
    },

    removeFromAlreadyViewed() {
      api
        .removeFromAlreadyViewed(this.media.id)
        .then((data) => {
          console.log(data);
          // alert("Media retiré de la liste de déjà vu!");
          this.isInAlreadyViewed = false;
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la suppression de la liste de déjà vu",
            error
          );
          alert("Erreur lors de la suppression de la liste de déjà vu");
        });
    },
  },
  //
};
</script>

<style scoped>
.platform {
  width: 80px;
  height: 30px;
  object-fit: contain;
}
</style>
