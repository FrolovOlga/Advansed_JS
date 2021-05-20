Vue.component('products', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: 'https://via.placeholder.com/200x150',
            showGoods: false,
        }
    },
    methods: {
        filter(){
            let regexp = new RegExp(this.$root.$refs.search.userSearch.trim(), 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
            this.showGoods = (!(this.filtered.length != 0));
        }
        
    },
    mounted(){
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <h2 v-if = "showGoods"> Нет данных. </h2>
            <product  v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
    <div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}₽</p>
                         <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
<!-- 2                    <button class="buy-btn" @click="$parent.$parent.$refs.cart.addProduct(product)">Купить</button>-->
                </div>
            </div>
    `
});
