import Cookies from "js-cookie";
const logOut = () => {

    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');


}

export default logOut;