<template>
    <div class="citys" >
        <div>选择城市</div>
        <div class="search-city">
            <input type="text" placeholder="请输入要搜索的城市" v-model="citySearch"/>
        </div>
         
        <div class="city-wrapper">
            <div class="city-contents">
            </div>
            <div v-for="city in showCity" class="city-item"> 
                <div><a :id="city.letter">{{city.letter}}</a></div>
                <div v-on:click="sendMsgToPa" v-for="item in city.cityList">{{item}}</div>
            </div>
            
        </div>
        <aside class="letters">
            <ul>
                <li v-for="iLetter in showCity" v-on:click="aLocate(iLetter.letter)" :class="iLetter.letter">{{iLetter.letter}}</li>
            </ul>
        </aside>
    </div>
    
</template>
<script>
    // import contentBox from '@/components/content-box';
    import axios from 'axios';
    const pinyin = require('pinyin');
    
    // alert(pinyin("金梅", {
    //     style: pinyin.STYLE_NORMAL
    // }));
    export default {
        name: 'cityPage',
        props: [
        ],
        data () {
            return {
                curCity: '北京',
                hotCity: '哈尔滨',
                gridColumns: ['a', 'b', 'c', 'd'],
                gridData: [],
                apiUrl: '/static/city.json',
                showCity: [],
                showCityTemp: [],
                cityAll : [],
                citySearch: '',
                tipString: 'B',
                showFlag: false
            }
        },
        
    components: {
    },
    mounted: function() {
        this.getData();
     },
    methods: {
        sendMsgToPa: function (e) {
            console.log("触发了cityPage");
            this.$root.Bus.$emit('handleClick', e.target.innerText);
            this.$emit('listenToChild', e.target.innerText);
        },
        getFirstLetter: function (str){
            return pinyin(str)[0][0].charAt(0).toUpperCase();
        },
        // buildLetter
        makeLetterArr: function () {
            let letters = [];
            for (let i = 0; i < 26; i ++) {
                let obj = {};
                obj.letter = String.fromCharCode((65+i));
                obj.cityList = [];
                
                letters.push(obj);
                
            }
            
            return letters;
        },
        // buildItem
        makeCity: function (cityAll) {
            
            let _letters = this.makeLetterArr();
            let _this = this;
            // 将所有城市按字母分类
            for (let i = 0; i < cityAll.length; i ++) {
                let _index = Number(_this.getFirstLetter(cityAll[i]).charCodeAt() - 65);
                if(_index >= 0 && _index < 26) {
                    _letters[_index].cityList.push(cityAll[i]);
                }
            }
            _this.showCity = _letters.filter(function(item) {
                let listLen = item.cityList.length;
                return listLen > 0;
            });
            _this.showCityTemp = _this.showCity;
            // console.log(_this.showCityTemp, 'newLetters');
        },
        getData: function() {
            axios.get('/citypages')
            .then((response) => {
                console.log(response, "cityPage");
                 let cityData = response.data.result.list[0];
                 this.getFirstLetter(cityData.provinces[0].citys[0].citysName);

                 
                 let provincesLen = cityData.provinces.length;
                 // 提取所有城市名称
                 for (let i = 0 ; i < provincesLen; i ++) {
                     if (i < provincesLen - 1) {
                         for (let j = 0; j < cityData.provinces[i].citys.length; j ++ ) {
                             this.cityAll.push(cityData.provinces[i].citys[j].citysName);
                         }                    
                     }
                 }                 
                 this.makeCity(this.cityAll);
            })
            .catch(function(response){
                console.log(response, 'catch');
            })
        },
        aLocate: function (id) {
            this.tipString = id;
            let curId = document.getElementById(id);
            let oPos = curId.offsetTop;
            return window.scrollTo(0, oPos - 36);
            // console.log(curId, 'success');
        },
        cityFilter: function (city) {
            let showCityListTemp;
            this.makeCity(this.cityAll);
            let newShowCity = this.showCityTemp;
            newShowCity = this.showCity.filter(function (item){
                let showCityList = item.cityList;
                showCityListTemp = showCityList.filter(function (value) {
                    return value.indexOf(city) > -1
                });
                item.cityList = showCityListTemp;
                return item.cityList.length > 0;
            });
            this.showCity = newShowCity;
            if (this.showCity.length === 0) {
                let contents = document.getElementsByClassName('city-contents')[0];
                contents.innerText = '查询不到结果';
            } else {
                document.getElementsByClassName('city-contents')[0].innerText = '';
            }
        }
       
    },
    watch: {
        citySearch: function (newCityName) {
            this.cityFilter(newCityName);
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .citys {
        position: relative;
    }
    .letters {
        position: fixed;
        right: 0;
    }
    .city-wrapper {
        position: absolute;
    }
    
    ul, li {
        list-style: none;
    }
    a {
        color: #555;
        text-decoration: none;
    }
    
    .city-block {
        position: absolute;
        z-index: 4;
        left: 0;
        width: 100%;
        background-color: #f4f4f4;
    }
    .search-city {
        width: 335px;
        height: 30px;
        margin-top: 10px;
        border: 1px solid black; 
        border-radius: 30px;
        color: #999;
        text-align: center;
        line-height: 30px;
        background: #fff;
    }
    .search-city > input {
        
    }
    .hot-city {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #eee;
    }
    .city-bg {
        background: #fff;
    }
    .located-city {
        display: block;
        width: 80px;
        height: 35px;
        margin-left: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
        line-height: 35px;
        text-align: center;
    }
</style>