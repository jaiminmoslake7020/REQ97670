import React, {MouseEventHandler, useState} from 'react';
import {Button} from '@mui/material';
import {ButtonProps} from '@mui/material/Button/Button';
import AutorenewIcon from '@mui/icons-material/Autorenew';

export interface LoadingButtonPropTypes extends ButtonProps {
    children: string;
    btnClick: MouseEventHandler;
}

const LoadingButton = (props: LoadingButtonPropTypes) => {
    const { onClick:thisClick, btnClick, children } = props;
    const [loading, setLoading] = useState<boolean>(false);
    console.log('loading', loading);
    return (
        <Button
            disabled={loading}
            onClick={(e:any) => {
                setLoading(true);
                setTimeout(() => {
                    btnClick(e);
                }, 10000);
            }}
            startIcon={loading ? <AutorenewIcon className={"spinning"} /> : undefined}
            {...props}
        >
            {children}
        </Button>
    );
}

LoadingButton.defaultProps = {};

export default LoadingButton;
