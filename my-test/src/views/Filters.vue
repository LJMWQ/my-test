<template>
    <div>
        <div class="nav-filter">
            <div class="filter-title" >
                <div class="title-item" 
                v-for="(item, index) in filterData"
                >
                    <div 
                    v-on:click="tabToggle(index)"
                    :class="{acitve: index == curIndex}">{{item.title}}</div>
                </div>
            </div>
            <div class="filter-text"
            v-for="(item, index) in filterData">
                <ul v-if="index == curIndex" v-show="dropActive">
                    <li class="filter-li"  
                    v-for="(list, index) in item.titleItem" 
                    v-on:click="listToggle"
                    >{{list}}</li>
                </ul>
            </div>
            
        </div>
        <div class="selected-icon">这里是筛选后的标签</div>
    </div>
</template>

<script>
import axios from 'axios';
export default
 {
     name: 'Filters',
     data() {
         return {
             filtersUrl: '/static/filter.json',
             filterData: [],
             showFilter: false,
             curIndex: 0,
             dropActive: false,
             titleTarget: ''
         }
     },
     mounted: function () {
         this.getData();
     },
     methods: {
         getData: function (api) {
             axios.get(this.filtersUrl)
             .then(response => {
                 this.filterData = response.data;
             })
             .catch((err) => {
                 console.log(err, 'errr');
             })
         },
         talentedSort: function (i) {
             this.showFilter = !this.showFilter;
         },
         tabToggle: function (index, e) {
             this.titleTarget = event.target.innerText;
             this.curIndex = index;
             this.dropActive = !this.dropActive;
         },
         dropDown: function (e) {
            // this.dropActive = !this.dropActive;
         },
         listToggle: function (e) {
             let liTarget = e.target.innerText;
             
             this.filtersUrl = this.titleTarget + liTarget;
             // 这里通过传入的innerText作为urlApi去后端获取对应的数据
         }

     }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul, li {
    list-style: none;
}
.filter-title {
    display: flex;
    display: -webkit-flex;
    border-bottom: 1px solid #eee;
    padding-top: 7px;
    padding-bottom: 7px;
}
.title-item {
    flex: auto;
}
.acitve {
    color: #000;
}
.filter-text {
    text-align: left;
}
.filter-li {
    padding: 11px 17px;
    border-bottom: 1px solid #eee;
}
.active {
    display: block;
    background: #e3e3d3;
}
.unActive {
    display: none;
}

</style>
