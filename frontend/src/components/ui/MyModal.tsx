import * as React from 'react';
import {useCallback} from 'react';
import {Modal} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
    open: boolean;
    handleClose: () => void;
    title: string;
    footerNode: undefined | React.ReactNode;
    children: undefined | React.ReactNode;
}

const MyModal: React.FC<ModalProps> = (props: ModalProps) => {
    const {
        open,
        handleClose,
        title,
        footerNode,
        children
    } = props;

    const handleCloseModal = useCallback(() => {
        handleClose();
    }, [handleClose]);

    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <div className={"modal-component"}>
                <div className={"modal-header"}>
                    <h2 className="modal-title">{title}</h2>
                    <button type="button" className="transparent-btn" onClick={handleCloseModal}>
                        <CloseIcon/></button>
                </div>
                <div className={"modal-body"}>
                    {
                        children
                    }
                </div>
                {
                    footerNode ? <div className={"modal-footer"}>{footerNode}</div> : null
                }
            </div>
        </Modal>
    );
};

export default MyModal;
