import React, { useState } from 'react';
import Sidebar from './sidebar';

export default function Shop() {
    const [products, setProducts] = useState([
        {
            name: 'Rice Seeds(1kg)',
            price: 200,
            photo: 'https://www.tstanes.com/assets/images/products/domestic/seeds.webp',
            description: 'High quality paddy seeds for high yield.',
        },
        {
            name: 'Organic fertiliser(1kg)',
            price: 100,
            photo: 'https://plantslive.in/wp-content/uploads/2017/10/Finished-Vermicompost.png',
            description: 'Organic fertiliser for better and organic yield.',
        },
    ]);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        photo: '',
        description: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct((prevProduct) => ({
                    ...prevProduct,
                    photo: reader.result, // Store base64 data URL
                }));
            };
            reader.readAsDataURL(file); // Read as base64
        }
    };

    const addProduct = () => {
        if (!newProduct.name || !newProduct.price || !newProduct.photo || !newProduct.description) {
            alert('Incomplete information');
            return;
        }
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        setNewProduct({ name: '', price: '', photo: '', description: '' });
        setOverlayVisible(false);
    };

    const showOverlay = () => {
        setOverlayVisible(true);
    };

    const hideOverlay = () => {
        setOverlayVisible(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ position: 'sticky', left: 0, bottom: 0 }}>
                <Sidebar />
            </div>
            <div>
                <div className="search-container">
                    <input type="text" className="search-input" placeholder="Search products..." />
                </div>
                <div className="shop-container">
                    <div className="product-grid">
                        <div className="add-new">
                            <div style={{ justifySelf: 'center', alignSelf: 'center' }} onClick={showOverlay}>
                                <p style={{ color: '#fff', fontSize: '100px', paddingLeft: '24px' }}>+</p>
                                <p style={{ color: '#fff' }}>Add a product</p>
                            </div>
                        </div>
                        {products.map((product, index) => (
                            <div className="product" key={index}>
                                <img src={product.photo} alt={product.name} />
                                <div className="product-content">
                                    <h2 className="product-title">{product.name}</h2>
                                    <p className="product-price">₹{product.price}/kg</p>
                                    <p className="product-description">{product.description}</p>
                                    <button className="add-to-cart">Add to Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {overlayVisible && (
                <div className="overlay" id="myOverlay" style={{display:'block'}}>
                    <div id="productInput">
                        <label htmlFor="productName">Product name:</label>
                        <input type="text" id="productName" name="name" value={newProduct.name} onChange={handleInputChange} placeholder='ex: Rice seeds(1kg)' />

                        <label htmlFor="productPrice">Price:</label>
                        <input type="number" id="productPrice" name="price" value={newProduct.price} onChange={handleInputChange} placeholder='Price of the product per kg' />

                        <label htmlFor="productPhoto">Photo URL:</label>
                        <input type="file" id="productPhoto" name="photo" accept="image/*" onChange={handleImageChange} />

                        <label htmlFor="productDescription">Description:</label>
                        <textarea id="productDescription" name="description" value={newProduct.description} onChange={handleInputChange}></textarea>

                        <div style={{display:'flex', flexDirection:'row'}}>
                            <button onClick={addProduct}>Submit</button>
                            <button onClick={hideOverlay}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}