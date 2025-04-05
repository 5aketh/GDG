import React, { useState } from 'react';
import Sidebar from './sidebar';

export default function Shop2Sell() {
    const initialProducts = [];
    const [products, setProducts] = useState(initialProducts);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        photo: '',
        description: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

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
                setImagePreview(reader.result); // Set image preview
            };
            reader.readAsDataURL(file); // Read as base64
        } else {
            setImagePreview(null);
            setNewProduct((prevProduct) => ({ ...prevProduct, photo: '' }));
        }
    };

    const addProduct = () => {
        if (!newProduct.name || !newProduct.price || !newProduct.photo || !newProduct.description) {
            alert('Incomplete information');
            return;
        }
        const newProductId = Date.now().toString(); // Simple unique ID generation
        setProducts((prevProducts) => [...prevProducts, { ...newProduct, id: newProductId }]);
        setNewProduct({ name: '', price: '', photo: '', description: '' });
        setImagePreview(null);
        setOverlayVisible(false);
    };

    const showOverlay = () => {
        setOverlayVisible(true);
    };

    const hideOverlay = () => {
        setOverlayVisible(false);
        setNewProduct({ name: '', price: '', photo: '', description: '' });
        setImagePreview(null);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ position: 'fixed', top: "-20vh", left: 0, height: '100vh' }}> {/* Corrected sticky positioning */}
                <Sidebar />
            </div>
            <div style={{ marginLeft: '250px', padding: '20px' }}> {/* Adjust margin based on sidebar width */}
                <div>
                    <div className="search-container" style={{ marginBottom: '20px' }}>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                            <button onClick={showOverlay} style={{ marginTop: '2vh', marginLeft: '2vw', backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Add New Product</button>
                    </div>
                    <div className="shop-container">
                        <div className="product-grid">
                            {filteredProducts.map((product) => (
                                <div className="product" key={product.id}>
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
                    <div className="overlay" id="myOverlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div id="productInput" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '500px', maxWidth: '90%' }}>
                            <label htmlFor="productName">Product name:</label>
                            <input type="text" id="productName" name="name" value={newProduct.name} onChange={handleInputChange} placeholder='ex: Rice seeds(1kg)' style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />

                            <label htmlFor="productPrice">Price:</label>
                            <input type="number" id="productPrice" name="price" value={newProduct.price} onChange={handleInputChange} placeholder='Price of the product per kg' style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />

                            <label htmlFor="productPhoto">Upload Photo:</label> {/* Corrected label */}
                            <input type="file" id="productPhoto" name="photo" accept="image/*" onChange={handleImageChange} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
                            {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px', marginBottom: '10px' }} />}

                            <label htmlFor="productDescription">Description:</label>
                            <textarea id="productDescription" name="description" value={newProduct.description} onChange={handleInputChange} style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '80px' }}></textarea>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <button onClick={addProduct} style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}>Submit</button>
                                <button onClick={hideOverlay} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}