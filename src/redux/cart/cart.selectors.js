import { createSelector } from 'reselect'

// this is an input selector
const selectCart = state => state.cart;

// this is now a memoized selector
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
)

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

export const selectCartItemCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce( 
        (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity, 
        0
    )
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce( 
        (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity * cartItem.price, 
        0
    )
)
