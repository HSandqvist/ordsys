import React, { useEffect, useState } from 'react';
import { CardColumns } from 'react-bootstrap';
import './AllOrders.scss';
import OrderDetail from './OrderDetail';
import OrderTicket from '../Order/OrderTicket';
import { MenuItem, Order, OrderStatus } from '../../@types';

interface MenuItemsAndOrders {
    menuItems: MenuItem[]
    orders: Order[]
}

function AllOrders() {
    const [menuItemsAndOrders, setMenuItemsAndOrders] = useState<MenuItemsAndOrders>({
        menuItems: [],
        orders: [],
    })
    const [activeOrder, setActiveOrder] = useState<Order | null>(null)
    const [shouldShownOrderDetail, setShouldShowOrderDetail] = useState(false)

    useEffect(() => {
        Promise.all([
            fetch('http://localhost:8000/api/menu_items/?active=true'),
            fetch(`http://localhost:8000/api/orders_with_order_items/?exclude_status=${OrderStatus.DELIVERED}`)
        ])
            .then(responses => Promise.all([responses[0].json(), responses[1].json()]))
            .then(([menuItems, orders]: [MenuItem[], Order[]]) => {
                setMenuItemsAndOrders({ menuItems, orders })
            })
            .catch(reason => console.log(reason))
    }, [])

    return (
        <>
            <CardColumns className="all-orders-container order-cards">
                {menuItemsAndOrders.orders.map(order =>
                    <OrderTicket
                        key={order.id}
                        createdTimestamp={order.created_timestamp?.slice(11, 16)}
                        menuItems={menuItemsAndOrders.menuItems}
                        note={order.note}
                        onClick={() => {
                            setActiveOrder(order)
                            setShouldShowOrderDetail(true)
                        }}
                        orderItems={order.order_items}
                        orderNumber={order.customer_number}
                        status={order.status.toLowerCase().replace(' ', '-')}
                    >
                        {order.status}
                    </OrderTicket>
                )}
            </CardColumns>
            <OrderDetail
                closeOrderDetail={() => setShouldShowOrderDetail(false)}
                menuItems={menuItemsAndOrders.menuItems}
                order={activeOrder}
                show={shouldShownOrderDetail}
            />
        </>
    );
}

export default AllOrders
