export function addToCart(item) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart',{
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({data})
  }
  );
}

export function fetchItemsbyUserId() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart');
    const data = await response.json();
    if(data){
      resolve({data})
    }
    else{
      resolve({data:"Failed to fetch"})
    }
  }
  );

}
export function updateCart(updateItem) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart/'+updateItem.id,{
      method:"PATCH",
      body:JSON.stringify(updateItem),
      headers:{ "content-type": "application/json" }
    });
    const data = await response.json();
    if(data){
      resolve({data})
    }
    else{
      resolve({data:"Couldn't Update Item"})
      
    }
  }
  );
}

export function deleteFromCart(productId) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart/'+productId,{
      method: "DELETE",
      headers: { "content-type": "application/json" },
    }
    );
    const data = await response.json();
    
    resolve(
      {
        data:{
          id:productId
        }
      }
    );
  }
  );
}

export function resetCart() {
  return new Promise(async (resolve) =>{
    const response = await fetchItemsbyUserId();
    const items = response.data;
    for(let item of items){
      await deleteFromCart(item.id);
    }
    resolve({status:"deleted-all"});
  }
  );
}