export default {
  formatCurrency: function (num) {
    return "GHc" + Number(num.toFixed(2)).toLocaleString() + "";
  },
};
