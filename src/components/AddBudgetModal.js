import { Button } from "@mui/material";
import { useRef } from "react";
import { Modal , Form } from "react-bootstrap";
import { useBudgets } from "../contexts/BudgetsContext"

export default function AddBudgetModal({show, handleClose}) {
  const dateRef = useRef()
  const maxRef = useRef()
  const { addBudget } = useBudgets()
  function handleSubmit(e){
    e.preventDefault()
    addBudget({
      name: dateRef.current.value,
      max: parseFloat(maxRef.current.value)
    })
    handleClose()
  }
  return (
    <Modal className="bg-dark" show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Month</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Date of Income</Form.Label>
            <Form.Control ref={dateRef} type="date" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Income</Form.Label>
            <Form.Control ref={maxRef} type="number" required min={0} step={0.01} />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="contained" type="submit">Add</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
