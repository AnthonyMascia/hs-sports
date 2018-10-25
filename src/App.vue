<template>
  <div id="app">
    <TeamSearch :apiKey="apiKey" :cx="cx" v-on:doSearch="doSearch"></TeamSearch>
    <NewsList :apiKey="apiKey" :cx="cx" v-bind:query="query"></NewsList>

  </div>
</template>

<script>
import NewsList from './components/NewsList.vue';
import TeamSearch from './search/TeamSearch.vue';

export default {
  name: 'app',
  components: {
    NewsList,
    TeamSearch,
  },
  data() {
    return {
      query: '',
      apiKey: 'AIzaSyBfWEvSxJQV6vlC7FAkl5KwENFZAdJPtY8',
      cx: '005814160350276824345:bwt9yjzyyn0',
    };
  },
  methods: {
    doSearch(query) {
      this.query = query;
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato|Orbitron:900');

#app {
  font-family: 'Lato', sans-serif;
}

::-webkit-scrollbar {
  display: none;
}
</style>
