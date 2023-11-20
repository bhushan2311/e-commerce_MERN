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

export function fetchItemsbyUserId(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart?user='+userId);
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

export function deleteFromCart(productId) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart'+productId,{
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