import { useEffect, useState } from "react";
import { role_dic } from "../../GLOBALVARIABLE";

const useUserData = (auth, cart) => {
  const [userData, setUserData] = useState<any>();
  const [_refresh, setRefresh] = useState(0);

  const refresh = () => setRefresh((prevState) => prevState + 1);

  const fetchUserData = async () => {
    const serverResponse = await auth.axios
      .get("/api/user/userData")
      .catch((err) => console.log(err));
    if (serverResponse) setUserData(serverResponse.data.userData);
  };

  useEffect(() => {
    if (_refresh == 0) return;
    // fetchUserData();
  }, [_refresh]);

  useEffect(() => {
    if (!userData && auth.token?.value) {
      fetchUserData();
    }
  }, [auth.token]);

  useEffect(() => {
    if (userData) cart.setSavedProduct_id(userData.cart);
  }, [userData]);

  const hasAuthorization = (requiredRole: string) => {
    return userData && role_dic[userData.role] >= role_dic[requiredRole] || false;
  }

  return { data: userData, setUserData, refresh, hasAuthorization };
};

export default useUserData;
