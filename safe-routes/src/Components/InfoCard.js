import React,{useState,useEffect} from "react";
import { Table, Nav, NavItem , NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import axios from "axios"

const InfoCard = (props) => {
    const [activeTab,setActiveTab] = useState('1');
    const [prob, setProb] = useState("Loading...")

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }
    const lat = props.selected.latitude;
    const lng = props.selected.longitude;
    let dependency = props.selected;

    useEffect(()=>{
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyA8rlUyV8iSMp8dGOMYAdX7BK91gYxa73E`)
        .then(response=>{
            console.log("it ran",response.data)
            props.setAddress(response.data.results[1].formatted_address)
        })
        .catch(error=>{
            console.log(error)
        })
    },[dependency])

    useEffect(()=>{
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let currentMonth = 0
        if(month <= 9){
            currentMonth = `0` + month
        } else{
            currentMonth = month
        }
        let day = new Date().getDate()

        axios
        .get(`https://saferoutes-ds.herokuapp.com/predict/${lat}/${lng}/${year}-${currentMonth}-${day}%2016:33:20/`)
        .then(response=>{
            console.log(response)
            let percentage = response.data * 10
            setProb(`Probability Of Having An Accident At This Time Is ${percentage.toFixed(2)}%`)
        })
    },[dependency])

    return (
        <div>
            <h3>{props.address}</h3>
            <h5>{prob}</h5>
            <Nav tabs>
                <NavItem>
                    <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => { toggle('1'); }}>
                        By Year
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => { toggle('2'); }}>
                        By Month
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
            <Table>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>2010</th>
                        <th>2011</th>
                        <th>2012</th>
                        <th>2013</th>
                        <th>2014</th>
                        <th>2015</th>
                        <th>2016</th>
                        <th>2017</th>
                        <th>2018</th>
                        <th>2019</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Accidents</th>
                        <th>{props.selected.yr_2010}</th>
                        <th>{props.selected.yr_2011}</th>
                        <th>{props.selected.yr_2012}</th>
                        <th>{props.selected.yr_2013}</th>
                        <th>{props.selected.yr_2014}</th>
                        <th>{props.selected.yr_2015}</th>
                        <th>{props.selected.yr_2016}</th>
                        <th>{props.selected.yr_2017}</th>
                        <th>{props.selected.yr_2018}</th>
                        <th>{props.selected.yr_2019}</th>
                    </tr>
                </tbody>
            </Table>
            </TabPane>
            </TabContent>

            <TabContent activeTab={activeTab}>
            <TabPane tabId="2">
            <Table>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Jan</th>
                        <th>Feb</th>
                        <th>Mar</th>
                        <th>Apr</th>
                        <th>May</th>
                        <th>Jun</th>
                        <th>Jul</th>
                        <th>Aug</th>
                        <th>Sep</th>
                        <th>Oct</th>
                        <th>Nov</th>
                        <th>Dec</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Accidents</th>
                        <th>{props.selected.jan}</th>
                        <th>{props.selected.feb}</th>
                        <th>{props.selected.mar}</th>
                        <th>{props.selected.apr}</th>
                        <th>{props.selected.may}</th>
                        <th>{props.selected.jun}</th>
                        <th>{props.selected.jul}</th>
                        <th>{props.selected.aug}</th>
                        <th>{props.selected.sep}</th>
                        <th>{props.selected.oct}</th>
                        <th>{props.selected.nov}</th>
                        <th>{props.selected.dec}</th>
                    </tr>
                </tbody>
            </Table>
            </TabPane>
            </TabContent>
        </div>
    )
}

export default InfoCard;