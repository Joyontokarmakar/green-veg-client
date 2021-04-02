import './Home.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Card,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Home(props) {
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://desolate-harbor-02076.herokuapp.com/products`)
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        setProducts(data.reverse());
      })
  }, [])

  return (
    <div className="Home">
      <div className="container">
        { isLoading &&
          <div className="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        }
        <div className="row">
          {
            products.map((product, idx,id)=> {
              return(
                <div className="col-md-3 my-3">
                  <Card className="individual_card h-100" key={idx}>
                    <div className="image_area">
                      <Card.Img className="card_img" variant="top" src={product.imageUrl} />
                    </div>
                    <div className="body_area">
                      <h5>{product.title}</h5>

                      <div className="row d-flex justify-content-between align-items-center h-100 px-2">
                        <p class="price_amount">Price: ${product.price}</p>
                        <Link to={`/checkout/${product._id}`}><Button className="buy_btn">Buy Now</Button></Link>
                      </div>
                    </div>
                  </Card>
                </div>
              )
            })
          }
          
        </div>
      </div>
    </div>
  )
}

export default Home