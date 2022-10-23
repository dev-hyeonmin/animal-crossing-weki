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
    const [isFirstBuy, setIsFirstBuy] = useState(false);
    const [pattern, setPattern] = useState(-1);
    const [buyPrice, setBuyPrice] = useState(100);
    const [sellPrice, setSellPrice] = useState([85, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [predictors, setPredictors]: any = useState();
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
        
    }, [])    

    return (
        <>
            <div className="nook-phone">
                <h1></h1>

                <div className="nook-phone-center">
                    <form className="input__form">
                        <div className="form__row">
                            <h6>첫 구매</h6>
                            <div className="input__group">
                                <label>당신의 섬에 방문한 무파니에게서 처음으로 무를 샀습니까?</label>
                                    <div className="input__radio-buttons">
                                    <input
                                        type="radio"
                                        id="first-time-radio-no"
                                        name="first-time"
                                        value="false"
                                        checked={isFirstBuy === false}
                                        onChange={() => setIsFirstBuy(false)}
                                    />
                                    <label htmlFor="first-time-radio-no">아니요</label>
                                    <input
                                        type="radio"
                                        id="first-time-radio-yes"
                                        name="first-time"
                                        value="true"
                                        checked={isFirstBuy === true}
                                        onChange={() => setIsFirstBuy(true)}
                                    />
                                    <label htmlFor="first-time-radio-yes">예</label>
                                </div>
                            </div>
                        </div>

                        <div className="form__row">
                            <h6>이전 패턴</h6>
                            <div className="input__group">
                                <label htmlFor="">
                                    저번 주의 무 가격 패턴이 어떻게 됩니까?
                                    <i>(패턴에 영향을 끼칩니다)</i>
                                </label>
                                <div className="input__radio-buttons">
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
                                </div>
                            </div>
                        </div>

                        <div className="form__row">
                            <h6>일요일</h6>
                            <div className="input__group">
                                <label htmlFor='buy'>이번 주에 당신의 섬에서 무를 샀을 때의 가격이 어떻게 됩니까?</label>
                                <input
                                    type="number"
                                    pattern="\d*"
                                    id="buy"
                                    placeholder="..."
                                    value={buyPrice ? buyPrice : ""}
                                    onChange={(event) => setBuyValue(event)}
                                />
                            </div>
                        </div>

                        <div className="form__flex-wrap">
                            {weeks.map((week, index) => 
                                <div className="form__row" key={`${week}_${index}`}>
                                    <h6>{week}요일</h6>
                                    <div className="input__group">
                                        <label htmlFor={`sell_${(index + 1) * 2}`}>오전</label>
                                        <input
                                            type="number"
                                            pattern="\d*"
                                            placeholder="..."
                                            value={sellPrice[index * 2] ? sellPrice[index * 2] : ' '}
                                            onChange={(event) => setSellValue(event, index * 2)}
                                            onBlur={loadGraphData}
                                        />
                                    </div>
                                    <div className="input__group">
                                        <label htmlFor={`sell_${(index + 1) * 2 + 1}`}>오후</label>
                                        <input
                                            type="number"
                                            pattern="\d*"
                                            placeholder="..."
                                            value={sellPrice[index * 2 + 1] ? sellPrice[index * 2 + 1] : ' '}
                                            onChange={(event) => setSellValue(event, index * 2 + 1)}
                                            onBlur={loadGraphData}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <input id="permalink-input" type="text" readOnly />
                        <button type="button" id="reset" className="button button--reset" name="action">초기화</button>
                    </form>

                    <h2>결과</h2>
                    <div className="chart-wrapper">
                        <Chart
                            options={chartOptions}
                            series={series}
                            width="500px"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}