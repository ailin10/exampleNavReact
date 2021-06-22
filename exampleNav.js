/* 
Prompt:
  We have defined a basic dropdown via the Dropdown and DropdownItem components below, with example usage
  in the ExampleNav component. The Dropdown and DropdownItem components have some problems, and also 
  have room for improvements (doesn't everything?) A couple items TODO here (make sure to explain with comments!)
  
  0. How are you today? 😊
  1. Please fix any obvious issues and make you see with the dropdown.
  2. Please then make improvements to the dropdown and make it a but more React-y. Assume this was cobbled
     together or brought in hastily from StackOverflow.
  3. Given that this dropdown might form the basis of an Account picker, a searchable list of Product Tours, one
     step of a flow to configure alerting, etc... Please explore with text or code the way you would approach this.
  4. If we wanted to sync this dropdown selection to the server with
     httpPatch('user', { [`dropdown-state-${key}`]: {true,false} }) where would this be included OR how best to
     handle this (properties needing to be synced to the backend)?
  5. Anything else to add here?
  6. Unrelated to this, what is one new feature you would add to React?
  
  PS: No need to worry about CSS, actually making it "run" etc...
 */

  import React, {PureComponent} from 'react';
  import { httpPatch } from 'lib/http';
  
  // Imported Link dependency 
  import { Link } from "react-router-dom";
  class Dropdown extends PureComponent {
    constuctor(props) {
      super(props);
      this.state = {
        isOpen: false,
      }

      this.props = {
        dropdownMenu: {
            moreItems: {
            'Page 2': '/page2',
            'Page 3': '/page3',
            'Page 4': '/page4'
           },
           evenMoreItems: {
            'Page 5': '/page5',
            'Page 6': '/page6'
           }
        }
      }
    }  
    toggle() {

      // made variable a let, so I can modify it depending on the state
      let {isOpen} = this.state;

      // if isOpen is true, we want to make it false
      isOpen = isOpen ? false : true;
  
      this.setState({isOpen: isOpen});
    }
  
    render() {
      const {isOpen} = this.state;
      const {label} = this.props;
  
      return (
        <div className="dropdown">
          <button type="button" className="dropdown-button" id="dropdownButton" aria-haspopup="true" aria-expended={isOpen} onClick={this.toggle}>{label}</button>
  
          <ul className={`${isOpen ? 'dropdown-open' : ''} dropdown-menu`} aria-labelledby="dropdownButton" role="menu">
            <ExampleNav></ExampleNav>
          </ul>
        </div>
      );
    }
  }


  class DropdownItem extends PureComponent {
    render() {

        // List element containing link
        return (
            <li>
                <Link to={this.props.tolink}>{this.props.itemLabel}</Link>
            </li>
        )
    }
  }
  
  class ExampleNav extends PureComponent {
    render() {
    const moreItems = this.props.dropdownMenu.moreItems;
    const evenMoreItems = this.props.dropdownMenu.evenMoreItems;

      return (
        <nav>
          <a href="/page1">Page 1</a>
          <Dropdown label="More items">
              {
                Object.keys(moreItems).forEach(itemLabel => {
                    return <DropdownItem tolink="`${moreItems[itemLabel]}`" itemLabel="`${itemLabel}`"></DropdownItem>
                })
              }
          </Dropdown>
          <Dropdown label="Even more items">
              {
                Object.keys(evenMoreItems).forEach(itemLabel => {
                    return <DropdownItem tolink="`${evenMoreItems[itemLabel]}`" itemLabel="`${itemLabel}`"></DropdownItem>
                })
              }
          </Dropdown>
        </nav>
      );
    }
  }

  /**
    If I would enable these components to be more of a "searchable" dropdown:
    when the user types in what he is looking for in a search bar somewhere, there can be
    a filter for the props, so instead of looping through with OBject.keys, I would have used .filter method
    and then update the component.


   If we wanted to sync this dropdown selection to the server with
   httpPatch('user', { [`dropdown-state-${key}`]: {true,false} }) where would this be included OR how best to
   handle this (properties needing to be synced to the backend)?

        Then I would create a utility that manages API/server requests with Saga. Then, through actions, I would
        yield an update for the dropdown data.

    Some comments:
    I am not highly experienced with react, but I have used and built frameworks that use Redux and React lifecycles,
    so I could kind of work my way around it.
    
    Some more refinements:
    1. I'd try using BEM syntax for the classes
    2. Definitely split these components into separate files
    3. App.js would have the Router with the paths
    4. Thanks!
   */
