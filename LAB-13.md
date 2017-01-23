Ken Lab 13
===
# Description

This lab is shows how via the terminal, how a user can GET, POST, and DELETE a request for a soda.

## Prerequiites and things to understand
  1. Have Node Installed

##SCHEMA
  Soda is great. It's one of the greatest things ever invented in all of mankind. Because of the different variaties, we made it simple and broke every soda into 4 catagories.
    **brand** which returns a ```String```
    **calories** which returns a ```Number```
    **diet** which returns a ```Boolean``` value
    **taste** which returns a ```String``` that the user has inputted on their reaction to the taste of said soda.

    **All fields are required**

##POST Commands
  To POST a soda to the database; go to the terminal interface and enter:
    -http POST localhost:3000/api/soda brand=" " calories=" " diet = " " taste = " "

##GET Commands
  To GET(or retrieve) a soda *FROM* the database; go to the terminal interface and enter:
    -http localhost:3000/api/soda brand=" " calories=" " diet = " " taste = " "
## DELETE Commands

  To DELETE a soda *FROM* the database; go to the terminal interface and enter:
    -http DELETE localhost:3000/api/soda brand=" " calories=" " diet = " " taste = " "
