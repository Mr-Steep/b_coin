export function BuyToken({handleClick, inputValue, handleInput}) {

  return (
    <div>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => handleInput(e.target.value)}
      />
      <button onClick={handleClick}>Submit</button>
    </div>

  );
}
