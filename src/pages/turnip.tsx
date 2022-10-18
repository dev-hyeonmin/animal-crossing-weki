import { useState } from "react";
import '../styles/turnips.css';

export const Turnip = () => {
    const [fudgeFactor, setFudgeFactor] = useState(0);
    const [weeks] = useState(["월", "화", "수", "목", "금", "토"]);
    const [price, setPrice] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    const setValue = (event: any, index: number) => {
        setPrice((curr) =>
            [
                ...curr.slice(0, index),
                event.target.value ? event.target.value : 0,
                ...curr.slice(index)
            ]
        );
    };

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
                                    <input type="radio" id="first-time-radio-no" name="first-time" value="false" />
                                    <label htmlFor="first-time-radio-no">아니요</label>
                                    <input type="radio" id="first-time-radio-yes" name="first-time" value="true" />
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
                                    <input type="radio" id="pattern-radio-unknown" name="pattern" value="-1" />
                                    <label htmlFor="pattern-radio-unknown">모름</label>
                                    <input type="radio" id="pattern-radio-fluctuating" name="pattern" value="0" />
                                    <label htmlFor="pattern-radio-fluctuating">파동형</label>
                                    <input type="radio" id="pattern-radio-small-spike" name="pattern" value="3" />
                                    <label htmlFor="pattern-radio-small-spike">미등</label>
                                    <input type="radio" id="pattern-radio-large-spike" name="pattern" value="1" />
                                    <label htmlFor="pattern-radio-large-spike">폭등</label>
                                    <input type="radio" id="pattern-radio-decreasing" name="pattern" value="2" />
                                    <label htmlFor="pattern-radio-decreasing">감소</label>
                                </div>
                            </div>
                        </div>

                        <div className="form__row">
                            <h6>일요일</h6>
                            <div className="input__group">
                                <label htmlFor='buy'>이번 주에 당신의 섬에서 무를 샀을 때의 가격이 어떻게 됩니까?</label>
                                <input type="number" pattern="\d*" id="buy" placeholder="..." />
                            </div>
                        </div>

                        <div className="form__flex-wrap">
                            <div className="form__row">
                                <h6>월요일</h6>
                                <div className="input__group">
                                    <label htmlFor="sell_2">오전</label>
                                    <input type="number" pattern="\d*" id="sell_2" placeholder="..." />
                                </div>
                                <div className="input__group">
                                    <label htmlFor="sell_3">오후</label>
                                    <input type="number" pattern="\d*" id="sell_3" placeholder="..." />
                                </div>
                            </div>

                            <div className="form__row">
                                <h6>화요일</h6>
                                <div className="input__group">
                                    <label htmlFor="sell_4">오전</label>
                                    <input type="number" pattern="\d*" id="sell_4" placeholder="..." />
                                </div>
                                <div className="input__group">
                                    <label htmlFor="sell_5">오후</label>
                                    <input type="number" pattern="\d*" id="sell_5" placeholder="..." />
                                </div>
                            </div>

                            <div className="form__row">
                                <h6>수요일</h6>
                                <div className="input__group">
                                    <label htmlFor="sell_6">오전</label>
                                    <input type="number" pattern="\d*" id="sell_6" placeholder="..." />
                                </div>
                                <div className="input__group">
                                    <label htmlFor="sell_7">오후</label>
                                    <input type="number" pattern="\d*" id="sell_7" placeholder="..." />
                                </div>
                            </div>

                            <div className="form__row">
                                <h6>목요일</h6>
                                <div className="input__group">
                                    <label htmlFor="sell_8">오전</label>
                                    <input type="number" pattern="\d*" id="sell_8" placeholder="..." />
                                </div>
                                <div className="input__group">
                                    <label htmlFor="sell_9">오후</label>
                                    <input type="number" pattern="\d*" id="sell_9" placeholder="..." />
                                </div>
                            </div>

                            <div className="form__row">
                                <h6>금요일</h6>
                                <div className="input__group">
                                    <label htmlFor="sell_10">오전</label>
                                    <input type="number" pattern="\d*" id="sell_10" placeholder="..." />
                                </div>
                                <div className="input__group">
                                    <label htmlFor="sell_11">오후</label>
                                    <input type="number" pattern="\d*" id="sell_11" placeholder="..." />
                                </div>
                            </div>

                            <div className="form__row">
                                <h6>토요일</h6>
                                <div className="input__group">
                                    <label htmlFor="sell_12">오전</label>
                                    <input type="number" pattern="\d*" id="sell_12" placeholder="..." />
                                </div>
                                <div className="input__group">
                                    <label htmlFor="sell_13">오후</label>
                                    <input type="number" pattern="\d*" id="sell_13" placeholder="..." />
                                </div>
                            </div>
                        </div>

                        <input id="permalink-input" type="text" readOnly />
                        <button type="button" id="reset" className="button button--reset" name="action">초기화</button>
                    </form>



                    <h2>결과</h2>

                    <div className="chart-wrapper">
                        <canvas id="chart" width="100%" height="100"></canvas>
                    </div>

                    {/* <div className="table-wrapper">
                        <table id="turnipTable">
                        <thead>
                            <tr>
                            <th data-i18n="patterns.pattern"></th>
                            <th colSpan={2} data-i18n="output.chance"></th>
                            <th colSpan={2}>
                                <div></div>
                                <div>
                                <span></span>
    오전                           <span></span>
                                오후</div>
                            </th>
                            <th colSpan={2}>
                                <div></div>
                                <div>
                                <span></span>
    오전                           <span></span>
                                오후</div>
                            </th>
                            <th colSpan={2}>
                                <div></div>
                                <div>
                                <span></span>
    오전                           <span></span>
                                오후</div>
                            </th>
                            <th colSpan={2}>
                                <div></div>
                                <div>
                                <span></span>
    오전                           <span></span>
                                오후</div>
                            </th>
                            <th colSpan={2}>
                                <div></div>
                                <div>
                                <span></span>
    오전                           <span></span>
                                오후</div>
                            </th>
                            <th colSpan={2}>
                                <div></div>
                                <div>
                                <span></span>
    오전                           <span></span>
                                오후</div>
                            </th>
                            <th data-i18n="output.minimum"></th>
                            <th data-i18n="output.maximum"></th>
                            </tr>
                        </thead>
                        <tbody id="output"></tbody>
                        </table>
                    </div> */}
                </div>
            </div>
            {/*weeks.map((week, index) =>                 
                <dl key={`price${week}`}>
                    <dt>{week}</dt>
                    <dd>
                        <input type="text" onChange={(event) => setValue(event, index * 2)} value={price[index * 2]} />
                        <input type="text" onChange={(event) => setValue(event, index * 2 + 1)} value={price[index * 2 + 1]} /> 
                    </dd>
                </dl>
            )*/}
        </>
    );
}