//JavaScript file


function menuAllDisplay(item){

    console.log('show item:' +item.id);
let al =document.querySelector('main ul');

let base= document.createElement('li');
    base.classList.add('item');

let ids=document.createElement('p');
    ids.classList.add('id');
    ids.textContent=item.id;

    let name1=document.createElement('p');
      name1.classList.add('name');
      name1.textContent=item.name;

      let descpt=document.createElement('p');

       descpt.classList.add('description');
       descpt.textContent=item.description;

       let prices=document.createElement('p');
       prices.classList.add('price');
       prices.textContent='$' +item.price;

       let bool= document.createElement('p');
       bool.classList.add('available');
       bool.textContent=item.available;
       if (item.available === true){
           console.log( true);
       } else
         {
             console.log(false);
         }

       let btn=document.createElement('button');
          btn.textContent='Order';
          btn.addEventListener('click',function(){
         
        let menu_id= item.id;
        let itemResp = new XMLHttpRequest();

        itemResp.open('post','http://tiy-28202.herokuapp.com/order');

        itemResp.addEventListener('load',function(){
        console.log('Getting Response');
   
       });

       itemResp.send(JSON.stringify({
        table_id:'abc',
        menu_id:menu_id, 
       }))
    
             
 });

   base.appendChild(ids);
   base.appendChild(name1);
   base.appendChild(descpt);
   base.appendChild(prices);
   base.appendChild(bool);
   base.appendChild(btn);
    al.appendChild(base);
}

///getItemOrder()
function getItemOrderBill(){

}

////Get menu from Api

///Its getAllfunction() is gettin list of items

function getAllMenu(){

    let item = new XMLHttpRequest();
    item.open('Get','http://tiy-28202.herokuapp.com/menu');

    item.addEventListener('load', function(){
        let itemResponse=JSON.parse(item.responseText);
       console.log(itemResponse);
        for(let i=0; i<itemResponse.length; i++){
            console.log(itemResponse[i].id);
            let menus ={
                id:itemResponse[i].id,
                name:itemResponse[i].name,
                descpt:itemResponse[i].description,
                price:itemResponse[i].price,
                available:itemResponse[i].available
            }
            console.log(menus.id);

            if (menus.available===true) {
                menuAllDisplay(menus);
            }
        }

    });
   item.send();
}

window.addEventListener('load',function(){
  getAllMenu(); 

});



    
