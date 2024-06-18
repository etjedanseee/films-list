import * as AuthActionCreators from './auth'
import * as ListsActionCreators from './lists'
import * as SitesActionCreators from './sites'
import * as SearchActionCreators from './search'
import * as DataActionCreators from './data'
import * as DiscoverActionCreators from './discover'

const actionCreators = {
  ...AuthActionCreators,
  ...ListsActionCreators,
  ...SitesActionCreators,
  ...SearchActionCreators,
  ...DataActionCreators,
  ...DiscoverActionCreators,
}

export default actionCreators