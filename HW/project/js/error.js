Vue.component('error', {

    data() {
        return {
            showEr: false,    
        }
    },

    methods: {
        showError(text) {
            console.log(text);
            this.showEr = true;
        }
    },
   
    template: ` 
       <h4 v-show = "showEr">{{this.$root.text}}</h4>    `

})