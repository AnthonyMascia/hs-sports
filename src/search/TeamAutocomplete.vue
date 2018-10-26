<template>
  <div class="v-autocomplete">
    <div class="v-autocomplete-input-group" :class="{'v-autocomplete-selected': value}">
      <input type="search" v-model="searchText" v-bind="inputAttrs"
            :class="inputAttrs.class || inputClass"
            :placeholder="inputAttrs.placeholder || placeholder"
            :disabled="inputAttrs.disabled || disabled"
            @blur="blur" @focus="focus" @input="inputChange"
            @keyup.enter="keyEnter" @keydown.tab="keyEnter"
            @keydown.up="keyUp" @keydown.down="keyDown" >
    </div>
    <div class="v-autocomplete-list" v-if="show">
      <div class="v-autocomplete-list-item" v-for="(item, i) in internalItems" :key="i"
        @click="onClickItem(item)"
           :class="{'v-autocomplete-item-active': i === cursor}" @mouseover="cursor = i">
        <div :is="componentItem" :item="item" :searchText="searchText"></div>
      </div>
    </div>
  </div>
</template>

<script>
import TeamItem from './TeamItem.vue';
import utils from './assets/autocomplete-utils';

export default {
  name: 'v-autocomplete',
  props: {
    componentItem: { default: () => TeamItem },
    minLen: { type: Number, default: utils.minLen },
    wait: { type: Number, default: utils.wait },
    value: null,
    getLabel: {
      type: Function,
      default: item => item,
    },
    items: Array,
    autoSelectOneItem: { type: Boolean, default: true },
    placeholder: String,
    inputClass: { type: String, default: 'v-autocomplete-input' },
    disabled: { type: Boolean, default: false },
    inputAttrs: { type: Object, default: () => ({}) },
    keepOpen: { type: Boolean, default: false },
  },
  data() {
    return {
      searchText: '',
      showList: false,
      cursor: -1,
      internalItems: this.items || [],
    };
  },
  computed: {
    hasItems() {
      return !!this.internalItems.length;
    },
    show() {
      return (this.showList && this.hasItems) || this.keepOpen;
    },
  },
  methods: {
    inputChange() {
      this.searchText = this.searchText.trim();
      this.showList = this.searchText.length > 0;
      this.cursor = -1;
      this.onSelectItem(null, 'inputChange');
      utils.callUpdateItems(this.searchText, this.updateItems);
      this.$emit('change', this.searchText);
    },

    updateItems() {
      this.$emit('update-items', this.searchText);
    },

    focus() {
      this.$emit('focus', this.searchText);
      if (this.searchText.length > 0) {
        this.showList = true;
      }
    },

    blur() {
      this.$emit('blur', this.searchText);
      this.searchText = '';
      setTimeout(() => { this.showList = false; }, 200);
    },

    onClickItem(item) {
      this.onSelectItem(item);
      this.$emit('item-clicked', item);
      this.searchText = '';
    },

    onSelectItem(item) {
      if (item && Object.keys(item).includes('id')) {
        this.internalItems = [item];
        this.searchText = this.getLabel(item);
        this.$emit('item-selected', item);
      } else {
        this.setItems(this.items);
      }
    },

    setItems(items) {
      this.internalItems = items || [];
    },

    isSelectedValue(value) {
      return this.internalItems.length === 1 && value === this.internalItems[0];
    },

    keyUp() {
      if (this.cursor > -1) {
        this.cursor = this.cursor - 1;
        this.itemView(this.$el.getElementsByClassName('v-autocomplete-list-item')[this.cursor]);
      }
    },

    keyDown() {
      if (this.cursor < this.internalItems.length) {
        this.cursor = this.cursor + 1;
        this.itemView(this.$el.getElementsByClassName('v-autocomplete-list-item')[this.cursor]);
      }
    },

    itemView(item) {
      if (item && item.scrollIntoView) {
        item.scrollIntoView(false);
      }
    },

    keyEnter() {
      if (this.showList && this.internalItems[this.cursor]) {
        this.onSelectItem(this.internalItems[this.cursor]);
        this.showList = false;
      }
    },

  },
  created() {
    utils.minLen = this.minLen;
    utils.wait = this.wait;
    this.onSelectItem(this.value);
  },
  watch: {
    items(newValue) {
      this.setItems(newValue);
      const item = utils.findItem(this.items, this.searchText, this.autoSelectOneItem);
      if (item) {
        this.onSelectItem(item);
        this.showList = false;
      }
    },
    value(newValue) {
      if (!this.isSelectedValue(newValue)) {
        this.onSelectItem(newValue);
        this.searchText = this.getLabel(newValue);
      }
    },
  },
};
</script>

<style>
.v-autocomplete {
    height: 100%;
}

.v-autocomplete .v-autocomplete-input-group .v-autocomplete-input {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    color: rgb(255, 255, 255);
    background: rgba(0, 0, 0, 0);
    font-size: 60px;
    font-weight: 300;
    border: 0px;
    margin: 0px auto;
    outline: none;
}

.v-autocomplete-list
{
  margin-top: 15px;
  position: absolute;
  top: 100%;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100px;
  max-height: 600px;
  min-height: 400px;
  overflow: auto;
}

.v-autocomplete-list-item {
    color: #888;
    font-size: 24px;
    line-height: 24px;
    cursor: pointer;
    text-decoration: none;
    padding: 0 0 20px;
    background: rgba(0, 0, 0, 0) !important;
}

  .v-autocomplete-list-item:hover, .v-autocomplete-item-active {
    color: #f2f2f2;
    outline: none;
    background: rgba(0, 0, 0, 0) !important;
}
</style>
