import { EnzymeAdapter } from 'enzyme'
import React from 'react'
import {configure,shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from '../NavigationItems/NavigationItems'
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'

configure({adapter:new Adapter()})

describe('<NavigationItems/>',()=>{
    let wrapper
    beforeEach(()=>{
        wrapper=shallow(<NavigationItems/>) // alt approoach
    })
    it('should show two Item when not authenticated',()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })
    it('should show three Item when authenticated',()=>{
        // wrapper=shallow(<NavigationItems isAuthenticated/>)      // alt approach
        wrapper.setProps({isAuthenticated:true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })
    it('should render logout when authenticated',()=>{
        wrapper.setProps({isAuthenticated:true})
        expect(wrapper.contains( < NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
    })
    
})

