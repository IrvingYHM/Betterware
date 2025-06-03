import { createContext, useState} from "react"

export const CartContext = createContext()


export function CartProvider ({ children}){
    const [cart, setCart] = useState([])
    
    const addToCart = product => {
        const productInCartIndex = cart.findIndex(item => item.IdProducto === product.IdProducto);
      
        if (productInCartIndex >= 0) {
          const newCart = [...cart];
          newCart[productInCartIndex].quantity += product.quantity;
          setCart(newCart);
        } else {
          setCart(prevState => ([
            ...prevState,
            {
              ...product,
              quantity: product.quantity
            }
          ]));
        }
      };

    const removeFromCart = product =>{
        const productIndex = cart.findIndex(item => item.IdProducto === product.IdProducto);

        if (productIndex >= 0 && cart[productIndex].quantity > 1) {
            const updatedCart = [...cart];
            updatedCart[productIndex].quantity -= 1;
            setCart(updatedCart);
        }
    }

    const clearCart = () =>{
        setCart([])
    }

    return( 
    <CartContext.Provider value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart
    }}
    >
        {children}
    </CartContext.Provider>
    )
}