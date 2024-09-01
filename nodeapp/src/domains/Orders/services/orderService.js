import logger from '../../../utils/logger.js';
import { addHour } from '../../../utils/myUtil.js';
import connectionPool from '../../../dbconfig/spmallDBC.js';
import mysql from 'mysql2/promise';
import Order from '../models/orderModel.js';
import Shipping from '../../Shipping/models/shippingModel.js';
import Orderitem from '../../OrderItems/models/orderItemModel.js';
import response from '../../../class/response.js';


export const getOrderById = async (orderId) => {
	try {
		console.log(orderId);
		const connection = await connectionPool.getConnection();
		const query = 'SELECT * from Orders where orderId = (?);';
		const result = await connection.execute(query, [orderId]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Order not found');
			
		} else {
			connection.release();
			
			const order = result[0].map(row => new Order(
				row.orderId,
				row.userId,
				row.orderDate,
				row.totalAmount,
				row.status
				));	
			return order[0];
		}

	} catch (error) {
		logger.error(`getOrderById :::: ` + error);
		throw new Error('Order not found');
	}
};


export const getOrderShippingAll = async (req) => {
	try {	
			
		const connection = await connectionPool.getConnection();
		const query = 'SELECT o.userId, o.orderDate, o.totalAmount, o.status, '
						+ 's.orderId, s.shippingDate, s.deliveryDate, s.courier, s.courierInvoiceNumber, s.deliveryFee, '
						+ 'i.orderItemId, i.price, i.quantity, '
						+ 'p.productName '
						+ 'FROM Orders o '
						+ 'JOIN Shipping s ON o.orderId = s.orderId '
						+ 'JOIN Users u ON o.userId = u.userId '
						+ 'JOIN OrderItems i ON i.orderId = o.orderId '
						+ 'JOIN Products p ON i.productId = p.productId '
						+ 'WHERE u.loginId = (?)';
						
		const result = await connection.execute(query, [req.body.loginId]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('OrderShipping not found');
			
		} else {
			connection.release();

			const rtnArr = [];
			const items = [];

			let orderIdSet = new Set();

			for (const row in result[0]) {
				orderIdSet.add(result[0][row].orderId);
			}
			let orderIdArr = Array.from(orderIdSet);
			let orderIdArrCount = 0;
			
			let orderArray = [];
			let orderItemArray = [];
			let rtnArray = [];

			// 전체 순회 진행
			for (const row in result[0]) {
				// orderID 중복을 제거한 배열만큼 순회
				if(orderIdArrCount < orderIdArr.length){
					// 이번 회차의 orderId와 첫번째 orderIdArr의 값이 일치한다면 orderArray를 생성
					if(orderIdArr[orderIdArrCount] === result[0][row].orderId){
						const orderDict = 				
						{
							'userId' : result[0][row].userId,
							'orderDate' : addHour(result[0][row].orderDate),
							'totalAmount' : result[0][row].totalAmount,
							'status' : result[0][row].status,
							'orderId' : result[0][row].orderId,
							'shippingDate' : addHour(result[0][row].shippingDate),
							'deliveryDate' : addHour(result[0][row].deliveryDate),
							'courier' : result[0][row].courier,
							'courierInvoiceNumber' : result[0][row].courierInvoiceNumber,
							'deliveryFee' : result[0][row].deliveryFee
						}
									
						orderArray.push(orderDict);
						orderIdArrCount++;
					}
				}

				// 그리고 매 번의 회차에서 각 아이템의 딕셔너리를 생성
				const orderItemDict = 
				{
					'orderItemId': result[0][row].orderItemId,
					'price': result[0][row].price,
					'quantity': result[0][row].quantity,
					'orderItem': result[0][row].productName					
				}
				
				for (const i in orderArray){
					// 이번 회차의 orderId와 orderArray안의 orderId를 비교해서 같다면
					if(result[0][row].orderId === orderArray[i].orderId) {
						 //비교한 회차의 인덱스의 dict의 orderItem에 추가함
						if(!orderArray[i].items){ 
							orderArray[i].items = [orderItemDict];
						} else {
							orderArray[i].items.push(orderItemDict);
						}
						
					}
				}
				
			}// END for
			
			return orderArray;
		
		}

	} catch (error) {
		logger.error(`getOrderShippingAll :::: ` + error);
		throw new Error('OrderShipping not found');
	}
};




export const createOrder = async (OrderData) => {
	try {

		const connection = await connectionPool.getConnection();
		const query = 'INSERT INTO Orders (userId, totalAmount) VALUES (?,?)';
		const result = await connection.execute(query, [OrderData.userId, OrderData.totalAmount]);

		console.log(result);


		if(result[0].length === 0) {
			connection.release();
			throw new Error('Order not found');
		} else {
			connection.release();
			return result[0];
		}
		
	} catch (error) {
		logger.error(`createOrder :::: ` + error);
	}
};

export const updateOrder = async (orderId, updateData) => {
	try {
		
		const keys = Object.keys(updateData);
		const values = Object.values(updateData);
				
		let querySetData = "";		
				
		for(let i=0; i < keys.length; i++){

			if(i == keys.length-1){
				querySetData += ( keys[i] + "='" + values[i] + "'");
			} else {
				querySetData += ( keys[i] + "='" + values[i] + "'" + ',');
			}
			
		}
		
		const connection = await connectionPool.getConnection();
		const query = 'UPDATE Orders SET '
						+ querySetData
						+ ' where orderId = (?)';
		console.log(query);

		const result = await connection.execute(query, [orderId]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Order not found');
		} else {
			connection.release();
			return result[0];
		}


	} catch (error) {
		logger.error(`updateOrder :::: ` + error);
	}
};

export const deleteOrder = async (orderId) => {
	try {
		
		const connection = await connectionPool.getConnection();
		const query = 'DELETE FROM Orders where orderId = (?)';
		const result = await connection.execute(query, [orderId]);
	
		if(result[0].length === 0) {
			connection.release();
			throw new Error('Order not found');
		} else {
			connection.release();
			return result[0];
		}
	
	} catch {
		logger.error(`deleteOrder :::: ` + error);
	}
};









