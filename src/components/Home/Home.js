import './Home.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';


function Home() {
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://desolate-harbor-02076.herokuapp.com/products`)
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        setProducts(data.reverse());
      })
  })

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
        <div className="d-flex justify-content-around flex-wrap">
          {
            products.map((product, idx)=> {
              return(
                <Card style={{ width: '16rem', marginBottom: '20px' }} className="bg-dark" key={idx}>
                  <Card.Img variant="top" src={product.imageUrl} style={{height: '200px'}} />
                  <Card.Body>
                    <Card.Title className="text-center text-white">{product.title}</Card.Title>
                    <Card.Title className="text-center text-white">{product.price}</Card.Title>
                    <Button>Buy Now</Button>
                  </Card.Body>
                </Card>
              )
            })
          }
          
        </div>
      </div>
    </div>
  )
}

export default Home