const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    cartUrl: '/getBasket.json',
    products: [],
    cart: [],
    imgCatalog: 'https://via.placeholder.com/200x150',
    imgCart: 'https://via.placeholder.com/50x100',
    show: false,
    showGoods: false,
    searchLine: ''
  },
  methods: {
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product){
      this.getJson(`${API}/addToBasket.json`)
          .then(data => {
            if(data.result === 1){
              let productId = +product.id_product;
              let find = this.cart.find(product => product.id_product === productId);
              if(find){
                find.quantity++;
              } else {
                  product.quantity = 1;
                  this.cart.push(product);
              }
            } else {
              alert('Error');
            }
          });
    },
    removeProduct(product){
      this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if(data.result === 1){
            let productId = +product.id_product;
            let find = this.cart.find(product => product.id_product === productId);
            if(find.quantity > 1){ 
              find.quantity--;
            } else { 
              this.cart.splice(this.cart.indexOf(find), 1);
            }
          } else {
            alert('Error');
          }
        });
    },

  },

  computed: {
    filterGoods(searchLine) {
      const regexp = new RegExp(this.searchLine.trim(), 'i');
      const showList = this.products.filter((product) => regexp.test(product.product_name));
      this.showGoods = (!(showList.length != 0));
            return showList;

    }
  },

  beforeCreate() {},
  created() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for(let el of data){
          this.products.push(el);
        }
      });
      this.getJson(`${API + this.cartUrl}`)
        .then(data => {
          dataProducts = data.contents;
          amount = data.amount;
          countGoods = data.countGoods;
          for(let el of dataProducts){
            this.cart.push(el);
          }
        });
  },

  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
});

