# Lab 5 - Starter
Make sure you make a PR to your own repo's main and not the class' repo!! Otherwise you will lose points!!

# Team Members:
## Arav Vyawahare

1) Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

No, I would not because sending a message involves multiple components working together: sender, receiver, network, backend, database, etc. A unit test isolates a single function/module, not this multi-component interaction.

2) Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters.

Yes, I would because you can test a single function like isValidMessageLength(input) and test it with specific inputs.
* 79 character -> allowed
* 80 character -> allowed
* 81 character -> allowed
The logic is self-contained and doesn't rely on any other systems.