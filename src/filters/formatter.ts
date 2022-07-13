import Vue from 'vue';

Vue.filter('extractInitials', (name: string) => {
  const nameSplit = name ? name.split(' ') : [];
  return nameSplit.map((name) => name.charAt(0).toUpperCase()).join('');
});

Vue.filter('formatCurrency', (bal: null | number | string) => {
  const currency = 'USD';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
    Number(bal || 0)
  );
});
