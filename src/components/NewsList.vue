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
                                <div v-if="hasThumbnail(article)" class="col-md-3">
                                    <img v-bind:src="article.pagemap.cse_thumbnail[0].src"
                                     class="img-fluid" >
                                </div>
                                <div v-else class="col-md-3">
                                    <span>No thumbnail</span>
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
            <div class="row mb-2" v-if="articles == null">
              No Results
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
const VueScrollTo = require('vue-scrollto');

export default {
  name: 'news-list',
  props: ['query', 'apiKey', 'cx'],
  data() {
    return {
      articles: [],
    };
  },
  methods: {
    hasThumbnail(obj) {
      if (obj.pagemap !== undefined && obj.pagemap.cse_thumbnail !== undefined) {
        return true;
      }

      return false;
    },
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
            this.articles = res.data.items;

            if (res.data.items !== undefined) {
              VueScrollTo.scrollTo('.news-list', 1200, {});
            }
          });
      } else {
        axios
          .get(`https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&cx=${this.cx}` +
            `&q=%28intitle%3A"${query}"+OR+intext%3A"${query}"%29+AND+intext%3Afootball` +
            '&sort=date')
          .then((res) => {
            this.articles = res.data.items;

            if (res.data.items !== undefined) {
              VueScrollTo.scrollTo('.news-list', 1200, {});
            }
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
