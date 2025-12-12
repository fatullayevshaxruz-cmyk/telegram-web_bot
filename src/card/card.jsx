import { useState } from 'react';
import Button from '../button/button';
import './card.css'

const  Card = props => {
     const [count, setCount] = useState(0); 
     const { course, onAddItem,  onRemoveItem } = props; 

     const handleAddItem = () => {
        setCount(count + 1);
        onAddItem(course);
     };

        const handleRemoveItem = () => {
            setCount(count - 1);
            onRemoveItem(course);
        };


    return (
        <div className='card'>
            <span className={`card_badge ${count === 0 ? 'card_badge--hidden' : ''}`}>
                {count} 
            </span>
            <div className='img_container'>
                <img src={course.Image} 
                alt={course.title} 
                width={'100%'}
                height={'230px'}/>
            </div>

            <div className='card_body'>
                <h2 className='card_title'>{course.title}</h2>
                    <div className='card_price'>
                        {course.price.toLocaleString("en-us",
                            {
                            style: "currency",
                            currency: "USD"
                            }
                        )} 
                    </div>
                </div>
                <div className='hr'></div>

                <div className='btn_container'>
                    <Button title= {'+'} 
                    onClick={handleAddItem} 
                    type="add" />
                    {count > 0 &&  (
                    <Button title= {'-'}
                    type="remove" 
                    onClick={handleRemoveItem}
                       
                      />
                    )}
                </div>
        </div>
    );

};

export default Card;