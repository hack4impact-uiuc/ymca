// @flow
import React from 'react';
import '../css/ResourcePhoneNumberForm.css';
import { Input, Form, Button, List, Row, Col } from 'antd';

import LabelWrapper from './LabelWrapper';
// import { KeyboardTimePicker } from "@material-ui/pickers";

import '../css/ResourceHoursOfOperationForm.css';

type InputProps = {
  setTotalSubmitEnabled: Boolean => void,
  day: String,
  getFieldDecorator: (any) => any,
};
const HoursOfOperationInput = (props: InputProps) => {
  const { day, getFieldDecorator, setTotalSubmitEnabled } = props;
  return (
    <Row className="hoursOfOperationInput" gutter={16}>
      <Col span={2}>
        <p>{day} </p>
      </Col>
      <Col span={3}>
        {getFieldDecorator(`${day.toLowerCase()}Start`, {
          rules: [],
        })(
          <Input maxLength={30} onFocus={() => setTotalSubmitEnabled(true)} />,
        )}
      </Col>
      <Col span={2}>
        <p style={{ textAlign: 'center' }}>to</p>
      </Col>
      <Col span={3}>
        {getFieldDecorator(`${day.toLowerCase()}End`, {
          rules: [],
        })(
          <Input maxLength={30} onFocus={() => setTotalSubmitEnabled(true)} />,
        )}
      </Col>
    </Row>
  );
};

const generateInputs = props => {
  const {
    setHoursOfOperations,
    hoursOfOperation,
    setTotalSubmitEnabled,
    setFieldsValue,
    getFieldValue,
    getFieldDecorator,
  } = props;

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  return days.map(day => {
    return (
      <HoursOfOperationInput
        day={day}
        setFieldsValue={setFieldsValue}
        getFieldValue={getFieldValue}
        getFieldDecorator={getFieldDecorator}
        setTotalSubmitEnabled={setTotalSubmitEnabled}
      />
    );
  });
};

type FormProps = {
  setHoursOfOperations: (any) => any,
};
const HoursOfOperationsForm = Form.create({ name: 'hoursOfOperation' })(
  props => {
    const {
      setHoursOfOperations,
      hoursOfOperation,
      setTotalSubmitEnabled,
    } = props;
    const { setFieldsValue, getFieldValue, getFieldDecorator } = props.form;

    return (
      <Form
        className="hoursOfOperationForm"
        onSubmit={() => {
          const mondayStart = getFieldValue('mondayStart');
          console.log(mondayStart);
        }}
      >
        {generateInputs({
          setHoursOfOperations,
          hoursOfOperation,
          setTotalSubmitEnabled,
          setFieldsValue,
          getFieldValue,
          getFieldDecorator,
        })}
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => setTotalSubmitEnabled(false)}
        >
          Update Hours of Operation
        </Button>
      </Form>
    );
  },
);

type FormItemProps = {};

const HoursOfOperationsItemForm = (props: FormProps) => {
  const {
    setHoursOfOperations,
    hoursOfOperation,
    setTotalSubmitEnabled,
  } = props;
  return (
    <Form.Item>
      <HoursOfOperationsForm
        setHoursOfOperations={setHoursOfOperations}
        hoursOfOperation={hoursOfOperation}
        setTotalSubmitEnabled={setTotalSubmitEnabled}
      />
    </Form.Item>
  );
};

export default HoursOfOperationsItemForm;
