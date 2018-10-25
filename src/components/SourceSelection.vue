<template>
  <div class="source-selection">
    <div class="jumbotron">
      <h2>
        <span class="glyphicon glyphicon-list-alt"></span>
        News List
      </h2>
      <h4>Select News source</h4>

      <select class="form-control" v-on:change="sourceChanged">
        <option
            v-bind:value="source.id"
            v-for="source in sources"
            :key="source.id">{{source.name}}</option>
      </select>

      <div v-if="source">
        <h6>{{source.description}}</h6>
        <a
            v-bind:href="source.url"
            class="btn btn-primary"
            target="_blank">Go to {{source.name}} website</a>
      </div>
    </div>
  </div>
</template>
<script>
const axios = require('axios');

export default {
  name: 'source-selection',
  props: ['apiKey'],
  data() {
    return {
      sources: [],
      source: '',
    };
  },
  methods: {
    sourceChanged(e) {
      this.sources.some((s) => {
        if (s.id === e.target.value) {
          this.source = s;
          return true;
        }
        return false;
      });
      this.$emit('sourceChanged', this.source);
    },
  },
  created() {
    axios
      .get(`https://newsapi.org/v2/sources?apiKey=${this.apiKey}`)
      .then((res) => { this.sources = res.data.sources; });
    // lohud.com/story
    // patch.com/new-york
    // democratandchronicle.com/story
    // poughkeepsiejournal.com/story
    // www.ydr.com
    // roadtosyracuse.com
    // section2athletics.org
    // pressconnects.com/story
    // mpnnow.com
    // the-leader.com
    // pickinsplinters.com
    // pressrepublican.com
    // news12varsity.com
    // newyorksportswriters.org
    // buffalonews.com/section/sports/high-schools
    // timesunion.com/sports
    // poststar.com/sports/high-school/football
    // highschoolsports.syracuse.com
    // uticaod.com/sports
    // thedailystar.com/sports
    // mpnnow.com/sports
    // niagara-gazette.com/sports/high_school_sports
    // watertowndailytimes.com/sports
    // newsday.com/sports/high-school/football
    // recordonline.com/varsity
    // news.google.com
  },
};
</script>

<style scoped>
</style>
