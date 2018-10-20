<template>
  <div class="news-list">
    <div class="container">
    <!-- <ul class="media-list">
        <li class="media"
            v-for="news in news" :key="news.id">
          <div class="media-left">
            <a v-bind:href="news.url" target="_blank">
              <img class="media-object"
                v-bind:alt="news.description"
                v-bind:src="news.urlToImage" />
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">
              <a v-bind:href="news.url" target="_blank">{{news.title}}</a>
            </h4>
            <h5><i>{{news.author}}</i></h5>
            <p>
              {{news.description}}
            </p>
          </div>
        </li>
      </ul> -->



      <ul class="media-list">
        <li class="media"
            v-for="article in articles"
            v-if="articles != null"
            :key="article.cacheId">
          <div class="media-left">
            <a v-bind:href="article.link" target="_blank">
              <img v-if="article.pagemap != null && article.cse_thumbnail != null"
                class="media-object"
                v-bind:alt="article.snippet"
                v-bind:src="article.pagemap.cse_thumbnail[0].src" />
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">
              <a v-bind:href="article.link" target="_blank">{{article.title}}</a>
            </h4>
            <h5><i>{{article.displayLink}}</i></h5>
            <p>
              {{article.snippet}}
            </p>
          </div>
        </li>
      </ul>
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
      news: [],
    };
  },
  methods: {
    updateQuery(query) {
      query = query.trim();

      if (query.indexOf(' ') >= 0){
        let matches = query.match(/\b(\w)/g);
        let queryAcrynm = matches.join('');
        console.log(queryAcrynm);
        axios
          .get(
            `https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&cx=${this.cx}` +
            `&q=%28intitle%3A"${query}"+OR+intitle%3A"${queryAcrynm}"%29+AND+intext%3Afootball` +
            `&sort=date`)
          .then((res) => {
            this.articles = res.data.items;
          });
      }
      else {
        axios
          .get(
            `https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&cx=${this.cx}` +
            `&q=intitle%3A"${query}"%20+AND+intext%3Afootball` +
            `&sort=date`)
          .then((res) => {
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
  .media-object {
    width: 128px;
    padding: 10px;
  }
  .media {
    border-top: 1px solid lightgrey;
    padding-top: 20px;
  }
</style>
