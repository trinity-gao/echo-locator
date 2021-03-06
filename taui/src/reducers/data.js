// @flow
import {handleActions} from 'redux-actions'

export default handleActions(
  {
    'clear data' (state) {
      return {
        ...state,
        grids: [],
        networks: [],
        page: 0,
        showDetails: false,
        showListings: false,
        listingsLoading: false,
        showFavorites: false,
        listingRoute: {}
      }
    },
    'set grid' (state, action) {
      const grids = [...state.grids]
      const gridIndex = grids.findIndex(g => g.name === action.payload.name)

      if (gridIndex > -1) {
        grids[gridIndex] = {...grids[gridIndex], ...action.payload}
      } else {
        grids.push(action.payload)
      }

      return {
        ...state,
        grids
      }
    },
    'set network' (state, action) {
      const networks = [...state.networks]
      const networkIndex = networks.findIndex(
        n => n.name === action.payload.name
      )

      if (networkIndex > -1) {
        networks[networkIndex] = {...networks[networkIndex], ...action.payload}
      } else {
        networks.push(action.payload)
      }

      return {
        ...state,
        networks
      }
    },
    'set active neighborhood' (state, action) {
      return {
        ...state,
        activeNeighborhood: action.payload
      }
    },
    'set active listing' (state, action) {
      return {
        ...state,
        activeListing: action.payload
      }
    },
    'set active network' (state, action) {
      const networks = [...state.networks]

      return {
        ...state,
        networks: networks.map(
          n => Object.assign({}, n, {active: n.name === action.payload})
        )
      }
    },
    'set points of interest' (state, action) {
      return {
        ...state,
        pointsOfInterest: action.payload
      }
    },
    'set neighborhoods' (state, action) {
      return {
        ...state,
        neighborhoods: action.payload
      }
    },
    'set amenity data' (state, action) {
      return {
        ...state,
        amenities: action.payload
      }
    },
    'set listing route' (state, action) {
      return {
        ...state,
        listingRoute: action.payload
      }
    },
    'set neighborhood bounds' (state, action) {
      return {
        ...state,
        neighborhoodBounds: action.payload
      }
    },
    'set origin' (state, action) {
      return {
        ...state,
        origin: action.payload
      }
    },
    'set page' (state, action) {
      return {
        ...state,
        page: action.payload
      }
    },
    'set profile loading' (state, action) {
      return {
        ...state,
        profileLoading: action.payload,
        userProfile: null
      }
    },
    'set profile' (state, action) {
      return {
        ...state,
        profileLoading: false,
        userProfile: action.payload
      }
    },
    'set show details' (state, action) {
      return {
        ...state,
        showDetails: !!action.payload
      }
    },
    'set showBHAListings' (state, action) {
      return {
        ...state,
        showBHAListings: !!action.payload
      }
    },
    'set showRealtorListings' (state, action) {
      return {
        ...state,
        showRealtorListings: !!action.payload
      }
    },
    'set listings loading' (state, action) {
      return {
        ...state,
        listingsLoading: !!action.payload
      }
    },
    'set show favorites' (state, action) {
      return {
        ...state,
        showFavorites: !!action.payload
      }
    },
    'set datalistings' (state, action) {
      return {
        ...state,
        dataListings: action.payload
      }
    },
    'set bhaListings' (state, action) {
      return {
        ...state,
        bhaListings: action.payload
      }
    }
  },
  {
    grids: [],
    networks: [],
    amenities: {},
    neighborhoods: {},
    neighborhoodBounds: {},
    page: 0,
    profileLoading: true,
    showDetails: false,
    showBHAListings: false,
    showRealtorListings: false,
    showFavorites: false,
    listingsLoading: false,
    userProfile: null,
    dataListings: [],
    bhaListings: [],
    listingRoute: {}
  }
)
