import { Dialog } from "./dialog";
import { ref } from "vue";

const useDialogRef = <T, U = unknown>() => {
  const refDialog = ref<Dialog<T> & U>();

  const openDialog = (params?: T) => {
    refDialog.value?.openDialog(params);
  };

  return {
    refDialog,
    openDialog,
  };
};
export default useDialogRef;
