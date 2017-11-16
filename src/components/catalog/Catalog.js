import React from 'react';
import DocumentTitle from 'react-document-title';
import { Link, Route } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { CategoriesContainer } from './CategoriesContainer';
import { CategorizationContainer } from './CategorizationContainer';
import { FormsContainer } from './FormsContainer';
import { Icon } from './Icon';
import { SpaceContainer } from '../spaces/SpaceContainer';
import { SpacesContainer } from '../spaces/SpacesContainer';
import { SubmissionForm } from '../submissions/SubmissionForm';
import { SubmissionContainer } from '../submissions/SubmissionContainer';
import { SubmissionsContainer } from '../submissions/SubmissionsContainer';

export const Catalog = ({ catalog, match }) =>
  <DocumentTitle title={catalog.loaded ? `kinops Manage - ${catalog.name}` : 'kinops Manage'}>
    <div>
      <h2 className={'text-center'}>kinops Support Portal</h2>
      {catalog.loaded && match.isExact &&
        <div>
          {catalog.currentTemplate &&
            <div className="text-center">
              <Button
                bsStyle="primary"
                bsSize="large"
                href={`https://kinops.io/${catalog.currentTemplate}`}
              >
                {`Current Space Template (${catalog.currentTemplate})`}
              </Button>
            </div>}
          <h2><Icon attributes={catalog.attributes} />{catalog.name}</h2>
          <h3><Link to={'/categories'}>Categories</Link></h3>
        </div>}
      <Route path="/categories" component={CategoriesContainer} />
      <Route path="/categories/:categorySlug" component={CategorizationContainer} />
      <Route path="/forms" component={FormsContainer} />
      <Route path="/forms/:formSlug" component={SubmissionForm} />
      <Route path="/spaces" component={SpacesContainer} />
      <Route path="/spaces/:spaceSlug" component={SpaceContainer} />
      <Route exact path="/submissions" component={SubmissionsContainer} />
      <Route path="/submissions/:submissionId" component={SubmissionForm} />
      <Route path="/submission-details/:submissionId" component={SubmissionContainer} />
    </div>
  </DocumentTitle>;
