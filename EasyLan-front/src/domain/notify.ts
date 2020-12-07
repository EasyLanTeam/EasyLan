import { toast } from "react-toastify";

export function notifyError(msg: string) {
  toast(msg, { type: "error" });
}

export function notifyWarn(msg: string) {
  toast(msg, { type: "warning" });
}

export function notifySuccess(msg: string) {
  toast(msg, { type: "success" });
}
