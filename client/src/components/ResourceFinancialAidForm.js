// @flow

/*
TODO: Implement phoneType into form.
*/

import React from 'react';
import '../css/ResourcePhoneNumberForm.css';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, Descriptions } from 'antd';

const FinancialAidForm = Form.create({ name: 'financialAid' })(props => {
  const { setFinancialAidDetails, setTotalSubmitEnabled } = props;

  const { getFieldDecorator, getFieldValue } = props.form;

  return (
    <Form
      className="financial-aid-form"
      onSubmit={() => {
        setFinancialAidDetails({
          education: getFieldValue('education'),
          immigrationStatus: getFieldValue('immigrationStatus'),
          deadline: getFieldValue('deadline'),
          amount: getFieldValue('amount'),
        });
      }}
    >
      <Form.Item>
        {getFieldDecorator(
          'education',
          {},
        )(
          <Input
            placeholder="Education | 
            Ex: College juniors only, must be attending college in US"
            onFocus={() => setTotalSubmitEnabled(false)}
            onBlur={() => setTotalSubmitEnabled(true)}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator(
          'immigrationStatus',
          {},
        )(
          <Input
            placeholder="Immigration Status |
            Ex: no citizenship required"
            onFocus={() => setTotalSubmitEnabled(false)}
            onBlur={() => setTotalSubmitEnabled(true)}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator(
          'deadline',
          {},
        )(
          <Input
            placeholder="Deadline |
            Ex: July 31"
            onFocus={() => setTotalSubmitEnabled(false)}
            onBlur={() => setTotalSubmitEnabled(true)}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator(
          'amount',
          {},
        )(
          <Input
            placeholder="Amount |
          Ex: $500-$1000"
            onFocus={() => setTotalSubmitEnabled(false)}
            onBlur={() => setTotalSubmitEnabled(true)}
          />,
        )}
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        className="financial-aid-form form-btn"
        onClick={() => setTotalSubmitEnabled(false)}
      >
        Add Financial Aid Details
      </Button>
    </Form>
  );
});

const FinancialAidFormItem = (props: FormProps) => {
  const {
    financialAidDetails,
    setFinancialAidDetails,
    setTotalSubmitEnabled,
  } = props;

  return (
    <Form.Item>
      <Descriptions>
        <Descriptions.Item label="Education">
          {financialAidDetails.education}
        </Descriptions.Item>
        <Descriptions.Item label="Immigration Status">
          {financialAidDetails.immigrationStatus}
        </Descriptions.Item>
        <Descriptions.Item label="Deadline">
          {financialAidDetails.deadline}
        </Descriptions.Item>
        <Descriptions.Item label="Amount">
          {financialAidDetails.amount}
        </Descriptions.Item>
      </Descriptions>
      <FinancialAidForm
        financialAidDetails={financialAidDetails}
        setFinancialAidDetails={setFinancialAidDetails}
        setTotalSubmitEnabled={setTotalSubmitEnabled}
      />
    </Form.Item>
  );
};

export default FinancialAidFormItem;
