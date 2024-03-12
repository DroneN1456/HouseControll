import { useState } from "react"
import { FormControl, FormLabel, InputGroup, Modal } from "react-bootstrap"
import { toast } from "react-toastify"

export default function HouseInfo({getInfoCallback}: {getInfoCallback: any}){
    const [show, setShow] = useState(false)
    const [code, setCode] = useState('')

    function HandleShow(){
        setShow(true)
    }
    function HandleClose(){
        setShow(false)
    }
    async function HandleInfo(){
        const res = await getInfoCallback()
        if(!res.statusCode){
            HandleShow()
            setCode(res._id)
        }else{
            toast('Erro ao buscar informações da house', {type: 'error', icon: (<i className="bi bi-x-circle-fill"></i>)})
        }
    }
    return (
        <>
        <button className="btn btn-success mx-3" onClick={HandleInfo}><i className="bi bi-info-circle-fill"></i></button>
        <Modal show={show} onHide={HandleClose}>
            <Modal.Header>
                <Modal.Title>Informações</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormLabel>Código</FormLabel>
                <InputGroup>
                   <FormControl type="text" disabled value={code}></FormControl>
                </InputGroup>
            </Modal.Body>
        </Modal>
        </>
    )
}