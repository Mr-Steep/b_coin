export const CoinsAmount = ({amount, step, activeAmount, handleInput}) => {
    const classStyles = {
        base: "inline-block text-base cursor-pointer rounded-[5px] border border-[#E0E0E0] w-full sm:w-[50px] w-[80px] h-[25px] rounded-[237px]",
        px: amount === 1000 ? "sm:px-[7.3px] px-[21px]" : "sm:px-[11.3px] px-[26px]",
        bg: amount === activeAmount ? "bg-blackColor text-whiteColor" : "bg-whiteColor text-blackColor",
        z: step === 3 ? "z-10" : "",
    };

    return (
        <div className={`${classStyles.base} ${classStyles.px} ${classStyles.bg} ${classStyles.z}`}
         onClick={() => handleInput(amount)}>{amount}</div>
    )
}
