

const fetchData  = (endpoint)=>{
    const returnData = {};
    fetch(process.env.REACT_APP_BASE_URL + endpoint).then((response)=>response.json()).then((data)=> returnData = data).catch((error)=>console.log(error));

    return returnData;
}

const postData = (endpoint, data)=>{
    const returnData = {};

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data)
    }

    fetch(process.env.REACT_APP_BASE_URL + endpoint, options).then((response)=>response.json()).then((data)=>returnData = data).catch((error)=>console.log(error));

    return returnData;
}