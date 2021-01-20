// @flow

import React, { useState, useEffect } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, List } from 'antd';

const { TextArea } = Input;

type InternalNote = {
  subject: String,
  body: String,
};

type FormProps = {
  internalNotes: Array<InternalNote>,
  setInternalNotes: (Array<InternalNote>) => void,
  setTotalSubmitEnabled: () => void,
  editNote: InternalNote,
  setEditNote: (InternalNote) => void,
  form: {
    getFieldDecorator: () => any,
    getFieldValue: () => any,
    setFieldsValue: () => any,
  },
};
const InternalNotesForm = Form.create({ name: 'internalNotes' })(
  (props: FormProps) => {
    const {
      internalNotes,
      setInternalNotes,
      setTotalSubmitEnabled,
      editNote,
      setEditNote,
    } = props;
    const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;

    const onSubmit = (e) => {
      e.preventDefault();
      const subject = getFieldValue('subject');
      const body = getFieldValue('body');
      const note = { subject, body };

      if (editNote == null) {
        setInternalNotes([...internalNotes, note]);
      } else {
        const newInternalNotes = [];
        internalNotes.forEach((item) => {
          if (item === editNote) {
            newInternalNotes.push(note);
          } else {
            newInternalNotes.push(item);
          }
        });
        setInternalNotes(newInternalNotes);
        setEditNote(null);
      }

      setFieldsValue({
        subject: '',
        body: '',
      });
    };

    useEffect(() => {
      if (editNote != null) {
        setFieldsValue({
          subject: editNote.subject,
          body: editNote.body,
        });
      }
    }, [editNote, setFieldsValue]);

    return (
      <Form onSubmit={onSubmit}>
        <Form.Item>
          {getFieldDecorator('subject', {
            rules: [
              {
                required: true,
                message: 'Please enter subject!',
                whitespace: true,
              },
            ],
          })(
            <Input
              placeholder="Subject"
              defaultValue={!editNote == null && editNote.body}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('body', {
            rules: [
              {
                required: true,
                message: 'Please enter text!',
                whitespace: true,
              },
            ],
          })(
            <TextArea
              autoSize
              placeholder="Ex: Cases that deal with the courts 
            = NAWC does not accept.
                Refer to chicago attorney’s. 
                If letter from immigration authority in chicago most 
                likely deportation proceedings. 
                No one really in the area does this."
              defaultValue={!editNote == null && editNote.body}
            />,
          )}
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          className="form-btn"
          onClick={() => setTotalSubmitEnabled(false)}
        >
          {editNote == null ? 'Add Note' : 'Edit Note'}
        </Button>
      </Form>
    );
  },
);

type FormItemProps = {
  internalNotes: Array<InternalNote>,
  setInternalNotes: (Array<InternalNote>) => void,
  setTotalSubmitEnabled: () => void,
};
const InternalNotesFormItem = (props: FormItemProps) => {
  const { internalNotes, setInternalNotes, setTotalSubmitEnabled } = props;

  const [editNote, setEditNote] = useState(null);

  const onEditButtonClick = (note) => {
    setEditNote(note);
  };

  const onDeleteButtonClick = (item) => {
    setInternalNotes(internalNotes.filter((note) => note !== item));
  };

  const renderItem = (item) => (
    <List.Item
      actions={[
        <Button
          onClick={(e) => {
            e.preventDefault();
            onEditButtonClick(item);
          }}
        >
          Edit
        </Button>,
        <Button
          onClick={(e) => {
            e.preventDefault();
            onDeleteButtonClick(item);
          }}
        >
          Delete
        </Button>,
      ]}
    >
      <List.Item.Meta title={item.subject} description={item.body} />
    </List.Item>
  );

  return (
    <Form.Item>
      <List
        itemLayout="horizontal"
        dataSource={internalNotes}
        renderItem={renderItem}
      />
      <InternalNotesForm
        internalNotes={internalNotes}
        setInternalNotes={setInternalNotes}
        setTotalSubmitEnabled={setTotalSubmitEnabled}
        editNote={editNote}
        setEditNote={setEditNote}
      />
    </Form.Item>
  );
};

export default InternalNotesFormItem;
