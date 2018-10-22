<template>
  <div class="news-list">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
            <div class="row mb-2"
                v-for="article in articles" v-if="articles != null" :key="article.cacheId">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row news-row">
                                <div class="col-md-3">
                                    <img class="img-fluid"
                                        v-bind:src="article.pagemap.cse_thumbnail[0].src">
                                </div>
                                <div class="col-md-9">
                                    <div class="card-body">
                                        <div class="news-content">
                                            <a target="_blank"
                                                v-bind:href="article.link">
                                                    <h2>{{article.title}}</h2>
                                            </a>
                                            <p>{{article.snippet}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'news-list',
  props: ['query', 'apiKey', 'cx'],
  data() {
    return {
      articles: [],
    };
  },
  methods: {
    updateQuery(query) {
      const trimmedQuery = query.trim();

      if (trimmedQuery.indexOf(' ') >= 0) {
        const matches = query.match(/\b(\w)/g);
        const queryAcrynm = matches.join('');

        axios
          .get(`https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&cx=${this.cx}` +
            `&q=%28intitle%3A"${trimmedQuery}"+OR+intitle%3A"${queryAcrynm}"+OR+intext%3A${trimmedQuery}+OR+intext%3A"${queryAcrynm}"%29+AND+intext%3Afootball` +
            '&sort=date')
          .then((res) => {
            console.log(this.articles);
            this.articles = res.data.items;
          });
      } else {
        axios
          .get(`https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&cx=${this.cx}` +
            `&q=%28intitle%3A"${query}"+OR+intext%3A"${query}"%29+AND+intext%3Afootball` +
            '&sort=date')
          .then((res) => {
            console.log(res.data.items);
            this.articles = res.data.items;
          });
      }
    },
  },
  watch: {
    query(val) {
      this.updateQuery(val);
    },
  },
};
</script>

<style scoped>
  .news-row {
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .card-body {
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
