import { getUser } from "../utils/auth";

const useAuth = () => {
  const user = getUser();

  return {
    user,
    isLogin: !!user
  };
};

export default useAuth;