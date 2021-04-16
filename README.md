# Setel Interview Challange

<details>Is okay bro... they ghosted me after I submitted this repo anyway.</details>

### Notes
* We are using embedded persistent memory instead of using ORM and database. So the content will be flushed away when the node instance get terminated.

* After 10 seconds the confirmed order will be set to 'DELIVERED' state using Nodejs eventloop mechanism -- `setTimeout` will register the tasklet to eventloop and loop until it reached the time.

But in real world there are message queues and other solution to get this job right.

* The payment app will randomly reject your order. (like 50/50 percent change you will get unsuccessful order create; if you can't create an order, don't worry)

### API

1. To create an order

```POST http://localhost:3000/order
{
    "id": "123"
}
```

2. To check order

```GET http://localhost:3000/order/:order_id```
> where order_id is the id of the order


3. To cancelled an order

```PUT http://localhost:3000/order
{
    "id": "123"
}
```
> This operation will success if it is not set to 'DELIVERED' state

### Run this thing

```
cd order-app
yarn
yarn start
```

In another shell:
```
cd payment-app
yarn
yarn start
```
