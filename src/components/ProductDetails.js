import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd'; 
import './ProductDetails.css';

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [compareList, setCompareList] = useState([]); 

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data.products));
  }, []);

  const handleCompare = (product) => {
    if (compareList.length >= 4) {
      alert('You can compare a maximum of 4 products at a time.');
      return;
    }
    if (!compareList.some((item) => item.id === product.id)) {
      setCompareList([...compareList, product]);
    } else {
      alert('This product is already in the comparison list.');
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title', sorter: (a, b) => a.title.localeCompare(b.title) },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Price', dataIndex: 'price', key: 'price', sorter: (a, b) => a.price - b.price },
    { title: 'Discount Percentage', dataIndex: 'discountPercentage', key: 'discountPercentage' },
    { title: 'Brand', dataIndex: 'brand', key: 'brand' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Image', dataIndex: 'thumbnail', key: 'thumbnail', render: (text) => <img src={text} alt="thumbnail" width={50} /> },
    {
      title: 'Compare',
      key: 'compare',
      render: (text, record) => (
        <Button
          onClick={() => handleCompare(record)}
          disabled={compareList.some((item) => item.id === record.id)} // Disable if already in compare list
        >
          Compare
        </Button>
      ),
    },
  ];

  return (
    <div className="product-details">
      <Table dataSource={products} columns={columns} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default ProductDetails;