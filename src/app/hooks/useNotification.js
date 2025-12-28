import { useDispatch, useSelector } from "react-redux";
import {
  getNotifications,
  deleteNotification,
  deleteAllNotifications,
} from "app/redux/slices/notificationSlice";

const useNotification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);

  return {
    notifications,
    getNotifications: () => dispatch(getNotifications()),
    deleteNotification: (id) => dispatch(deleteNotification(id)),
    clearNotifications: () => dispatch(deleteAllNotifications()),
  };
};

export default useNotification;
