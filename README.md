# finances-app

An app used to manage budgets, expenses, and spending.

### Developing

```bash
npm i -g webpack
npm i -g webpack-dev-server
npm start
open http://localhost:8080/#/budget/expenses 
```
### Deploying

```bash
# install firebase tools
npm i -g firebase-tools
# authenticate
firebase login
# sh deploy.sh
```

### User Requirements

- [ ] Must be mobile-compatible
- [ ] Be able to create a monthly budget
    - [ ] A budget has a total amount that can be spent (the funding amount)
    - [ ] A budget contains multiple expenses that each have: a name, a description, an amount, and a frequency
    - [ ] Only one budget per user for now
- [ ] Be able to view the monthly budget
    - [ ] View all of the expenses in the budget
    - [ ] View the total amount of money budgeted, and what's left over after the funding amount (positive or negative)
- [ ] Be able to edit a budget
    - [ ] Modify the funding amount of a budget
    - [ ] Add/edit expenses for the budget
    - [ ] No deleting expenses until we figure out how to modify past transactions (see below)
- [ ] Be able to add transactions (a record of money spent)
    - [ ] Each transaction has: an amount, an expense (from the budget), a date, and a description
- [ ] Be able to view the current status of the monthly budget
    - [ ] View the sum of all of the transactions, and how much funding is left
    - [ ] View the sum of transactions for a specific expense to see how much funding is left for that category
    - [ ] View a list of the expenses that are over-spent
