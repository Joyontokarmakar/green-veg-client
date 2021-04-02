import React from 'react';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Order.css';
import { useContext } from 'react';
import { userContext } from '../../App';


const Order = (props) => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const {id} = useParams();

    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      fetch(`https://desolate-harbor-02076.herokuapp.com/singleProduct/${id}`)
        .then(res => res.json())
        .then(data => {
          setProducts(data.reverse());
        })
    },[])

    let date_ob = new Date();

    return (
        <div className="home">
            <div className="container">
                <div className="order">
                    <div className="table-responsive">
                        <div className="order_head">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="order_auth">
                                            <span><b>Name:</b> {loggedInUser.name}</span>
                                            <br/>
                                            <span><b>Email:</b> {loggedInUser.email}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        
                                        <div className="order_address text-right">
                                            <span><b>Order Date:</b> {date_ob.getMonth()+'/'+ date_ob.getDate()+'/'+date_ob.getFullYear()}</span>
                                            <br/>
                                            <span><b>Pick Address:</b> Khilkhet, Dhaka, Bangladesh</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                                <Link className="ride_select"><Button>Order Now</Button></Link>
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
        </div>
    );
};

export default Order;