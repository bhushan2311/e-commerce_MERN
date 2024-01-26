export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch("http://localhost:8080/users?email="+email);
    const data = await response.json();
    // console.log(data);          // gives user object in http://localhost:8080/users
    // console.log(data.length);   // gives length of that object
    if(data.length){
        if(password === data[0].password){
            resolve({data:data[0]});
        }
        else{
            reject({message:"Invalid credential"});
        }
    }
    else{
        reject({message:"User not found"});
    }
    // resolve({ data });
  });
}

