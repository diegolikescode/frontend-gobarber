import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';
import { Container } from './styles';

interface ToastProps {
  msgs: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  success: <FiCheckCircle size={24} />,
  error: <FiAlertCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ msgs: msg, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(msg.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [msg.id, removeToast]);

  return (
    <Container
      type={msg.type}
      hasDescription={Number(!!msg.description)}
      style={style}
    >
      {icons[msg.type || 'info']}

      <div>
        <strong>{msg.title}</strong>
        {msg.description && <p>{msg.description}</p>}
      </div>

      <button onClick={() => removeToast(msg.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
