
//Get all item using function menuAllDisplay()
function menuAllDisplay(item){
    let template=document.querySelector('#message-template').innerHTML;

    let al =document.querySelector('ul');

    let base=document.createElement('li');
    base.innerHTML=Mustache.render(template,{

    id:item.id,
    name:item.name,
    description:item.description,
    price:item.price,
    available: item.available,
    // if (item.available = 'true') {
    //     return :'true';
    // } else {
    //     return:'false');

    });
   let menu_id=item.id;
   let itemResp=new XMLHttpRequest();

   itemResp.open('post', 'http://tiy-28202.herokuapp.com/order');
   itemResp.addEventListener('load',function(){

    console.log('Getting Response');
   });
   itemResp.send(JSON.stringify({
   table_id:'abc' ,
   menu_id:menu_id,
   }))

  al.appendChild(base);
    }
    
//Generate the bill of particular table_id
 function getItemOrderBill(item){
     let itemName=document.querySelector('p');
     itemName.textContent=itemName.name;

     let itemPrice=document.querySelector('p');
     itemPrice.textContent=itemPrice.price;
 }


//Try to get all order item from table_id 
function getOrderByTableId()
{
   let tblResponse=new XMLHttpRequest(); 
   tblResponse.open('get','http://tiy-28202.herokuapp.com/order') ;

   tblResponse.addEventListener('load',function(){
       let orderResponse=JSON.parse(tblResponse.responseText);
       console.log(orderResponse);
     for(let i=0;i<orderResponse.length;i++){

     }
       getItemOrderBill(orderResponse[i]);
   }) ;
   tblResponse.send();
} 

function getAllMenu(){
    let item=new XMLHttpRequest();
    item.open('Get','http://tiy-28202.herokuapp.com/menu');

    item.addEventListener('load', function(){
    let itemResponse=JSON.parse(item.responseText);
    console.log(itemResponse);
    for(let i=0;i<itemResponse.length;i++){
        console.log(itemResponse[i].id);

        let menus={
             id:itemResponse[i].id,
             name:itemResponse[i].name,
             descpt:itemResponse[i].description,
             price:itemResponse[i].price,
             available:itemResponse[i].available
        }
        if(menus.available=== true){
            menuAllDisplay(menus);
        }
    }
   
});
 item.send();
}  
window.addEventListener('load',function(){
    getAllMenu();
    getOrderByTableId();
});    
