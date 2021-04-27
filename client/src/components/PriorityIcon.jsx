// @flow
import React from 'react';
import '../css/PriorityIcon.css';

type PriorityIconProps = {
  priorityType: 'Urgent' | 'High' | 'Medium' | 'Low',
};

function PriorityIcon(props: PriorityIconProps) {
  const { priorityType } = props;

  switch (priorityType) {
    case 'Urgent':
      return (
        <div className="priority-container">
          <div className="urgent-priority-outline">
            <div className="priority-text">{priorityType}</div>
          </div>
        </div>
      );
    case 'High':
      return (
        <div className="priority-container">
          <div className="high-priority-outline">
            <div className="priority-text">{priorityType}</div>
          </div>
        </div>
      );
    case 'Medium':
      return (
        <div className="priority-container">
          <div className="medium-priority-outline">
            <div className="priority-text">{priorityType}</div>
          </div>
        </div>
      );
    case 'Low':
      return (
        <div className="priority-container">
          <div className="low-priority-outline">
            <div className="priority-text">{priorityType}</div>
          </div>
        </div>
      );
    default:
      return <div />;
  }
}

export default PriorityIcon;
