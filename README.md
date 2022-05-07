Steven Stone Tech Task BE

# Introduction
Thank you for taking the time to undertake this technical task. We anticipate this task will take
2 to 3 hours, so please do not go over this time limit. Steven Stone is a retailer, and this task
is related to the eCommerce site. Please complete the exercise below in Typescript and
send us your working and tested solution, and please do not share the exercise on social
media (GitHub, Twitter etc.).

# Task
Consider the following credit card fraud detection algorithm.
A card transaction is comprised of the following elements
• a hashed credit card number
• a timestamp - of format 'year-month-dayThour:minute:second'
• an amount - of format 'pounds.pence'
Transactions are to be received as a comma-separated string of elements. eg.
10d7ce2f43e35fa57d1bbf8b1e2, 2014-04-29T13:15:54, 10.00

A credit card will be identified as fraudulent if the sum of amounts for a unique hashed credit
card number over a 24-hour sliding window period exceeds the price threshold. Using Express
(https://expressjs.com/), add an endpoint, which, when given a sequence of transactions in
chronological order, and a price threshold returns the hashed credit card numbers that have
been identified as fraudulent.
