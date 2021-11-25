import { useEffect, useState } from "react";
import { role_dic } from "../../GLOBALVARIABLE";

const useUserData = (auth) => {
  const [userData, setUserData] = useState<any>({ username: "loading" });
  const [_refresh, setRefresh] = useState(0);

  const refresh = () => setRefresh((prevState) => prevState + 1);

  const fetchUserData = async () => {
    let serverResponse 
    serverResponse = await auth.axios
      .get("/api/user/userData")
      .catch(err => serverResponse = err.response);
      // console.log("the request resolve")
    if (serverResponse.status == 200) {
      setUserData(serverResponse.data.userData);
    }else{
      // console.log("The else par ran")
      setUserData(undefined);
    }
  };

  useEffect(() => {
    if (_refresh == 0) return;
    fetchUserData();
  }, [_refresh]);

  useEffect(() => {
    // console.log("The value of the token", auth.token)
    if (userData?.username == "loading" && auth.token?.value  && auth.token?.value != "loading") {
      fetchUserData();
    }else if (!auth.token){
      setUserData(undefined)
    }
  }, [auth.token]);

  const hasAuthorization = (requiredRole: string) => {
    return (
      (userData && role_dic[userData.role] >= role_dic[requiredRole]) || false
    );
  };

  const Owns = (product) => {
    return product?.owner?._id == userData?._id
  }
  return { data: userData, setUserData, refresh, hasAuthorization , Owns};
};

export default useUserData;
