<template>
  <UiHeader></UiHeader>
  <!-- <section class="flex justify-start items-center h-screen mx-10">
    <UiPostersList :titleText="'WatchList'"></UiPostersList>
  </section> -->

  <!-- v-for watchlist -->
  <section v-if="watchlist.length > 0" class="mx-10">
    <h1 class="text-3xl font-bold text-white">Watchlist</h1>
    <div class="grid grid-cols-2 gap-4">
      <UiPoster
        v-for="media in watchlist"
        :key="media.id"
        :media="media"
      ></UiPoster>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      watchlist: [],
    };
  },

  methods: {
    async loadWatchlist() {
      try {
        const data = await api.getWatchlist();
        console.log(data);
        this.watchlist = data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
