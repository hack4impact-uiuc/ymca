// @flow

import React from 'react';
import { Link } from 'react-router-dom/';
import { Button, Icon, Popover } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// import 'antd/dist/antd.css';
// import '../css/SaveButton.css';

type SaveButtonProps = {
  className: String,
  type: String,
  fontSize: String,
  authed: Boolean,
  isSaved: Boolean,
  deleteResourceHandler: () => void,
  saveResourceHandler: () => void,
};
function SaveButton(props: SaveButtonProps) {
  const {
    authed,
    className,
    isSaved,
    deleteResourceHandler,
    saveResourceHandler,
  } = props;

  const type = props.type || 'star';
  const fontSize = props.fontSize || '2em';

  const btnClassName = ''.concat(
    `${type === 'heart' && 'heart-save-btn'}`,
    `${(type === 'star' && 'star-save-btn') || ''}`,
    `${(className && ` ${className}`) || ''}`,
  );

  const errorContent = (
    <>
      <Link to="/login">Log in</Link> to save resources!
    </>
  );

  return (
    <>
      {!authed ? (
        // <Popover content={errorContent} Title="Error" trigger="click">
        //   {/* <Button className={btnClassName} type="link">
        //     <Icon
        //       className={type === 'star' && 'star-save-icon'}
        //       type={type}
        //       theme={type === 'heart' && 'filled'}
        //       style={{
        //         fontSize: { fontSize },
        //         color: type === 'heart' ? 'black' : '#562996 !important',
        //       }}
        //     />
        //   </Button> */}
        //   {/* <HeartOutlined /> */}
        //   <Button icon={<SearchOutlined />}>Search</Button>
        // </Popover>
        <Button icon={<SearchOutlined />}>Search</Button>
      ) : (
        <a onClick={e => e.preventDefault()}>
          {isSaved ? (
            <Button
              className={btnClassName}
              onClick={async () => {
                await deleteResourceHandler();
              }}
              type="link"
            >
              <Icon
                className={type === 'star' && 'star-save-icon'}
                type={type}
                theme="filled"
                style={{
                  fontSize: { fontSize },
                  color: `#562996${(type === 'star' && ' !imporant') || ''}`,
                }}
              />
            </Button>
          ) : (
            // <Button
            //   className={type === 'heart' && 'heart-save-btn'}
            //   onClick={async () => {
            //     await saveResourceHandler();
            //   }}
            //   type="link"
            // >
            //   <Icon
            //     className={type === 'star' && 'star-save-icon'}
            //     type={type}
            //     theme={type === 'heart' && 'filled'}
            //     style={{
            //       fontSize: { fontSize },
            //       color: type === 'heart' ? 'black' : '#562996 !important',
            //     }}
            //   />
            // </Button>
            <Button type="primary">Download</Button>
          )}
        </a>
      )}
    </>
  );
}

export default SaveButton;
