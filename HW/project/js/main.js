// class ProductList {
//   #goods;
//   #allProducts;
//   #privateProp;
//
//   constructor(container = '.products') {
//     this.container = container;
//     this.#goods = []; // data
//     this.#allProducts = []; // массив экземпляров товаров на основе this._goods
//
//     this.#fetchGoods();
//     this.#render();
//   }
//
//   get prop() {
//     return this.#privateProp;
//   }
//
//   set prop(value) {
//     if (value > 100) throw new Error('Значение больше 100');
//     this.#privateProp = value;
//   }
//
//   #fetchGoods() {
//     this.#goods = [
//       {id: 1, title: 'Notebook', price: 20000},
//       {id: 2, title: 'Mouse', price: 1500},
//       {id: 3, title: 'Keyboard', price: 5000},
//       {id: 4, title: 'Gamepad', price: 4500},
//     ];
//   }
//
//   #render() {
//     const block = document.querySelector(this.container);
//
//     for (const product of this.#goods) {
//       // console.log(new ProductItem(product).render());
//       const productObject = new ProductItem(product);
//
//       this.#allProducts.push(productObject);
//       block.insertAdjacentHTML('beforeend', productObject.render());
//     }
//   }
// }
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
/*
// В ДЗ переделать на промисы не используя fetch
var getRequest = (url, callBack) => {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error');
      } else {
        callBack(xhr.responseText);
      }
    }
  };
  xhr.send();
}
// - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
let getRequest = (url) => {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) reject('Error');
       else resolve(xhr.responseText);
    }
  };
  xhr.send();
	});
  }

  class ProductList {
    constructor(container = '.products') {
      this.container = container;
      this._goods = []; // data
      this._allProducts = []; // массив экземпляров товаров на основе this.
      document.querySelector('.products').addEventListener('click', (event) => {
        if(event.target.className == 'buy-btn') {
          const id = event.target.parentElement.parentElement.dataset.id;
          const item = this._goods.find((goodsItem) => goodsItem.id_product === parseInt(id));
          item.quantity = 1;
          this.addToBasket(item);
        }
      })
  
      this._getGoods()
          .then((data) => {
            this._goods = data;
            this._render();
          });
    }
  
    _getGoods() {
      return fetch(`${API}/catalogData.json`)
          .then(result => result.json()).catch(error => console.log(error));
    }
   
    _render() {
      const block = document.querySelector(this.container);
  
      for (const product of this._goods) {
        // console.log(new ProductItem(product).render());
        const productObject = new ProductItem(product);
  
        this._allProducts.push(productObject);
        block.insertAdjacentHTML('beforeend', productObject.render());
      }
    }
  
    addToBasket(item) {
      basketArr.push(item);
      console.log(basketArr);
    }
  }
  

class ProductItem {
  constructor(product, img='https://via.placeholder.com/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

class Basket {
  constructor(container = '.basket') {
    this.container = container;
    this._basketGoods = []; // data
    this._allBasketProducts = []; 
    
    this._getBasket()
        .then((data) => {
          this.amount = data.amount;
          this.countGoods = data.countGoods;
  //        this._renderTotal();
          this._basketGoods = data.contents;
          basketArr = this._basketGoods;
          console.log(basketArr);
 //         this._render();
        });
  }
  _getBasket() {
    return fetch(`${API}/getBasket.json`)
    .then(result => result.json()).catch(error => console.log(error));
  }

  addItem(item){
    this._basketGoods.push(item);
  }

  _render() {
    const blockBasket = document.querySelector(this.container);

    for (const product of this._basketGoods) {
      const productObject = new BasketItem(product);
      this._allBasketProducts.push(productObject);
      blockBasket.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
  _renderTotal() {
    const blockBasket = document.querySelector(this.container); 
    blockBasket.insertAdjacentHTML('afterend',`<div>Итого: ${this.amount}<div>`);
    blockBasket.insertAdjacentHTML('afterend',`<div>Всего товаров в корзине: ${this.countGoods}<div>`);
  }
}

class BasketItem {
  constructor(product) {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.quantity = product.quantity;
  }
  render() {
    return `<div class="basket-item" data-id="${this.id}">
                 <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <h3>${this.quantity}</h3>
                    <button class="buy-btn">Удалить</button>
                </div>
            </div>`;
  }
}

const basket = new Basket();
let basketArr;
const catalog = new ProductList();

// const products = [
//   {id: 1, title: 'Notebook', price: 20000},
//   {id: 2, title: 'Mouse', price: 1500},
//   {id: 3, title: 'Keyboard', price: 5000},
//   {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = (item, img='https://via.placeholder.com/200x150') => `<div class="product-item" data-id="${this.id}">
//               <img src="${img}" alt="Some img">
//               <div class="desc">
//                   <h3>${item.title}</h3>
//                   <p>${item.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//
// const renderProducts = list => {
// document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
// };
//
// renderProducts(products);

