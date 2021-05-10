const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',

    data: {
        text: 'Ошибка вывода данных!'
    },
    
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.$refs.error.showError(this.text);
                })
        },
    },
    mounted() {
        console.log(this);
    }
});

