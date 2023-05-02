import React, {useCallback} from 'react';
import {removeEmployeeApi} from '../../services/api';
import {PositionType} from '../../types/types';
import ConfirmModal from '../ui/ConfirmModal';
import {ReduxStoreStateType, useAppDispatch, useAppSelector} from '../../redux/store';
import {resetPosition} from '../../redux/reducers/currentPosition';
import {setPositions} from '../../redux/reducers/positionData';

export type RemoveEmployeePropTypes = {
    id: number,
    handleClose: () => void,
};

const RemoveEmployee = (props: RemoveEmployeePropTypes) => {
    const { handleClose, id } = props;
    const dispatch = useAppDispatch();
    const { positions, loading } = useAppSelector((store:ReduxStoreStateType) => store.positionData);

    const resetPositionReduxFn = useCallback(() => {
        dispatch(resetPosition());
    },[]);

    const updatePositions = useCallback((d:PositionType) => {
        const newPositions = [] as PositionType[];
        positions.forEach((p:PositionType) => {
            if (p.id === d.id) {
                newPositions.push(d);
            } else {
                newPositions.push(p);
            }
        })
        dispatch(setPositions(newPositions));
    },[positions]);

    const onConfirm =  useCallback(() => {
        removeEmployeeApi(id).then((d: PositionType|string) =>{
            if (typeof d !== "string") {
                console.log('remove employee', d);
                resetPositionReduxFn();
                updatePositions(d);
                handleClose();
            } else {
                handleClose();
            }
        }).catch((e) => {
            handleClose();
        });
    }, [resetPositionReduxFn, updatePositions, handleClose]);

    return (
        <ConfirmModal
            open={true}
            handleClose={handleClose}
            confirmMsg={"Are you sure you want to remove this Employee?"}
            onConfirm={onConfirm}
            confirmBtnText={"Remove"}
        />
    );
}

RemoveEmployee.defaultProps = {};

export default RemoveEmployee;
