import { useSetRecoilState } from "recoil";
import { useFetchWrapper } from "_helpers";
import { authAtom } from "_state";
import { useNavigate } from "react-router-dom";

export { useUserActions };

function useUserActions() {
    console.log("useUserActions()");
    const baseUrl = process.env.REACT_APP_API_URL;
    const fetchWrapper = useFetchWrapper();
    const setAuth = useSetRecoilState(authAtom);
    const history = useNavigate();

    return {
        signup,
        login
    };

    function signup(username, password, name) {
        console.log("useUserActions.signup()");
        return fetchWrapper.post(`${baseUrl}/users`,{ username, password, name })
            .then(user => {
                localStorage.setItem("user", JSON.stringify(user));
                setAuth(user);
                history("/login");
            })
    }

    function login(username, password) {
        console.log("useUserActions.login()");
        return fetchWrapper.post(`${baseUrl}/login`,{ username, password })
            .then(token => {
                console.log(token);
            })
    }
}


