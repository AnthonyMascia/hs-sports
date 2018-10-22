<template>
  <div id="app">
    <TeamSearch :apiKey="apiKey" :cx="cx" v-on:doSearch="doSearch"></TeamSearch>
    <NewsList :apiKey="apiKey" :cx="cx" v-bind:query="query"></NewsList>

  </div>
</template>

<script>
import NewsList from './components/NewsList.vue';
import TeamSearch from './components/TeamSearch.vue';

export default {
  name: 'app',
  components: {
    NewsList,
    TeamSearch,
  },
  data() {
    return {
      query: '',
      apiKey: 'AIzaSyAaoPjbYH0gT0C_Y_2ECFwIh3w5DSmaE-s',
      cx: '005814160350276824345:ell0sjrulya',
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

</style>
