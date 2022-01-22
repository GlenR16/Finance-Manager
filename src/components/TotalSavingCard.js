import BudgetCard from "./BudgetCard"
import { useBudgets } from "../contexts/BudgetsContext"

export default function TotalSavingsCard() {
    const { expenses , budgets } = useBudgets()
    const amount = expenses.reduce((total,expense) => total + expense.amount,0)
    const max = budgets.reduce((total,budget) => total + budget.max,0)
    if ( max === 0) return null
    if ( amount === 0) return <BudgetCard name="Total Savings" amount={max-amount} gray hidebuttons/>
    return <BudgetCard name="Total Savings" amount={max-amount} gray hidebuttons usedmoney={100*amount/max}/>
}
