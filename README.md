# Setup & Run Instructions

- Open the terminal
- input command "npm i"
- then input command "npm run dev" to run the project

# Documentation

- I have generated idea for UI design from themeforest and also other e-commerce based websites from google.
- I have connected the backend with mongodb database. 
- I have used middleware (cors, express.json())
- I have passed the user Information data to backend with the help of API and after that the response has been sent to client side from the server side,
- At first I have manually inserted 25 products collection data to the mongodb database as here is no admin side to store the 25 datas by any input field.
- On clicking the view details button, each unique product id passed to server side by hitting the API and the product id is for query and get the expected individual data from product collections and send the product information to the client side for the product details page.
- View details page is private page. User must has to login for that. 
- For adding the product to the cart page, when any user click on "add to cart" button with the user's email the product info sent to the server side and store whole info alongside with the user's email to the cart collections. Here email is stored for later query purpose by the email, so that any individual user can only see his cart collections products to the cart page.
- I have used daisy Ui, next Ui for tailwindcss component library.
- In cart page user can order their products. After clicking on the purchase button user will be navigated to the checkout page where user have 2 options for payment method. One is cash on delivery and the other is card payment method.
- For card payment method I have used stripe payment method which is a secure international payment system.
- Additionally, I have done the signup, login page.
- Also additionally, I have used typewritter effect on homepage banner text paragraph.
- Additionally, I have used react-loading skeleton.
- User after processing cash on delivery or stripe payment option whatever the whole products order info alongside with the user's infor will be sent to the server side by hitting API and the info will be stored to the order collection. 
- My cart page is also private route. For accessing this page user must has to logged in.
- I have deployed fontend to the firebase and backend to the vercel.

