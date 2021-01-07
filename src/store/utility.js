/**
 * Just a helper class that takes an object and updated properties as params
 * and returns the updated object
 */

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};
