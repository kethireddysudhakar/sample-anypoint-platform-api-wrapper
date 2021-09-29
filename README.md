# sample-anypoint-platform-api-wrapper
Sample wrapper script using Anypoint Platform APIs

This repository provides a sample script to get you started with the automated resource provisioning using Anypoint Platform APIs.
Platform APIs are Restful APIs, so you could pick the programing language of your choice to make these restful API calls.

### anypoint-platform-api.js
This file contains the below utility functions invoking the Anypoint Platform API.
* *getOrgnisationId*: Retrieves the organisation id by passing the business group name setup in the Anypoint Platform
* *getEnvironmentId*: Retrieves the environment id by passing the name of the Cloudhub environment and organisation id
* *getApis*: Gets the list of all the APIs in APIManager for a specific Cloudhub environment
* *getApplications*: Gets the list of all applications in RuntimeManager for a specific Cloudhub environment
* *mqGetDestinations*: Gets the list of all the Queues and Exchanges in Anypoint MQ for a specific Cloudhub environment

### index.js
This script outputs the following for a specific Cloudhub environment.
* List of APIs in the APIManager
* List of applications in RuntimeManager
* List of Queues and Exchanges in Anypoint MQ

### How to run the script
* It is a Node js script, so make sure you have Node installed
* From the project root directory, run the command: `npm install`
* Set the below environment variables, which are used in the script
  * *AP_USERNAME*: Anypoint Platform username
  * *AP_PASSWORD*: Anypoint Platform password
  * *BUSINESS_GROUP_NAME*: Anypoint Platform business group name
  * *CLOUDHUB_ENVIRONMENT*: Cloudhub environment name e.g. DEV
  * *REGION*: Cloudhub region e.g. ap-southeast-2
* Run the script: `npm start`
