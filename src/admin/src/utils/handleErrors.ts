import { toast } from "react-toastify";

// eslint-disable-next-line
export const errorHandler = (error: any, callback?: () => void) => {
  if (error.errors) {
    const messages = (Object.values(error.errors) as string[][]).flat();

    messages.forEach((message) => {
      toast.error(message);
    });
  } else if (error.message) {
    toast.error(error.message);
  } else if (error.title) {
    toast.error(error.title);
    return;
  } else {
    toast.error("Something went wrong");
  }
  if (callback) {
    callback();
  }
};
