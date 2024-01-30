import * as AuthActionCreators from './auth'
import * as ListsActionCreators from './lists'
import * as SitesActionCreators from './sites'
import * as SearchActionCreators from './search'
import * as DataActionCreators from './data'
import * as DiscoverActionCreators from './discover'

export default {
  ...AuthActionCreators,
  ...ListsActionCreators,
  ...SitesActionCreators,
  ...SearchActionCreators,
  ...DataActionCreators,
  ...DiscoverActionCreators,
}