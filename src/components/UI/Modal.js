import { Fragment } from "react"
import classes from "./Modal.module.css"

const Backdrop = (props) => {
    return <div className={classes.backdrop}
    onClick={props.onClick}></div>
}

const ModalOverlay = (props) => {
   return  <div className={classes.modal}>
         <div className={classes.content}>
              {props.children}
         </div>
        </div>
}

const Modal = (props) => {
    return  <Fragment>
        <Backdrop onClick={props.onClick} />
        <ModalOverlay>{props.children}</ModalOverlay>
      </Fragment>
}

export default Modal;