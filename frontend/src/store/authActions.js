import { finishAuthCheck } from "./authSlice";

export const checkAuth = () => (dispatch) => {
  const token = localStorage.getItem("token");

  if (token) {
    dispatch(finishAuthCheck(true));
  } else {
    dispatch(finishAuthCheck(false));
  }
};
