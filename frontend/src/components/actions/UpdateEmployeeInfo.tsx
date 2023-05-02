import React, {useCallback, useEffect, useState} from 'react';
import MyModal from '../ui/MyModal';
import {Button, TextField} from '@mui/material';
import {isStringAndNotEmpty} from '../../utils/transformer';
import {PositionType, StaffType} from '../../types/types';
import {fillPositionStaffFn, updateEmployeeFn} from '../../services/api';
import {ReduxStoreStateType, useAppDispatch, useAppSelector} from '../../redux/store';
import {resetPosition} from '../../redux/reducers/currentPosition';
import {setPositions} from '../../redux/reducers/positionData';

export type UpdateEmployeeInfoPropTypes = {
    handleClose: ()=>void,
    staff: StaffType,
    positionId: number
};

const UpdateEmployeeInfo = (props: UpdateEmployeeInfoPropTypes) => {
    const { handleClose, staff, positionId } = props;
    const [submitAllowed, setSubmitAllowed] = useState<boolean>();
    const dispatch = useAppDispatch();
    const { positions, loading } = useAppSelector((store:ReduxStoreStateType) => store.positionData);
    const resetPositionReduxFn = useCallback(() => {
        dispatch(resetPosition());
    },[]);
    const updatePositions = useCallback((d:StaffType) => {
        const newPositions = [] as PositionType[];
        positions.forEach((p:PositionType) => {
            if (p.id === positionId) {
                newPositions.push({...p, staff: d});
            } else {
                newPositions.push(p);
            }
        })
        dispatch(setPositions(newPositions));
    },[positions, positionId]);

    const [formData, setFormData] = useState<Partial<StaffType>>({
        firstName: '',
        lastName: '',
    });

    const handleInputChange = useCallback((event:any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    },[formData]);

    useEffect(() => {
        const mount = () => {
            const p = formData &&
                isStringAndNotEmpty(formData.firstName) &&
                isStringAndNotEmpty(formData.lastName);
            setSubmitAllowed(!p);
        }
        return mount();
    },[formData]);

    useEffect(() => {
        const mount = () => {
            const {firstName, lastName} = staff;
            setFormData({
                firstName, lastName
            });
        }
        return mount();
    },[staff])

    const fillAnEmployee = useCallback(() => {
        const { id } = staff;
        updateEmployeeFn(id, formData).then((d: StaffType|string) =>{
            if (typeof d !== "string") {
                console.log('fill employee', d);
                resetPositionReduxFn();
                updatePositions(d);
                handleClose();
            } else {
                handleClose();
            }
        }).catch((e) => {
            handleClose();
        });
    }, [staff, formData, resetPositionReduxFn, updatePositions, handleClose]);

    return (
        <MyModal open={true}
                 handleClose={handleClose}
                 title={"Fill Employee Position"}
                 footerNode={
                     <div className={"btn-row"}>
                         <Button variant={"contained"} color={"error"} onClick={handleClose}>Cancel</Button>
                         <Button
                             disabled={submitAllowed}
                             variant={"contained"}
                             color={"primary"}
                             onClick={fillAnEmployee}>
                             Submit
                         </Button>
                     </div>
                 } >
            <div className={"flex flex-col gap-2"}>
                <TextField
                    required={true}
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
                <TextField
                    required={true}
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
            </div>
        </MyModal>
    );
}

UpdateEmployeeInfo.defaultProps = {};

export default UpdateEmployeeInfo;
