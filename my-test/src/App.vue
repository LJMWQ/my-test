<template>
  <div id="app">
    <!--<cityPage v-show="selected" v-on:listenToChild="sendMsg" />
    <contentBox v-show="contentShow" @cityChange="handleChange"/>
    
    <router-view/>-->
    <homePage></homePage>
  </div>
</template>

<script>
import Vue from 'Vue'
import cityPage from '@/views/cityPage'
import contentBox from '@/views/contentBox'
import homePage from '@/views/homePage'

// 还是不会用router

export default {
  name: 'App',
  components: {
    cityPage,
    contentBox,
    homePage
  },
  data() {
    return {
      contentShow: true,
      selected: false,
    }
  },
  methods: {
    sendMsg: function(data) {
       this.selected = !this.selected;
       this.contentShow = !this.contentShow;
    },
    handleChange: function(value) {
    this.selected = !this.selected;
    this.contentShow = !this.contentShow;
    
  }

  },
  
  
}
</script>

<style>
body {
  margin: 0;
}
html, body, div, span, object, iframe,h1, h2, 
h3, h4, h5, h6, p, blockquote, pre,abbr, address, cite, code,del, dfn, 
em, img, ins,kbd, q, samp,small, strong, sub, sup, var,b, i,dl, dt, dd, 
ol, ul, li,fieldset, form, label, legend,table, caption, tbody, 
tfoot,thead,tr, th, td,article, aside, canvas, details, figcaption, 
figure, footer, header, hgroup, menu, nav, section, summary,time, mark, 
audio, video {
    margin:0;
    padding:0;
    border:0;
    outline:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
    outline-style:none;/*FF*/ 
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
