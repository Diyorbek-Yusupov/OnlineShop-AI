import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import alanBtn from '@alan-ai/alan-sdk-web';

export default function Cart() {
    const [mainCart, setMainCart] = useState([]);
    const [cart, setCart] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const addCardHandler = (item) => {
        setCart((prev) => {
            return [...prev, item];
        });
        toast.dark("Product added successfully")
    }
    const modalHandler = () => {
        setIsModal(!isModal);
    }
    useEffect(() => {
        alanBtn({
            key: 'd9713af5745d61082de6b0856013c44a2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: (commandData) => {
                if(commandData.command === "getMenu") {
                    setMainCart(commandData.data)
                } else if (commandData.command === "showCard") {
                    addCardHandler(commandData.data)
                } else if (commandData.command === "openCart") {
                    setIsModal(commandData.data);
                } else if (commandData.command === "closeCart") {
                    setIsModal(commandData.data);
                }
            }
        });
    },[]);
    return (
        <div className="album py-5 bg-light">
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {console.log(mainCart)}
                    {mainCart.map((item) => (
                        <div className="col" key={item.id}>
                            <div className="card shadow-sm p-3" style={{minHeight: "550px"}}>
                                <div className="card-title">
                                    <h4 className="text-muted text-center">Product # {item.id}</h4>
                                </div>
                                <img 
                                    src={item.image} 
                                    alt={item.title}
                                    className="bg-placeholder card-image-top" 
                                    width="100%"
                                    height="400px"
                                />
                                <div className="card-body">
                                    <p className="card-text">{item.title.slice(0,20)}</p>
                                    <p className="card-text fw-lighter">
                                        {item.description.slice(0,100)}
                                    </p>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <div>
                                        <span>{item.category}</span>
                                    </div>
                                    <span className="text-muted">${item.price}</span>
                                </div>
                                <button onClick={() => {addCardHandler(item)}} className="mt-3 btn btn-outline-primary">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="fixed-top m-3">
            <button  onClick={modalHandler} type="button" className=" btn btn-primary position-relative">
                Card
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.length}
                <span className="visually-hidden">unread messages</span>
                </span>
            </button>
            </div>
            {isModal && (
                <div className="modal" style={{display:"block", background: "rgba(0,0,0,.8"}}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Modal title</h5>
                      <button onClick={modalHandler} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      {cart.map((item) => (
                          <div className="card mb-3">
                          <div className="row g-0">
                              <div className="col-md-4">
                                  <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className='img-fluid rounded-start'
                                  />
                              </div>
                              <div className="col-md-8">
                                  <div className="card-body">
                                      <h5 className="card-title">{item.title}</h5>
                                      <p className='card-text text-muted'>
                                          {item.description.slice(0,100)}
                                      </p>
                                      <p className="card-text">
                                          <small className="text-muted">$ {item.price}</small>
                                      </p>
                                  </div>
                              </div>
                          </div>
                      </div>
                      ))}
                    </div>
                    <div className="modal-footer">
                      <button onClick={modalHandler} type="button" className="btn btn-primary">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
    )
}
