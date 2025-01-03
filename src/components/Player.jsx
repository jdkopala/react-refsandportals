import { useState, useRef } from 'react';

export default function Player() {
  const playerName = useRef();
  const [nameEntry, setNameEntry] = useState(null);

  function handleClick() {
    setNameEntry(playerName.current.value);
    // Not an ideal practice, React should be the one manipulating the DOM to keep state consistent
    // This instance is ok, as we are just clearing one piece that is not tied to any state very tightly.
    playerName.current.value = '';
  };

  return (
    <section id="player">
      <h2>Welcome {nameEntry ?? 'Unknown Entity'}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
