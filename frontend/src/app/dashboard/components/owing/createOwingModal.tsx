'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateOwingModal({Creditors, CreateCallback}: {Creditors: any, CreateCallback: any}){
    const [show, setShow] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onChange'
    });

    function HandleShow(){
        setShow(true)
    }
    function HandleClose(){
        setShow(false)
    }

    const router = useRouter()

    async function HandleCreate(data: any){
        const res = await CreateCallback(data);
        if(!res.statusCode){
            HandleClose();
            router.refresh();
            toast('Dívida Criada com Sucesso!', {type: 'success', icon: () => {
                return <i className="bi bi-wallet2"/>
            }})
        }
    }
    return (
        <>
        <Modal show={show} onHide={HandleClose}>
            <Modal.Header>
                Criar Divida
            </Modal.Header>
            <Form onSubmit={handleSubmit(HandleCreate)} noValidate>
              <Modal.Body>
              <Form.Label htmlFor="Creditor">Credor</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Select {...register('Creditor')} id="Creditor">
                        {Creditors.map((creditor: any) => {
                            return (
                                <option value={creditor._id} key={creditor._id}>{creditor.Name}</option>
                            )
                        })}
                    </Form.Select>
                </InputGroup>
                <Form.Label htmlFor="Value">Valor</Form.Label>
                <InputGroup>
                  <InputGroup.Text>R$</InputGroup.Text>
                  <Form.Control 
                  type="number"
                  isInvalid={errors.Value != null}
                  placeholder="1000.00" 
                  id="Value" 
                  {...register('Value', {
                    required:{
                        value: true,
                        message: 'Valor Obrigatório'
                    },
                    min: {
                        value: 0.01,
                        message: 'Digite um Valor Válido'
                    }
                  })}/>
                  <Form.Control.Feedback type="invalid">{errors.Value?.message?.toString()}</Form.Control.Feedback>
                </InputGroup>
              </Modal.Body>
              <Modal.Footer>
                <button className="btn btn-success" type="submit">Criar</button>
              </Modal.Footer>
            </Form>
        </Modal>
            <button className="btn owingCreate" onClick={HandleShow}><i className="bi bi-plus"></i></button>
        </>
    )
}