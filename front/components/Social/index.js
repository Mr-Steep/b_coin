import Image from "next/image";
import Link from "next/link";
import instagram from "../../assets/images/instagram.svg"
import twitter from "../../assets/images/twitter.svg"
import telegram from "../../assets/images/telegram.svg"


export function Social() {

    return (
        <div className="flex flex-col justify-between items-center fixed right-4 bottom-[385px] w-8 h-[146px]">
            <Link href="https://twitter.com/bNXT_network?s=20">
                <Image src={twitter} className="" alt={twitter} />
            </Link>
            <Link href="https://t.me/+JZIHf2hPMIhkZWM0">
                <Image src={telegram} className="" alt={telegram} />
            </Link>
            <Link href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fbnxt_network%2F">
                <Image src={instagram} className="" alt={instagram} />
            </Link>
        </div>

    )
}
