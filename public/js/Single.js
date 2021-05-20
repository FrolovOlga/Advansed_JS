Vue.component('single', {
    data(){
        return {
            showSingle: false,
            item: {},
        }
    },
    methods: {
        showProduct(product){
            this.showSingle = true;
            this.item = product;
        }
    },

    template: `
    <div class="single" v-show="showSingle">
    <button class="buy-btn" @click="showSingle = !showSingle">Вернуться к списку товаров</button>
                <img :src="item.img" alt="Some img">
                <div class="description">
                    <h3 >{{item.product_name}}</h3>
                    <p class = "descr">{{item.descr}}</p>
                    <p>Цена: {{item.price}}₽</p>

                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(item)">Купить</button>
                    <button class="buy-btn" @click="showSingle = !showSingle">Вернуться к списку товаров</button>
                </div>
            </div>
    `
});