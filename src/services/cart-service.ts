import { OrderDTO, OrderItemDTO } from "../models/order";
import * as cartRepository from "../localstorage/cart-repository"
import { ProductDTO } from "../models/product";

export function saveCart(cart: OrderDTO){
    cartRepository.save(cart);
}

export function getCart() : OrderDTO {
    return cartRepository.get();
}

export function addProduct(product: ProductDTO) {
    const cart = cartRepository.get(); //acessa o carrinho
    const item = cart.items.find(x => x.productId === product.id); //procura no carrinho se existe um item com o mesmo id do item que esta sendo inserido
    if(!item) { // se o item NAO existir no carrinho, adiciona o item
        const newItem = new OrderItemDTO(product.id, 1, product.name, product.price, product.imgUrl) //Instancia o item na variavel com os valores que chegaram de argumento
        cart.items.push(newItem); //Push salva o item em memoria do computador
        cartRepository.save(cart); //cartRepository salva o item no localStorage
    }
}

export function clearCart(){
    cartRepository.clear();
}