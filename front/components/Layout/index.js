import {Social} from "../Social";
import {Token} from "../Token";


export function Layout({children, modalVisible, closeModal}) {

    return (
        <div className="relative">
            {children}
            <div className="sm:hidden">
                <Social/>
                <Token/>
            </div>
        </div>
    )
}
