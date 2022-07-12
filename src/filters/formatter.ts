import Vue from'vue'

Vue.filter('extractInitials', (name: string) => {
    const nameSplit = name ? name.split(' ') : []
    return `${nameSplit[0][0]}${nameSplit.length > 1 ? nameSplit[1][0] : ''}`
})