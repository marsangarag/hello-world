import { createContext } from "react";

import useModal from "lib/hooks/useModal";
import Modal from "components/common/modal";

const ModalContext = createContext(null);
const { Provider }: any = ModalContext;

const ModalProvider = ({ children }: any) => {
    const {
        visible,
        modalTitle,
        modalContent,
        isCenter,
        footer,
        banner,
        handleModal,
    } = useModal();

    return (
        <Provider
            value={{
                visible,
                modalTitle,
                modalContent,
                isCenter,
                footer,
                banner,
                handleModal,
            }}
        >
            <Modal />
            {children}
        </Provider>
    );
};

export { ModalContext, ModalProvider };
