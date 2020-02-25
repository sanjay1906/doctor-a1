// import { createAction } from "redux-actions";
import { store } from "./index";
import { handleError } from "./helper";
import { NetworkServices } from "Services";
import { AuthServices } from "Services";
import { hospitalListingAction ,hospitalDetailAction} from './reducer';
import Config from 'Config';

export const fetchHospitalListing = async () => {
  try {
    store.dispatch(hospitalListingAction.init());
    const response = await NetworkServices.get(`${Config.SERVER_URL}/hospital`);

    (response.data || []).forEach(element => {
      element.mobileNo = element.mobileNo[0] || null;
    });

    store.dispatch(hospitalListingAction.success(response.data));
  } catch (err) {
    handleError(err);
    store.dispatch(hospitalListingAction.failed({ internalMessage: err.message, displayMessage: 'Error in fetchHospitalListing' }));
  }
}

export const addHospitalAction = async (data) => {
  try {
    // Adding hospital 
    await NetworkServices.post(`${Config.SERVER_URL}/hospital`, { ...data });
  } catch (err) {
    // Handling error
    handleError(err);
  }
}

export const fetchHospitalDetail = async(hospitalId)=>{
  try{
    store.dispatch(hospitalDetailAction.init());

    // Api Calling

    const response = await NetworkServices.get(`${Config.SERVER_URL}/hospital/${hospitalId}`);
    // Save Data To Redux
    store.dispatch(hospitalDetailAction.success(response.data||{}));
  } catch(err){
    handleError(err);
    hospitalDetailAction.failed({ internalMessage: err.message, displayMessage: 'Error in fetchHospitalListing' })
  }
}

export const addDoctor = async (data) => {
  try{
    await NetworkServices.post(`${Config.SERVER_URL}/doctor`,{...data});
  } catch(err){
    handleError(err);
  }
}

export const addCab = async (data) => {
  try{
    await NetworkServices.post(`${Config.SERVER_URL}/cab`,{...data});
  } catch(err){
    handleError(err);
  }
}