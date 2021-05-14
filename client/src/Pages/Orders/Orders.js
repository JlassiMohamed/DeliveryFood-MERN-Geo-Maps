import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  get_my_orders,
  get_seller_orders,
  handle_orders_status,
  update_my_order_status,
} from "../../JS/actions/order";
import "./Orders.css";

const Orders = ({ match }) => {
  const { restaurantId } = match.params;
  const orders = useSelector((state) => state.orderReducer.orders);
  const edit = useSelector((state) => state.editReducer.edit);
  // console.log(edit);
  // console.log(orders);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!edit) {
      dispatch(get_my_orders());
    } else {
      dispatch(get_seller_orders(restaurantId));
    }
  }, [dispatch, edit, restaurantId]);

  let place = { status: "placed" };
  let cancel = { status: "cancelled" };
  let accept = { status: "accepted" };
  let outForDelivery = { status: "out for delivery" };
  let complete = { status: "completed" };

  return (
    <div className="orderscreen">
      {orders.length === 0 ? (
        <div>
          There is no order placed yet! Come BACK later{" "}
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <div className="orderscreen__right" key={order._id}>
              <div className="orderscreen__right">
                {/* <p>User id: #{user ? user._id : null}</p> */}
                <p>
                  <span>Order: #{order._id}</span>
                  <br />
                  <span>date: {order.date_added}</span>
                </p>
                <p>
                  <span>Client is: {order.user.name}, </span>
                  <span>{order.user.address}</span>
                  <br />
                  <span>mobile: {order.user.mobile}</span>
                </p>
                <div>
                  Items:
                  {order.products.map((item) => (
                    <ul key={item.productId}>
                      <li>-{item.name}</li>
                      <span>quantity: {item.quantity}, </span>
                      <span>price: {item.price}</span>
                    </ul>
                  ))}
                </div>
                <p>
                  <span>Seller from: {order.restaurant.title} Restaurant</span>
                  <br />
                  <span>phone: {order.restaurant.phone}</span>
                </p>
                <p>
                  <span>
                    Subtotal of:{" "}
                    {order.products.reduce(
                      (quantity, item) => Number(item.quantity) + quantity,
                      0
                    )}{" "}
                    items
                  </span>
                  <br />
                  <span>
                    Total price: DT
                    {order.products
                      .reduce(
                        (price, item) => price + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>
                <div>
                  {!edit ? (
                    order.status === "placed" ? (
                      <div>
                        <span>✅ order placed </span>
                        <button
                          onClick={() =>
                            dispatch(
                              update_my_order_status(
                                order.userId,
                                order._id,
                                cancel
                              )
                            )
                          }
                        >
                          cancel
                        </button>
                      </div>
                    ) : order.status === "cancelled" &&
                      order.active === true ? (
                      <div>
                        <p>❌ order cancelled</p>
                        <button
                          onClick={() =>
                            dispatch(
                              update_my_order_status(
                                order.userId,
                                order._id,
                                place
                              )
                            )
                          }
                        >
                          place it
                        </button>
                      </div>
                    ) : (
                      <p>✅ order {order.status}</p>
                    )
                  ) : order.status === "placed" ? (
                    <div>
                      <span>✅ order placed </span>
                      <br />
                      <button
                        onClick={() =>
                          dispatch(
                            handle_orders_status(
                              restaurantId,
                              order._id,
                              accept
                            )
                          )
                        }
                      >
                        accept
                      </button>
                      <button
                        onClick={() =>
                          dispatch(
                            handle_orders_status(
                              restaurantId,
                              order._id,
                              cancel
                            )
                          )
                        }
                      >
                        cancel
                      </button>
                    </div>
                  ) : order.status === "accepted" ? (
                    <div>
                      <span>✅ order accepted </span>
                      <button
                        onClick={() =>
                          dispatch(
                            handle_orders_status(
                              restaurantId,
                              order._id,
                              outForDelivery
                            )
                          )
                        }
                      >
                        delivery it
                      </button>
                    </div>
                  ) : order.status === "out for delivery" ? (
                    <div>
                      <span>✅ order out for delivery </span>
                      <button
                        onClick={() =>
                          dispatch(
                            handle_orders_status(
                              restaurantId,
                              order._id,
                              complete
                            )
                          )
                        }
                      >
                        complete it
                      </button>
                    </div>
                  ) : order.status === "completed" ? (
                    <div>
                      <span>✅ order completed </span>
                    </div>
                  ) : (
                    <p>❌ order cancelled</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
