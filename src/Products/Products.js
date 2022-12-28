import React from "react";
import { Button, Input, Table, Popconfirm, Modal, Form } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import FormItem from "antd/es/form/FormItem";
function Products() {
  const [orders, setorders] = useState([]);
  const [modal, contextHolder] = Modal.useModal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    customerId: "",
    shipVia: "",
  });

  const getProducts = () => {
    fetch("https://northwind.vercel.app/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setorders(data);
      });
  };

  const handleOk = () => {
    let newData = {
      id: updateData.id,
      customerId: updateData.customerId,
      shipVia: updateData.shipVia,
    };

    axios
      .post("https://northwind.vercel.app/api/orders", newData)
      .then((res) => {
        getProducts();
      });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getProducts();
  }, [updateData]);
  const updateButton = (item) => {
    setUpdateData({
      id: item.id,
      customerId: item.customerId,
      shipVia: item.shipVia,
    });
    setIsModalOpen(true);
  };

  const deleteProduct = (id) => {
    fetch(`https://northwind.vercel.app/api/orders/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status == 200) getProducts();
    });
  };

  let columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Customer ID",
      dataIndex: "customerId",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      sorter: (a, b) => new Date(a.orderDate < b.orderDate),
    },
    {
      title: "Ship Via",
      dataIndex: "shipVia",
      sorter: (a, b) => new Date(a.shipVia < b.shipVia),
    },

    {
      title: "Delete",
      dataIndex: "id",
      render: (id) => (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteProduct(id)}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
    {
      title: "Update",
      dataIndex: "id",
      render: (id, item) => (
        <Button onClick={() => updateButton(item)}>Update</Button>
      ),
    },
  ];
  return (
    <>
      <Table dataSource={orders} columns={columns}></Table>
      <Modal open={isModalOpen} onOk={() => handleOk()} onCancel={handleCancel}>
        <Form>
          <FormItem>
            <Input
              type="text"
              onChange={(e) =>
                setUpdateData({
                  ...updateData,
                  id: e.target.value,
                })
              }
              value={updateData.id}
            />
          </FormItem>
          <FormItem>
            <Input
              onChange={(e) =>
                setUpdateData({
                  ...updateData,
                  customerId: e.target.value,
                })
              }
              value={updateData.customerId}
            />
          </FormItem>
          <FormItem>
            <Input
              onChange={(e) =>
                setUpdateData({
                  ...updateData,
                  shipVia: e.target.value,
                })
              }
              value={updateData.shipVia}
              type="number"
            />
          </FormItem>
        </Form>
      </Modal>
    </>
  );
}

export default Products;
