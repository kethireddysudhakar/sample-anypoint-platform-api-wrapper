const axios = require('axios')
const config = require('./config')

const basicAuthRequestConfig = credentials => {
    let {username, password} = credentials
    let basicAuth = `${username}:${password}`
    let buff = new Buffer.from(basicAuth)
    let base64BasicAuthdata = buff.toString('base64')
    const requestConfig = {
        baseURL: config.anypointUrls.baseUrl,
        headers: {
            Authorization: `Basic ${base64BasicAuthdata}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        timeout: 10000,
    }
    return requestConfig
}

const getAuthBearerToken = async credentials => {
    const path = config.anypointUrls.loginPath
    let reqConfig = basicAuthRequestConfig(credentials)
    const response = await axios.post(path, credentials, reqConfig)
    if (response.data && response.data.access_token && response.data.token_type === 'bearer') {
        return response.data.access_token
    }
    return response.data
}

const bearerAuthRequestConfig = async credentials => {
    const bearerToken = await getAuthBearerToken(credentials)
    const requestConfig = {
        baseURL: config.anypointUrls.baseUrl,
        headers: {
            Authorization: `Bearer ${bearerToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        timeout: 50000,
    }
    return requestConfig
}

const getOrgnisationId = async (credentials, businessGroupName) => {
    const path = `${config.anypointUrls.mePath}`
    let reqConfig = await bearerAuthRequestConfig(credentials)
    const response = await axios.get(path, reqConfig)
    const me = response.data
    if (me && me.user && me.user.memberOfOrganizations) {
        const memberOfOrganizations = me.user.memberOfOrganizations
        if (memberOfOrganizations && memberOfOrganizations.length > 0) {
            let myBusinessGroup = memberOfOrganizations.filter(org => org.name === businessGroupName)
            if (myBusinessGroup.length === 0)
                return Promise.reject(new Error('Could not find any organisationId by the business group name: ' + businessGroupName))
            return myBusinessGroup[0].id
        }
    }
    return Promise.reject(new Error('Could not find any organisationsId'))
}

const getEvironmentsByOrgId = async (credentials, organisationId) => {
    const path = `${config.anypointUrls.apiOrgPath}/${organisationId}/environments`
    let reqConfig = await bearerAuthRequestConfig(credentials)
    const response = await axios.get(path, reqConfig)
    return response.data
}

const getEnvironmentId = async function (credentials, organisationId, environment) {
    let environmentsList = await getEvironmentsByOrgId(credentials, organisationId)
    let environmentId = environmentsList.data.find(e => e.name === environment).id
    return environmentId
}

const getApis = async (credentials, organisationId, environmentId) => {
    const path = `${config.anypointUrls.apiMgrPath}/organizations/${organisationId}/environments/${environmentId}/apis`
    let reqConfig = await bearerAuthRequestConfig(credentials)
    const response = await axios.get(path, reqConfig)
    return response.data
}

const getApplications = async (credentials, environmentId) => {
    const path = `${config.anypointUrls.applicationsPath}`
    let reqConfig = await bearerAuthRequestConfig(credentials)
    reqConfig.headers['X-ANYPNT-ENV-ID'] = environmentId
    const response = await axios.get(path, reqConfig)
    return response.data
}

const mqGetDestinations = async (credentials, organisationId, environmentId) => {
    const path = `${config.anypointUrls.mqAdminApiPath}/organizations/${organisationId}/environments/${environmentId}/regions/${config.region}/destinations`
    let reqConfig = await bearerAuthRequestConfig(credentials)
    reqConfig.headers['X-ANYPNT-ENV-ID'] = environmentId
    const response = await axios.get(path, reqConfig)
    return response.data
}

module.exports = {
    getOrgnisationId,
    getEnvironmentId,
    getApis,
    getApplications,
    mqGetDestinations,
}

