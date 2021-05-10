'use strict';
let classname;
const selectionPrice= '.itemPrice';
const selectionCalories = '.itemCalories';
let priceMain, caloriesMain, caloriesChoice, priceChoice;
let priceTopping = 0;
let caloriesTopping = 0;
const result1 = document.querySelector('.calculating__result1 span');
const result2 = document.querySelector('.calculating__result2 span');
class ProductItem {
    constructor ({id, title, price , calories}) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.calories = calories;
    }
    render () {
		return  `<div class="item" id="${this.id}">
          <h4>${this.title}</h4>
          <p class="itemPrice">${this.price} рублей</p>
          <p class="itemCalories">${this.calories} ккал</p>
        </div>
      `;
	}

}
class ProductList {
    constructor () {
        this.products = [];
        this.fetchProduct(); 
        this.choice = [];
        this.fetchChoice()
        this.topping = [];
        this.fetchTopping();
        
    }
    fetchProduct () {
        this.products = [
            {id: 'small', title: 'Маленький гамбургер', price: 50, calories: 20},
            {id: 'big', title: 'Большой гамбургер', price: 100, calories: 40}
        ]
        this.foo = this.products;
        classname = '.product';
        this.render();
    }
    fetchChoice () {
        this.choice = [
            {id: 'cheese', title: 'Сыр', price: 10, calories: 20},
            {id: 'salad', title: 'Салат', price: 20, calories: 5},
            {id: 'potatoes', title: 'Картофель', price: 15, calories: 10}
        ]
        this.foo = this.choice;
        classname = '.choice'
        this.render();
    }
    
    fetchTopping () {
        this.topping = [
            {id: 'flavoring', title: 'Приправа', price: 15, calories: 0},
            {id: 'mayo', title: 'Майонез', price: 20, calories: 5},
        ]
        this.foo = this.topping;
        classname = '.topping'
        this.render();
    }
    render () {
        const goodsList = this.foo.map(item => {
            const goodsItem = new ProductItem(item);
            return goodsItem.render();
        });
        document.querySelector(classname).innerHTML = goodsList.join('');
    }
    }

const productList = new ProductList();
const startProduct = document.querySelector('#small');
const startChoice = document.querySelector('#cheese');
startProduct.classList.add('activeClass');
startChoice.classList.add('activeClass');
priceMain = option(startProduct, selectionPrice);
caloriesMain = option(startProduct, selectionCalories);
priceChoice = option(startChoice, selectionPrice);
caloriesChoice = option(startChoice, selectionCalories);

function getInformashion(parentSelector) {
    const elements = document.querySelectorAll(`${parentSelector} div`);
    elements.forEach(elem => {
        elem.addEventListener('click', (e) => {  
            let optionItem = e.currentTarget;
            let pr = option(optionItem, selectionPrice);
            let cc = option(optionItem, selectionCalories);            
           if(parentSelector == '.product') {
                priceMain = pr;
                caloriesMain = cc;

           } else if (parentSelector == '.choice') {
                priceChoice = pr;
                caloriesChoice = cc;

           } else { 
               if(priceTopping == 0 || priceTopping != pr) {
                    priceTopping = pr;
                    caloriesTopping = cc;
               } else {
                priceTopping = 0;
                caloriesTopping = 0;
               }
                
        }                     
       
            calcTotal();

            if(parentSelector == '.topping') {
                if(!optionItem.classList.contains('activeClass')) {
                    elements.forEach(elem => {
                        elem.classList.remove('activeClass');
                    });
                    elem.classList.add('activeClass');
                } else {
                    elements.forEach(elem => {
                        elem.classList.remove('activeClass');
                    });
                }
            } else {
                elements.forEach(elem => {
                    elem.classList.remove('activeClass');
                });
                elem.classList.add('activeClass');
            }
    })
});

}
function calcTotal() {
    result1.textContent = priceMain + priceChoice + priceTopping;
    result2.textContent = caloriesMain + caloriesChoice + caloriesTopping;
}

function option(optionItem, selection) {
    return  parseInt((optionItem.querySelector(selection).textContent).match(/\d/g).join(''));
}

calcTotal();
getInformashion('.product');
getInformashion('.choice');
getInformashion('.topping');
