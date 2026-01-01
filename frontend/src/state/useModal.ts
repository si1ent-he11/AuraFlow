import { create } from "zustand";
import type { DeleteProps } from "../components/modals/DeleteSpace/DeleteSpace";

interface EmptyProps {}

export type ModalPropsMap = {
  delete: DeleteProps;
  add: EmptyProps;
  error: EmptyProps;
  setProfile: EmptyProps;
}

interface useModalType {
    isOpen: boolean;
    type: keyof ModalPropsMap | null;
    props: ModalPropsMap[keyof ModalPropsMap] | null,
    
    openModal: <T extends keyof ModalPropsMap>(type: T, props: ModalPropsMap[T]) => void;
    closeModal: () => void;
}

export const useModal = create<useModalType>((set) => ({
    isOpen: false,
    type: null,
    props: null,

    openModal: <T extends keyof ModalPropsMap>(type: T, props?: ModalPropsMap[T]) => 
      set({ isOpen: true, type, props }),
    closeModal: () => set({ isOpen: false, type: null, props: null }),
}))