import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../store/ui";

const Message = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { content, type } = useSelector((state) => state.ui.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (content && type) {
      messageApi.open({ type, content });
    }

    return () => {
      if (!content && !type) {
        dispatch(clearMessage());
      }
    };
  }, [content, type]);

  return <>{contextHolder}</>;
};

export default Message;
