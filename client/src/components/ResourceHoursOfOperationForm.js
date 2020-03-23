// @flow
import React, { useCallback } from 'react';
import '../css/ResourcePhoneNumberForm.css';
import { Form, Button, Row, Col, TimePicker } from 'antd';

import '../css/ResourceHoursOfOperationForm.css';

type InputProps = {
  day: String,
  getFieldDecorator: any => any,
  setFieldsValue: any => any,
};
const HoursOfOperationInput = (props: InputProps) => {
  const { day, setFieldsValue, getFieldDecorator } = props;
  const dayLowerCase = day.toLowerCase();
  return (
    <Row className="hours-of-operation-input" gutter={16}>
      <Col span={2}>
        <p>{day} </p>
      </Col>
      <Col span={3}>
        {getFieldDecorator(`${dayLowerCase}Start`, {
          rules: [],
        })(
          <TimePicker
            className="hours-of-operation-timepicker"
            use12Hours
            clearIcon
            format="h:mm a"
            placeholder="    :"
            onChange={time => {
              setFieldsValue({
                [`${dayLowerCase}Start`]: time,
              });
            }}
          />,
        )}
      </Col>
      <Col span={2}>
        <p style={{ textAlign: 'center' }}>to</p>
      </Col>
      <Col span={3}>
        {getFieldDecorator(`${dayLowerCase}End`, {
          rules: [],
        })(
          <TimePicker
            className="hours-of-operation-timepicker"
            use12Hours
            format="h:mm a"
            placeholder="    :"
            suffixIcon={null}
            onChange={time => {
              setFieldsValue({
                [`${dayLowerCase}End`]: time,
              });
            }}
          />,
        )}
      </Col>
    </Row>
  );
};

const updateHoursOfOperation = args => {
  const { setHoursOfOperation, getFieldValue } = args;

  const mondayStart = getFieldValue('mondayStart') || '';
  const mondayEnd = getFieldValue('mondayEnd') || '';
  const tuesdayStart = getFieldValue('tuesdayStart') || '';
  const tuesdayEnd = getFieldValue('tuesdayEnd') || '';
  const wednesdayStart = getFieldValue('wednesdayStart') || '';
  const wednesdayEnd = getFieldValue('wednesdayEnd') || '';
  const thursdayStart = getFieldValue('thursdayStart') || '';
  const thursdayEnd = getFieldValue('thursdayEnd') || '';
  const fridayStart = getFieldValue('fridayStart') || '';
  const fridayEnd = getFieldValue('fridayEnd') || '';
  const saturdayStart = getFieldValue('saturdayStart') || '';
  const saturdayEnd = getFieldValue('saturdayEnd') || '';
  const sundayStart = getFieldValue('sundayStart') || '';
  const sundayEnd = getFieldValue('sundayEnd') || '';

  setHoursOfOperation([
    {
      day: 'Monday',
      period: `${mondayStart}!${mondayEnd}`,
    },
    {
      day: 'Tuesday',
      period: `${tuesdayStart}!${tuesdayEnd}`,
    },
    {
      day: 'Wednesday',
      period: `${wednesdayStart}!${wednesdayEnd}`,
    },
    {
      day: 'Thursday',
      period: `${thursdayStart}!${thursdayEnd}`,
    },
    {
      day: 'Friday',
      period: `${fridayStart}!${fridayEnd}`,
    },
    {
      day: 'Saturday',
      period: `${saturdayStart}!${saturdayEnd}`,
    },
    {
      day: 'Sunday',
      period: `${sundayStart}!${sundayEnd}`,
    },
  ]);
};

type FormProps = {
  setHoursOfOperation: any => any,
  hoursOfOperation: any,
  setTotalSubmitEnabled: Boolean => any,
  form: {
    setFieldsValue: any => any,
    getFieldValue: any => any,
    getFieldDecorator: any => any,
  },
};
const HoursOfOperationsForm = Form.create({ name: 'hoursOfOperation' })(
  (props: FormProps) => {
    const {
      setHoursOfOperation,
      hoursOfOperation,
      setTotalSubmitEnabled,
    } = props;
    const { setFieldsValue, getFieldValue, getFieldDecorator } = props.form;

    const generateInputs = useCallback(() => {
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
    }, [
      setTotalSubmitEnabled,
      setFieldsValue,
      getFieldValue,
      getFieldDecorator,
    ]);

    return (
      <Form className="hours-of-operation-form" onSubmit={() => {}}>
        {generateInputs({
          setHoursOfOperation,
          hoursOfOperation,
          setTotalSubmitEnabled,
          setFieldsValue,
          getFieldValue,
          getFieldDecorator,
        })}
        <Button
          type="primary"
          className="form-btn"
          htmlType="submit"
          onClick={() => {
            setTotalSubmitEnabled(false);
            updateHoursOfOperation({
              hoursOfOperation,
              setHoursOfOperation,
              getFieldValue,
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
  setHoursOfOperation: any => any,
  hoursOfOperation: any,
  setTotalSubmitEnabled: Boolean => any,
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
