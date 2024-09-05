

export const fetchData  = (endpoint)=>{

    const idToken = localStorage.getItem('id_token');
    const options = {
        headers: {
            'Authorization': 'Bearer ' + idToken
        }
    }
    return fetch(process.env.REACT_APP_BASE_URL + endpoint, options).then((res)=>
        {
            console.log(res);
            if(res.status === 200)
                return res.json();
            else
                throw new Error(res.statusText);
        }).then((data)=> data).catch((error)=>{return {message: error.message}});
}

export const postData = (endpoint, data, action)=>{
    const returnData = {};

    const idToken = localStorage.getItem('id_token');

    const options = {
        method: action,
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + idToken
        },
        body: JSON.stringify(data)
    }

    return fetch(process.env.REACT_APP_BASE_URL + endpoint, options).then((res)=>res.json()).then((data)=>data).catch((error)=>{console.log(error); return error;});

}