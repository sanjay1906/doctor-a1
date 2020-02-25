const selectState = state => {
  return state.root;
};

export const selectHospital = (state) => {
  return selectState(state).hospitals;
}
export const selectHospitalDetail = (state)=>{
  return selectState(state).hospitalDetail;
}