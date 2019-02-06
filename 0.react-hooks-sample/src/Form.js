import React, { useState } from 'react';

const Form = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    alert(`${name} (${description})`);
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="이름"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="설명"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button type="submit">확인</button>
    </form>
  );
};

export default Form;
