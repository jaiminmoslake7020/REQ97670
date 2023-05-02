import React, {useCallback, useEffect, useRef, useState} from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsSankey from 'highcharts/modules/sankey';
import HighchartsOrganization from 'highcharts/modules/organization';
import ActionModal from './ActionModal';
import {getAllPositions} from '../services/api';
import {PositionType} from '../types/types';
import {
    getDataOptionForOrganizationCharts,
    getNodesOptionForOrganizationCharts
} from '../utils/transformer';
import {
   options
} from '../utils/chart-config';
import {ReduxStoreStateType, useAppDispatch, useAppSelector} from '../redux/store';
import {setPositions} from '../redux/reducers/positionData';
import {resetPosition, setPosition} from '../redux/reducers/currentPosition';
import ActionModalWrapper from './ActionModalWrapper';

if (typeof Highcharts === 'object') {
    HighchartsSankey(Highcharts);
    HighchartsOrganization(Highcharts);
}

function App() {

    const chartRef = useRef();
    const [chartOptions, setChartOptions] = useState<Highcharts.Options>(options);

    const dispatch = useAppDispatch();
    const { positions, loading } = useAppSelector((store:ReduxStoreStateType) => store.positionData);

    const setNodeData = useCallback((d:PositionType) => {
        dispatch(setPosition(d))
    }, []);

    const handleClose = useCallback(() => {
        // @ts-ignore
        dispatch(resetPosition())
    }, []);

    const processChart = useCallback((d:PositionType[]) => {
        const data = getDataOptionForOrganizationCharts(d);
        const nodes = getNodesOptionForOrganizationCharts(d);
        // @ts-ignore
        setChartOptions({...chartOptions, series: [{...chartOptions.series[0], data, nodes,
                events: {
                    click: (e: any) => {
                        setNodeData(e.point.appData);
                    }
                }
            }] });
    },[chartOptions, positions]);

    let waitLittlebit = false;
    const getData = useCallback(() => {
        if (positions.length === 0 && !waitLittlebit) {
            waitLittlebit = true;
            setTimeout(() => {
                waitLittlebit = false;
            }, 2000);
            getAllPositions()
                .then((d:PositionType[]|string) => {
                    if (Array.isArray(d) && d.length > 0) {
                        dispatch(setPositions(d));
                    }
                });
        }
    },[positions]);

    useEffect(() => {
        const mount = () => {
            if (chartRef.current && positions.length > 0) {
                processChart(positions);
            }
        }
        return mount();
    }, [positions]);

    useEffect(() => {
        const mount = () => {
            if (chartRef.current) {
                getData();
            }
        }
        return mount();
    }, [getData]);

    return (
        <>
            <ActionModalWrapper />
            <HighchartsReact ref={chartRef} highcharts={Highcharts} options={chartOptions}/>
        </>
    );
}

export default App;
