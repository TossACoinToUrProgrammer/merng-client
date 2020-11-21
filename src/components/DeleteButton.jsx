import React, { useState } from "react";
import { Button, Icon, Confirm, Popup } from "semantic-ui-react";

const DeleteButton = ({ onSubmitHandler }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const onConfirm = () => {
    onSubmitHandler();
    setConfirmOpen(false);
  };
  return (
    <>
      <Popup
        content="Delete"
        inverted
        trigger={
          <Button floated="right" as="div" color="red" onClick={() => setConfirmOpen(true)}>
            <Icon style={{ margin: 0 }} name="trash" />
          </Button>
        }
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={onConfirm}
      />
    </>
  );
};

export default DeleteButton;
