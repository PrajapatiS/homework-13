



function getAllTable(){

    let response= new XMLHttpRequest();
    response.open('Get','http://tiy-28202.herokuapp.com/order');

    response.addEventListener('load',function(){
    let tblresponse = JSON.parse(response.responseText);

    let dropdownbox=document.querySelector('#table');

     console.log(dropdownbox);

    console.log(tblresponse);
    for(let i=0;i<tblresponse.length;i++){
        let option=document.createElement('option');
        option.text=tblresponse[i].table_id;
        dropdownbox.add(option);
        console.log(tblresponse[i]);
     
    }
 
 });
    response.send();
}

function changeEventHandler() {
    console.log('alert');
   
      let tableId=document.querySelector('#table').value;
       console.log(tableId);
    getAllItemsByTable(tableId);
}

////

function getAllItemsByTable(table_id){

    let response= new XMLHttpRequest();
    response.open('Get','http://tiy-28202.herokuapp.com/order');

    response.addEventListener('load',function(){
    let tblresponse = JSON.parse(response.responseText);
    
    console.log(tblresponse);
    for(let i=0;i<tblresponse.length;i++){
       if(table_id===tblresponse[i].table_id){
           
           allOrderItems(tblresponse[i])
       }
       
       
        console.log(tblresponse[i]);
     
    }

 });
    response.send();
}
//
function allOrderItems(orderItems){
  let template = document.querySelector('#checkout-template').innerHTML;
    let base = document.querySelector('ul');
    
    let totalPrice=document.querySelector('#total');
    let totalValue=0;
    for(let i=0;i<orderItems.items.length;i++){
       totalValue=totalValue+orderItems.items[i].price;
       console.log(i);
    }
    totalPrice.textContent='$ '+totalValue;
    console.log(totalValue);
    let el= document.createElement('li');
    el.innerHTML=Mustache.render(template,{

        table_id:orderItems.table_id,
        //name:items.name,
        items:orderItems.items
        //price:items.price
    });
     base.appendChild(el);
     
}

function validateName(name){
    let regexpress=/^[A-Z][a-zA-Z,' ]+$/;
    return regexpress.exec(name);
}

function validateEmail(email)
{
    let reexpress=/^[a-zA-Z0-9][a-zA-Z0-9._]*@[a-zA-Z]+(\.[a-zA-Z]+)+$/;
    return reexpress.exec(email);
}
function validateCreditCard(creditCard){
    let regexpress=/^([0-9]{4}[- ]?){3}[0-9]{4}$/;
    return regexpress.exec(creditCard);
}
  
//Validating person Information  
function validateCreditInfo(){

let name = document.querySelector('#name1');
if(validateName(name.value))
{
    console.log('Valid Name');
}else{
    console.log('Invalid Name');
}

let email = document.querySelector('#email1');
if(validateEmail(email.value))
{
  console.log('Valid Email');
}else{
console.log('Email not valid');
}

let creditCard = document.querySelector('#credit-card1');
if(validateCreditCard(creditCard.value)){
    console.log('Valid Credit Card');
}else{
    console.log('Invalid  Credit Card');
}
      
}



window.addEventListener('load',function(){
    getAllTable();  


});