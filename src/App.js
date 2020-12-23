import {Layout, DatePicker, InputNumber, Table, Row, Col} from 'antd';
import 'antd/dist/antd.css';
import './App.css';

import React, {useState} from "react";
import {calculatePaymentPredictions} from "./overpayment";


const {Content} = Layout;

const columns = [
    {
        title: 'Month',
        dataIndex: 'month',
        key: 'month',
    },
    {
        title: 'Debt',
        dataIndex: 'debt',
        key: 'debt',
    },
    {
        title: 'Overpayment',
        dataIndex: 'overpayment',
        key: 'overpayment',
    },
];

const App = () => {
    const [debt, setDebt] = useState(1);
    const [graceEndDate, setGraceEndDate] = useState(new Date());
    const [predictions, setPredictions] = useState([]);

    const onDebtChange = (value) => {
        setDebt(value);
        console.log("Set debt: ", value);
    };

    const onDateChange = (value) => {
        const predictions = calculatePaymentPredictions(debt, value._d);
        setPredictions(predictions);
    };

    const getTotalOverpayment = () => {
        const overpays = predictions.map(item => Number(parseFloat(item.overpayment).toFixed(2)));
        return overpays.reduce((sum, val) => sum + val);
    };

    return (
        <main>
            <Layout>
                <Content>
                    <Row gutter={16}>
                        <Col>
                            <label>Enter Debt value</label>
                            <InputNumber min={1} suffix={"RUB"} step={1} onChange={onDebtChange}/>
                        </Col>
                        <Col>
                            <label>Select grace end date</label>
                            <DatePicker onChange={onDateChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Table
                                dataSource={predictions}
                                columns={columns}
                                footer={() => `Total overpayment: ${
                                    predictions.length > 0 ? getTotalOverpayment() : 0
                                } RUB`}
                            />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </main>
    );
}

export default App;
