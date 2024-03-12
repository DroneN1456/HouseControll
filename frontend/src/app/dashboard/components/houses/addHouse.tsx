'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, FormControl, FormLabel, InputGroup, Modal, Nav } from "react-bootstrap"
import { set, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AddHouse({newHouseCallback, enterHouseCallback}: {newHouseCallback: any, enterHouseCallback: any}) {
    const [newHouse, setNewHouse] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const {register, handleSubmit, formState: {errors, touchedFields}} = useForm({
        mode: 'onChange'
    });
    const router = useRouter()

    function handeShow(){
        setShowModal(true);
    }
    function handleClose(){
        setShowModal(false);
    }
    async function HandleHouse(data: any){
        if(newHouse){
            const res = await newHouseCallback(data);
            if(!res.statusCode){
                setShowModal(false);
                router.refresh();
                toast('Casa criada!', {
                    type: 'success', 
                    icon: (<i className="bi bi-check-circle"></i>)
                })
            }else{
                toast('Erro ao criar casa', {
                    type: 'error',
                    icon: (<i className="bi bi-x-circle"></i>)
                });
                setShowModal(false);
            }
        }else{
            const res = await enterHouseCallback(data);
            if(!res.statusCode){
                setShowModal(false);
                router.refresh();
                toast('Você entrou em uma casa!', {
                    type: 'success', 
                    icon: (<i className="bi bi-check-circle"></i>)
                })
            }else{
                toast('Código inválido', {
                    type: 'error',
                    icon: (<i className="bi bi-x-circle"></i>)
                });
                setShowModal(false);
            }
        }
    }
    return (
        <>
        <div className="addHouse col-12 col-sm-6 col-md-4 d-flex justify-content-center align-items-center" onClick={() => {
            setShowModal(true)
        }}>
            <i className="addHouseButton bi bi-plus-circle-dotted"></i>
        </div>
        <Modal show={showModal} onHide={handleClose}>
        <Form className="mt-4" noValidate onSubmit={handleSubmit(HandleHouse)}>
            <Nav variant="tabs">
                    <Nav.Item>
                        <Nav.Link onClick={() => setNewHouse(false)}>Entrar</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => setNewHouse(true)}>Criar</Nav.Link>
                    </Nav.Item>
            </Nav>
            {!newHouse ?
             (<>
               <Modal.Body>
                 <FormLabel>Código</FormLabel>
                 <InputGroup>
                    <FormControl 
                    type="text" 
                    placeholder="xxxxxxxxxxxxxxxx"
                    isValid={touchedFields.Code && !errors.Code} 
                    isInvalid={errors.Code != null}
                    {...register('Code', {
                        required: {
                            value: true,
                            message: 'Código é obrigatório'
                        }
                    })}/>
                    <FormControl.Feedback type="invalid">
                        {errors.Code?.message?.toString()}
                    </FormControl.Feedback>
                 </InputGroup>
               </Modal.Body>
               <Modal.Footer>
                 <button className="btn btn-primary" type="submit">Entrar</button>
               </Modal.Footer>
             </>) : 
             (<>
               <Modal.Body>
                   <FormLabel>Nome</FormLabel>
                   <InputGroup>
                      <FormControl 
                      type="text" 
                      isValid={touchedFields.Name && !errors.Name}
                      isInvalid={errors.Name != null}
                      placeholder="Casa" 
                      {...register('Name', {
                        required: {
                            value: true,
                            message: 'Nome é obrigatório'
                        }
                      })}/>
                      <FormControl.Feedback type="invalid">
                          {errors.Name?.message?.toString()}
                      </FormControl.Feedback>
                   </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                   <button className="btn btn-success" type="submit">Criar</button>
                </Modal.Footer>
             </>)}
        </Form>
        </Modal>
        </>
    )
}