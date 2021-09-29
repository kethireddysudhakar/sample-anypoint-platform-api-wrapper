const baseUrl = 'https://anypoint.mulesoft.com'

const config = {
  anypointUrls: {
    baseUrl,
    loginPath: '/accounts/login',
    apiPath: '/apiplatform/repository/v2',
    mqAdminApiPath: '/mq/admin/api/v1',
    mqBrokerApiPath: '/api/v1',
    cloudhubApiPath: '/cloudhub/api/v2',
    exchangeApiPath: '/exchange/api/v1',
    apiOrgPath: '/accounts/api/organizations',
    apiMgrPath: '/apimanager/api/v1',
    applicationsPath: '/cloudhub/api/v2/applications',
    applicationsV1Path: '/cloudhub/api/applications',
    accountPath: '/cloudhub/api/account',
    mePath: '/accounts/api/me',
    cloudhubVpcPath: '/cloudhub/api/organizations',
  },
  region: process.env.REGION,
}
module.exports = config
