import React, { ComponentType } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { theme } from '@ncigdc/theme/index';
import { Row, Column } from '@ncigdc/uikit/Flex';
import DemoButton from './DemoButton';
import Button from '@ncigdc/uikit/Button';
import ExploreLink from '@ncigdc/components/Links/ExploreLink';
import EntityPageHorizontalTable from '@ncigdc/components/EntityPageHorizontalTable';
import countComponents from '@ncigdc/modern_components/Counts';
import { Tooltip } from '@ncigdc/uikit/Tooltip';
import removeEmptyKeys from '@ncigdc/utils/removeEmptyKeys';
// import CollapsibleList from '@ncigdc/uikit/CollapsibleList';

import { TSetTypes } from '@ncigdc/dux/sets';
import { TSelectedSets } from './availableAnalysis';

interface IProps {
  onCancel: () => void;
  onRun: (sets: TSelectedSets) => void;
  type: string;
  label: string;
  Icon: () => React.Component;
  description: string;
  demoData: any; // fix
  setInstructions: string;
  setDisabledMessage: (
    { sets, type }: { sets: any; type: any },
  ) => boolean | undefined;
  setTypes: TSetTypes[];
  validateSets: (sets: TSelectedSets) => boolean;
  ResultComponent: () => React.Component;
  sets: { type: string }; // fix
  selectedSets: { type: string }; // fix
  setSelectedSets: (arg: any) => void;
  configs: any[];
}

const styles = {
  rowStyle: {
    marginTop: 'auto',
    padding: '1rem 2.5rem 1rem',
    borderBottom: `1px solid ${theme.greyScale5}`,
  },
};
const enhance = compose(
  connect(({ sets }: any) => ({ sets })),
  withState('selectedSets', 'setSelectedSets', {}),
);

