export function ChangeOwner({handleClick, inputValue, handleInput}) {
    const style = {
        'width': '21rem'
    }
    return (
        <div className={'border-2'}>
            <p>change Owner</p>
            <input
                style={style}
                type="text"
                value={inputValue}
                onChange={(e) => handleInput(e.target.value)}
            />
            <button
                className="bg-white m-1 py-1 px-2"
                type="button"
                onClick={handleClick}
            >
                Submit
            </button>
        </div>
    );
}
