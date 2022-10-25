import { ApexOptions } from "apexcharts";
import { PATTERN } from "./predictions";

const labels = ['월오전', '월오후', '화오전', '화오후', '수오전', '수오후', '목오전', '목오후', '금오전', '금오후', '토오전', '토오후'];
const defaultMinArr = [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999];
const defaultMaxArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
export const patterns = [
    {
        id: "pattern-radio-unknown",
        label: "모름",
        value: -1,
    },
    {
        id: "pattern-radio-fluctuating",
        label: "파동",
        value: PATTERN.FLUCTUATING,
    },
    {
        id: "pattern-radio-small-spike",
        label: "미등",
        value: PATTERN.SMALL_SPIKE,
    },
    {
        id: "pattern-radio-large-spike",
        label: "급등",
        value: PATTERN.LARGE_SPIKE,
    },
    {
        id: "attern-radio-decreasing",
        label: "하락",
        value: PATTERN.DECREASING,
    }
];

export const chartOptions: ApexOptions = {
    chart: {
        width:"100%",
        height: 500,
        type: 'line',
        toolbar: {
            show: false
        },
    },
    xaxis: {
        categories: labels
    },
    stroke: {
        curve: "smooth"
    },
    legend: {
        show: false
    },
    colors: ["#ff4040", "#0AB5CD"]
};


export const getChartData = (minArr?: number[], maxArr?: number[]): ApexAxisChartSeries => {
    return [
        {
            name: "max",
            data: maxArr ? maxArr : defaultMaxArr,
        },
        {
            name: "min",
            data: minArr ? minArr : defaultMinArr, 
            
        },
    ];
};

export const calcChartAreaData = (data?: any[]) => {
    if (!data) {
        return getChartData();
    }
    console.log(data);
    let minArr = [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999];
    let maxArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    data.map((item) => {        
        let prices = item.prices;
        
        prices.map((price: any, index2: number) => {
            if (index2 < 2) {
                return;
            }

            let min = price.min;
            let max = price.max;

            if (minArr[index2 - 2] > min) {
                minArr[index2 - 2] = min;
            }

            if (maxArr[index2 - 2] < max) {
                maxArr[index2 - 2] = max;
            }
        });
    });

    return getChartData(minArr, maxArr);
}

export const getPatternPercent = (data: any) => {
    let patternArr: any = [];

    data.map((item: any) => {
        const findedPattern = patternArr.filter((p: any) => p.pattern_number === item.pattern_number);

        if (findedPattern.length === 0 && item.category_total_probability) {
            const selectPattern: any = patterns.filter((p) => p.value == item.pattern_number);

            patternArr.push({
                pattern_number: item.pattern_number,
                probability: Math.round(item.category_total_probability * 100),
                name: selectPattern[0] ? selectPattern[0].label : ''
            });
        }
    });
    
    return patternArr;
} 