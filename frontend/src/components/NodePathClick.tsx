import React, {useCallback, useState} from 'react';

export type NodePathClickPropTypes = {

};

const NodePathClick = (props: NodePathClickPropTypes) => {
    const {} = props;

    const forEachCallBack = useCallback((el:any) => {
        // const pointId = el.point.id;
        // console.log('el.point', pointId);
        // el.addEventListener('hover',(e:any) => {
        //    console.log('e', e.point.appData);
        // });
    }, [])

    document.querySelectorAll('path.highcharts-node').forEach(forEachCallBack);

    return (
        <></>
    );
}

NodePathClick.defaultProps = {};

export default NodePathClick;
