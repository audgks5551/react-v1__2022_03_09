export { useFetchWrapper };

function useFetchWrapper() {
    console.log("useFetchWrapper()");

    return {
        get: request("GET"),
        post: request("POST")
    }

    function request(method) {
        console.log("useFetchWrapper.request()");
        return (url, body) => {
            const requestOptions =  {
                method,
                headers: authHeader()
            };
            if (body) {
                requestOptions.headers["Content-Type"] = "application/json";
                requestOptions.body = JSON.stringify(body);
            }
            return fetch(url, requestOptions).then(handleResponse);
        }
    }

    function authHeader() {
        return { Authorization: "no" };
    }

    function handleResponse(response) {
        console.log("useFetchWrapper.handleResponse()");
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            console.log(data);
            if(!response.ok) {
                console.log("response error");
                console.log(data.message());
                console.log(response.statusText);
                const error = (data && data.message) || response.statusText;
                console.log(error);
                return Promise.reject(error);
            }

            console.log(data);
            return data;
        });
    }

}