# React + TypeScript + Vite

The project aims to help with the daily budget for a user.
The user can Configure the Expense, Income and Savings categories as needed, based on these categories graphs will be created.
Each sub category configure should be unique per category.
User can add their budget plan for this month in the budgets tab. Budgets are based on the expense categories. Each category can have one value per month.
Each budget log has budget category, amount and description where description is optional.
User can add the transactions done in this month which are categorised by Salary, Expense and Savings each having their own sub categories as configured in global settings.
Uniqueness check for name of gloabl settings and budget is only considered for non soft deleted data
Each transaction log will have transaction name, category, sub category, amount and transaction date. Description is optional.
Their is a search box that search values case insensitive in transaction name and transaction description.
Transactions will also have a month selector at the top to display current months transaction. This can be changed as needed.
Transactions table have an option to sort by transaction date or transaction amount.
Only one sort order is applied at a time.
If no sort order is selected then it is displayed in the order of creation (latest first)
Pagination is implemented with a limit of 10 items per page.
The transaction table has an option to filter by category and sub categories. Multiple values can be selected for each type and all field filters are considered.
Dashboard has quick stats for quick information
Dashboard also had D3 graphs for visual insights
After login is successful, token is stored in the cookies and used in all other api calls.
If there is no token found then page re-routes to login page
If an unknown url is searched then it shows Not found page
Each month can have its own data and can be accessed by the date picker provided at the top of each page excluding globaal settings

LLMs were used to help with the D3 graph creation and Floating Label input
LLMs were also used for image generation for backgrouns and icons

Folder Structure

- src
  - apis // all apis calls are written here
    - inputs
    - masterData
    - transactions
  - assets // custom images used
  - components // all sub components used in the main page
    - inputs
    - layouts
    - login
    - masterData
    - route
    - transactions
  - config // all the configuration files used
  - dtos // contains types and interfaces used
  - pages // main pages
    - dashboard
    - globalSettings
    - inputs
    - login
    - not-found
    - transactions
  - routes // all the route definitions
  - utils // contains helper functions

External Packages Used

- ESlint
- js-cookie // for cookie management
- moment // for date and time management
- axios // for api calls
- antd // for most UI
- mui // for some UI
- d3 // for graphs

ENV variables needed

- VITE_API_URL

Additional Features that can be added

- CSP (contnent security policy)
- Redis caching
- Restoration methods for soft deleted data
- Rewaard / Goal / Milestone
