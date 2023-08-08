

export function Modal({children, tokenModal, modalVisible, setPopupVisible}) {

    const closePopup = () => {
        if(tokenModal) {
            setPopupVisible(false)
        }
    }

    return (
        <>
        <div className="w-full h-full fixed top-0 left-0" onClick={closePopup}>

            <div className="w-full h-full mx-auto relative">
                {children}
            </div>
            <div className={"w-full h-full fixed bg-black top-0 left-0 "
            + (tokenModal ? 'opacity-50' : 'opacity-80'
            )
            }></div>

        </div>
        </>
    )
}
