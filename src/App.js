import {Layout, DatePicker, Input, InputNumber, Table, Row, Col, Statistic, Form} from 'antd';
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
    const [month, setMonth] = useState(12);
    const [graceEndDate, setGraceEndDate] = useState(new Date());
    const [predictions, setPredictions] = useState([]);

    const calculatePredictions = () => {
        const predictions = calculatePaymentPredictions(debt, graceEndDate, month);
        setPredictions(predictions);
    };

    const onMonthChange = (value) => {
        setMonth(value);
        // if(month !== value){
        //     calculatePredictions();
        // }
    };

    const onDebtChange = (value) => {
        setDebt(value)
        // if(debt !== value){
        //     calculatePredictions();
        // }
    };

    const onDateChange = (value) => {
        setGraceEndDate(value._d);
        if(graceEndDate !== value){
            calculatePredictions();
        }
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
                        <Col span={24}>
                            <Form
                                layout={"inline"}>
                                <Form.Item label={"Enter debt value"}>
                                    <Input type={"number"} min={1} suffix={"RUB"} step={1} onChange={onDebtChange}/>
                                </Form.Item>
                                <Form.Item label={"Months count"}>
                                    <InputNumber defaultValue={month} min={1} max={60} step={1} onChange={onMonthChange}/>
                                </Form.Item>
                                <Form.Item label={"Select grace end date"}>
                                    <DatePicker onChange={onDateChange}/>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Table
                                dataSource={predictions}
                                columns={columns}
                                pagination={{pageSize: month, position: ['none', 'none']}}
                                footer={() => <Statistic title="Total overpayment" value={`${predictions.length > 0 ? getTotalOverpayment().toFixed(2) : 0} RUB`} />}
                            />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </main>
    );
}

export default App;
