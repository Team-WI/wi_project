import logger from '../../../utils/logger.js';
import { addHour } from '../../../utils/myUtil.js';
import connectionPool from '../../../dbconfig/spmallDBC.js';
import jwtProvider from '../../../class/jwtProvider.js';

export const getOrderById = async (req) => {

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);

	try {
		const connection = await connectionPool.getConnection();
		const query = 'SELECT o.*, p.productName, pi.image_large, pi.image_medium, pi.image_small '
						+ 'FROM Orders o '
						+ 'JOIN OrderItems oi ON oi.orderId = o.orderId '
						+ 'JOIN Products p ON p.productId = oi.productId '
						+ 'JOIN ProductImages pi ON pi.productId = oi.productId '
						+ 'WHERE o.orderId = (?);';
		const result = await connection.execute(query, [req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Order not found');
			
		} else {
			connection.release();
			
			let orderArr = [];
			
			//2024-09-21 이미지 추가
			for (const row in result[0]) {
				const order = {

					'orderId' : result[0][row].orderId,
					'userId' : result[0][row].userId,
					'orderDate' : result[0][row].orderDate,
					'status' : result[0][row].status,
					'requestReason' : result[0][row].requestReason,
					'requestReasonComment' : result[0][row].requestReasonComment,
					'totalAmount' : result[0][row].totalAmount,
					'productName' : result[0][row].productName,
					'image_small' : result[0][row].image_small,
					'image_medium' : result[0][row].image_medium,
					'image_large' : result[0][row].image_large
				};
				orderArr.push(order);
			}
			return orderArr;
		}

	} catch (error) {
		logger.error(`getOrderById :::: ` + error);
		throw new Error('Order not found');
	}
};

