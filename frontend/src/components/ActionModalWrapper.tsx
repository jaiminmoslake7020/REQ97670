import React from 'react';
import ActionModal from './ActionModal';
import {ReduxStoreStateType, useAppSelector} from '../redux/store';

const ActionModalWrapper = () => {
    const { position:nodeData } = useAppSelector((store:ReduxStoreStateType) => store.currentPosition);
    return (
        nodeData ? <ActionModal open={true} currentPosition={nodeData} /> : null
    );
}

ActionModalWrapper.defaultProps = {};

export default ActionModalWrapper;
