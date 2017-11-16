import awsReducer from './modules/aws';
import catalogReducer from './modules/catalog';
import profileReducer from './modules/profile';
import spacesReducer from './modules/spaces';
import submissionsReducer from './modules/submissions';

export default {
  aws: awsReducer,
  catalog: catalogReducer,
  profile: profileReducer,
  spaces: spacesReducer,
  submissions: submissionsReducer,
};
