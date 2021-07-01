// @flow
import React, { useCallback, useEffect } from 'react';
import '../css/ResourcePhoneNumberForm.css';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Row, Col, TimePicker } from 'antd';

import '../css/ResourceHoursOfOperationForm.css';

const moment = require('moment');

type InputProps = {
  day: String,
  getFieldDecorator: (any) => any,
};

const HoursOfOperationInput = (props: InputProps) => {
  const { day, getFieldDecorator } = props;
  return (
    <Row className="hours-of-operation-input" gutter={16}>
      <Col span={3}>
        <p>{day} </p>
      </Col>
      <Col span={6}>
        {getFieldDecorator(`${day}Start`, {
          rules: [],
        })(
          <TimePicker
            className="hours-of-operation-timepicker"
            use12Hours
            clearIcon
            format="h:mm a"
            placeholder="    :"
          />,
        )}
      </Col>
      <Col span={1}>
        <p style={{ textAlign: 'center' }}>to</p>
      </Col>
      <Col span={6}>
        {getFieldDecorator(`${day}End`, {
          rules: [],
        })(
          <TimePicker
            className="hours-of-operation-timepicker"
            use12Hours
            format="h:mm a"
            placeholder="    :"
            clearIcon
          />,
        )}
      </Col>
    </Row>
  );
};

const updateHoursOfOperation = (args) => {
  const { setHoursOfOperation, getFieldValue, days } = args;

  setHoursOfOperation(
    days.map((day) => {
      const start = getFieldValue(`${day}Start`);
      const end = getFieldValue(`${day}End`);

      return {
        day,
        period: [
          start ? start.format('h:mm a') : '',
          end ? end.format('h:mm a') : '',
        ],
      };
    }),
  );
};

type FormProps = {
  setHoursOfOperation: (any) => any,
  hoursOfOperation: any,
  setTotalSubmitEnabled: (Boolean) => any,
  form: {
    setFieldsValue: (any) => any,
    getFieldValue: (any) => any,
    getFieldDecorator: (any) => any,
  },
};

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const HoursOfOperationsForm = Form.create({ name: 'hoursOfOperation' })(
  (props: FormProps) => {
    const {
      setHoursOfOperation,
      hoursOfOperation,
      setTotalSubmitEnabled,
    } = props;
    const { setFieldsValue, getFieldValue, getFieldDecorator } = props.form;

    const generateInputs = useCallback(
      () =>
        days.map((day) => (
          <HoursOfOperationInput
            day={day}
            key={day}
            setFieldsValue={setFieldsValue}
            getFieldValue={getFieldValue}
            getFieldDecorator={getFieldDecorator}
            setTotalSubmitEnabled={setTotalSubmitEnabled}
          />
        )),
      [setFieldsValue, getFieldValue, getFieldDecorator, setTotalSubmitEnabled],
    );

    useEffect(() => {
      hoursOfOperation.forEach((entry) => {
        setFieldsValue({
          [`${entry.day}Start`]:
            entry.period[0] !== '' ? moment(entry.period[0], 'h:mm a') : null,
          [`${entry.day}End`]:
            entry.period[1] !== '' ? moment(entry.period[1], 'h:mm a') : null,
        });
      });
    }, [hoursOfOperation, setFieldsValue]);

    return (
      <Form className="hours-of-operation-form" onSubmit={() => {}}>
        {generateInputs()}
        <Button
          type="primary"
          className="form-btn"
          onClick={() => {
            setTotalSubmitEnabled(false);
            updateHoursOfOperation({
              hoursOfOperation,
              setHoursOfOperation,
              getFieldValue,
              days,
            });
          }}
        >
          Update Hours of Operation
        </Button>
      </Form>
    );
  },
);

type FormItemProps = {
  setHoursOfOperation: (any) => any,
  hoursOfOperation: any,
  setTotalSubmitEnabled: (Boolean) => any,
};

const HoursOfOperationsItemForm = (props: FormItemProps) => {
  const {
    setHoursOfOperation,
    hoursOfOperation,
    setTotalSubmitEnabled,
  } = props;
  return (
    <Form.Item>
      <HoursOfOperationsForm
        setHoursOfOperation={setHoursOfOperation}
        hoursOfOperation={hoursOfOperation}
        setTotalSubmitEnabled={setTotalSubmitEnabled}
      />
    </Form.Item>
  );
};

export default HoursOfOperationsItemForm;
