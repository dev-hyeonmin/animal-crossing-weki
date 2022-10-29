import { useEffect, useState } from "react";
import { PATTERN, Predictor } from "../js/turnip/predictions";
import { calcChartAreaData, chartOptions, getChartData, getPatternPercent, patterns } from "../js/turnip/chart";
import '../styles/turnips.css';
import Chart from 'react-apexcharts';
import { CHART_DATA_KEY, CHART_PATTERN_KEY } from "../constants/common";



export const Turnip = () => {
    const [weeks] = useState(["월", "화", "수", "목", "금", "토"]);
    const [pattern, setPattern] = useState(-1);
    const [buyPrice, setBuyPrice] = useState(0);
    const [sellPrice, setSellPrice] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [series, setSeries]: any = useState(getChartData());
    const [chartPattern, setChartPattern]: any = useState([]);

    const setChartDataLocal = () => {
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

        localStorage.setItem(CHART_DATA_KEY, data.toString());
        return data;
    }

    const setPatternValue: any = (value: number) => {
        setPattern((curr) => value);
        localStorage.setItem(CHART_PATTERN_KEY, value.toString());
        //loadGraphData();
    };

    const setBuyValue = async (event: any) => {
        setBuyPrice((curr) => Number(event.target.value));
        //loadGraphData();
    };

    const setSellValue = (event: any, index: number) => {
        setSellPrice((curr) => [
            ...curr.slice(0, index),
            Number(event.target.value),
            ...curr.slice(index + 1, curr.length)
        ]
        );
    };

    const loadGraphData = () => {
        const data = setChartDataLocal();

        let predictor = new Predictor(data, false, -1);
        let analyzePredictor = predictor.analyze_possibilities();
        setSeries(calcChartAreaData(analyzePredictor));
        setChartPattern(getPatternPercent(analyzePredictor));
    };

    const calc = () => {
        loadGraphData();
    }

    const reset = () => {
        if (!window.confirm('초기화하시겠습니까?')) {
            return;
        };

        setBuyPrice(0);
        setSellPrice([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    }

    useEffect(() => {
        const chartData = localStorage.getItem(CHART_DATA_KEY);
        const chartPattern = localStorage.getItem(CHART_PATTERN_KEY);

        if (chartData) {
            const chartArr = chartData.split(',').map(Number);
            setBuyPrice(() => chartArr[0]);
            setSellPrice(() => chartArr.slice(2, chartArr.length));
            setPattern(() => Number(chartPattern));
        }
    }, [])

    useEffect(() => {
        //loadGraphData();
        setChartDataLocal();
    }, [buyPrice, sellPrice])
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
                                    />
                                </dd>
                                <dd>
                                    <input
                                        type="number"
                                        pattern="\d*"
                                        placeholder="..."
                                        value={sellPrice[index * 2 + 1] ? sellPrice[index * 2 + 1] : ' '}
                                        onChange={(event) => setSellValue(event, index * 2 + 1)}
                                    />
                                </dd>
                            </dl>
                        )}
                    </div>

                    <div className="box-btn">
                        <button type="button" className="reset" onClick={reset}>초기화</button>
                        <button type="button" onClick={calc}>계산하기</button>
                    </div>
                </form>

                <div className="chart-wrapper">
                    <Chart
                        options={chartOptions}
                        series={series}
                        width="100%"
                    />
                </div>

                <div className="pattern-wrapper">
                    {chartPattern.map((pattern: any) =>
                        <dl key={pattern.pattern_number}>
                            <dt>
                                {pattern.name}
                            </dt>
                            <dd>
                                {pattern.probability}   %
                            </dd>
                        </dl>
                    )}
                </div>
            </div>
        </>
    );
}