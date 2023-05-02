import * as React from 'react';
import MyModal from './MyModal';
import LoadingButton from './LoadingButton';
import {Button} from '@mui/material';

interface ModalProps {
    open: boolean,
    confirmMsg: string;
    onConfirm: () => void;
    handleClose: () => void;
    confirmBtnText: string,
}

const ConfirmModal: React.FC<ModalProps> = (props: ModalProps) => {
    const {
        confirmMsg,
        onConfirm,
        confirmBtnText,
        handleClose,
    } = props;

    return (
        <MyModal open={true}
                 handleClose={handleClose}
                 title={"Confirm"}
                 footerNode={<div className={"btn-row end"}>
                     <Button variant={"contained"} color={"error"} onClick={onConfirm}>{confirmBtnText}</Button>
                 </div>}
        >
            <p>{confirmMsg}</p>
        </MyModal>
    );
};

export default ConfirmModal;
