import * as Highcharts from 'highcharts';

export const maxAllowedLevel = 4;

export const options: Highcharts.Options = {
    chart: {
        height: 600,
        inverted: true,
        events: {

        },
    },
    series: [
        {
            tooltip: {
                headerFormat: '',
                nodeFormat: '<br/>&nbsp;<br/>Click to Modify<br/>',
                followPointer: true,
            },
            type: 'organization',
            name: 'BC-GOV',
            keys: ['from', 'to'],
            data: [],
            events: {
                click: (e: any) => {},
            },
            levels: [
                {
                    level: 0,
                    color: 'red',
                    dataLabels: {
                        color: 'black',
                    },
                },
                {
                    level: 1,
                    color: 'orange',
                    dataLabels: {
                        color: 'black',
                    },
                },
                {
                    level: 2,
                    color: 'yellow',
                    dataLabels: {
                        color: 'black',
                    },
                },
                {
                    level: 3,
                    color: 'green',
                },
                {
                    level: 4,
                    color: 'Turquoise',
                },
            ],
            nodes: [],
            colorByPoint: false,
            color: '#007ad0',
            dataLabels: {
                color: 'white',
            },
            borderColor: 'white',
            nodeWidth: 65,
        },
    ],
};
