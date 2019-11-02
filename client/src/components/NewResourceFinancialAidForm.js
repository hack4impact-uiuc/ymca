// @flow

/*
TODO: Implement phoneType into form.
*/

import React, { useState } from 'react';
import '../css/NewResourcePhoneNumberForm.css';
import { Input, Form, Button, Descriptions } from 'antd';

const onInputFocus = (setSubmitEnabled, setTotalSubmitEnabled) => {
  setSubmitEnabled(true);
  setTotalSubmitEnabled(false);
};

const onInputBlur = (setSubmitEnabled, setTotalSubmitEnabled) => {
  setSubmitEnabled(false);
  setTotalSubmitEnabled(true);
};

const FinancialAidForm = Form.create({ name: 'financialAid' })(props => {
  const { setFinancialAidDetails, setTotalSubmitEnabled } = props;

  const { getFieldDecorator, getFieldValue } = props.form;

  const [submitEnabled, setSubmitEnabled] = useState(false);

  return (
    <Form
      className="financialAidForm"
      onSubmit={() => {
        setFinancialAidDetails({
          education: getFieldValue('education'),
          immigrationStatus: getFieldValue('immigrationStatus'),
          deadline: getFieldValue('deadline'),
        });
      }}
    >
      <Form.Item>
        {getFieldDecorator('education', {})(
          <Input
            placeholder="Education"
            onFocus={() =>
              onInputFocus(setSubmitEnabled, setTotalSubmitEnabled)
            }
            onBlur={() => onInputBlur(setSubmitEnabled, setTotalSubmitEnabled)}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('immigrationStatus', {})(
          <Input
            placeholder="Immigration Status"
            onFocus={() =>
              onInputFocus(setSubmitEnabled, setTotalSubmitEnabled)
            }
            onBlur={() => onInputBlur(setSubmitEnabled, setTotalSubmitEnabled)}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('deadline', {})(
          <Input
            placeholder="Deadline"
            onFocus={() =>
              onInputFocus(setSubmitEnabled, setTotalSubmitEnabled)
            }
            onBlur={() => onInputBlur(setSubmitEnabled, setTotalSubmitEnabled)}
          />,
        )}
      </Form.Item>
      <Button type="primary" htmlType="submit" className="financialAidForm">
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
      <Descriptions title="Financial Aid Details">
        <Descriptions.Item label="Education">
          {financialAidDetails.education}
        </Descriptions.Item>
        <Descriptions.Item label="Immigration Status">
          {financialAidDetails.immigrationStatus}
        </Descriptions.Item>
        <Descriptions.Item label="Deadline">
          {financialAidDetails.deadline}
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
