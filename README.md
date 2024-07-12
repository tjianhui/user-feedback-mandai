# User Feedback Submission
### For Mandai Wildlife Group Software Development Specialist (Backend) Role.
#### Done by: Tan Jianhui, July 2024

## Installation and how to run
1. `npm install`
2. `npm start` to begin running server
3. `npm test` for running Jest unit tests. DB is mocked.

## API Documentation
I have published the documentation for the routes I have written at https://documenter.getpostman.com/view/14812654/2sA3e5doHY. The Postman collection is also included in this repository.

## Areas identified for further improvement
1. Depending on the use cases and business requirements, additional flags/attributes can be added to each individual feedback. 

    - `isDeferred` is one such example. On modern applications, users may choose 'Later' when prompted with a survey. For user experience, this survey should stay hidden. As and when required, backend can simply run a script to reset all `isDeferred` flags so that those users are prompted for the survey again.
2. Add more backend validation, especially for `rating` which I envision a constraint of between 1 to 5 inclusive. Based on applications I have used that prompted for user feedback, a minimum rating of 1 was required to submit, while `feedback`, as in the free text box, was optional. These requirements can be introduced in the code. 