Ken Lab 13
===
# Description

This lab is shows how via the terminal, how a user can GET, POST, and DELETE a request for a soda and their distributors.



## Prerequisites and things to understand
  1. Have Node Installed

##SODA SCHEMA
  Soda is great. It's one of the greatest things ever invented in all of mankind. Because of the different varieties, we made it simple and broke every soda into 4 catagories.
    **brand** which returns a ```String```
    **calories** which returns a ```Number```
    **diet** which returns a ```Boolean``` value
    **taste** which returns a ```String``` that the user has inputted on their reaction to the taste of said soda.

    **All fields are required**

##DISTRIBUTER SCHEMA
    Not every soda is located in Seattle. Therefore, we have broken up the search criteria into 4 categories.
        **company** which returns a ```String```
        **numberofStores** which returns a ```Number```
        **Seattle** which returns a ```Boolean``` value

        **None of the fields are required**

##POST Commands
  To POST a distributor information to the database; go to the terminal interface and enter any of the criteria:
    -http POST localhost:3000/api/distributor company=" " numberofStores=" " Seattle = " "

    ..*It is considered best practice to enter at least one field...*

##GET Commands
  To GET(or retrieve) a distributor *FROM* the database; go to the terminal interface and enter:

      -http GET localhost:3000/api/distributor company=" " numberofStores=" " Seattle = " "

## DELETE Commands

  To DELETE a soda *FROM* the database; go to the terminal interface and enter:
      -http DELETE localhost:3000/api/distributor company=" " numberofStores=" " Seattle = " "
