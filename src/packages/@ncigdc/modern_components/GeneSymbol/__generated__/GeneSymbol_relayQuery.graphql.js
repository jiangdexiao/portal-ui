/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule GeneSymbol_relayQuery.graphql
 * @generated SignedSource<<efad210d0ce794bb68e6ef42e7c00eb2>>
 * @relayHash 5b535c30d760131f9cf0af0ad35e6c9e
 * @flow
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';

*/


/*
query GeneSymbol_relayQuery(
  $filters: FiltersArgument
) {
  viewer {
    explore {
      genes {
        hits(filters: $filters, first: 1) {
          edges {
            node {
              symbol
              id
            }
          }
        }
      }
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "filters",
        "type": "FiltersArgument",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "GeneSymbol_relayQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Root",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Explore",
            "name": "explore",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Genes",
                "name": "genes",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": [
                      {
                        "kind": "Variable",
                        "name": "filters",
                        "variableName": "filters",
                        "type": "FiltersArgument"
                      },
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 1,
                        "type": "Int"
                      }
                    ],
                    "concreteType": "GeneConnection",
                    "name": "hits",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "GeneEdge",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "args": null,
                            "concreteType": "Gene",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "symbol",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Root"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "GeneSymbol_relayQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "filters",
        "type": "FiltersArgument",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "GeneSymbol_relayQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Root",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Explore",
            "name": "explore",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Genes",
                "name": "genes",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": [
                      {
                        "kind": "Variable",
                        "name": "filters",
                        "variableName": "filters",
                        "type": "FiltersArgument"
                      },
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 1,
                        "type": "Int"
                      }
                    ],
                    "concreteType": "GeneConnection",
                    "name": "hits",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "GeneEdge",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "args": null,
                            "concreteType": "Gene",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "symbol",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "id",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query GeneSymbol_relayQuery(\n  $filters: FiltersArgument\n) {\n  viewer {\n    explore {\n      genes {\n        hits(filters: $filters, first: 1) {\n          edges {\n            node {\n              symbol\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
};

module.exports = batch;