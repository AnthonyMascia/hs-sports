<template>
  <div>
    <div id="search_ctnr" class="row justify-content-center">
        <div class="col-xl-6 search-bg blur"></div>
        <div class="col-xl-6 search-bg">
            <div id="search_card" class="card">
                <div class="card-body text-center">
                    <h1 id="site-header" class="header">A Search of Ice and Fire</h1>
                    <p id="site-description">Search your favorite NY state high school sports teams.</p>
                    <input id="search_small" type="text"
                        placeholder="Who Ya Got?" spellcheck="false"
                        @click="openFullScreenSearch(); scrollToTop();">
                </div>
            </div>
        </div>
    </div>
    <div class="parallax-container">
        <parallax :speed-factor="0.3" direction="up" breakpoint="(min-width: 80px)">
            <img src="../assets/img/football-bg.jpg" class="parallax-img">
        </parallax>
    </div>
      <!-- <div id="bg-image" class="bg-image" style="height: 1058px;">
      <div class="bg-blur-container bg-image" style="height: 1058px;">
        <div class="bg-blur bg-box container"
            style="height: 400px; top: 0px; background-position-y: 50%;"></div>
        <div class="bg-gray bg-box container"
            style="height: 400px; top: 0px;">
          <h1 id="site-header" class="header">A Search of Ice and Fire</h1>
          <p id="site-description">Search the full text of your favorite books.</p>
          <div class="search-container clearfix">
            <i class="color-transition icon-search" id="search-icon"
                style="color: rgb(119, 119, 119);"></i>
            <input type="text" id="search" class="pull-left"
                autocapitalize="off" autocomplete="off">
            <button id="search-button"
                class="js-search-button pull-left color-transition">SEARCH</button>
          </div>
          <div class="social-container">
            <a href="http://www.facebook.com/sharer.php?u=" class="right social-icon" data-social="facebook">
              <img src="/4a64baac3af583dce5b10aab9cee3b73f499cd0a/img/facebook.png">
            </a>
            <a href="http://twitter.com/intent/tweet?url=" class="left right social-icon" data-social="twitter">
              <img src="/4a64baac3af583dce5b10aab9cee3b73f499cd0a/img/twitter.png">
            </a>
            <a href="https://plusone.google.com/_/+1/confirm?hl=en&amp;url=" class="left social-icon" data-social="google">
              <img src="/4a64baac3af583dce5b10aab9cee3b73f499cd0a/img/google.png">
            </a>
          </div>
        </div>
      </div>
    </div>
        <input id='search_link' class="w-100" @click.prevent="openFullScreenSearch"> -->

    <div id="search_big_ctnr">
        <button type="button" class="close" @click="closeFullScreenSearch">×</button>
        <div id="search_form">
            <div class="row justify-content-center">
                <div class="col-xl-6">
                    <v-autocomplete
                        :items="items" v-model='item' :get-label='getLabel'
                        @update-items='update' :component-item='tpl'
                        @item-selected="itemSelected" @item-clicked="itemClicked"
                        :input-attrs="{id: 'search_big', autocomplete: 'off', spellcheck: 'false'}">
                    </v-autocomplete>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Parallax from 'vue-parallaxy';
import VueScrollTo from 'vue-scrollto';
import Autocomplete from './Autocomplete.vue';
import tpl from './ItemTemplate.vue';
import Teams from './assets/teams';

export default {
  props: ['apiKey'],
  data() {
    return {
      query: [],
      itemsApi: [],
      item: { },
      items: [],
      tpl,
    };
  },
  components: {
    Parallax,
    'v-autocomplete': Autocomplete,
  },
  methods: {
    itemSelected(item) {
      if (item.id !== undefined) {
        this.doSearch(item.name);
      }
    },
    itemClicked(item) {
      if (item.id !== undefined) {
        this.doSearch(item.name);
      }
    },
    getLabel(item) {
      if (item) {
        return item.name;
      }
      return '';
    },
    update(text) {
      this.items = Teams.filter(item =>
        (new RegExp(text.toLowerCase())).test(item.name.toLowerCase()));
    },
    openFullScreenSearch() {
      const searchCtnr = document.getElementById('search_big_ctnr');
      const searchInputBig = document.getElementById('search_big');
      const searchInputSmall = document.getElementById('search_small');

      // searchInputBig.value = '';
      searchInputSmall.style.display = 'none';
      searchCtnr.classList.add('open');
      searchInputBig.focus();
    },
    closeFullScreenSearch(event) {
      const searchCtnr = document.getElementById('search_big_ctnr');
      const searchInputSmall = document.getElementById('search_small');

      if (event.target === this || event.target.className === 'close' || event.keyCode === 27) {
        searchCtnr.classList.remove('open');
        searchInputSmall.style.display = 'block';
      }
    },
    doSearch(teamName) {
      const searchCtnr = document.getElementById('search_big_ctnr');
      const searchInputBig = document.getElementById('search_big');
      const searchInputSmall = document.getElementById('search_small');

      this.query = teamName;
      searchInputBig.value = teamName;
      searchInputSmall.value = teamName;
      searchCtnr.classList.remove('open');
      searchInputSmall.style.display = 'block';

      this.$emit('doSearch', this.query);
    },
    scrollToTop() {
      VueScrollTo.scrollTo('body', 600, {});
    },
  },
  created() {
  },
};
</script>

<style scoped>
body {
    padding: 40px 0px;
}

#search_ctnr {
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 300px;
    justify-content: center;
    align-items: center;
    display: flex;
}

.search-bg {
    position: absolute;
    height: 300px;
    background: transparent
}

    /* .search-bg.blur {
        filter: blur(7px);
        -webkit-filter: blur(7px);
        background: url(../assets/img/football-bg.jpg) no-repeat center center;
        background-attachment: fixed !important;
        background-size: cover !important;
        background-position-y: 0;
    } */

#search_card {
    height: 100%;
    background: transparent;
    border: none;
}
.Masthead {
    height: 100vh !important;
}

#search_small {
    height: 100%;
    background: #fff;
    border-radius: .5px;
    border: 0;
    display: block;
    width: 100%;
    padding: 10px 32px;
    font-size: 20px;
}

#search_big_ctnr {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);

    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;

    -webkit-transform: translate(0px, -100%) scale(0, 0);
    -moz-transform: translate(0px, -100%) scale(0, 0);
    -o-transform: translate(0px, -100%) scale(0, 0);
    -ms-transform: translate(0px, -100%) scale(0, 0);
    transform: translate(0px, -100%) scale(0, 0);

    opacity: 0;
}

#search_big_ctnr.open {
    -webkit-transform: translate(0px, 0px) scale(1, 1);
    -moz-transform: translate(0px, 0px) scale(1, 1);
    -o-transform: translate(0px, 0px) scale(1, 1);
    -ms-transform: translate(0px, 0px) scale(1, 1);
    transform: translate(0px, 0px) scale(1, 1);
    opacity: 1;
}

#search_form {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center
}

    #search_form div.row {
        width: 100%;
        height: 65px;
        display: flex;
        justify-content: center;
        align-items: center
    }

        #search_form div.row > div {
            height: 100%;
        }

#search_big_ctnr .btn {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: 61px;
    margin-left: -45px;
}
#search_big_ctnr .close {
    position: fixed;
    top: 15px;
    right: 15px;
    color: #fff;
    opacity: 1;
    padding: 10px 17px;
    font-size: 27px;
}
</style>
