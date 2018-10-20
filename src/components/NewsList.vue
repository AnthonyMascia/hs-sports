<template>
  <div class="news-list">
    <div class="container">
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
    };
  },
  methods: {
    updateQuery(query) {
      axios
        .get(`https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&cx=${this.cx}&q=football%20%22${query}%22&sort=date`)
        .then((res) => {
          this.articles = res.data.items;
        });
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
