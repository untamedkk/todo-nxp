import { FC } from "react";
import { Button, Input } from "antd"
import { useState } from 'react';

type AppProps = {
  onClick: (description: string) => void;
};

const CreateNote: FC<AppProps> = ({ onClick }) => {

  const [text, setText] = useState('');

  return (
    <div className="create-note-header">
      <div className="create-note-container">
        <Input value={text} onChange={e => setText(e.target.value)} size="large" placeholder="Type something..." />
        <Button className="create" type="primary" onClick={() => {
          setText('');
          onClick(text);
        }}> Create </Button>
      </div>
    </div>
  );
  ;
};

export default CreateNote;