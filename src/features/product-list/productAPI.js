
export function fetchAllProducts() {
  return new Promise(async (resolve) =>{

    // TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/products')
    const data = await response.json();
    resolve({data})
  }
  );
}

export function fetchProductsByFilters({filter,sort}) {

  // filter = {category: ["smartphone", "Laptops"], brand:["apple"]}    
  let queryString = '';
  for(let key in filter){
    const filterKey = filter[key];    // array
    if(filterKey.length>0){
      const filterKeyLastValue = filterKey[filterKey.length-1];
      queryString += `${key}=${filterKeyLastValue}&`;
    }
  }

  // sort = {_sort:"price", _order:"asc/desc"}
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`;
  }
  return new Promise(async (resolve) =>{

    const response = await fetch('http://localhost:8080/products?' + queryString)
    // console.log('http://localhost:8080/products?'+queryString);
    const data = await response.json();
    resolve({data})
  }
  );
}

//  API Key after filter => http://localhost:8080/products?category=smartphones&_sort=rating&_order=desc&