// @flow
import React from 'react';
import { compose, withState, withProps } from 'recompose';
import { connect } from 'react-redux';
import { stringify } from 'query-string';

import BaseModal from '@ncigdc/components/Modals/BaseModal';
import { updateSet } from '@ncigdc/dux/sets';
import { setModal } from '@ncigdc/dux/modal';
import SetTable from '@ncigdc/components/SetTable';
import withRouter from '@ncigdc/utils/withRouter';

const enhance = compose(
  withState('selected', 'setSelected', ''),
  connect(({ sets }) => ({ sets })),
  withProps(({ sets, type }) => ({ sets: sets[type] || {} })),
  withRouter,
);

const RemoveSetModal = ({
  title,
  RemoveFromSetButton,
  selected,
  setSelected,
  filters,
  dispatch,
  type,
  field,
  sets,
  history,
  query,
}) =>
  <BaseModal
    title={title}
    extraButtons={
      <RemoveFromSetButton
        disabled={!selected}
        setId={`set_id:${selected}`}
        filters={filters}
        action="remove"
        onComplete={setId => {
          if ((query.filters || '').includes(selected)) {
            history.replace({
              search: `?${stringify({
                ...query,
                filters: query.filters.replace(selected, setId),
              })}`,
            });
          }
          dispatch(setModal(null));
          dispatch(updateSet({ type, oldId: selected, newId: setId }));
        }}
      >
        Save
      </RemoveFromSetButton>
    }
    closeText="Cancel"
  >
    <SetTable
      sets={sets}
      setSelected={setSelected}
      selected={selected}
      type={type}
      field={field}
    />
  </BaseModal>;

export default enhance(RemoveSetModal);