export const getOrderShippingAll = async (req) => {

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);
	
	try {	
	
		const connection = await connectionPool.getConnection();
		const query = 'SELECT o.userId, o.orderDate, o.totalAmount, o.status, '
						+ 's.orderId, s.shippingDate, s.deliveryDate, s.courier, s.courierInvoiceNumber, s.deliveryFee, '
						+ 'i.orderItemId, i.price, i.quantity, '
						+ 'p.productName, pi.image_large, pi.image_medium, pi.image_small '					
						+ 'FROM Orders o '
						+ 'JOIN Shipping s ON o.orderId = s.orderId '
						+ 'JOIN Users u ON o.userId = u.userId '
						+ 'JOIN OrderItems i ON i.orderId = o.orderId '
						+ 'JOIN Products p ON i.productId = p.productId '
						+ 'LEFT JOIN ProductImages pi ON pi.productId = p.productId '
						+ 'WHERE u.loginId = (?)';
						
		const result = await connection.execute(query, [req.body.loginId]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('OrderShipping not found');
			
		} else {
			connection.release();

			let orderIdSet = new Set();

			for (const row in result[0]) {
				orderIdSet.add(result[0][row].orderId);
			}
			let orderIdArr = Array.from(orderIdSet);
			let orderIdArrCount = 0;
			
			let orderArray = [];

			// 전체 순회 진행
			for (const row in result[0]) {
				// orderID 중복을 제거한 배열만큼 순회
				if(orderIdArrCount < orderIdArr.length){
					// 이번 회차의 orderId와 첫번째 orderIdArr의 값이 일치한다면 orderArray를 생성
					console.log('orderIdArr[orderIdArrCount]', orderIdArr[orderIdArrCount]);
					console.log('result[0][row].orderId', result[0][row].orderId);
					
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
					'orderItem': result[0][row].productName,
					'image_large' : result[0][row].image_large, 
					'image_medium' : result[0][row].image_medium,
					'image_small' : result[0][row].image_small 
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

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);

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

export const updateOrder = async (req, res) => {

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);

	try {
		
		const keys = Object.keys(req.body);
		const values = Object.values(req.body);
				
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

		const result = await connection.execute(query, [req.params.id]);

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

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);
	
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

export const getOrderShippingDetailById = async (req) => {

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);

	try {
		const connection = await connectionPool.getConnection();
		const query = 'SELECT u.name, u.phone, '
						+ 'p.amount, p.paymentDate, '
						+ 'pm.PaymentMethodName, pm.PaymentMethodInfo, '
						+ 'sa.Receiver, sa.Phone, sa.PostalCode, sa.Address1, sa.Address2, sa.request, '
						+ 'pd.productName, '
						+ 'oi.price, oi.quantity, '
						+ 'pi.image_large, pi.image_medium, pi.image_small '
						+ 'FROM Orders o '
						+ 'JOIN OrderItems oi ON oi.orderId = o.orderId '
						+ 'JOIN Users u ON u.userId = o.userId '
						+ 'JOIN ShippingAddresses sa ON sa.userId = u.userId '
						+ 'JOIN Payments p ON p.orderId = o.orderId '
						+ 'JOIN PaymentMethods pm ON pm.PaymentMethodID = p.paymentMethodID '
						+ 'JOIN Products pd ON pd.productId = oi.productId '
						+ 'LEFT JOIN ProductImages pi ON pi.productId = oi.productId '
						+ 'WHERE o.orderId = (?);';
		
		const result = await connection.execute(query, [req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('getOrderShippingDetailById not found');
			
		} else {
			connection.release();
			
			const resultArray = [];
			const resultDict = {
				'name' : result[0][0].name,
				'phone' : result[0][0].phone,
				'amount' : result[0][0].amount,
				'paymentDate' : result[0][0].paymentDate,
				'PaymentMethodName' : result[0][0].PaymentMethodName,
				'PaymentMethodInfo' : result[0][0].PaymentMethodInfo,
				'Receiver' : result[0][0].Receiver,
				'Phone' : result[0][0].Phone,
				'PostalCode' : result[0][0].PostalCode,
				'Address1' : result[0][0].Address1,
				'Address2' : result[0][0].Address2,
				'request' : result[0][0].request
			}
			
			for (const row in result[0]) {
				const orderItemDict = 
				{
					'productName': result[0][row].productName,
					'price': result[0][row].price,
					'quantity': result[0][row].quantity,
					'image_large' : result[0][row].image_large, 
					'image_medium' : result[0][row].image_medium,
					'image_small' : result[0][row].image_small 
				}
				resultArray.push(orderItemDict);
			}
			
			resultDict['items'] = resultArray;
			return resultDict;
		}

	} catch (error) {
		logger.error(`getOrderShippingDetailById :::: ` + error);
		throw new Error('getOrderShippingDetailById not found');
	}
};

export const getOrderByRequest = async (req) => {

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);

	try {

		const connection = await connectionPool.getConnection();
		const query = 'SELECT o.orderId, o.userId, o.orderDate, o.totalAmount, o.`status`, o.requestReason, o.requestReasonComment, p.productName, '
						+ 'pi.image_large, pi.image_medium, pi.image_small '
						+ 'FROM Orders o '
						+ 'JOIN Users u ON u.userId = o.userId '
						+ 'JOIN OrderItems i ON i.orderId = o.orderId '
						+ 'JOIN Products p ON p.productId = i.productId '
						+ 'LEFT JOIN ProductImages pi ON pi.productId = i.productId '
						+ 'WHERE o.STATUS IN (\'취소접수\',\'취소완료\',\'반품접수\',\'반품완료\',\'교환접수\',\'교환완료\') '
						+ 'AND u.loginId = (?);';

		const result = await connection.execute(query, [req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Order not found');
			
		} else {
			connection.release();

			let orderIdSet = new Set();

			for (const row in result[0]) {
				orderIdSet.add(result[0][row].orderId);
			}
			let orderIdArr = Array.from(orderIdSet);
			let orderIdArrCount = 0;
			
			let orderArray = [];

			// 전체 순회 진행
			for (const row in result[0]) {
				// orderID 중복을 제거한 배열만큼 순회
				if(orderIdArrCount < orderIdArr.length){
					// 이번 회차의 orderId와 첫번째 orderIdArr의 값이 일치한다면 orderArray를 생성
					
					if(orderIdArr[orderIdArrCount] === result[0][row].orderId){
						const orderDict = 				
						{
							'orderId' : result[0][row].orderId,
							'userId' : result[0][row].userId,
							'orderDate' : result[0][row].orderDate,
							'totalAmount' : result[0][row].totalAmount,
							'status' : result[0][row].status,
						}
									
						orderArray.push(orderDict);
						orderIdArrCount++;
					}
				}

				// 그리고 매 번의 회차에서 각 아이템의 딕셔너리를 생성
				const orderItemDict = 
				{
					'productName' : result[0][row].productName,
					'image_large' : result[0][row].image_large, 
					'image_medium' : result[0][row].image_medium,
					'image_small' : result[0][row].image_small 
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



			/*
			let orderArr = [];
			
			//2024-09-21 이미지 추가
			for (const row in result[0]) {
				const order = {

					'orderId' : result[0][row].orderId,
					'userId' : result[0][row].userId,
					'orderDate' : result[0][row].orderDate,
					'totalAmount' : result[0][row].totalAmount,
					'status' : result[0][row].status,
					'productName' : result[0][row].productName,
					'image_small' : result[0][row].image_small,
					'image_medium' : result[0][row].image_medium,
					'image_large' : result[0][row].image_large
				};
				orderArr.push(order);
			}
			return orderArr;
*/
		}

	} catch (error) {
		logger.error(`getOrderById :::: ` + error);
		throw new Error('Order not found');
	}
};


