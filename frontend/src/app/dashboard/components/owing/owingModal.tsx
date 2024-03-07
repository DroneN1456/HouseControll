'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Form, FormLabel, InputGroup, Modal } from "react-bootstrap"
import { useForm } from "react-hook-form"

export default function OwingModal({owing, PaymentCallback}: {owing: any, PaymentCallback: any}){
    const {register, handleSubmit} = useForm()
    const [show, setShow] = useState(false);

    function HandleShow(){
        setShow(true)
    }
    function HandleClose(){
        setShow(false)
    }

    const router = useRouter()

    async function HandlePayment(data: any){
        const res = await PaymentCallback(data);
        if(!res.satusCode){
            HandleClose();
            router.refresh();
        }
    }
    return (
        <>
            <Modal show={show} onHide={HandleClose}>
                <Modal.Header>
                    Pagar Divida
                </Modal.Header>
                <Form onSubmit={handleSubmit(HandlePayment)}>
                <Modal.Body>
                      <FormLabel htmlFor="Value">Valor</FormLabel>
                      <InputGroup className="mb-3">
                        <InputGroup.Text>R$</InputGroup.Text>
                        <Form.Control placeholder={owing.Value} type="text" {...register('Value')} id="Value"/>
                      </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" type="submit">Pagar</button>
                </Modal.Footer>
                </Form>
            </Modal>
            {owing.Status == 0 && <td className="owingRowData"><button className="btn owingRowPay" onClick={HandleShow}><i className="bi bi-wallet2"></i></button></td>}
        </>
    )
}