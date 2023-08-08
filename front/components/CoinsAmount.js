

export const CoinsAmount = ({amount, step, activeAmount, handleAmount}) => {

    const classStyles = {
        base: "inline-block text-base cursor-pointer rounded-[5px] border border-[#E0E0E0] w-full sm:w-[50px] w-[80px] h-[25px] rounded-[237px]",
        px: amount === 1000 ? "sm:px-[7.3px] px-[21px]" : "sm:px-[11.3px] px-[26px]",
        bg: amount === activeAmount ? "bg-primaryBgColor text-textColor" : "bg-textColor text-primaryBgColor",
        z: step ? "z-10" : "",
    };

    return (
        <div className={`${classStyles.base} ${classStyles.px} ${classStyles.bg} ${classStyles.z}`}
         onClick={() => handleAmount(amount)}>{amount}</div>
    )
}
