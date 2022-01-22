import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from 'react-bootstrap/Stack';
import BudgetCard from './components/BudgetCard';
import AddBudgetModal from "./components/AddBudgetModal"
import {  UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext';
import AddExpenseModal from './components/AddExpenseModal';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import ViewExpensesModal from './components/ViewExpensesModal';
import TotalSavingsCard from './components/TotalSavingCard';


function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId){
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }
  return (
    <>
    <div className='min-vh-100 container-fluid bg-dark text-white pb-3'>
      <Stack direction="horizontal" gap="2" className="mb-4">
        <h1 className='me-auto pt-2 font-weight-bold' style={{color: "#00FFBF"}}>Finances</h1>
        <Button variant="contained text-dark" style={{backgroundColor: "#00FFBF"}} onClick={() => setShowAddBudgetModal(true)}><b>Add Monthly Income</b></Button>
        <Button variant="contained text-dark" style={{backgroundColor: "#00FFBF"}} onClick={openAddExpenseModal}><b>Add Expenses</b></Button>
      </Stack>
      <div style={{display:'grid',gridTenplateColumns:'repeat(auto-fill),minmax(300px,ifr)',gap:'1rem',alignItems:'flex-start'}}>
        {budgets.map(budget => { 
          const amount = getBudgetExpenses(budget.id).reduce((total,expense) => total + expense.amount,0)
          return <BudgetCard name={budget.name} amount={amount} max={budget.max} key={budget.id} onAddExpenseClick={() => openAddExpenseModal(budget.id)} onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}/>
        })}
        <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal} onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
        <TotalBudgetCard />
        <TotalSavingsCard/>
      </div>
    </div>
    <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
    <AddExpenseModal show={showAddExpenseModal} defaultBudgetId={addExpenseModalBudgetId} handleClose={() => setShowAddExpenseModal(false)} />
    <ViewExpensesModal budgetId={viewExpensesModalBudgetId} handleClose={() => setViewExpensesModalBudgetId()} />
    </>
  );
}

export default App;
