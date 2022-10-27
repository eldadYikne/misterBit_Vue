 <template>
     <input class="input-filter" type="text" v-model="filterBy.text" @input="onFilter"  placeholder="Search..."/>
</template>

<script>
export default {
data(){
    return {
        filterBy:{
            text:''
        }
    }
},
methods:{
    onFilter(){
        this.$emit('filter',this.filterBy)
    }
}
}
</script>
