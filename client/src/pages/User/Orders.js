import React, { useState, useEffect } from "react";
import UserMenu from "../../components/UserMenu";
import Layout from "../../components/Layout";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-4">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table ">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Order Total</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>Rs. {o?.orderTotal}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div
                        className="row mb-2 p-3 card flex-row bg-dark text-white"
                        key={p._id}
                      >
                        <div className="col-md-4">
                          <img
                            src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width={"150px"}
                            height={"220px"}
                          />
                        </div>
                        <div className="col-md-8 border border-secondary p-4">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 300)} . . . </p>
                          <p>Price : Rs. {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
