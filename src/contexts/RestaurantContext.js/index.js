import { Auth, DataStore } from "aws-amplify";
import { createContext, useContext, useEffect, useState } from "react";
import { Courier, Order, Restaurant } from "../../models";

const RestaurantContext = createContext({});

const RestaurantContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [restaurant, setRestaurant] = useState();

  const sub = user?.attributes?.sub;

  useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: true,
    }).then(setUser);
  }, []);

  useEffect(() => {
    if (!sub) {
      return;
    }
    DataStore.query(Restaurant, (r) => r.adminSub.eq(sub))
      .then((restaurants) => {
        setRestaurant(restaurants[0]);
      })
      .catch((e) => console.log(e));
  }, [sub]);
  console.log(sub);
  console.log(restaurant);

  return (
    <RestaurantContext.Provider value={{ restaurant, sub, setRestaurant }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContextProvider;

export const useRestaurantContext = () => useContext(RestaurantContext);
