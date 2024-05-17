<template>
  <UiHeader></UiHeader>
  <section class="min-h-screen flex flex-col justify-start gap-8">
    <!-- Slider -->
    <UiSlider></UiSlider>

    <!-- Barre de recherche -->
    <UiSearchBar class="mt-4"></UiSearchBar>

    <!-- Filtres -->
    <div class="flex justify-between mx-10">
      <UiPlatformTag></UiPlatformTag>
      <div class="flex gap-4">
        <UiTag :tagText="'Films'"></UiTag>
        <UiTag :tagText="'Séries'"></UiTag>
      </div>
    </div>

    <!-- Listes nouveautés -->
    <article class="mx-10">
      <UiPostersList :titleText="'Nouveautés'"></UiPostersList>
    </article>

    <!-- Listes plus populaires -->
    <article class="mx-10">
      <UiPostersList :titleText="'Les plus populaires'"></UiPostersList>
    </article>

    <!-- Liste trailers -->
    <article class="flex flex-col gap-8 mx-10 mt-16">
      <h2 class="font-semibold text-5xl self-center text-white">Trailers</h2>
      <UiTrailersList></UiTrailersList>
    </article>

    <!-- Liste Autres plateformes -->
    <article class="flex flex-col gap-8 mx-10 mt-16">
      <h2 class="font-semibold text-5xl self-center text-white">
        Découvrez d’autres plateformes
      </h2>
      <UiPlatformsList></UiPlatformsList>
    </article>
  </section>
</template>
