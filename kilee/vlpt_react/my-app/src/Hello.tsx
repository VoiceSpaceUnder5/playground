import React from 'react';

interface HelloProps {
  name: string;
  color: string;
}
function Hello(props: HelloProps) {
  return <div style={{ color: props.color }}>안녕하세요~ {props.name}</div>;
}

Hello.defaultProps = {
  name: '언노운~',
  color: 'default',
};
export default Hello;
