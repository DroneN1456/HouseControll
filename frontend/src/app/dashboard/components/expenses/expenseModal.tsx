'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Form, FormLabel, InputGroup, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function ExpenseModal({addOutCallback}: {addOutCallback: any}){
    const router = useRouter()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {register, handleSubmit, watch} = useForm();


    const handleValue = (data: any) => {
       let amount = data.amount.replace(',', '.')
       amount = parseFloat(amount);
       let title = '';
       switch(data.type){
        case 'market':
            title = 'Mercado';
            break;
        case 'payment':
            title = 'Pagamento';
            break;
        case 'misc':
            title = data.title;
            break;
       }
       const entryObject = {
        Value: amount,
        Title: title,
        Type: data.type
       }
       addOutCallback(entryObject).then(() => {
        handleClose();
        router.refresh();
       })

    }
    const entryType = watch('type')
    
    return (
        <div className="p-0 m-0">
         <Button className={"expenseEntryButton bi bi-plus-circle-dotted p-0 m-0 col-12"} onClick={handleShow}/>
         <Modal show={show} onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title>Adicionar Movimentação</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(handleValue)}>
             <Modal.Body>
                 <FormLabel htmlFor="entryValue">Valor</FormLabel>
                 <InputGroup className="mb-3">
                   <InputGroup.Text>R$</InputGroup.Text>
                   <Form.Control placeholder="1000,00" type="text" {...register('amount')} id="entryValue"/>
                 </InputGroup>

                 <FormLabel htmlFor="entryType">Tipo</FormLabel>
                 <InputGroup className="mb-3">
                   <Form.Select {...register('type')} id="entryType">
                      <option value={'market'}>
                        Mercado
                      </option>
                      <option value={'payment'}>
                        Pagamento
                      </option>
                      <option value={'misc'}>
                        Misc
                      </option>
                   </Form.Select>
                 </InputGroup>

                 {(entryType == 'misc') &&
                 <>
                  <FormLabel htmlFor="entryTitle">Titulo</FormLabel>
                  <InputGroup className="mb-3">
                    <Form.Control placeholder="Academia" type="text" {...register('title')} id="entryTitle"/>
                  </InputGroup>
                 </>}
            </Modal.Body>

            <Modal.Footer>
                 <Button variant="success" type="submit">OK</Button>
            </Modal.Footer>
            </Form>
          </Modal>
        </div>
    )
}