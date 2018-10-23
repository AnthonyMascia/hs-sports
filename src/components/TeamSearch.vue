<template>
  <div>
    <div id="search_ctnr" class="row justify-content-center">
        <div class="col-xl-6 search-bg blur"></div>
        <div class="col-xl-6 search-bg">
            <div id="search_card" class="card">
                <div class="card-body text-center">
                    <input id="search_small" type="text" placeholder="Who Ya Got?" @click="openFullScreenSearch();">
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
        <input id='search_link' class="w-100" @click.prevent="openFullScreenSearch">-->

    <div id="search_big_ctnr" @click="closeFullScreenSearch" @keyup="closeFullScreenSearch" aria-autocomplete="off">
        <button type="button" class="close">×</button>
        <form id="search_form" @submit.prevent="doSearch">
            <v-autocomplete :items="items" v-model='item' :get-label='getLabel' :min-len='0' @update-items='update' :component-item='tpl' @item-selected="itemSelected" @item-clicked="itemClicked" :input-attrs="{name: 'input-test', id: 'search_big', autocomplete: 'off'}">
            </v-autocomplete>
            <p>Selected Item:</p>
            <pre>{{ item }}</pre>
            <!-- <input id="search_big" type="search" value="" /> -->
            <button type="submit" class="btn btn-primary">Search</button>
        </form>
    </div>

    <div>
        
    </div>
  </div>
</template>

<script>
import Parallax from 'vue-parallaxy';
import VueScrollTo from 'vue-scrollto';
import ItemTemplate from './ItemTemplate.vue'
import Autocomplete from './Autocomplete.vue'
import tpl from './TplItem.vue'
import Animals from './animals.js'

export default {
  props: ['apiKey'],
  data() {
    return {
      query: [],
      itemsApi: [],
      item: {id: 9, name: 'Lion', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
      items: [],
      tpl: tpl
    };
  },
  components: {
    Parallax,
    'v-autocomplete': Autocomplete,
  },
  methods: {
    itemSelected (item) {
      console.log('Selected item!', item)
    },
    itemClicked (item) {
      console.log('You clicked an item!', item)
    },
    getLabel (item) {
      if (item) {
        return item.name
      }
      return ''
    },
    update (text) {
      this.items = Animals.filter((item) => {
        return (new RegExp(text.toLowerCase())).test(item.name.toLowerCase())
      })
    },
    openFullScreenSearch() {
      const searchCtnr = document.getElementById('search_big_ctnr');
      const searchInput = document.getElementById('search_big');

      searchCtnr.classList.add('open');
      searchInput.focus();
    },
    closeFullScreenSearch(event) {
      const searchCtnr = document.getElementById('search_big_ctnr');

      if (event.target === this || event.target.className === 'close' || event.keyCode === 27) {
        searchCtnr.classList.remove('open');
      }
    },
    doSearch() {
      const searchCtnr = document.getElementById('search_big_ctnr');
      const searchInputBig = document.getElementById('search_big');
      const searchInputSmall = document.getElementById('search_small');

      this.query = searchInputBig.value;
      searchInputSmall.value = searchInputBig.value;
      searchCtnr.classList.remove('open');

      this.$emit('doSearch', this.query);
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
    height: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
}

.search-bg {
    position: absolute;
    height: 500px;
    background: transparent
}

    .search-bg.blur {
        background-position-y: 49.9915%;
        filter: blur(7px);
        -webkit-filter: blur(7px);
        background: gray !important;
        opacity: 0.5;
    }

#search_card {
    height: 100%;
    background: transparent;
    border: none;
}

#search_card .card-body {
    justify-content: center;
    align-items: center;
    display: flex;
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
    background-color: #428bca;
    border-color: #357ebd;
    opacity: 1;
    padding: 10px 17px;
    font-size: 27px;
}


.v-autocomplete .v-autocomplete-input-group .v-autocomplete-input {
    font-size: 1.5em;
    padding: 10px 15px;
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #157977;
    width: calc(100% - 32px);
    outline: none;
    background-color: #eee;
}
</style>
