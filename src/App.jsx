import './App.css';
import { useEffect, useState } from 'react';
import Card from './card/card';
import Cart from './cart/cart';
import { getData } from './constants/db';
import { useCallback } from 'react';

const courses = getData();

const telegram = window.Telegram.WebApp;

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    telegram.ready();
  });
  
  const onAddItem = (item) => {
    const existItem = cartItems.find( c => c.id == item.id);
    
    if (existItem) {
      const newData = cartItems.map(c => c.id == item.id ? 
      {...existItem, quantity: existItem.quantity + 1} 
      : c
 );
      setCartItems(newData);
    }
    else {
      const newData = [...cartItems, { ...item, quantity: 1}];
      setCartItems(newData);
    }
  };

  const onRemoveItem = item => {
    const existItem = cartItems.find( c => c.id == item.id);

    if (existItem.quantity === 1) {
      const newData =cartItems.filter( c => c.id !== existItem.id);
      setCartItems(newData);
    }
    else {
      const newData = cartItems.map( c => c.id === item.id ? 
      {...existItem, quantity: existItem.quantity - 1} 
      : c
 );
      setCartItems(newData);
    }
  };


  const oncheckout = () => {
    telegram.MainButton.text = "Sotib olish";
    telegram.MainButton.show();
    
  };

  const onSendData = useCallback(() => {
    const queryID = telegram.initDataUnsave?.query_id;

    if(queryID) {
      fetch ('https://web-botlar-022d9082421d.herokuapp.com/web_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify
        ({products: cartItems, 
          queryID: queryID}),
      }) ;
    }else{
      telegram.sendData(JSON.stringify(cartItems)
   )  }
  }, [cartItems]);
  useEffect (() => {
    telegram.onEvent('mainButtonClicked', onSendData);

    return() => telegram.offEvent ('mainButtonClicked', onSendData);
  }, [onSendData]);  

    return (
        <div>
          <h1 className='heading'>Dasturlash Kurslari</h1>  
            <Cart cartItems={cartItems} oncheckout={oncheckout}></Cart>
              <div className="cards_constainer">
                {courses.map((course) => (
                  <Card 
                  key={course.id} 
                  course={course} 
                  onAddItem={onAddItem}
                  onRemoveItem={onRemoveItem} 
                  />
              ))}
          </div>
        </div>
    )
}
export default App;
