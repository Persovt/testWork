import React from "react";
import { Auth } from "./component/auth/auth.component";
import { HouseList } from "./component/houseList/houseList.component";
import { useSelector } from "react-redux";
function App() {
  const authData = useSelector((state: any) => state?.auth);

  return (
    <>
      {!Object.keys(authData.data).length ? (
        <Auth />
      ) : (
        <HouseList AuthData={authData} />
      )}
    </>
  );
}

export default App;
