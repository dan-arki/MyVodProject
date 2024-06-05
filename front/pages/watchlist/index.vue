<template>
  <UiHeader></UiHeader>
  <section class="flex justify-start items-center h-screen mx-10">
    <UiPostersList :titleText="'WatchList'"></UiPostersList>
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