const ClinicalAnalysisLaunch: ComponentType<IProps> = ({
  onCancel,
  onRun,
  type,
  demoData,
  selectedSets,
  validateSets,
  description,
  label,
  Icon,
  sets,
  setTypes,
  setDisabledMessage,
  setSelectedSets,
  configs = [],
}: IProps) => {
  const cohortHeadings = [
    { key: 'select', title: 'Select' },
    { key: 'name', title: 'Case Set Name' },
    { key: 'count', title: '#Cases', style: { textAlign: 'right' } },
  ];

  const configurationHeadings = [
    { key: 'select', title: 'Select' },
    { key: 'name', title: 'Configuration Name' },
    { key: 'variables', title: 'Variables' },
  ];

  /* tslint:disable */
  const setArray: any[] = [];
  const setData: any[] = Object.entries(sets)
    // .filter((type: TSetTypes) => setTypes.includes(type))
    .map(([type, sets]) => {
      const CountComponent = countComponents[type];

      return Object.entries(sets).map(([setId, label]: [string, any]) => {
        const id = `set-table-${type}-${setId}-select`;
        const checked = Boolean((selectedSets[type] || {})[setId]);

        const msg =
          !checked && setDisabledMessage({ sets: selectedSets, type });

        return {
          select: (
            <Tooltip
              Component={msg}
              style={{
                cursor: msg ? 'not-allowed' : 'initial',
              }}
            >
              <input
                style={{
                  marginLeft: 3,
                  pointerEvents: msg ? 'none' : 'initial',
                }}
                id={id}
                type="checkbox"
                value={setId}
                disabled={msg}
                onChange={e => {
                  const setId = e.target.value;
                  const setIdPath = [type, setId];
                  setSelectedSets(
                    _.get(selectedSets, setIdPath)
                      ? removeEmptyKeys(_.omit(selectedSets, setIdPath))
                      : _.set({ ...selectedSets }, setIdPath, sets[setId]),
                  );
                }}
                checked={checked}
              />
            </Tooltip>
          ),
          type: _.capitalize(type === 'ssm' ? 'mutations' : type + 's'),
          name: <label htmlFor={id}>{_.truncate(label, { length: 70 })}</label>,
          count: (
            <CountComponent
              filters={{
                op: '=',
                content: {
                  field: `${type}s.${type}_id`,
                  value: `set_id:${setId}`,
                },
              }}
            />
          ),
        };
      });
    })
    .reduce((acc, rows) => acc.concat(rows), setArray);

  const configData: any[] = Object.entries(configs)
    // .filter((type: TSetTypes) => setTypes.includes(type))
    .map(([type, sets]) => {
      return Object.entries(sets).map(([setId, label]: [string, any]) => {
        const id = `set-table-${type}-${setId}-select`;
        const checked = Boolean((selectedSets[type] || {})[setId]);

        const msg =
          !checked && setDisabledMessage({ sets: selectedSets, type });

        return {
          select: (
            <Tooltip
              Component={msg}
              style={{
                cursor: msg ? 'not-allowed' : 'initial',
              }}
            >
              <input
                style={{
                  marginLeft: 3,
                  pointerEvents: msg ? 'none' : 'initial',
                }}
                id={id}
                type="checkbox"
                value={setId}
                disabled={msg}
                onChange={e => {
                  const setId = e.target.value;
                  const setIdPath = [type, setId];
                  setSelectedSets(
                    _.get(selectedSets, setIdPath)
                      ? removeEmptyKeys(_.omit(selectedSets, setIdPath))
                      : _.set({ ...selectedSets }, setIdPath, sets[setId]),
                  );
                }}
                checked={checked}
              />
            </Tooltip>
          ),
          name: <label htmlFor={id}>{_.truncate(label, { length: 70 })}</label>,
          variables: <div>Variables</div>, // CollapsibleList
        };
      });
    })
    .reduce((acc, rows) => acc.concat(rows), setArray);

  return (
    <Column style={{ width: '70%', paddingLeft: '1rem', paddingTop: '2rem' }}>
      <Row
        spacing={'5px'}
        style={{ ...styles.rowStyle, justifyContent: 'space-between' }}
      >
        <Icon />
        <Column>
          <Row>
            <h1 style={{ fontSize: '2rem' }}>{label}</h1>
          </Row>
          <Row>{description}</Row>
        </Column>
        <Column style={{ paddingTop: 5 }}>
          <Row spacing={'5px'}>
            <Button onClick={onCancel}>Back</Button>
            <DemoButton demoData={demoData} type={type} />
          </Row>
        </Column>
      </Row>
      <Row style={styles.rowStyle}>
        <Column style={{ flex: 1 }}>
          <h2 style={{ color: '#c7254e', fontSize: '1.8rem' }}>
            Step 1: Select a cohort
          </h2>
          <div style={{ marginBottom: 15 }}>
            You can create and save case sets from the{' '}
            <ExploreLink>Exploration Page</ExploreLink>.
          </div>

          {setData.length > 0 && (
            <EntityPageHorizontalTable
              data={setData}
              headings={cohortHeadings}
            />
          )}
        </Column>
      </Row>
      <Row style={styles.rowStyle}>
        <Column style={{ flex: 1 }}>
          <h2 style={{ color: '#c7254e', fontSize: '1.8rem' }}>
            Step 2: Select an analysis configuration
          </h2>
          <div style={{ marginBottom: 15 }}>
            You can re-use previously saved analysis configurations.
          </div>
          {/* {setData.length > 0 && ( */}
          {true && (
            <EntityPageHorizontalTable
              data={configData}
              headings={configurationHeadings}
            />
          )}
        </Column>
      </Row>
      <Row
        style={{
          ...styles.rowStyle,
          border: 'none',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          disabled={!validateSets(selectedSets)}
          onClick={() => onRun(selectedSets)}
        >
          Run
        </Button>
      </Row>
    </Column>
  );
};

export default enhance(ClinicalAnalysisLaunch);
