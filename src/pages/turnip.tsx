import { useEffect, useState } from "react";
import { PATTERN, Predictor } from "../js/turnip/predictions";
import { calcChartAreaData, chartOptions, getChartData } from "../js/turnip/chart";
import '../styles/turnips.css';
import Chart from 'react-apexcharts';

  
const patterns = [
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

export const Turnip = () => {
    const [weeks] = useState(["월", "화", "수", "목", "금", "토"]); 
    const [pattern, setPattern] = useState(-1);
    const [buyPrice, setBuyPrice] = useState(100);
    const [sellPrice, setSellPrice] = useState([85, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [series, setSeries]:any = useState(getChartData());

    const setPatternValue:any = (value: number) => {
        setPattern((curr) => value);
        loadGraphData();
    };

    const setBuyValue = async (event: any) => {
        setBuyPrice((curr) => Number(event.target.value));
        loadGraphData();
    };

    const setSellValue = (event: any, index: number) => {
        setSellPrice((curr) =>[
                ...curr.slice(0, index),
                Number(event.target.value),
                ...curr.slice(index+1, curr.length)
            ]
        );
    };

    const loadGraphData = () => {
        let newArr = [
            ...[buyPrice, buyPrice],
            ...sellPrice,
        ];

        let data: any[] = [];
        newArr.map((item) => {
            if (item === 0) {
                data.push(NaN);
            } else {
                data.push(item);
            }
        })
        
        let predictor = new Predictor(data, false, -1);
        setSeries(calcChartAreaData(predictor.analyze_possibilities()));
    };
    
    useEffect(() => {
        loadGraphData();
    }, [sellPrice])    

    return (
        <>
            <div className="wrapper-turnip">
                <form>                        
                    <dl>
                        <dt>Previous pattern</dt>
                        <dd>
                            {patterns.map((p, index) => 
                                <span key={`pattern+${index}`}>
                                    <input
                                        type="radio"
                                        id={p.id}
                                        name="pattern"
                                        value="-1"
                                        checked={pattern === p.value}
                                        onChange={() => setPatternValue(p.value)}
                                    />
                                    <label htmlFor={p.id}>{p.label}</label>
                                </span>
                            )}
                        </dd>
                    </dl>

                    <div className="wrapper-price">
                        <dl className="price">
                            <dt>구매가격</dt>
                            <dd>
                                <input
                                    type="number"
                                    pattern="\d*"
                                    id="buy"
                                    placeholder="..."
                                    value={buyPrice ? buyPrice : ""}
                                    onChange={(event) => setBuyValue(event)}
                                />
                            </dd>
                        </dl>

                        {weeks.map((week, index) => 
                            <dl key={`${week}_${index}`} className="price">
                                <dt>{week}요일</dt>
                                <dd>
                                    <input
                                        type="number"
                                        pattern="\d*"
                                        placeholder="..."
                                        value={sellPrice[index * 2] ? sellPrice[index * 2] : ' '}
                                        onChange={(event) => setSellValue(event, index * 2)}
                                        onBlur={loadGraphData}
                                    />
                                </dd>
                                <dd>
                                    <input
                                        type="number"
                                        pattern="\d*"
                                        placeholder="..."
                                        value={sellPrice[index * 2 + 1] ? sellPrice[index * 2 + 1] : ' '}
                                        onChange={(event) => setSellValue(event, index * 2 + 1)}
                                        onBlur={loadGraphData}
                                    />
                                </dd>
                            </dl>
                        )}
                    </div>

                    <div className="box-btn">
                        <button type="button" id="reset" className="reset" name="action">초기화</button>
                        <button type="button">계산하기</button>
                    </div>
                </form>

                <div className="chart-wrapper">
                    <Chart
                        options={chartOptions}
                        series={series}
                        width="100%"
                    />
                </div>
            </div>
        </>
    );
}