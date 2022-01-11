import { ReactNode } from "react";
import ReacModal, {Props} from "react-modal";
import { rgba } from "polished";

interface ModalProps extends Props {
  isOpen: boolean;
  children: ReactNode;
}

ReacModal.setAppElement('#root');

const customStyles = {
  overlay: {
    background: rgba("#050206", 0.8),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px"
  },
  content: {
    padding: 0,
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    inset: "auto"
  }
}

export function Modal({isOpen = false, children, ...props}: ModalProps) {
  
  return (
    <ReacModal
      isOpen={isOpen}
      style={customStyles}
      {...props}
    >
      {children}
    </ReacModal>
  );
}