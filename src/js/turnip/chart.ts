import { ApexOptions } from "apexcharts";

const labels = ['월오전', '월오후', '화오전', '화오후', '수오전', '수오후', '목오전', '목오후', '금오전', '금오후', '토오전', '토오후'];
const defaultMinArr = [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999];
const defaultMaxArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
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