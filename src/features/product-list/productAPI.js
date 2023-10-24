
export function fetchAllProducts() {
  return new Promise(async (resolve) =>{

    // TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/products')
    const data = await response.json();
    resolve({data})
  }
  );
}

export function fetchProductsByFilters({filter,sort, pagination}) {

  // filter = {category: ["smartphone", "Laptops"], brand:["apple"]}    
  // sort = {_sort:"price", _order:"asc"}
  // pagination = {_page:1, _limit:10}    // _page=1&_limit=10

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
  
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`;
  }


  return new Promise(async (resolve) =>{

    const response = await fetch('http://localhost:8080/products?' + queryString)
    console.log('http://localhost:8080/products?'+queryString);
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');  // json also returns the total number of objects in 'X-Total-Count' which is totalItems
    resolve({data:{products:data,totalItems:+totalItems}});
  }
  );
}

//  API Key after filter => http://localhost:8080/products?category=smartphones&_sort=rating&_order=desc&_page=1&_limit=10