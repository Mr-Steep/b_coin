import {Social} from "../Social";
import {Token} from "../Token";
import {Footer} from "../Footer";
import {Modal} from "../Modal";


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
