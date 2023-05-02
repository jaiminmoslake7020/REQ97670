import * as React from 'react';
import { Button } from '@mui/material';
import {useCallback, useState} from 'react';
import MyModal from './ui/MyModal';
import {PositionType, StaffType} from '../types/types';
import {maxAllowedLevel} from '../utils/chart-config';
import RemoveEmployee from './actions/RemoveEmployee';
import {resetPosition} from '../redux/reducers/currentPosition';
import {useAppDispatch} from '../redux/store';
import FillEmployee from './actions/FillEmployee';
import DescEmployee from './actions/DescEmployee';
import UpdateEmployeeInfo from './actions/UpdateEmployeeInfo';

interface ModalProps {
    open: boolean;
    currentPosition: PositionType
}

const ActionModal: React.FC<ModalProps> = (props:ModalProps) => {
    const { open, currentPosition } = props;
    const { staff, positionType, id, title } = currentPosition;
    const { level } = positionType || {};
    const isJuniorDeveloper = level === maxAllowedLevel;
    const isDirector = level === 0;

    const [updateEmployee, setUpdateEmployee] = useState<undefined|StaffType>(undefined);
    const [removeEmployee, setRemoveEmployee] = useState<undefined|number>(undefined);
    const [addDescendantPosition, setAddDescendantPosition] = useState<undefined|number>(undefined);
    const [fillPositionStaff, setFillPositionStaff] = useState<undefined|number>(undefined);

    const dispatch = useAppDispatch();
    const handleCloseModal = useCallback(() => {
        dispatch(resetPosition());
    },[]);

    const updateEmployeeInfo = useCallback(() => {
        setUpdateEmployee(staff as StaffType)
    },[staff]);

    const removeEmployeeFn = useCallback(() => {
        setRemoveEmployee(id)
    },[id]);

    const addDescendantEmployee = useCallback(() => {
        setAddDescendantPosition(id)
    },[id]);

    const fillPosition = useCallback(() => {
        setFillPositionStaff(id);
    },[id]);

    console.log('removeEmployee', removeEmployee);

    return (
        <>
            <MyModal open={open} handleClose={handleCloseModal} title={`Choose Action - ${title}`} footerNode={undefined} >
                <div className={"btn-row"}>
                    {
                        staff ?
                            <>
                                {/* User Story 2 */}
                                <Button variant={"contained"} color={"primary"} onClick={updateEmployeeInfo}>Update Employee Info</Button>
                            </>
                            : null
                    }
                    {
                        staff && !isDirector ?
                            <>
                                {/* User Story 3 */}
                                <Button variant={"contained"} color={"primary"} onClick={removeEmployeeFn}>Remove Employee</Button>
                            </>
                            : null
                    }
                    {
                        !isJuniorDeveloper ?
                            <>
                                {/* User Story 4 */}
                                <Button variant={"contained"} color={"primary"} onClick={addDescendantEmployee}>Add Descendant Employee</Button>
                            </>
                            : null
                    }
                    {
                        !staff ?
                            <>
                                {/* User Story 5 */}
                                <Button variant={"contained"} color={"primary"} onClick={fillPosition}>Fill Position</Button>
                            </>
                            : null
                    }
                </div>
            </MyModal>
            {
                removeEmployee ? <RemoveEmployee
                    handleClose={() => {
                    setRemoveEmployee(undefined);
                }} id={id}
                /> : null
            }

            {
                fillPositionStaff ? <FillEmployee
                    handleClose={() => {
                        setFillPositionStaff(undefined);
                    }}
                    id={fillPositionStaff}
                /> : null
            }

            {
                addDescendantPosition ? <DescEmployee
                    handleClose={() => {
                        setAddDescendantPosition(undefined);
                    }}
                    id={addDescendantPosition}
                /> : null
            }

            {
                updateEmployee ? <UpdateEmployeeInfo
                    handleClose={() => {
                        setUpdateEmployee(undefined);
                    }}
                    staff={updateEmployee}
                    positionId={id}
                /> : null
            }

        </>
    );
};

export default ActionModal;
