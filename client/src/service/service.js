

export const fetchData  = (endpoint)=>{
    return fetch(process.env.REACT_APP_BASE_URL + endpoint).then((res)=>res.json()).then((data)=> data).catch((error)=>console.log(error));
}

export const postData = (endpoint, data, action)=>{
    const returnData = {};

    const options = {
        method: action,
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data)
    }

    return fetch(process.env.REACT_APP_BASE_URL + endpoint, options).then((res)=>res.json()).then((data)=>data).catch((error)=>{console.log(error); return error;});

}