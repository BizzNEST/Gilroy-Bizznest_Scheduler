## Schedule Randomizer
The goal of this project is to develop a randomized scheduling application using only frontend technologies (HTML, CSS, and JavaScript). The application will allow users to pair interns or group interns from different locations and departments based on customizable rules. It will provide flexibility to include or exclude interns from the schedule with simple selection controls.<br>
You can check it out here: [Live Site](https://bizznest.github.io/Gilroy-Bizznest_Scheduler/)

 ## Code of Conduct

* Maintain professionalism in all communications.
* Keep requests and issues relevant to the work at BizzNEST.
* Treat everyone with respect—no exceptions.
* Make timeliness a priority
* Maintain ethical behavior.
* Assist others when needed, embrace a "No man left behind" mentality.
* Collaborate, have fun, and share your knowledge!


## Running the Project
1. **clone the repository** run the following command to clone the repository to your local machine
```sh
git clone git@github.com:BizzNEST/Gilroy-Bizznest_Scheduler.git
```
2. **open the project folder in VS code**

3. **Install the live server extension** https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
4. Open `index.html` using the live server extension.  Note that simply opening `index.html` without a local server will result in a broken site.

## Instructions
> [!NOTE]
> Basic web development tools (e.g., code editor, browser testing tools), GitHub.

1. Planning and Design
    - Familiarize yourself with GitHub's best practices and read documentation
    - Develop wireframes and design prototypes

2. Development
    - Develop using only HTML, CSS, and JS
    - Create GitHub issues and update them according to progress
    - Implement the logic for schedule generation, rule configuration, selection management, and edge case handling.

3. Testing
    - Perform user acceptance testing to ensure the application meets requirements.

4. Deployment
    - Deploy the application to a web server or hosting platform
    - Provide instructions for use and optional documentation.

## Need Help
1. Ask Chat-GPT
2. Search up the problem.
3. Ask a fellow colleague for help
4. Ask your senior intern about the problem
5. Message Alex for help


## How to Use App
1. You'll start on a landing page, click 'Pair up' button to navigate to the site's UI.
2. Once you are in the UI, you will see a list of bizzNest interns in a box, and a group of buttons with filtering options.
3. There are multiple ways to filter through the interns.
 * Select all will select every intern in the list.
 * Deselect all will deselect every intern in the list.
 * Department dropdown allows a user to select interns by their designated department
 * Location dropdown allows a user to select interns by their designated location
 (Filtering by location and department simultaneously is enabled)
 4. Pair from different department or location sliders are used to ensure that interns are paired with interns from other locations or departments. (When this feature is applied, an accuracy checker is displayed at the bottom of the page)
5. When ready to assign partners based on filtering criteria, click shuffle button. This will create a new box displaying the partners.
6. After creating partner assignment, clicking the export button will allow the user to keep a PNG copy of the assigned partners.

