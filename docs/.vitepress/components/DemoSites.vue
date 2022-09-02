<script  setup>
import { ref } from 'vue'
import sites from '../assets/sites.json'

const numOfRow = ref(6)
</script>

<template>
    <table align="center">
        <tr v-for="row in Math.ceil(sites.length / numOfRow)" :key="row" align="center">
            <template v-for="col in numOfRow">
                <td v-if="sites[(row - 1) * numOfRow + col - 1]" :key="col" class="px-1 py-2">
                    <demo-site :site="sites[(row - 1) * numOfRow + col - 1]" />
                </td>
            </template>
        </tr>
    </table>
    <!--  <ul class="site-list">
        <li v-for="site in sites">
            <demo-site :site="site" />
        </li>
    </ul> -->
</template>
<style lang="less">
.site-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 120px);
    grid-gap: 10px;
    list-style: none !important;
    margin: 0px !important;
    padding: 0px !important;

    li {
        border: 1px solid #000;
    }
}
</style>