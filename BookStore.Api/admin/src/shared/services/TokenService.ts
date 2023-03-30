    export const getLocalAccessToken = () => {
      const json = localStorage.getItem("user");
      if (json){
        const user = JSON.parse(json);
        return user?.accessToken;
      }
    };

    export const getUser = () => {
      const json = localStorage.getItem("user");
      if(json){
        return JSON.parse(json);
      }
    };

    export const setUser = (user: any) => {
      localStorage.setItem("user", JSON.stringify(user));
    };

    export const removeUser = () => {
      localStorage.removeItem("user");
    };