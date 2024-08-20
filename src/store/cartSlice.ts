import { createSlice } from '@reduxjs/toolkit';
interface CartItem{
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    description: string;
    rating: {
        rate: number;
        count: number;
    };
    quantity: number;
}
interface UserCart {
    user: string;
    cart: CartItem[]
    total: number;
}
export interface InitialState {
    cartList: UserCart[];
}
const initialState: InitialState = {
    cartList: [],
}


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart:(state,action)=>{
        const {user,product} = action.payload;
        
        const userCart = state.cartList.find((cart)=>cart.user===user)
        if(userCart){
            const existingProduct =userCart.cart.find((item)=>item.id===product.id)
            if(existingProduct){
                existingProduct.quantity+=1
            }
            else{
                userCart.cart.push({...product,quantity:1})
            }
        }
        else{
            state.cartList.push({
                user,
                cart:[{...product,quantity:1}],
                total:product.price
            })
        }
        if(userCart){
            userCart.total=userCart.cart.reduce((acc,cur)=>acc+cur.price*cur.quantity,0)
        }
    },
   removeFromCart:(state,action)=>{
        const {user,id} = action.payload;
        const userCart = state.cartList.find((cart)=>cart.user===user)
        if(userCart){
            const product = userCart.cart.find((item)=>item.id===id)
            if(product){
                userCart.cart=userCart.cart.filter((item)=>item.id!==id)
                userCart.total=userCart.cart.reduce((acc,cur)=>acc+cur.price*cur.quantity,0)
            }
        } 
   },
    incrementQuantity:(state,action)=>{
            const {user,id} = action.payload;
            const userCart = state.cartList.find((cart)=>cart.user===user)
            if(userCart){
                const product = userCart.cart.find((item)=>item.id===id)
                if(product){
                    product.quantity+=1
                    userCart.total= userCart.cart.reduce((acc,cur)=>acc+cur.price*cur.quantity,0)
                }
            }
    },
    decrementQuantity: (state,action)=>{
        const {user,id} = action.payload;
        const userCart = state.cartList.find((cart)=>cart.user===user)
        if(userCart){
            const product = userCart.cart.find((item)=>item.id===id)
            if(product && product.quantity>1){
                product.quantity-=1
                userCart.total=userCart.cart.reduce((acc,cur)=>acc+cur.price*cur.quantity,0)
 }
        }
    },
    clearCart:(state)=>{
        state.cartList=[];
    }
      
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity,clearCart } = cartSlice.actions;

export default cartSlice.reducer;