import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem("expenses")) || [])

  useEffect(() => {
            localStorage.setItem("expenses", JSON.stringify(expenses))
          }, [expenses])
  

  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [filterCategory, setFilterCategory] = useState('All')

  function handleSubmit(e) {
    e.preventDefault()
    const newExpenses = {
      id: Date.now(),
      title,
      amount,
      category
    }
    setExpenses(prev => {
      const newArray = [...prev, newExpenses]
      return newArray
    })

    setTitle("")
    setAmount("")
    setCategory("")
  }

  function handleDelete(id) {
    const newExpenses = expenses.filter(expense => expense.id !== id)
    setExpenses(newExpenses)
  }

  const filteredExpenses = 
    filterCategory === "All"
      ? expenses
      : expenses.filter( expense => expense.category === filterCategory)

  const totalExpenses = expenses.reduce((total, expense) => {
    return total + expense.amount
  },0)

  const numberOfExpenses = expenses.length

  function getCategoryTotal(category) {
   const categoryExpenses = expenses.filter(expense => expense.category === category)
  
   return categoryExpenses.reduce((total, expense)=> {
      return total + expense.amount
    },0)
  }

  const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Other"
]
    

return(
  <>
  <main className="container">
    <h2 className="head-text">EXPENSE TRACKER</h2>
    <p className="head-p"> Keep track of your spending</p>

    <form 
    className='expense-form'
    onSubmit={handleSubmit}>

      <input
      placeholder="Expense title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
      />

      <input
      placeholder="Expense amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value !== ""
       ? parseFloat(e.target.value)
       : ""
      )}
      required
      />

      <input
      placeholder="Expense category"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      required
      />

      <button
      className='submit-btn'
      type="submit">Add Expense</button>

      </form>

      <select
            className='expense-category'
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            >
            <option value="All">All</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>

          </select>
    
        {filteredExpenses.map(expense => {
        return (
        <li 
        className="li-container"
        key = {expense.id}>
          <div className="span-list">
            <span>{expense.title}</span>
            <span>{expense.category}</span>
          </div>
            
          <div className='amount-btn-display'>
              {`$${expense.amount}`}
              <button
              className='delete-btn'
               onClick={() => handleDelete(expense.id)}>Delete</button>
          </div>

        </li>
        
        )

      })}
      <div className="categories-grid">
        {categories.map(category => {
        return (
          
          <div className="categories-container" key={category}>
            <span className="category-name">{category}</span>
            <span className="category-total">${getCategoryTotal(category)}</span>
          </div>
        )
      })}
      </div>
      

      <h2>Total Expenses</h2>
      <p>{`$${totalExpenses}`}</p>


      <h2>Number of Expenses</h2>
      <p>{numberOfExpenses}</p>
  </main>
    
  
  </>
)
  
}

export default App
