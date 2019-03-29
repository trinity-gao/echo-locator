// @flow
import find from 'lodash/find'
import get from 'lodash/get'
import map from 'lodash/map'
import {createSelector} from 'reselect'

import neighborhoodsSortedWithRoutes from './neighborhoods-sorted-with-routes'

export default createSelector(
  neighborhoodsSortedWithRoutes,
  state => get(state, 'data.neighborhoods'),
  (neighborhoodsSortedWithRoutes, neighborhoods) => {
    if (!neighborhoodsSortedWithRoutes || !neighborhoodsSortedWithRoutes.length) {
      return neighborhoods
    }
    const routableNeighborhoods = map(neighborhoods.features, n => {
      const routable = !!find(neighborhoodsSortedWithRoutes,
        s => s.properties.id === n.properties.id)
      const neighborhood = Object.assign({}, n)
      neighborhood.properties.routable = routable
      return neighborhood
    })
    return Object.assign({}, neighborhoods, {features: routableNeighborhoods})
  }
)
