<template>
  <div>
    <div class="container">
      <div id="bg-image" class="bg-image" style="height: 1058px;">
      <div class="bg-blur-container bg-image" style="height: 1058px;">
        <div class="bg-blur bg-box container" style="height: 400px; top: 0px; background-position-y: 50%;"></div>
        <div class="bg-gray bg-box container" style="height: 400px; top: 0px;">
          <h1 id="site-header" class="header">A Search of Ice and Fire</h1>
          <p id="site-description">Search the full text of your favorite books.</p>
          <div class="search-container clearfix">
            <i class="color-transition icon-search" id="search-icon" style="color: rgb(119, 119, 119);"></i>
            <input type="text" id="search" class="pull-left" autocapitalize="off" autocomplete="off">
            <button id="search-button" class="js-search-button pull-left color-transition">SEARCH</button>
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
        <input id='search_link' class="w-100" @click.prevent="openFullScreenSearch">

        <div id="search" @click="closeFullScreenSearch" @keyup="closeFullScreenSearch">
            <button id=search_button type="button" class="close">×</button>
            <form id="search_form" @submit.prevent="doSearch">
                <input id="search_input"
                    type="search"
                    value=""
                    placeholder="Search For A Team" />
                <button type="submit" class="btn btn-primary">Search</button>
            </form>
        </div>
  </div>
  </div>
</template>

<script>
export default {
  props: ['apiKey'],
  data() {
    return {
      sources: [],
      source: '',
      query: [],
    };
  },
  methods: {
    openFullScreenSearch() {
      const search = document.getElementById('search');
      const searchInput = document.getElementById('search_input');

      search.classList.add('open');
      searchInput.focus();
    },
    closeFullScreenSearch(event) {
      const search = document.getElementById('search');

      if (event.target === this || event.target.className === 'close' || event.keyCode === 27) {
        search.classList.remove('open');
      }
    },
    doSearch() {
      const search = document.getElementById('search');
      const searchInput = document.getElementById('search_input');
      this.query = searchInput.value;

      search.classList.remove('open');

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

#search {
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

#search.open {
    -webkit-transform: translate(0px, 0px) scale(1, 1);
    -moz-transform: translate(0px, 0px) scale(1, 1);
    -o-transform: translate(0px, 0px) scale(1, 1);
    -ms-transform: translate(0px, 0px) scale(1, 1);
    transform: translate(0px, 0px) scale(1, 1);
    opacity: 1;
}

#search input[type="search"] {
    position: absolute;
    top: 50%;
    width: 100%;
    color: rgb(255, 255, 255);
    background: rgba(0, 0, 0, 0);
    font-size: 60px;
    font-weight: 300;
    text-align: center;
    border: 0px;
    margin: 0px auto;
    margin-top: -51px;
    padding-left: 30px;
    padding-right: 30px;
    outline: none;
}
#search .btn {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: 61px;
    margin-left: -45px;
}
#search .close {
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
</style>
