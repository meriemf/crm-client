import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Link, withRouter } from "react-router-dom";

/* This defines the actual bar going down the screen */
const StyledSideNav = styled.div`
  position: fixed;
  height: 100%;
  width: 100px;
  z-index: 1;      /* Stay on top of everything */
  top: 3.7em;      /* Stay at the top */
  background-color: #8e9561;
  overflow-x: hidden;     /* Disable horizontal scroll */
  padding-top: 10px;
`;
const NavIcon = styled.div`
  font-family: Tahoma;
  margin-top: 5px;
  font-size: 11px;
  text-align: center;
  padding:0;
`;
const StyledNavItem = styled.div`
  padding-top: 25px;
  height: 90px;
  width: 100px; /* width must be same size as NavBar to center */
  text-align: center; /* Aligns <a> inside of NavIcon div */
  margin-bottom: 0;   /* Puts space between NavItems */
  a {
    font-size: 2.7em;
    color: ${(props) => props.active ? "white" : "#362F07"};
    :hover {
      opacity: 0.7;
      text-decoration: none;
    }  
  }
`;

class NavItem extends React.Component {
  handleClick = () => {
    const { path, onItemClick } = this.props;
    onItemClick(path);
  }
  render() {
    const { active } = this.props;
    return (
      <StyledNavItem active={active}>
        <a href={this.props.path} className={this.props.css} onClick={this.handleClick}>
          <NavIcon>
            <p>{this.props.name}</p>
          </NavIcon>
        </a>
      </StyledNavItem>
    );
  }
}


class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePath: props.location.pathname,
      items: [
        {
          path: "/dashboard",
          name: "Dashboard",
          css: "fa fa-fw fa-chart-area",
          key: 1
        },
        {
          path: "/clients", /* path is used as id to check which NavItem is active basically */
          name: "Clients",
          // css: 'fa fa-fw fad fa-users',
          css: "fa fa-fw fad fa-users",
          key: 2 /* Key is required, else console throws error. Does this please you Mr. Browser?! */
        },
        {
          path: "/clients/new",
          name: "Add Client",
          css: "fa fa-fw fa-user-plus",
          key: 3
        },
        {
          path: "/projects",
          name: "Projects",
          css: "fa fa-tasks",
          key: 4
        },
        {
          path: "/projects/new",
          name: "Add Project",
          css: "fa fa-fw fa-plus-square",
          key: 5
        },
        {
          path: "/notes",
          name: "Notes",
          css: "fa fa-fw fa-sticky-note",
          key: 6
        },
      ]
    }  
  }

  onItemClick = (path) => {
    this.setState({ activePath: path }); /* Sets activePath which causes rerender which causes CSS to change */
  }

  render() {
    const { items, activePath } = this.state;
    return (
      <StyledSideNav>
        {
          /* items = just array AND map() loops thru that array AND item is param of that loop */
          items.map((item) => {
            /* Return however many NavItems in array to be rendered */
            return (
              <NavItem path={item.path} name={item.name} css={item.css} onItemClick={this.onItemClick} /* Simply passed an entire function to onClick prop */ active={item.path === activePath} key={item.key}/>
            )
          })
        }
      </StyledSideNav>
    );
  }
}

const RouterSideNav = withRouter(SideNav);

export default class Sidebar extends React.Component {
  render() {
    return (
      <RouterSideNav></RouterSideNav>
    );
  }
}