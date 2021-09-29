const dotenv = require('dotenv')
dotenv.config()

const { getOrgnisationId, getEnvironmentId, getApis, getApplications, mqGetDestinations } = require('./anypoint-platform/anypoint-platform-api')

const { AP_USERNAME, AP_PASSWORD, BUSINESS_GROUP_NAME, CLOUDHUB_ENVIRONMENT } = process.env

const credentials = {
    username: AP_USERNAME,
    password: AP_PASSWORD,
}

const init = async () => {
    const organisationId = await getOrgnisationId(credentials, BUSINESS_GROUP_NAME)
    const environmentId = await getEnvironmentId(credentials, organisationId, CLOUDHUB_ENVIRONMENT)

    // Get APIs from APIManager
    const apis = await getApis(credentials, organisationId, environmentId)
    console.log(`========================================================`)
    console.log(`APIManager: APIs in the environment ${CLOUDHUB_ENVIRONMENT}`)
    console.log(`========================================================`)
    console.log(JSON.stringify(apis, null, 2))
    console.log(`########################################################`)

    // Get Applications from Runtime Manager
    const applications = await getApplications(credentials, environmentId)
    console.log(`========================================================`)
    console.log(`RuntimeManager: Applications in the environment ${CLOUDHUB_ENVIRONMENT}`)
    console.log(`========================================================`)
    console.log(JSON.stringify(applications, null, 2))
    console.log(`########################################################`)

    // Get MQ Destinations
    const mqDestinations = await mqGetDestinations(credentials, organisationId, environmentId)
    console.log(`========================================================`)
    console.log(`MQ: Destinations in the environment ${CLOUDHUB_ENVIRONMENT}`)
    console.log(`========================================================`)
    console.log(JSON.stringify(mqDestinations, null, 2))
    console.log(`########################################################`)
}

init()

