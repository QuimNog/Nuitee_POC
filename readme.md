# Nuitee white-label Frontend Automation Testing Assignment #

by Quim Noguer

coded in June 2025 

### Contents Overview ###

* #### Assignment Overview
* #### Prerequisites
* #### Project structure
* #### Getting started
* #### Running tests with different configurations
* #### CI/CD approach
* #### Future work


### Assignment Overview ###

The goal of this part is to design a small proof of concept for our white-label website at
https://v3.nuitee.link/.


## Prerequisites
Here are some must-have prerequisites in order to run the project:

* git installed 
* npm installed
* node installed

## Project Structure

The project stack is Typescript, Playwright to interact with the browser. Tests can be found in the test folder and I created an actions folder to group multiple browser interactions into a user-like action. This can be extended and improved.

## Getting started
Once you have cloned the project, open VS Code or your IDE of choice and open the project. 

First you will have to install all needed dependencies for the project using: 

> npm ci

You will see that all the project dependencies are being downloaded. Once the process finish, you will be able to build the project. 

To run **all** the tests in the project use the following command:

> npx playwright test

## Running tests with different configurations

There are several profiles in the package.json file. Each of these runs triggers the test launch with different project profile, which emulates different devices or browsers. This is perfect for CrossBrowser testing. Some examples: 

> npx playwright test --project=Desktop_Firefox

> npx playwright test --project=Tablet_iPad

* ## CI/CD approach

I implemented a very simple workflow. To run each of the project configurations (that emulate different devices) in parallel. In addition, tests are also running in parallel for each pipeline. 

**Note:** probably in this case it doesn't at any value the workflow itself. But wanted to demostrate the possibilities of combining github actions and project configurations, an extra step to take it further would be to also introduce test annotations @tags


* #### Future work
Had some fun doing this tests during the afternoon although time constrains is of course to be considered. 
   - Better Page - PageActions structure. To make locators more reusable and classes more modular.
   - Improve reporting on failure. Although the existing ones do the job, we could apply some improvements to identify trends on test failures maybe using Report Portal. 
   - Improve the pipeline so it could be triggered in several environments (doesn't apply here, but would be a nice to have for real projects)