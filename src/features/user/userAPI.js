export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve,reject) => {
    try {
      const response = await fetch(
        "http://localhost:8080/orders?user=" + userId       // for dummy api 'http://localhost:8080/orders/?user.id='
      );
      const data = await response.json();
      console.log("fetch user order-",data);
      resolve({ data });
    } catch (error) {
      reject({ error: "couldnt fetch order" });
    }
  });
}

export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/users/'+userId)
    const data = await response.json();
    console.log("logged in user - ", data);
    resolve({data})
  }
  );
}

// --------- Add address to user api from checkout -----------
export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/"+update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    console.log("-------authAPI------",data);
    resolve({ data });
  });
}