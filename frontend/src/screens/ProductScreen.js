import React, {useEffect, useState} from "react";
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Rating from "../Components/Rating";
import axios from 'axios'
 
function ProductScreen() {
    const {id} = useParams();
    const [product, setProduct] = useState([]);
   
    useEffect(() => {
      async function fetchProduct() {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      }
   
      fetchProduct();
    }, [id]); 

 
  return (
  
        <div> 
            <Link to='/' className="btn btn-success my-3">Go back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={4}>
                    <ListGroup class="firstList" variant="flush">
                        <ListGroup.Item>
                            <h4>{product.name}</h4>
                            <Rating value={product.rating} text={` ${product.numReviews} reviews`} color={'#2C3834'}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <table className="table">
                                <thead>
                                    <tr className="table-default">
                                        <th itemScope="row">Price</th>
                                            <td>${product.price}</td>
                                    </tr>
                                    <tr className="table-default">
                                        <th itemScope="row">Description</th>
                                            <td>{product.description}</td>
                                    </tr>
                                    <tr className="table-default">
                                        <th itemScope="row">Watering</th>
                                            <td>{product.watering}</td>
                                    </tr>
                                    <tr className="table-default">
                                        <th itemScope="row">Light</th>
                                            <td>{product.lightRequirements}</td>
                                    </tr>
                                </thead>
                            </table>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={2}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item >
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className="btn-block btn-dark btn-lg" disabled={product.countInStock === 0} type="button">Add to cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
        
    )
}
 
export default ProductScreen;