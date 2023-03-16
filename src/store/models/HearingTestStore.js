const state = {
  // search filter responses: needed to use at front pages
  testSounds: [],
  currentPlayedIndex:0,
  dataLog:null,
  ID:null
  
};

const mutations = {
  // setCarLocationsM(state, payload) {
  //     state.carLocations = payload;
  // },
  commitAction(state,payload) {
    if(state.testSounds.length==0){
    state.testSounds = payload;
  }
  },
  nextSoundM(state,sound){
    state.currentPlayedIndex = sound;
    // state.testSounds[sound].played=true;
  },
  nextSoundPlayedM(state,index){
    state.testSounds[index].played = true;
  },
  updateLog(state,data){
    state.dataLog=data;
  },
  reset(state){
    state.dataLog=null;
    state.currentPlayedIndex=0;
    state.testSounds=[],
    state.ID=null
  },
  setId(state,id){
    state.ID=id;
  }

 
};

const actions = {
  resetSearchId({ commit }) {
    commit('carSearchedIdM', []);
  },
  setHearingTestSounds({commit},payload){
    console.log(payload,22222222222333)
    commit('commitAction', payload);
  },
  nextSound({commit},nextSound){
    commit('nextSoundM', nextSound);
  },
  nextSoundPlayed({commit},nextSound){
    commit('nextSoundPlayedM', nextSound);
  },
  maintainHistory({commit},payload){
    commit('updateLog',payload);
  },
  resetStore({commit}){
    commit('reset');
  },
  testId({commit},testID){
    commit('setId',testID);
  }
  
 
};

const getters = {
 
};

export default {
  state,
  mutations,
  actions,
  getters,
};
