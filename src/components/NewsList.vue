<template>
  <div class="news-list">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="news-list">
            <div class="row card news-card" v-if="articles != null" v-for="article in articles" :key="article.cacheId">
                <div class="col-xl-3 col-12 img-ctnr">
                  <img v-if="hasThumbnail(article)" :src="article.pagemap.cse_thumbnail[0].src" />
                  <img v-else src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png" />
                </div>
                <div class="col-xl-9 col-12 info-ctnr">
                    <h2>{{ article.title }}</h2>
                    <p>{{ article.snippet }}</p>
                    <p>13 hours ago </p>
                </div>
            </div>
          </div>
          <!-- <ul class="event-list" v-if="articles != null" v-for="article in articles" :key="article.cacheId">
            <li v-bind:href="article.link">
              <img v-if="hasThumbnail(article)" :src="article.pagemap.cse_thumbnail[0].src" />
              <img v-else src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png" />
              <div class="info">
                <h2 class="title">{{article.title}}</h2>
                <p class="desc">{{article.snippet}}</p>
                <p>13 hours ago </p>
              </div>
            </li>
          </ul> -->
            <!-- <div class="row mb-2"
                v-for="article in articles" v-if="articles != null" :key="article.cacheId">
                <div class="col-md-12">
                    <div class="card news-card">
                        <div class="card-body">
                            <div class="row news-row">
                                <div class="col-md-3">
                                    <img v-if="hasThumbnail(article)" v-bind:src="article.pagemap.cse_thumbnail[0].src"
                                     class="img-fluid" >
                                     <div v-else>
                                       <span>No thumbnail</span>
                                     </div>
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
            </div> -->
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

.card.news-card {
  height: 10rem;
  flex-direction: inherit;
  margin-top: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0px 0px 5px rgba(51, 51, 51, 0.7);
  border: none;
}

.info-ctnr {
    padding: 10px 5px;
  }

.img-ctnr {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 0;
}

  .img-ctnr > img {
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
    height: 100px;
  }

.event-list {
		list-style: none;
		margin: 0px;
		padding: 0px;
	}
	.event-list > li {
		background-color: rgb(255, 255, 255);
		box-shadow: 0px 0px 5px rgb(51, 51, 51);
		box-shadow: 0px 0px 5px rgba(51, 51, 51, 0.7);
		padding: 0px;
		margin: 0px 0px 20px;
	}
	.event-list > li > time {
		display: inline-block;
		width: 100%;
		color: rgb(255, 255, 255);
		background-color: rgb(197, 44, 102);
		padding: 5px;
		text-align: center;
		text-transform: uppercase;
	}
  
	.event-list > li > img {
		width: 100%;
	}
	.event-list > li > .info {
		padding-top: 5px;
		text-align: center;
	}
	.event-list > li > .info > .title {
		font-size: 17pt;
		font-weight: 700;
		margin: 0px;
	}
	.event-list > li > .info > .desc {
		font-size: 13pt;
		font-weight: 300;
		margin: 0px;
	}
	.event-list > li > .info > ul {
		display: table;
		list-style: none;
		margin: 10px 0px 0px;
		padding: 0px;
		width: 100%;
		text-align: center;
	}
  
	.event-list > li > .info > ul > li {
		display: table-cell;
		cursor: pointer;
		color: rgb(30, 30, 30);
		font-size: 11pt;
		font-weight: 300;
        padding: 3px 0px;
	}
    .event-list > li > .info > ul > li > a {
		display: block;
		width: 100%;
		color: rgb(30, 30, 30);
		text-decoration: none;
	} 
	.event-list > li > .info > ul > li:hover {
		color: rgb(30, 30, 30);
		background-color: rgb(200, 200, 200);
	}

	@media (min-width: 768px) {
		.event-list > li {
			position: relative;
			display: block;
			width: 100%;
			height: 10rem;
			padding: 0px;
		}
    
		.event-list > li > img  {
			display: inline-block;
		}
    
		.event-list > li > img {
			width: 10rem;
			float: left;
		}
		.event-list > li > .info {
			background-color: rgb(245, 245, 245);
			overflow: hidden;
		}
		.event-list > li > img {
			padding: 0px;
			margin: 0px;
		}
		.event-list > li > .info {
			position: relative;
			height: 10rem;
			text-align: left;
			padding-right: 40px;
		}	
		.event-list > li > .info > .title, 
		.event-list > li > .info > .desc, 
		.event-list > li > .info > .time, {
			padding: 0px 10px;
		}
		.event-list > li > .info > ul {
			position: absolute;
			left: 0px;
			bottom: 0px;
		}
	}
</style>
