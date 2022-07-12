<template>
    <div>
        <app-navbar />
        <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppNavbar from '../components/AppNavbar.vue';

@Component({
    components: {
        AppNavbar
    }
})
export default class DefaultLayout extends Vue {

}
</script>

<style lang="scss" scoped>

</style>