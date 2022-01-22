import { ProgressBar } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { currencyFormatter } from "../utils";
import Stack from 'react-bootstrap/Stack';
import Button from '@mui/material/Button';


export default function BudgetCard({name,amount,max,gray,hidebuttons,onAddExpenseClick,onViewExpensesClick,usedmoney}) {
    const classNames= []
    if (amount>max) {
        classNames.push("bg-danger" , "bg-opacity-10")
    }
    else if (gray){
        classNames.push("bg-dark","border-info","text-info")
    }
    else{
        classNames.push("bg-dark")
    }

return (
  <Card className={classNames.join(" ")} style={{borderColor: "#00FFBF", color:"#00FFBF"}} >
      <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-2">
              <div className="me-2">{name}</div>
              <div className="d-flex align-items-baseline">{currencyFormatter.format(amount)}{max && <span className="text-muted ms-1"> / {currencyFormatter.format(max)}</span>}</div>
          </Card.Title>
          {max && <ProgressBar className="rounded-pill" variant={getProgessBarVariant(amount,max)} min={0} max={max} now={amount} /> }
          {max && <Stack direction="horizontal" className="mt-2">{(amount*100/max).toFixed(2)}% Used.</Stack> }
          {!hidebuttons && <Stack direction='horizontal' gap='4' className='mt-2'>
            <Button variant="outlined" className="ms-auto" style={{borderColor: "#00FFBF",color:"#00FFBF"}} onClick={onAddExpenseClick} >Add Expense</Button>
            <Button variant="outlined" style={{borderColor: "#00FFBF",color:"#00FFBF"}} onClick={onViewExpensesClick} >View Expenses</Button>
          </Stack>}
          {usedmoney && <Stack direction="horizontal" className="mt-2">Total Money Saved: {(100-usedmoney).toFixed(2)}%</Stack>}
      </Card.Body>
  </Card>
  );
}

function getProgessBarVariant(amount,max){
    const ratio = amount / max;
    if (ratio < 0.5) return "primary progress-bar-striped"
    if (ratio < 0.75) return "warning progress-bar-striped"
    return "danger progress-bar-striped"
}