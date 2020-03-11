// @flow
import React, { useCallback } from 'react';
import '../css/ResourcePhoneNumberForm.css';
import { Form, Button, Row, Col, TimePicker } from 'antd';

// import LabelWrapper from './LabelWrapper';
// import { KeyboardTimePicker } from "@material-ui/pickers";

import '../css/ResourceHoursOfOperationForm.css';

type InputProps = {
  setTotalSubmitEnabled: Boolean => void,
  day: String,
  getFieldDecorator: any => any,
  setFieldsValue: any => any,
};
const HoursOfOperationInput = (props: InputProps) => {
  const {
    day,
    setFieldsValue,
    getFieldDecorator,
    setTotalSubmitEnabled,
  } = props;
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
            onChange={(time, timeString) => {
              setFieldsValue({
                [`${dayLowerCase}Start`]: timeString,
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
            onChange={(time, timeString) => {
              setFieldsValue({
                [`${dayLowerCase}End`]: timeString,
              });
            }}
          />,
        )}
      </Col>
    </Row>
  );
};

type FormProps = {
  setHoursOfOperations: any => any,
  hoursOfOperation: any,
  setTotalSubmitEnabled: Boolean => any,
  form: {
    setFieldsValue: any => any,
    getFieldValue: any => any,
    getFieldDecorator: any => any,
  },
};
const HoursOfOperationsForm = Form.create({ name: 'hoursOfOperation' })(
  props => {
    const {
      setHoursOfOperations,
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
      setHoursOfOperations,
      hoursOfOperation,
      setTotalSubmitEnabled,
      setFieldsValue,
      getFieldValue,
      getFieldDecorator,
    ]);

    return (
      <Form
        className="hours-of-operation-form"
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
          className="form-btn"
          htmlType="submit"
          onClick={() => setTotalSubmitEnabled(false)}
        >
          Update Hours of Operation
        </Button>
      </Form>
    );
  },
);

type FormItemProps = {
  setHoursOfOperations: any => any,
  hoursOfOperation: any,
  setTotalSubmitEnabled: Boolean => any,
};

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
