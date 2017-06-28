/* @flow */

import React from 'react';
import Relay from 'react-relay/classic';
import _ from 'lodash';
import { compose, withState } from 'recompose';

import SuggestionFacet from '@ncigdc/components/Aggregations/SuggestionFacet';
import FacetWrapper from '@ncigdc/components/FacetWrapper';
import FacetHeader from '@ncigdc/components/Aggregations/FacetHeader';

import type { TBucket } from '@ncigdc/components/Aggregations/types';

import { withTheme } from '@ncigdc/theme';
import escapeForRelay from '@ncigdc/utils/escapeForRelay';

export type TProps = {
  aggregations: {
    biotype: { buckets: [TBucket] },
    is_cancer_gene_census: { buckets: [TBucket] },
  },
  hits: {
    edges: Array<{|
      node: {|
        id: string,
      |},
    |}>,
  },
  setAutocomplete: Function,
  theme: Object,
};

const presetFacets = [
  {
    title: 'Gene',
    field: 'gene_id',
    full: 'genes.gene_id',
    doc_type: 'genes',
    type: 'id',
  },
  {
    title: 'Biotype',
    field: 'biotype',
    full: 'genes.biotype',
    doc_type: 'genes',
    type: 'terms',
  },
  {
    title: 'Is Cancer Gene Census',
    field: 'is_cancer_gene_census',
    full: 'genes.is_cancer_gene_census',
    doc_type: 'genes',
    type: 'terms',
  },
];

export const GeneAggregationsComponent = compose(
  withState('idCollapsed', 'setIdCollapsed', false),
)((props: TProps) =>
  <div>
    <FacetHeader
      title="Gene"
      field="genes.symbol"
      collapsed={props.idCollapsed}
      setCollapsed={props.setSsmIdCollapsed}
    />
    <SuggestionFacet
      geneSymbolFragment={props.geneSymbolFragment}
      title="Gene"
      doctype="genes"
      collapsed={props.idCollapsed}
      fieldNoDoctype="gene_id"
      placeholder="Search for Gene Symbol or ID"
      hits={props.suggestions}
      setAutocomplete={props.setAutocomplete}
      dropdownItem={x =>
        <div>
          <div style={{ fontWeight: 'bold' }}>{x.symbol}</div>
          {x.gene_id}<br />
          {x.name}
        </div>}
      style={{ borderBottom: `1px solid ${props.theme.greyScale5}` }}
    />
    {_.reject(presetFacets, { full: 'genes.gene_id' }).map(facet =>
      <FacetWrapper
        key={facet.full}
        facet={facet}
        title={facet.title}
        aggregation={props.aggregations[escapeForRelay(facet.field)]}
        relay={props.relay}
        additionalProps={facet.additionalProps}
        style={{ borderBottom: `1px solid ${props.theme.greyScale5}` }}
      />,
    )}
  </div>,
);

export const GeneAggregationsQuery = {
  fragments: {
    aggregations: () => Relay.QL`
      fragment on GeneAggregations {
        biotype {
          buckets {
            doc_count
            key
          }
        }
        is_cancer_gene_census  {
          buckets {
            doc_count
            key
            key_as_string
          }
        }
      }
    `,
  },
};

const GeneAggregations = Relay.createContainer(
  withTheme(GeneAggregationsComponent),
  GeneAggregationsQuery,
);

export default GeneAggregations;
