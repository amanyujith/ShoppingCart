import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '../Types/productTypes.ts';
import { useAuth0 } from '@auth0/auth0-react';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const {user } = useAuth0();
  
  useEffect(() => {
    if (user?.email) {
      const storedCarts = localStorage.getItem('carts');
      const carts = storedCarts ? JSON.parse(storedCarts) : {};
      setCart(carts[user.email] || []);
    }
  }, [user?.email])


  useEffect(() => {
    if(user?.email) {
        const storedCarts = localStorage.getItem('carts');
        const carts = storedCarts ? JSON.parse(storedCarts) : {};
        carts[user.email]=cart; 
        localStorage.setItem('carts',JSON.stringify(carts)); 

    }
}, [cart,user?.email]);


  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
    setCart(savedCart);
  }, []);
    
  // const { user } = useAuth0();
  
  const addToCart = (product: CartItem) => {
    // console.log(user?.sub);

    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
    let updatedCart;

    if (existingProductIndex !== -1) {
      updatedCart = cart.map((item, index) =>
        index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const incrementQuantity = (productId: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const decrementQuantity = (productId: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
