import Button from '../button/button';
import { totalPrice } from '../units/total-price';
import './cart.css';


const Cart = ({ cartItems, oncheckout }) => {
  return (
    <div className='cart__container'>
        <p>
            Umumiy narx: {' '}
             {totalPrice(cartItems).toLocaleString("en-us", {
                            style: "currency",
                            currency: "USD"
                            })} 
        </p>

        <Button 
        title={`${cartItems.length === 0 ? "Buyurtma" : "To'lov"}`} 
        disable={cartItems.length === 0 ? true : false}
        type='checkout' 
        onClick={oncheckout}
        />
    </div>
  );
}

export default Cart;