
class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this._goods = []; // data
    this._allProducts = []; // массив экземпляров товаров на основе this._goods

    this._fetchGoods();
    this._render();
    this.count();
  }

  _fetchGoods() {
    this._goods = [
      {id: 1, title: 'Notebook', price: 20000},
      {id: 2, title: 'Mouse', price: 1500},
      {id: 3, title: 'Keyboard', price: 5000},
      {id: 4, title: 'Gamepad', price: 4500},
    ];
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
  count () {//Суммарная стоимость всех товаров
    this.cost = this._goods.reduce(function (prev,curr) { 
        return prev + curr.price}, 0);
    console.log(this.cost);
  }
}

class ProductItem {
  constructor(product, img='https://via.placeholder.com/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
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

class BasketItem {//пустые классы для элемента корзины
  constructor({product, quantity = 1}) {
      this.title = product.title;
      this.price = product.price;
      this.id = product.id;
      this.quantity = quantity;
  }
  render() {}
  changeQuantity() {}
  changeColor() {}
  changeSize() {}
}

class Basket {//пустые классы для корзины
  constructor() {
      this.basketGoods = [];
      this.fetchData();
  }
  fetchData () {}
  render() {}
  clearBasket () {}
  deleteItem () {}
  addItem () {}
  promoCode () {}
  totalPrice () {}
}


const catalog = new ProductList();


