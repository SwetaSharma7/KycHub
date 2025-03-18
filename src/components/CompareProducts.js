import React, { useState } from 'react';
import { Table, Modal, Button } from 'antd';
import './CompareProducts.css';

const CompareProducts = ({ compareList, setCompareList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    setProducts(data.products);
  };

  const handleAddMore = () => {
    setIsModalVisible(true);
    fetchProducts(); 
  };

  const handleAddToCompare = (product) => {
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

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const comparisonColumns = [
    {
      title: 'Attribute',
      dataIndex: 'attribute',
      key: 'attribute',
      fixed: 'left', 
    },
    ...compareList.map((product) => ({
      title: product.title,
      dataIndex: product.id,
      key: product.id,
    })),
  ];

  const comparisonData = [
    {
      attribute: 'Products',
      ...compareList.reduce((acc, product) => ({ ...acc, [product.id]: product.title }), {}),
      key: 'title',
    },
    {
      attribute: 'Description',
      ...compareList.reduce((acc, product) => ({ ...acc, [product.id]: product.description }), {}),
      key: 'description', 
    },
    {
      attribute: 'Price',
      ...compareList.reduce((acc, product) => ({ ...acc, [product.id]: `$${product.price}` }), {}),
      key: 'price', 
    },
    {
      attribute: 'Brand',
      ...compareList.reduce((acc, product) => ({ ...acc, [product.id]: product.brand }), {}),
      key: 'brand', 
    },
    {
      attribute: 'Category',
      ...compareList.reduce((acc, product) => ({ ...acc, [product.id]: product.category }), {}),
      key: 'category', 
    },
  ];

  const modalColumns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Brand', dataIndex: 'brand', key: 'brand' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => handleAddToCompare(record)}>Add to Compare</Button>
      ),
    },
  ];

  return (
    <div className="compare-products">
      <h1>Compare Products</h1>
      <Button className="add-more-button" onClick={handleAddMore}>
        Add More
      </Button>

      {}
      {compareList.length > 0 ? (
        <Table
          className="comparison-table"
          columns={comparisonColumns}
          dataSource={comparisonData}
          pagination={false}
          bordered
          scroll={{ x: true }} 
        />
      ) : (
        <p>No products added for comparison.</p>
      )}

      <Modal
        title="Add Products to Compare"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800} 
      >
        <Table
          dataSource={products}
          columns={modalColumns}
          pagination={{ pageSize: 5 }}
          rowKey="id"
        />
      </Modal>
    </div>
  );
};

export default CompareProducts;