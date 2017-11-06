import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
  let errors = {};
  if(/^\d+$/.test(data.zipcode) === false) {
    errors.zipcode = 'Enter only numbers';
  }
  if(Validator.isEmpty(data.zipcode)) {
    errors.zipcode = 'This field is required';
  }
  console.log(data.zipcode.length);
   if(data.zipcode.length > 32) {
    errors.zipcode= 'Maximum 32 characters are allowed';
   }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
