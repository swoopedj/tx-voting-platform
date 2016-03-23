/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach afterEach expect */
'use strict';
require(TEST_HELPER);
const Immutable = require('immutable');
const { getEntryViewProps } = require(`${__client}/actionCreators/entries`);

describe('The getEntryViewProps helper', () => {
  const getPropsUsingHelper = (assertOptions) => {
    const state = Immutable.fromJS(assertOptions.initialState);
    return getEntryViewProps(state, assertOptions.routeParams);
  };
  describe('when given state, and routeParams, returns a props object', () => {
    describe('that returns an entry object', () => {
      it('that is pulled from state.entries.info.data if creating new', () => {
        const props = getPropsUsingHelper({
          initialState: {
            entries: {
              inputFields: {},
              info: {
                data: {
                  title: 'test',
                },
              },
            },
          },
          routeParams: {
            id: 'create',
          },
        });
        expect(props.entry).to.deep.equal({ title: 'test' });
      });
      it('that is pulled entries.items if not creating new', () => {
        const initialState = Immutable.fromJS({
          entries: {
            inputFields: {},
            itemsByID: {
            },
          },
        });

        const stateWithItems = initialState.setIn(['entries', 'itemsByID', 2], Immutable.fromJS({id: 2, title: 'two'}));
        const routeParams = {
          id: '2',
        };
        const props = getEntryViewProps(stateWithItems, routeParams);
        expect(props.entry).to.deep.equal({ id: 2, title: 'two' });
      });
    });
    describe('that returns inEditMode', () => {
      let input = {
        initialState: {
          entries: {
            inputFields: {},
            items: [
              {
                id: 1,
                title: 'one',
              },
              {
                id: 2,
                title: 'two',
              },
            ],
            info: {
              data: {},
            },
          },
        },
        routeParams: {
          is_edit: 'edit',
          id: 1,
        },
      };
      it('as true if is_edit in params equals edit', () => {
        const props = getPropsUsingHelper(input);
        expect(props.inEditMode).to.equal(true);
      });
      it('as true if the id is create in params equals edit', () => {
        input.routeParams = {
          id: 'create',
        };
        const props = getPropsUsingHelper(input);
        expect(props.inEditMode).to.equal(true);
      });
      it('as false if is is_edit is not in params', () => {
        input.routeParams = {
          id: 1,
        };     
        const props = getPropsUsingHelper(input);
        expect(props.inEditMode).to.equal(false);
      });
    });
    describe('that returns isCreatingNew', () => {
      let input = {
        initialState: {
          entries: {
            inputFields: {},
            items: [],
            info: { data: {} },
          },
        },
        routeParams: {
          id: 'create',
        },
      };
      it('as true if the id is create', () => {
        const props = getPropsUsingHelper(input);
        expect(props.isCreatingNew).to.equal(true);
      });
      it('as false if the id not create', () => {
        input.routeParams = {
          id: 1,
        };
        const props = getPropsUsingHelper(input);
        expect(props.isCreatingNew).to.equal(false);
      });
    });
    describe('that always gets entries.inputFields from the state', () => {
      const initialState = Immutable.fromJS({
        entries: {
          inputFields: {
            title: 'new',
          },
          itemsByID: {
          },
          info: { data: {} },
        },
      });
      const routeParams = {
        id: 1,
      };
      const testItem = Immutable.fromJS({ id: 1, title: 'old' });
      const stateWithItems = initialState.setIn(['entries', 'itemsByID', 1], testItem);
      const props = getEntryViewProps(stateWithItems, routeParams);
      it('and returns it', () => {
        expect(props.inputFields).to.deep.equal({ title: 'new' });
      });
      it('and mixes inputFields into the returned entry', () => {
        expect(props.entry).to.deep.equal({ title: 'new', id: 1 });
      });
    });
  });
});
