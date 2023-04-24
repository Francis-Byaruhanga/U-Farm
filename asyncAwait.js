// synchronous - one after another 

// asynchronus - can happen at the same time


// sync
console.log(" I ");

console.log(" eat ");

console.log(" Ice Cream ");

console.log("------------------------------------------------");
// async
console.log("I");

// This will be shown after 2 seconds

setTimeout(()=>{
  console.log("eat");
},2000)

console.log("Ice Cream")

// callback

function One(param, arg1, arg2){
    // do something
}

function Two(arg){
    // do something
}

// function One() is a callback function
Two(One)


console.log("---------------------------------------------")

// Ice-cream shop

// Steps

// 1 place order
// 2 Cut fruit
// 3 Add water
// 4 Start machine
// 5 Select container
// 6 Select toppings
// 7 Serve Ice-cream



let stocks = {
    Fruits : ["strawberry", "grapes", "banana", "apple"],
    liquid : ["water", "ice"],
    holder : ["cone", "cup", "stick"],
    toppings : ["chocolate", "peanuts"],
 };


// let order = () => {};

// let productions = () => {};


// let addition = (arg1, arg2) => {
//     sum = arg1 + arg2
//     return sum
// }

// console.log(addition(3,5))

// let order = (call_production) => {
//     call_production
// };
// -------------------------------------------------------
// let production = () => {
//     console.log("Production started")
// };


// let order = (call_production) =>{

//     console.log("Order placed. Please call production")
    
//     // function 👇 is being called 
//       call_production();
//     };
    
   
    
// order(production);

// 1st Function

// let order = (fruit_name, call_production) =>{

//     setTimeout(function(){
  
//       console.log(`${stocks.Fruits[fruit_name]} was selected`)
  
//   // Order placed. Call production to start
//      call_production();
//     },2000)
//   };
  
//   // 2nd Function
  
//   let production = () =>{
//     // blank for now
//   };
  
//   // Trigger 👇
//   order(0, production);
   
let production = () =>{

    setTimeout(()=>{
      console.log("production has started")
      setTimeout(()=>{
        console.log("The fruit has been chopped")
        setTimeout(()=>{
          console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} Added`)
          setTimeout(()=>{
            console.log("start the machine")
            setTimeout(()=>{
              console.log(`Ice cream placed on ${stocks.holder[1]}`)
              setTimeout(()=>{
                console.log(`${stocks.toppings[0]} as toppings`)
                setTimeout(()=>{
                  console.log("serve Ice cream")
                },2000)
              },3000)
            },2000)
          },1000)
        },1000)
      },2000)
    },0000)
  
  };


  production()


//   pending 
// Resolved
// Rejected


let is_shop_open = true;

// let order = ( time, work ) => {}


console.log("Start Here");

let order = ( time, work ) => {

    return new Promise( ( resolve, reject )=>{
  
      if( is_shop_open ){
  
        resolve( )
  
      }
  
      else{
  
        reject( console.log("Our shop is closed") )
  
      }
  
    })
  }



// step 1
order(2000,()=>console.log(`${stocks.Fruits[0]} was selected`))

// step 2
.then(()=>{
  return order(0000,()=>console.log('production has started'))
})

// step 3
.then(()=>{
  return order(2000, ()=>console.log("Fruit has been chopped"))
})

// step 4
.then(()=>{
  return order(1000, ()=>console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} added`))
})

// step 5
.then(()=>{
  return order(1000, ()=>console.log("start the machine"))
})

// step 6
.then(()=>{
  return order(2000, ()=>console.log(`ice cream placed on ${stocks.holder[1]}`))
})

// step 7
.then(()=>{
  return order(3000, ()=>console.log(`${stocks.toppings[0]} as toppings`))
})

// Step 8
.then(()=>{
  return order(2000, ()=>console.log("Serve Ice Cream"))
})
