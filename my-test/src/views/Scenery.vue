<template>
    <div class="content-wrap">
        <div  v-for="item in cityData">
            <ul v-if="item.cityName == curCity">
                <li v-for="val in item.data" class="c-row">
                    <div class="scenery-pic showDis c-span4"><img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2601851995,2958632208&fm=173&s=EB520AD04B105ED809A5C45F03009067&w=218&h=146&img.JPEG"/></div>
                    <div class="showDis c-span8">
                        <p class="text-left">{{val.title}}</p>
                        <div class="senLocate text-left">{{val.location}}</div>
                        <div class="text-left">
                            <div class="senType showDis">{{val.grade}}</div>
                            <div class="senPrice showDis">{{val.price}}</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Scenery',
     data () {
         return {
             cityData: [],
             curCity: '北海市'
         }
     }, 
     mounted: function () {
         this.getData();
     },
     methods: {
         getData: function() {
             axios.get('/goods')
             .then((response) => {
                 
                 let res = response.data;
                 this.cityData = res.result.list;
             }).catch((err) => {
                 console.log('error:' + err);
             })
         }
     }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-wrap {
    margin: 10px 16px;
}
.c-row {
    display: flex;
    width: auto;
}
.c-row .c-span4 {
    flex: 4;
    width: 33.33333%;
    margin-right: 15px;
}
.c-row .c-span4 img {
    width: 120px;
    height: 120px;
}
.c-row .c-span8 {
    flex: 8;
}
.c-row .showDis {
    display: inline-block;
    
}
.text-left {
    text-align: left;
    margin-top: 10px;
}

.scenery-pic {

}

</style>
