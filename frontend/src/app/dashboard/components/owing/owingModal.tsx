'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Form, FormLabel, InputGroup, Modal } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

export default function OwingModal({owing, PaymentCallback}: {owing: any, PaymentCallback: any}){
    const {register, handleSubmit, formState: {isValid, errors, touchedFields}} = useForm()
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
        if(!res.statusCode){
            HandleClose();
            router.refresh();
            toast('Dívida Paga com Sucesso!', {type: 'success', icon: () => {
                return <i className="bi bi-cash-coin"/>
            }
        })
    }}
    return (
        <>
            <Modal show={show} onHide={HandleClose}>
                <Modal.Header>
                    Pagar Divida
                </Modal.Header>
                <Form onSubmit={handleSubmit(HandlePayment)} noValidate>
                <Modal.Body>
                      <FormLabel htmlFor="Value">Valor</FormLabel>
                      <InputGroup className="mb-3">
                        <InputGroup.Text>R$</InputGroup.Text>
                        <Form.Control 
                        placeholder={owing.Value} 
                        type="number"
                        isInvalid={errors.Value != null}
                        {...register('Value', {
                            required: {
                                value: true,
                                message: 'Valor Obrigatório'
                            },
                            min: {
                                value: 0.01,
                                message: 'Valor Muito Baixo'
                            },
                            max: {
                                value: owing.PendingValue,
                                message: 'Valor Muito Alto'
                            },
                        })} id="Value"/>
                        <Form.Control.Feedback type="invalid">{errors.Value?.message?.toString()}</Form.Control.Feedback>
                      </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" type="submit">Pagar</button>
                </Modal.Footer>
                </Form>
            </Modal>
            <td className="owingRowData">{(owing.Status == 0 && owing.IsDebtor) && <button className="btn owingRowPay" onClick={HandleShow}><i className="bi bi-wallet2"></i></button>}</td>
        </>
    )
}