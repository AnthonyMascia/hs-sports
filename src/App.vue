<template>
  <div id="app" @scroll="stickySearch">
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
      cx: '005814160350276824345:ell0sjrulya',
    };
  },
  methods: {
    doSearch(query) {
      this.query = query;
    },
    stickySearch() {
      const searchSmall = document.getElementById('search_small');
      const constSiteDescrip = document.getElementById('news_ctnr');
      const distanceToTop = constSiteDescrip.getBoundingClientRect().top;

      if (distanceToTop <= 0){
        if (!searchSmall.classList.contains('sticky'))
        {
          searchSmall.classList.add('sticky');
        }
      }
      else {
        if (searchSmall.classList.contains('sticky'))
        {
          searchSmall.classList.remove('sticky');
        }
      }
    },
  },
  created () {
    window.addEventListener('scroll', this.stickySearch);
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans|Orbitron:900');

#app {
  font-family: 'Open Sans', sans-serif;
}

::-webkit-scrollbar {
  display: none;
}
</style>
