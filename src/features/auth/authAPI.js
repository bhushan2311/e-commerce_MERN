export function createUser(userData) {
  return new Promise(async (resolve,reject) => {
    console.log("createUser- ",userData.email); 
    const response = await fetch("http://localhost:8080/users?email="+userData.email);
    const checkEmailExist = await response.json();

    if (checkEmailExist.length) {         // if length > 0
      console.log("rejected"); 
      reject({message:"Email already exist"});
    } 
    else {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      resolve({ data });
    }
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch("http://localhost:8080/users?email=" + email);
    const data = await response.json();
    // console.log(data);          // gives user object in http://localhost:8080/users
    // console.log(data.length);   // gives length of that object
    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "Invalid credential" });
      }
    } else {
      reject({ message: "User not found" });
    }
    // resolve({ data });
  });
}

export function signOut(userData) {
  return new Promise(async (resolve) => {
    resolve({ data: "Success" });
  });
}
