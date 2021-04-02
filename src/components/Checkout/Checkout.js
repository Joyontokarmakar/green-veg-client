import React from 'react';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Checkout.css'


const Checkout = (props) => {
    const {id} = useParams();

    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      fetch(`https://desolate-harbor-02076.herokuapp.com/singleProduct/${id}`)
        .then(res => res.json())
        .then(data => {
          setProducts(data.reverse());
        })
    },[])

    return (
        <div className="home">
            <div className="container">
                <div className="table-responsive">
                    <table className="table-striped w-100">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((product)=> {
                                    return(
                                        <tr>
                                            {/* <Card.Img variant="top" src={product.imageUrl} style={{height: '200px'}} /> */}
                                            <td>{product.title}</td>
                                            <td>1</td>
                                            <td>{product.price}</td>
                                            <td>{product.price}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        <tfoot className="mt-5">
                            <tr>
                                <td colSpan="4" className="tfoot text-right">
                                   {
                                       products.map((product) =>{
                                           return(
                                            <Link to={`/order/${product._id}`} className="ride_select"><Button>Proceed to Checkout</Button></Link>
                                           )
                                       })
                                   }
                                </td>
                            </tr>
                        </tfoot>
                
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Checkout;