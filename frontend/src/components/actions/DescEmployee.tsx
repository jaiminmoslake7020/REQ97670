import React, {useCallback, useEffect, useState} from 'react';
import MyModal from '../ui/MyModal';
import {Button, TextField} from '@mui/material';
import {isStringAndNotEmpty} from '../../utils/transformer';
import {DescendantEmployee, PositionType, StaffType} from '../../types/types';
import {addDescendantPositionFn, fillPositionStaffFn, getAllPositions} from '../../services/api';
import {ReduxStoreStateType, useAppDispatch, useAppSelector} from '../../redux/store';
import {resetPosition} from '../../redux/reducers/currentPosition';
import {setPositions} from '../../redux/reducers/positionData';

export type FillEmployeePropTypes = {
    handleClose: ()=>void,
    id: number,
};

const DescEmployee = (props: FillEmployeePropTypes) => {
    const { handleClose, id } = props;
    const [submitAllowed, setSubmitAllowed] = useState<boolean>();
    const dispatch = useAppDispatch();
    const resetPositionReduxFn = useCallback(() => {
        dispatch(resetPosition());
    },[]);
    const updatePositions = useCallback(() => {
        getAllPositions()
            .then((d:PositionType[]|string) => {
                if (Array.isArray(d) && d.length > 0) {
                    dispatch(setPositions(d));
                }
            });
    },[]);

    const [formData, setFormData] = useState<DescendantEmployee>({
        staff: {
            firstName: '',
            lastName: '',
        },
        position: {
            title: '',
        }
    });

    const handleInputChange = useCallback((event:any) => {
        const { name, value } = event.target;
        if (['firstName','lastName'].includes(name)) {
            setFormData({ ...formData, staff:{...formData['staff'], [name]: value }});
        } else {
            setFormData({ ...formData, position:{...formData['position'], [name]: value }});
        }
    },[formData]);

    useEffect(() => {
        const mount = () => {
            const { staff, position } = formData;
            const p = staff &&
                isStringAndNotEmpty(staff.firstName) &&
                isStringAndNotEmpty(staff.lastName);
            const q = position &&
                isStringAndNotEmpty(position.title);
            setSubmitAllowed(!q);
        }
        return mount();
    },[formData])

    const addDescEmployee = useCallback(() => {
        const { staff, position } = formData;
        const p = staff &&
            isStringAndNotEmpty(staff.firstName) &&
            isStringAndNotEmpty(staff.lastName);
        addDescendantPositionFn(id, {
            position, staff: p ? staff : undefined
        }).then((d: PositionType|string) =>{
            if (typeof d !== "string") {
                console.log('Desc employee', d);
                resetPositionReduxFn();
                updatePositions();
                handleClose();
            } else {
                handleClose();
            }
        }).catch((e) => {
            handleClose();
        });
    }, [formData, resetPositionReduxFn, updatePositions, handleClose]);

    return (
        <MyModal open={true}
                 handleClose={handleClose}
                 title={"Add Descendant Position"}
                 footerNode={
                     <div className={"btn-row"}>
                         <Button variant={"contained"} color={"error"} onClick={handleClose}>Cancel</Button>
                         <Button
                             disabled={submitAllowed}
                             variant={"contained"}
                             color={"primary"}
                             onClick={addDescEmployee}>
                             Submit
                         </Button>
                     </div>
                 } >
            <div className={"flex flex-col gap-2"}>
                <TextField
                    required={true}
                    id="position"
                    name="title"
                    label="Position Title"
                    value={formData.position.title}
                    onChange={handleInputChange}
                />
                <TextField
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={formData.staff ? formData.staff.firstName : ''}
                    onChange={handleInputChange}
                />
                <TextField
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={formData.staff ? formData.staff.lastName : ''}
                    onChange={handleInputChange}
                />
            </div>
        </MyModal>
    );
}

DescEmployee.defaultProps = {};

export default DescEmployee;
