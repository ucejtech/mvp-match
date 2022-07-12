import Vue from 'vue';

Vue.filter('extractInitials', (name: string) => {
  const nameSplit = name ? name.split(' ') : [];
  return nameSplit.map((name) => name.charAt(0).toUpperCase()).join('');
});
