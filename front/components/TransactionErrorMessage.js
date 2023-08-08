export function TransactionErrorMessage({message, dismiss}) {
    return (
        <div>
            Tx error {message}
            <button type="button" onClick={dismiss}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}