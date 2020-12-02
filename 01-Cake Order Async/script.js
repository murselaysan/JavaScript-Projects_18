"use strict";

const patisserie = {
  bananaCaramel: {
    stock: 3,
    price: 9.99,
  },
  contessa: {
    stock: 5,
    price: 7.99,
  },
  concorde: {
    stock: 11,
    price: 22.99,
  },
  mouseCake: {
    stock: 8,
    price: 16.99,
  },
  confettiSuprise: {
    stock: 9,
    price: 14.99,
  },
};

const checkOrder = (order) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let inStock = patisserie[order[0]].stock >= order[1];

      if (inStock) {
        let totalCost = 0;
          totalCost += order[1] * patisserie[order[0]].price;
      
        console.log(
          `All of the items are in stock. The total cost of the order is ${totalCost}. Press "1" if it is ok?`
        );
        resolve([order, totalCost]);
      } else {
        reject(
          `The order could not be completed because some items are sold out.`
        );
      }
    }, 1000);
  });
};



const payment = (resolvedValueArray) => {
  let order = resolvedValueArray[0];
  let totalCost = resolvedValueArray[1];

  return new Promise((resolve, reject) => {
  setTimeout(() => {
  document.addEventListener("keypress", function (event) {
    let entryKey = event.key;
    if (entryKey === "1") {
        console.log(`Payment processed completed. You paid ${totalCost} $`);
        resolve(order)
      } else {
        reject(`Cannot process order: Thank you choosing us!`);
      }
    });
  }, 2000);
})
}

const stockControl = (order) => {
  return new Promise((resolve, reject) => {
    console.log("To Cashier: Wait for checking stock...")
    setTimeout(() => {
      patisserie[order[0]].stock = patisserie[order[0]].stock - order[1];
      if (patisserie[order[0]].stock > 2) {
        resolve(`${order[0]} stock is enough`);
      } else {
        reject(`${order[0]} stock is ${patisserie[order[0]].stock} and it is critic`);
      }
    }, 3000);
    });
  }


const cakeType = document.getElementById('cakeSelect');
const orderAmount = document.getElementById('cakeAmount');
const orderBtn = document.getElementById('submit_btn');

orderBtn.onclick = async ()=>{

  console.log(`You ordered ${orderAmount.value} ${cakeType.options[cakeType.selectedIndex].text}.`)
  const order = [cakeType.value, orderAmount.value];
  
try {
 let orderValue = await checkOrder(order);
 let paymentValue = await payment(orderValue);
 let stockValue = await stockControl(paymentValue);
  console.log(stockValue)
} catch (error) {
  // Catches any errors in the try block
  console.log(error);
  //console.log('Produce more cakes!');
}
}


