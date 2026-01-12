import { createSlice } from "@reduxjs/toolkit";
import { navigations } from "app/navigations";

const getFilteredNavigations = (navList = [], role) => {
  return navList.reduce((array, nav) => {
    if (nav.auth) {
      if (nav.auth.includes(role)) {
        array.push({ ...nav });
      }
    } else {
      if (nav.children) {
        const children = getFilteredNavigations(nav.children, role);
        array.push({ ...nav, children });
      } else {
        array.push({ ...nav });
      }
    }
    return array;
  }, []);
};

const navigationSlice = createSlice({
  name: "navigations",
  initialState: [...navigations],
  reducers: {
    setNavigationByUser: (state, action) => {
      return getFilteredNavigations([...navigations], action.payload);
    },
    resetNavigation: () => [...navigations],
  },
});

export const { setNavigationByUser, resetNavigation } = navigationSlice.actions;
export default navigationSlice.reducer;
