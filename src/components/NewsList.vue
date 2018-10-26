<template>
  <div id="news_ctnr">
    <div class="row justify-content-center">
      <div class="col-xl-8 col-lg-9 col-md-11 col-sm-11 col-10">
        <div id="news_list">
          <div class="row">
            <div class="col-12">
              <ul>
                <li v-if="articles != null" v-for="article in articles" :key="article.cacheId">
                  <a :href="article.link" target="_blank">
                    <div class="card card-cascade narrower" >
                      <div class="view view-cascade overlay">
                        <img v-if="hasThumbnail(article)" :src="article.pagemap.cse_thumbnail[0].src" />
                        <img v-else src="https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg" style="object-fit:contain;" />
                      </div>
                      <div class="card-body card-body-cascade">
                        <h4 class="font-weight-bold card-title">{{ article.title }}</h4>
                        <p class="card-text">{{ article.snippet }}</p>
                      </div>
                    </div>
                  </a>
                </li>
                <!-- <li v-else>
                  <div class="card card-cascade narrower" >
                    <div class="card-body card-body-cascade no-results">
                      <span>No Results</span>
                    </div>
                  </div>
                </li> -->
              </ul>
            </div>
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
              VueScrollTo.scrollTo('#news_list', 1200, {});
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
              VueScrollTo.scrollTo('#news_list', 1200, {});
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

#news_ctnr {
  background-color: #eee;
}

.card.card-cascade {
    margin-top: 3rem;
    margin-bottom: 3rem;
    min-height: 220px;
}

.card {
    -webkit-box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
    border: 0;
    font-weight: 400;
}

.card {
    position: relative;
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-direction: column;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: row;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
}

ul {
  list-style: none;
}

  ul > li:nth-child(even) > a > .card {
    flex-direction: row-reverse;
  }

  ul > li:nth-child(odd) > a > .card {
    flex-direction: row;
  }

.card.card-cascade .view.view-cascade {
    margin-top: -1rem;
    margin-bottom: -1rem;
    min-width: 250px !important;
    max-width: 250px !important;
    -webkit-box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);
    box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);
    border-radius: .25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #747373
}

.view {
    position: relative;
    overflow: hidden;
    cursor: default;
}

.card-img-top {
    width: 100%;
    border-top-left-radius: calc(.25rem - 1px);
    border-top-right-radius: calc(.25rem - 1px);
}
img {
    border-style: none;
    position: relative;
    display: block;
    min-width: 100%;
    min-height: 100%;
    align-items: center;
    object-fit: cover;
    max-height: 0;
}
.overlay .mask {
    opacity: 0;
    -webkit-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}
.view .mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-attachment: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 0;
}
.card-body {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 1.25rem;
}

.card-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.9rem;
    color: black
}

.card-text {
  font-size: 1.3rem;
    color: #747373;
}

.no-results {
    font-family: 'Orbitron', sans-serif;
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #747373;
}

a {
  text-decoration: none;
}

  a:hover {
    text-decoration: none;
  }

/* Phone */
@media (max-width:576px) {
  .img-ctnr > img {
    height: 200px;
  }
}
</style>
