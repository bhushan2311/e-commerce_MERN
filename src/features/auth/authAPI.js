export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    // console.log("createUser- ", userData.email);
    // const response = await fetch(
    //   "http://localhost:8080/users?email=" + userData.email
    // );
    // const checkEmailExist = await response.json();

    // if (checkEmailExist.length) {
    //   // if length > 0
    //   console.log("rejected");
    //   reject({ message: "Email already exist" });
    // } else {
    // }
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        // changed /user to /auth/signup
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        console.log("ha wala error----", error);
        reject({ error });
      }
    } catch (error) {
      reject({ error });
    }
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });

      if (response.ok) {
        // if response is 200(ok)
        const data = await response.json();
        console.log({ data });
        resolve({ data });
      } else {
        const error = await response.json();
        // console.log("ha wala error", error);
        reject({ error });
      }
    } catch (error) {
      reject({ error });
    }

    /*// console.log(data);          // gives user object in http://localhost:8080/users
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
    // resolve({ data });*/
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/check");

      if (response.ok) {
        // if response is 200(ok)
        const data = await response.json();
        console.log("ok",{ data });
        resolve({ data });
      } else {
        const error = await response.json();
        // console.log("ha wala error", error);
        reject({ error });
      }
    } catch (error) {
      reject({ error });
    }
  });
}



export function signOut(userData) {
  return new Promise(async (resolve) => {
    resolve({ data: "Success" });
  });
}
