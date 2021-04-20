import React from "react";
import { Auth } from "./component/auth/auth.component";
import { HouseList } from "./component/houseList/houseList.component";
import { useSelector } from "react-redux";
import { storeType } from "./state/index";

function App() {
  const authData = useSelector((state: storeType) => state?.auth.data);

  return (
    <>
      {!Object.keys(authData).length ? (
        <Auth />
      ) : (
        <HouseList AuthData={authData} />
      )}
    </>
  );
}

export default App;
