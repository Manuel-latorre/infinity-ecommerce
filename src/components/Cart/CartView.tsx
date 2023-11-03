import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import Cart from "./Cart";

export default function CartView() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [backdrop, setBackdrop] = React.useState('opaque')

  const backdrops = ["blur"];

  const handleOpen = (backdrop:any) => {
    setBackdrop(backdrop)
    onOpen();
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {backdrops.map((b) => (
          <button  
            key={b}
            onClick={() => handleOpen(b)}
          >
           <Cart/>
          </button>
        ))}  
      </div>
      <Modal backdrop='blur' isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                asasasasa
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Comprar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
