<template>
    <div>
        <div class="topNav" v-on:click="selectCity">{{curCity}}</div>
        <Filters/>
        <Scenery :curCity="curCity"/>
    </div>
</template>

<script>
import Filters from '@/views/filters';
import Scenery from '@/views/Scenery';
export default {
    name: 'contentBox',
    components: {
        Scenery,
        Filters
    },
    props: [
    ],
    data () {
        return {
            curCity: '哈尔滨'
        }
    },
    mounted: function (){
        this.$root.Bus.$on('handleClick', (value) => {
                this.curCity = value;
            });
    },
    methods: {
        selectCity: function () {
            // this.curCity = '广州';
            this.$emit('cityChange', 'you make it');
            
            
        } 
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
